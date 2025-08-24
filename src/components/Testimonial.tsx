import React from "react";
import Quote from "./Quote";

export default function Testimonial() {
  return (
    <section className="py-16">
      <div className="container mx-auto text-center flex items-center">
        <div className="pr-6 w-1/2">
          <video
            src="/demo.mp4"
            controls
            autoPlay
            loop
            muted
            className="w-full"
          />
        </div>
        
        <div className="w-1/2">
          <Quote/>
        </div>
      </div>
    </section>
  );
}
