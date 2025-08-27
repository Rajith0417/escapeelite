import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-transparent fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 border-b-1 border-white border-solid">
        {/* <h1 className="text-xl font-bold text-blue-600"></h1> */}
        <img src={"logo.png"} alt={"Escape Elite"} className="h-8 object-cover" />
        <ul className="hidden md:flex space-x-6 font-medium">
          <li><a href="#home" className="text-white p-2 border-b-2 border-solid border-transparent hover:border-white">Home</a></li>
          <li><a href="#destinations" className="text-white p-2 border-b-2 border-solid border-transparent hover:border-white">Destinations</a></li>
          <li><a href="#resorts" className="text-white p-2 border-b-2 border-solid border-transparent hover:border-white">Hotel Resorts</a></li>
          <li><a href="#attractions" className="text-white p-2 border-b-2 border-solid border-transparent hover:border-white">Attractions</a></li>
          <li><a href="#contact" className="text-white p-2 border-b-2 border-solid border-transparent hover:border-white">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}
