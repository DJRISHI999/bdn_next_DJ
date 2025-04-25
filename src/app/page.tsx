import Hero from "@/components/Banner";

import FeaturesSectionDemo from "../components/Feature";
import Properties from "@/components/Properties";
import "./globals.css";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />
      <FeaturesSectionDemo />
      <Properties />
    </>
    
    
  );
}
