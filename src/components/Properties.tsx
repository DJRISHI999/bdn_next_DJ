import React from "react";
import ExpandableCardDemo from "./Expandablecard"; 
import { Particles } from "./magicui/particles";

export default function Properties() {
  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      
      <h2 className="text-3xl font-bold text-center mb-8">Our Featured Properties</h2>
      <ExpandableCardDemo />
    </div>
  );
}