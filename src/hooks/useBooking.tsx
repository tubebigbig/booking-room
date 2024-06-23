import { People, Room, RoomAllocation } from "@/utils/getDefaultRoomAllocation";

function useBooking({ people, rooms }: { people: People; rooms: Room[] }) {
  const getAdultCount = (roomAllocation: RoomAllocation[]) =>
    roomAllocation.reduce((acc, { adult }) => acc + adult, 0);
  const getChildCount = (roomAllocation: RoomAllocation[]) =>
    roomAllocation.reduce((acc, { child }) => acc + child, 0);

  const getRoomPeopleCount = (room: RoomAllocation): number => {
    return room.adult + room.child;
  };

  const getIsRoomPlusable = ({
    type,
    roomIndex,
    roomAllocation,
  }: {
    type: "adult" | "child";
    roomIndex: number;
    roomAllocation: RoomAllocation[];
  }) => {
    const adultCount = getAdultCount(roomAllocation);
    const childCount = getChildCount(roomAllocation);
    // all people are allocated
    // current room is full
    return (
      roomAllocation[roomIndex].adult + roomAllocation[roomIndex].child !==
        rooms[roomIndex].capacity &&
      adultCount + childCount !== people.adult + people.child &&
      !(type === "adult" && adultCount === people.adult) &&
      !(type === "child" && childCount === people.child) &&
      !(type === "child" && roomAllocation[roomIndex].adult === 0)
    );
  };

  const getIsRoomMinusable = ({
    type,
    roomIndex,
    roomAllocation,
  }: {
    type: "adult" | "child";
    roomIndex: number;
    roomAllocation: RoomAllocation[];
  }) => {
    // no people in the room
    // type = adult and child > 1 and adult <= 1
    return (
      roomAllocation[roomIndex][type] !== 0 &&
      !(
        type === "adult" &&
        roomAllocation[roomIndex].child > 0 &&
        roomAllocation[roomIndex].adult <= 1
      )
    );
  };

  const getRoomLeftCapacity = ({
    type,
    roomIndex,
    roomAllocation,
  }: {
    roomIndex: number;
    roomAllocation: RoomAllocation[];
    type: "adult" | "child";
  }) => {
    return (
      rooms[roomIndex].capacity -
      (type === "adult"
        ? roomAllocation[roomIndex].child
        : roomAllocation[roomIndex].adult)
    );
  };

  const getMaxPeopleLeft = ({
    type,
    roomIndex,
    roomAllocation,
  }: {
    type: "adult" | "child";
    roomIndex: number;
    roomAllocation: RoomAllocation[];
  }) => {
    const adultCount = getAdultCount(roomAllocation);
    const childCount = getChildCount(roomAllocation);
    return (
      people[type] -
      (type === "adult" ? adultCount : childCount) +
      roomAllocation[roomIndex][type]
    );
  };

  return {
    getAdultCount,
    getChildCount,
    getRoomPeopleCount,
    getIsRoomPlusable,
    getIsRoomMinusable,
    getRoomLeftCapacity,
    getMaxPeopleLeft,
  };
}

export default useBooking;
