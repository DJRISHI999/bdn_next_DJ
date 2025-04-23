"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Particles } from "@/components/magicui/particles";

const founders = [
  {
    name: "Manoj Kumar Jaiswal",
    role: "CEO & Founder",
    description:
      "Manoj Kumar Jaiswal is a visionary leader with extensive experience in the real estate industry, driving innovation and excellence at Bhoodhan Infratech.",
    image: "/images/manoj_kumar_jaiswal.webp",
    number: "9213380380",
  },
  {
    name: "Vivek Kumar Jha",
    role: "Co-Founder & Managing Director",
    description:
      "Vivek Kumar Jha has a strong background in property development and management, ensuring top-quality service and customer satisfaction.",
    image: "/images/vivek_jha.webp",
    number: "9911650219",
  },
];

const AboutUs = () => {
  const [showMore, setShowMore] = useState(false);

  const handleLearnMore = () => {
    setShowMore(true); // Button disappears after click
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden mt-20">
      {/* Particles Background */}
      <Particles
        className="absolute inset-0 -z-10"
        quantity={20}
        color="#FFFF00"
        size={9}
        vx={0.1}
      />

      {/* Main Content */}
      <div className="min-h-screen bg-transparent backdrop-blur-sm text-gray-200 flex flex-col items-center px-6 pt-20">
        {/* Logo */}
        <div className="mb-10">
          <Image src="/images/logo.webp" alt="Bhoodhan Infratech Logo" width={150} height={50} />
        </div>

        {/* About Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full max-w-5xl bg-gray-850/80 backdrop-blur-sm rounded-lg shadow-lg p-8"
        >
          <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-8">
            About Us
          </h1>

          {/* Content Sections */}
          {["Who We Are", "Our Vision", "Our Mission"].map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                {section}
              </h2>
              <p className="text-gray-400 mt-4 leading-relaxed">
                {section === "Who We Are" &&
                  "Welcome to Bhoodhan Infratech Pvt. Ltd., a trusted name in the real estate industry. Founded in 2024, we are committed to providing high-quality residential and commercial properties that redefine luxury and comfort."}
                {section === "Our Vision" &&
                  "At Bhoodhan Infratech, we believe in building not just structures but lasting relationships with our clients. Our vision is to create sustainable and innovative spaces that enhance the way people live and work."}
                {section === "Our Mission" &&
                  "With a team of dedicated professionals and a customer-first approach, we strive to deliver excellence in every project we undertake. Our focus on quality, transparency, and trust has made us a preferred choice for homebuyers and investors alike."}
              </p>
            </motion.div>
          ))}

          {/* Founders Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="mt-10"
          >
            <h2 className="text-2xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-8">
              Meet Our Founders
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {founders.map((founder, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center bg-gray-850/80 backdrop-blur-sm rounded-lg p-6 shadow-md"
                >
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    width={120}
                    height={120}
                    className="rounded-full mb-4"
                  />
                  <h3 className="text-xl font-semibold">{founder.name}</h3>
                  <p className="text-green-400 font-medium">{founder.role}</p>
                  <p className="text-gray-400 mt-2 text-center">{founder.description}</p>
                  {founder.number && (
                    <p className="text-gray-400 mt-2">Contact: {founder.number}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          {!showMore && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="mt-10 text-center"
            >
              <button
                onClick={handleLearnMore}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:opacity-90 hover:scale-105 transition-all cursor-pointer"
              >
                Learn More
              </button>
            </motion.div>
          )}

          {/* Additional Content */}
          {showMore && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mt-10 text-gray-400"
            >
              <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-4">
                Additional Information
              </h2>
              <p className="mb-4">
                Bhoodhan Infratech is dedicated to creating spaces that inspire and elevate the
                quality of life. Our projects are designed with a focus on sustainability,
                innovation, and customer satisfaction.
              </p>
              <p>
                We aim to redefine real estate excellence by delivering projects that combine
                cutting-edge technology with timeless design. Join us on our journey to build a
                better future for generations to come.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;