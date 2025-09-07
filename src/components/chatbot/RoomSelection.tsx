"use client"
import React, { useState } from "react";

interface Room {
    adults: number;
    children: number;
    childAges: number[];
}

interface RoomSelectionProps {
  onSubmit: (payload: string) => void;
}

// const RoomSelection: React.FC<RoomSelectionProps> = ({ onSubmit }) => {
function RoomSelection({ onSubmit }: RoomSelectionProps) {
    const [rooms, setRooms] = useState<Room[]>([
        { adults: 2, children: 0, childAges: [] },
    ]);

    const handleSubmit = () => {
    const payload = JSON.stringify(rooms);
    onSubmit(payload); // ✅ send data to parent
  }; 

    const handleRoomCountChange = (count: number) => {
        const newRooms: Room[] = [];
        for (let i = 0; i < count; i++) {
            newRooms.push(rooms[i] || { adults: 2, children: 0, childAges: [] });
        }
        setRooms(newRooms);
    };

    const updateRoom = (
        index: number,
        field: "adults" | "children",
        value: number
    ) => {
        setRooms((prev) => {
            const updated = [...prev];
            const newValue = Math.max(0, value);
            updated[index][field] = newValue;

            if (field === "children") {
                updated[index].childAges = Array(newValue).fill(0);
            }
            return updated;
        });
    };

    const updateChildAge = (roomIdx: number, childIdx: number, age: number) => {
        setRooms((prev) => {
            const updated = [...prev];
            updated[roomIdx].childAges[childIdx] = age;
            return updated;
        });
    };

    // const handleSubmit = () => {
    //     alert(JSON.stringify(rooms, null, 2));
    // };

    return (
        <div className="p-6 bg-gray-900 text-white rounded-xl space-y-6 w-[650px]">
            {/* Room Count */}
            <div className="space-y-2 w-[220px]">
                <label className="block">Number of Rooms (1-10):</label>
                <select
                    value={rooms.length}
                    onChange={(e) => handleRoomCountChange(Number(e.target.value))}
                    className="w-full px-4 py-2 rounded-full border border-blue-400 text-blue-400 bg-gray-900 focus:outline-none"
                >
                    {Array.from({ length: 10 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {String(i + 1).padStart(2, "0")}
                        </option>
                    ))}
                </select>
            </div>

            {/* Room sections */}
            {rooms.map((room, idx) => (
                <div key={idx} className="space-y-6 flex items-baseline">
                    <p className="font-semibold w-24">Room {idx + 1}</p>

                    <div className="flex flex-col gap-5">
                        {/* Adults */}
                        <div className="flex items-center justify-between">
                            <span className="w-24">Adults</span>
                            <div className="w-[150px] flex items-center gap-6 px-4 py-2 border border-blue-400 rounded-full">
                                <button
                                    onClick={() => updateRoom(idx, "adults", room.adults - 1)}
                                    className="flex justify-center items-center w-6 h-6 bg-gray-900 border border-blue-400 text-blue-400 rounded-full"
                                >
                                    -
                                </button>
                                <span className="text-blue-400">{String(room.adults).padStart(2, "0")}</span>
                                <button
                                    onClick={() => updateRoom(idx, "adults", room.adults + 1)}
                                    className="flex justify-center items-center w-6 h-6 bg-blue-400 text-white rounded-full"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Children */}
                        <div className="flex items-center justify-between">
                            <span className="w-24">Children</span>
                            <div className="w-[150px] flex items-center gap-6 px-4 py-2 border border-blue-400 rounded-full">
                                <button
                                    onClick={() => updateRoom(idx, "children", room.children - 1)}
                                    className="flex justify-center items-center w-6 h-6 bg-gray-900 border border-blue-400 text-blue-400 rounded-full"
                                >
                                    -
                                </button>
                                <span className="text-blue-400">{String(room.children).padStart(2, "0")}</span>
                                <button
                                    onClick={() => updateRoom(idx, "children", room.children + 1)}
                                    className="flex justify-center items-center w-6 h-6 bg-blue-400 text-white rounded-full"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Child Ages */}
                        {room.children > 0 &&
                            room.childAges.map((age, cIdx) => (
                                <div key={cIdx} className="flex items-center justify-between">
                                    <span className="w-24">Child {String(cIdx + 1).padStart(2, "0")}</span>
                                    <select
                                        value={age}
                                        onChange={(e) =>
                                            updateChildAge(idx, cIdx, Number(e.target.value))
                                        }
                                        className="w-[150px] px-4 py-2 rounded-full border border-blue-400 text-blue-400 bg-gray-900 focus:outline-none"
                                    >
                                        <option value={0}>-</option>
                                        {Array.from({ length: 17 }, (_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {i + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                    </div>
                </div>
            ))}

            {/* Submit */}
            <button
                onClick={handleSubmit}
                className="w-auto px-6 py-3 bg-white text-blue-400 rounded-full font-semibold hover:bg-blue-100"
            >
                Submit
            </button>
        </div>
    );
};

export default RoomSelection;
