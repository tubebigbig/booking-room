"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import PlusButton from "@/components/ActionButton/PlusButton";
import MinusButton from "@/components/ActionButton/MinusButton";
import Number from "@/components/Input/Number";

import useTimer from "@/hooks/useTimer";
import useBooking from "@/hooks/useBooking";
import getDefaultRoomAllocation, {
  People,
  Room,
} from "@/utils/getDefaultRoomAllocation";

export type BookingPageProps = {
  people: People;
  rooms: Room[];
};

const BookingPage = ({ people, rooms }: BookingPageProps) => {
  const delay = 500;
  const numberStep = 1;
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const { startTimer, stopTimer } = useTimer(timer);
  const {
    getAdultCount,
    getChildCount,
    getRoomPeopleCount,
    getIsRoomPlusable,
    getIsRoomMinusable,
    getRoomLeftCapacity,
    getMaxPeopleLeft,
  } = useBooking({
    people,
    rooms,
  });
  const defaultRoomAllocation = getDefaultRoomAllocation(people, rooms);
  const [roomAllocation, setRoomAllocation] = useState(defaultRoomAllocation);
  const adultCount = getAdultCount(roomAllocation);
  const childCount = getChildCount(roomAllocation);
  const finalRoomCount = roomAllocation.filter(
    (e) => e.adult + e.child > 0
  ).length;

  function peopleCountOperator({
    type,
    operator,
    roomIndex,
  }: {
    type: "adult" | "child";
    operator: "add" | "sub";
    roomIndex: number;
  }) {
    setRoomAllocation((value) => {
      const isRoomPlusable = getIsRoomPlusable({
        type,
        roomIndex,
        roomAllocation: value,
      });
      const isRoomMinusable = getIsRoomMinusable({
        type,
        roomIndex,
        roomAllocation: value,
      });

      if (
        (operator === "add" && !isRoomPlusable) ||
        (operator === "sub" && !isRoomMinusable)
      ) {
        clearInterval(timer.current);
        return value;
      }

      const newValue = [...value];
      const roomLeftCapacity = getRoomLeftCapacity({
        type,
        roomIndex,
        roomAllocation,
      });
      const maxPeopleLeft = getMaxPeopleLeft({
        type,
        roomIndex,
        roomAllocation,
      });
      let newPeopleCount = value[roomIndex][type];

      if (operator === "add") newPeopleCount += numberStep;
      else newPeopleCount -= numberStep;
      if (newPeopleCount > Math.min(roomLeftCapacity, maxPeopleLeft))
        newPeopleCount = Math.min(roomLeftCapacity, maxPeopleLeft);
      if (newPeopleCount < 0) newPeopleCount = 0;
      newValue[roomIndex] = {
        ...value[roomIndex],
        [type]: newPeopleCount,
      };
      return newValue;
    });
  }

  function onPeopleCountChange({
    roomIndex,
    type,
    value,
  }: {
    roomIndex: number;
    type: "adult" | "child";
    value: number;
  }) {
    setRoomAllocation((roomAllocation) => {
      clearInterval(timer.current);
      const roomLeftCapacity = getRoomLeftCapacity({
        roomAllocation,
        type,
        roomIndex,
      });
      const maxPeopleLeft = getMaxPeopleLeft({
        roomAllocation,
        type,
        roomIndex,
      });
      if (value < 0 || isNaN(value)) value = 0;
      if (value > Math.min(roomLeftCapacity, maxPeopleLeft))
        value = Math.min(roomLeftCapacity, maxPeopleLeft);
      const newRoomAllocation = [...roomAllocation];
      newRoomAllocation[roomIndex] = {
        ...roomAllocation[roomIndex],
        [type]: value,
      };
      return newRoomAllocation;
    });
  }

  function startOperatorTimer({
    type,
    operator,
    roomIndex,
  }: {
    type: "adult" | "child";
    operator: "add" | "sub";
    roomIndex: number;
  }) {
    startTimer(
      () =>
        peopleCountOperator({
          type,
          operator,
          roomIndex,
        }),
      delay
    );
  }

  return (
    <div className="my-8 p-4 max-w-[640px] m-auto bg-white">
      <h1 className="font-bold text-xl">
        住客人數：{people.adult}位大人，{people.child}位小孩／{finalRoomCount}房
      </h1>
      <div className="bg-blue-100 bg-opacity-50 border border-blue-100 rounded-md p-4 my-2">
        尚未分配人數：{people.adult - adultCount}位大人，
        {people.child - childCount}位小孩
      </div>
      {rooms.map(({ capacity }, i) => (
        <div key={i}>
          <div className="flex flex-col py-4 gap-4">
            <h5 className="my-1">
              房間：{getRoomPeopleCount(roomAllocation[i])}人
            </h5>
            <div className="flex justify-between">
              <div>
                <div>大人</div>
                <div className="opacity-40">年齡 20+</div>
              </div>
              <div className="flex gap-2">
                <MinusButton
                  disabled={
                    !getIsRoomMinusable({
                      roomIndex: i,
                      type: "adult",
                      roomAllocation,
                    })
                  }
                  onMouseDown={() =>
                    startOperatorTimer({
                      type: "adult",
                      operator: "sub",
                      roomIndex: i,
                    })
                  }
                  onMouseUp={stopTimer}
                />
                <Number
                  min={0}
                  max={capacity}
                  step={numberStep}
                  name={"room-adult-" + i}
                  value={roomAllocation[i].adult}
                  onChange={(e) =>
                    onPeopleCountChange({
                      type: "adult",
                      value: parseInt(e.target.value, 10),
                      roomIndex: i,
                    })
                  }
                  disabled={adultCount === people.adult}
                />
                <PlusButton
                  disabled={
                    !getIsRoomPlusable({
                      type: "adult",
                      roomIndex: i,
                      roomAllocation,
                    })
                  }
                  onMouseDown={() =>
                    startOperatorTimer({
                      type: "adult",
                      operator: "add",
                      roomIndex: i,
                    })
                  }
                  onMouseUp={stopTimer}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div>小孩</div>
              <div className="flex gap-2">
                <MinusButton
                  disabled={
                    !getIsRoomMinusable({
                      type: "child",
                      roomIndex: i,
                      roomAllocation,
                    })
                  }
                  onMouseDown={() =>
                    startOperatorTimer({
                      type: "child",
                      operator: "sub",
                      roomIndex: i,
                    })
                  }
                  onMouseUp={stopTimer}
                />
                <Number
                  min={0}
                  max={capacity}
                  step={numberStep}
                  name={"room-child-" + i}
                  value={roomAllocation[i].child}
                  onChange={(e) =>
                    onPeopleCountChange({
                      type: "child",
                      value: parseInt(e.target.value, 10),
                      roomIndex: i,
                    })
                  }
                  disabled={childCount === people.child}
                />
                <PlusButton
                  disabled={
                    !getIsRoomPlusable({
                      type: "child",
                      roomIndex: i,
                      roomAllocation,
                    })
                  }
                  onMouseDown={() =>
                    startOperatorTimer({
                      type: "child",
                      operator: "add",
                      roomIndex: i,
                    })
                  }
                  onMouseUp={stopTimer}
                />
              </div>
            </div>
          </div>
          {i < rooms.length - 1 && <hr />}
        </div>
      ))}
    </div>
  );
};

export default BookingPage;
