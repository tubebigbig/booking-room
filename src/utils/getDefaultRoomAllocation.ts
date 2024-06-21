export type People = {
  adult: number;
  child: number;
};

export type Room = {
  roomPrice: number;
  adultPrice: number;
  childPrice: number;
  capacity: number;
};

export type RoomAllocation = {
  adult: number;
  child: number;
  price: number;
};

// support with GitHub Copilot
// Time complexity: O(2^n)
// Space complexity: O(n)
function getDefaultRoomAllocation(
  people: People,
  roomList: Room[]
): RoomAllocation[] {
  let minPrice = Infinity;
  let minAllocation: RoomAllocation[] = [];

  function dfs(
    index: number,
    people: People,
    currentAllocation: RoomAllocation[]
  ) {
    if (index === roomList.length) {
      if (people.adult === 0 && people.child === 0) {
        const totalPrice = currentAllocation.reduce(
          (sum, room) => sum + room.price,
          0
        );
        if (totalPrice < minPrice) {
          minPrice = totalPrice;
          minAllocation = currentAllocation.slice();
        }
      }
      return;
    }

    for (
      let adults = 0;
      adults <= Math.min(people.adult, roomList[index].capacity);
      adults++
    ) {
      for (
        let children = 0;
        children <= Math.min(people.child, roomList[index].capacity - adults);
        children++
      ) {
        if (children > 0 && adults === 0) continue;
        let price = 0;
        if (adults + children > 0)
          price =
            roomList[index].roomPrice +
            adults * roomList[index].adultPrice +
            children * roomList[index].childPrice;
        currentAllocation[index] = { adult: adults, child: children, price };
        dfs(
          index + 1,
          { adult: people.adult - adults, child: people.child - children },
          currentAllocation
        );
      }
    }
  }

  dfs(0, people, Array(roomList.length).fill({ adult: 0, child: 0, price: 0 }));
  return minAllocation;
}

export default getDefaultRoomAllocation;
