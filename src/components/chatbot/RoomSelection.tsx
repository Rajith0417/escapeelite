"use client"
import { log } from "console";
import React, { useState } from "react";

interface Room {
    adults: number;
    children: number;
    childAges: number[];
}

interface RoomSelectionProps {
    onSubmit: (payload: string) => void;
    isLoading: boolean;
    isPage?: boolean;
}

// const RoomSelection: React.FC<RoomSelectionProps> = ({ onSubmit }) => {
function RoomSelection({ onSubmit, isLoading, isPage = false }: RoomSelectionProps) {
    const [rooms, setRooms] = useState<Room[]>([
        { adults: 2, children: 0, childAges: [] },
    ]);

    //     const handleSubmit = () => {
    //     const payload = JSON.stringify(rooms);
    //     onSubmit(payload); // ✅ send data to parent
    //   }; 

    const handleSubmit = () => {
        const formatted = rooms
            .map((room, idx) => {
                const adultText = `${room.adults} adult${room.adults !== 1 ? "s" : ""}`;
                const childText =
                    room.children > 0
                        ? `${room.children} child${room.children !== 1 ? "ren" : ""} with children aged ${room.childAges.join(", ")}`
                        : "0 children";
                return `Room ${idx + 1}: ${adultText}, ${childText}`;
            })
            .join(", ");

        onSubmit(formatted); // send nicely formatted string to parent
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
            // const newValue = Math.max(0, value);
            const newValue = Math.min(Math.max(0, value), 3);
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
        !isLoading && <div className={`p-6 ${isPage ? 'text-black' : 'text-white'} rounded-xl space-y-6 w-full font-poppins`}>
            {/* Room Count */}
            <div className="space-y-2 w-[255px] text-md font-normal">
                <label className="block">Number of Rooms (1-10):</label>
                <select
                    value={rooms.length}
                    onChange={(e) => handleRoomCountChange(Number(e.target.value))}
                    className={`${isPage ? 'border-black' : 'border-white'} w-full px-4 py-2 rounded-full text-md border bg-transparent focus:outline-none`}
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
                <div key={idx} className="space-y-6 flex flex-col md:flex-row items-baseline">
                    <p className="font-normal text-md w-24">Room {idx + 1}</p>

                    <div className="flex flex-col gap-5">
                        {/* Adults */}
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between font-normal text-md">
                            <span className="w-24">Adults</span>
                            <div className={`${isPage ? 'border-black' : 'border-white'} w-[160px] flex items-center gap-6 px-4 py-2 border rounded-full`}>
                                <button
                                    onClick={() => updateRoom(idx, "adults", room.adults - 1)}
                                    className="flex justify-center items-center w-6 h-6 bg-transparent border border-white  rounded-3xl"
                                >
                                    -
                                </button>
                                <span className="">{String(room.adults).padStart(2, "0")}</span>
                                <button
                                    onClick={() => updateRoom(idx, "adults", room.adults + 1)}
                                    className="flex justify-center items-center w-6 h-6 bg-white text-gray-900 rounded-full"
                                >
                                    +
                                </button>
                            </div>
                            <span className="ml-10 italic text-sm">Max 3</span>
                        </div>

                        {/* Children */}
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between font-normal text-md">
                            <span className="w-24">Children</span>
                            <div className={`${isPage ? 'border-black' : 'border-white'} w-[160px] flex items-center gap-6 px-4 py-2 border rounded-full`}>
                                <button
                                    onClick={() => updateRoom(idx, "children", room.children - 1)}
                                    className="flex justify-center items-center w-6 h-6 bg-transparent border border-white rounded-full"
                                >
                                    -
                                </button>
                                <span className="">{String(room.children).padStart(2, "0")}</span>
                                <button
                                    onClick={() => updateRoom(idx, "children", room.children + 1)}
                                    className="flex justify-center items-center w-6 h-6 bg-white text-gray-900 rounded-full"
                                >
                                    +
                                </button>
                            </div>
                            <span className="ml-10 italic text-sm">Max 3</span>
                        </div>

                        {/* Child Ages */}
                        {room.children > 0 &&
                            room.childAges.map((age, cIdx) => (
                                <div key={cIdx} className="flex items-center justify-between">
                                    <span className="w-24 font-normal text-md">Child {String(cIdx + 1).padStart(2, "0")}</span>
                                    <select
                                        value={age}
                                        onChange={(e) =>
                                            updateChildAge(idx, cIdx, Number(e.target.value))
                                        }
                                        className={`${isPage ? 'text-black' : 'text-white'} w-[160px] px-4 py-2 rounded-full border font-normal text-md bg-transparent focus:outline-none`}
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
                className={`${isPage ? 'border-blue-400' : 'border-white'} border w-auto px-6 py-3 bg-white text-gray-900 rounded-full font-normal text-md`}
            >
                Submit
            </button>
        </div>
    );
};

export default RoomSelection;
