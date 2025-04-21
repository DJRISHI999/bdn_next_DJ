"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Particles } from "@/components/magicui/particles";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectBrief: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Particles Background */}
      <Particles
        className="absolute inset-0 -z-10"
        quantity={50} // Adjust the number of particles
        color="#FFFF00" // Set the particle color
        size={5} // Set the particle size
        vx={0.1} // Set the horizontal velocity
      />

      <div className="flex flex-col lg:flex-row justify-between items-center bg-transparent text-white p-8 lg:p-16 min-h-screen mt-20">
        {/* Left Section */}
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <h1 className="text-4xl font-bold mb-4">Get in Touch with Bhoodhan Infratech</h1>
          <p className="text-lg mb-6">
            We are excited to hear from you! Whether you have a question about our real estate projects, pricing, or anything else, our team is ready to assist you.
          </p>
          <p className="text-lg">
            Feel free to reach out to us by filling out the form. We aim to respond to all inquiries within 24 hours.
          </p>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/3 bg-gray-850/80 backdrop-blur-sm text-white p-8 rounded-xl shadow-lg mt-10">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-lg mb-6">
            We are here to help you with any questions or concerns you may have. Please fill out the form below to get in touch with us.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Your name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Enter your full name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Enter your email address"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="projectBrief" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="projectBrief"
                name="projectBrief"
                value={formData.projectBrief}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Enter your message"
                rows={4}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-xl shadow-lg hover:bg-purple-700 transition-transform transform hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;