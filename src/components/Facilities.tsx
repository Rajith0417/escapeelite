"use client"
import React, { useState } from "react";
import parse from 'html-react-parser';



// interface FacilitiesProps {
//   title: string;
//   categories: {
//     label: string;
//     facilities: string[];
//   }[];
// }

interface FacilitiesProps {
  facilities?: string;
}

// function Facilities({title, categories}: FacilitiesProps) {
function Facilities({facilities}: FacilitiesProps) {

    // const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <div className=" border border-[#E5E5E5] rounded-lg px-5 py-3 shadow-sm bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Facilities</h2>
        {/* <select
          className="border-none rounded-[5px] p-3 pr-5 bg-[#F3F4F6] text-gray-800"
          value={selectedCategory.label}
          onChange={(e) => {
            const cat = categories.find(c => c.label === e.target.value);
            if (cat) setSelectedCategory(cat);
          }}
        >
          {categories.map((category) => (
            <option key={category.label} value={category.label}>
              {category.label}
            </option>
          ))}
        </select> */}
      </div>

      {/* Facilities list */}
      {/* <ul className="space-y-2">
        {selectedCategory.facilities.map((facility, idx) => (
          <li key={idx} className="text-gray-900 font-normal text-base py-4">
            {facility}
          </li>
        ))}
      </ul> */}
      {/* {facilities} */}
      {facilities && parse(facilities)}

    </div>

  )
}

export default Facilities
