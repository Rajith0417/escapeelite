import React from "react";
import Quote from "./Quote";

export default function TestimonialSection() {
  return (
    <section className="pt-16 pb-32 md:py-16">
      <div className="container px-5 mx-auto text-center gap-15 flex items-center flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <video
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
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
