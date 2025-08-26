import React from "react";
import Quote from "./Quote";

export default function Testimonial() {
  return (
    <section className="py-16">
      <div className="container mx-5 md:mx-auto text-center gap-15 flex items-center flex-col md:flex-row">
        <div className="w-full md:pr-6 md:w-1/2">
          <video
            src="/demo.mp4"
            controls
            autoPlay
            loop
            muted
            className="mx-5 w-[calc(100%-40px)] rounded-2xl"
          />
        </div>
        
        <div className="w-full md:w-1/2">
          <Quote/>
        </div>
      </div>
    </section>
  );
}
