import getDefaultRoomAllocation, {
  RoomAllocation,
  People,
  Room,
} from "./getDefaultRoomAllocation";

const getTotal = (roomAllocationList: RoomAllocation[]): number => {
  return roomAllocationList.reduce(
    (acc, roomAllocation) => acc + roomAllocation.price,
    0
  );
};

describe("should return room allocation", () => {
  test("test 1", () => {
    const people: People = { adult: 1, child: 1 };
    const roomList: Room[] = [
      { roomPrice: 100, adultPrice: 50, childPrice: 25, capacity: 2 },
    ];
    const result = getTotal(getDefaultRoomAllocation(people, roomList));
    expect(result).toEqual(175);
  });

  test("test 2", () => {
    const people: People = { adult: 4, child: 2 };
    const roomList: Room[] = [
      { roomPrice: 1000, adultPrice: 200, childPrice: 100, capacity: 4 },
      { roomPrice: 0, adultPrice: 500, childPrice: 500, capacity: 4 },
    ];
    const result = getTotal(getDefaultRoomAllocation(people, roomList));
    expect(result).toEqual(2600);
  });

  test("test 3", () => {
    const people: People = { adult: 7, child: 3 };
    const roomList: Room[] = [
      { roomPrice: 2000, adultPrice: 400, childPrice: 200, capacity: 2 },
      { roomPrice: 2000, adultPrice: 400, childPrice: 200, capacity: 2 },
      { roomPrice: 2000, adultPrice: 200, childPrice: 100, capacity: 4 },
      { roomPrice: 2000, adultPrice: 200, childPrice: 100, capacity: 4 },
    ];
    const result = getTotal(getDefaultRoomAllocation(people, roomList));
    expect(result).toEqual(8000);
  });

  test("test 4", () => {
    const people: People = { adult: 16, child: 0 };
    const roomList: Room[] = [
      { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
      { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
      { roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 8 },
      { roomPrice: 500, adultPrice: 1000, childPrice: 600, capacity: 2 },
    ];
    const result = getTotal(getDefaultRoomAllocation(people, roomList));
    expect(result).toEqual(9000);
  });
});
