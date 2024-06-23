import getDefaultRoomAllocation, {
  RoomAllocation,
  People,
  Room,
} from "./getDefaultRoomAllocation";

const testDatas: {
  people: People;
  rooms: Room[];
  expectPrice: number;
}[] = [
  {
    people: { adult: 1, child: 1 },
    rooms: [{ roomPrice: 100, adultPrice: 50, childPrice: 25, capacity: 2 }],
    expectPrice: 175,
  },
  {
    people: { adult: 4, child: 2 },
    rooms: [
      { roomPrice: 1000, adultPrice: 200, childPrice: 100, capacity: 4 },
      { roomPrice: 0, adultPrice: 500, childPrice: 500, capacity: 4 },
    ],
    expectPrice: 2600,
  },
  {
    people: { adult: 7, child: 3 },
    rooms: [
      { roomPrice: 2000, adultPrice: 400, childPrice: 200, capacity: 2 },
      { roomPrice: 2000, adultPrice: 400, childPrice: 200, capacity: 2 },
      { roomPrice: 2000, adultPrice: 200, childPrice: 100, capacity: 4 },
      { roomPrice: 2000, adultPrice: 200, childPrice: 100, capacity: 4 },
    ],
    expectPrice: 8000,
  },
  {
    people: { adult: 16, child: 0 },
    rooms: [
      { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
      { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
      { roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 8 },
      { roomPrice: 500, adultPrice: 1000, childPrice: 600, capacity: 2 },
    ],
    expectPrice: 9000,
  },
];

const getTotal = (roomAllocationList: RoomAllocation[]): number => {
  return roomAllocationList.reduce(
    (acc, roomAllocation) => acc + roomAllocation.price,
    0
  );
};

describe("find lowest room allocation price", () => {
  testDatas.forEach(({ people, rooms, expectPrice }) => {
    test(`test ${people.adult} adult and ${people.child} child`, () => {
      const result = getTotal(getDefaultRoomAllocation(people, rooms));
      expect(result).toEqual(expectPrice);
    });
  });
});
