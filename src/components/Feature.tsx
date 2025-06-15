"use client";
import React, { useEffect, useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { IconBrandYoutubeFilled } from "@tabler/icons-react";
import { Lens } from "./Lens";
import { Particles } from "@/components/magicui/particles";
import Image from "next/image";
import Link from "next/link";

export default function FeaturesSectionDemo() {
  const features = [
    {
      title: "Avadh Enclave Project",
      description:
        "Avadh Enclave is a luxurious residential project located in the heart of the city, offering modern amenities and stunning views.",
      skeleton: <SkeletonOne />,
      className:
        "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800",
    },
    {
      title: "Stunning Affordable Prices",
      description:
        "Our properties are not just luxurious but also affordable, making them the perfect choice for your dream home.",
      skeleton: <SkeletonTwo />,
      className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
    },
    {
      title: "Watch The Introductory Video",
      description:
        "Watch our introductory video to learn more about our projects and what we offer.",
      skeleton: <SkeletonThree />,
      className:
        "col-span-1 lg:col-span-3 lg:border-r  dark:border-neutral-800",
    },
    {
      title: "Business Card",
      description:
        "Get in touch with us through our business card. We are here to help you find your dream property.",
      skeleton: <SkeletonFour />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-none",
    },
  ];

  return (
    <div className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto">
      {/* Particles Background */}
      <Particles
        className="absolute inset-0 -z-10"
        quantity={20}
        color="#FFFF00"
        size={5}
        vx={0.11}
      />

      <div className="px-8">
        <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white font-outfit">
          Bhoodhan&apos;s Offerings
        </h4>

        <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300 font-barlow">
          Bhoodhan is committed to providing the best real estate solutions with a focus on quality, affordability, and customer satisfaction. Explore our offerings below.
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <a
            href="https://www.facebook.com/share/1AgMjR4QVF/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:opacity-80 transition"
          >
            <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24" className="text-blue-600">
              <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.406.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
            </svg>
          </a>
          <a
            href="https://www.instagram.com/bhoodhaninfratechpvtltd?igsh=MTh1bXQ3cGJ1a2dubw=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:opacity-80 transition"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-pink-600">
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
          </a>
          <a
            href="https://www.youtube.com/@bhoodhaninfratech"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="hover:opacity-80 transition"
          >
            <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24" className="text-red-600">
              <path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.692 3.5 12 3.5 12 3.5s-7.692 0-9.386.574A2.994 2.994 0 0 0 .502 6.186C0 7.88 0 12 0 12s0 4.12.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.308 20.5 12 20.5 12 20.5s7.692 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 16.12 24 12 24 12s0-4.12-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-md dark:border-neutral-800">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className="h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="max-w-5xl mx-auto text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug font-outfit">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        "text-sm md:text-base max-w-4xl text-left mx-auto",
        "text-neutral-500 text-center font-normal dark:text-neutral-300",
        "text-left max-w-sm mx-0 md:text-sm my-2 font-barlow"
      )}
    >
      {children}
    </p>
  );
};

export const SkeletonOne = () => {
  return (
    <div className="relative flex py-8 px-2 gap-10 h-full">
      <div className="w-full p-5 mx-auto bg-white dark:bg-neutral-900 shadow-2xl group h-full hover:scale-105 transition-transform duration-300 rounded-md">
        <div className="flex flex-1 w-full h-full flex-col space-y-2 relative overflow-hidden">
          <Image
            src="/images/avadh3.webp"
            alt="header"
            width={800}
            height={800}
            className="h-full w-full aspect-square object-cover object-left-top rounded-sm group-hover:scale-110 group-hover:translate-y-[-10px] transition-transform duration-300"
          />
        </div>
      </div>

      <div className="absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-white dark:from-black via-white dark:via-black to-transparent w-full pointer-events-none" />
      <div className="absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-white dark:from-black via-transparent to-transparent w-full pointer-events-none" />
    </div>
  );
};

export const SkeletonTwo = () => {
  // Memoize the images array to prevent it from being recreated on every render
  const images = useMemo(
    () => [
      "/images/banner1.webp",
      "/images/banner3.webp",
      "/images/banner4.webp",
      "/images/banner1.webp",
      "/images/banner3.webp",
      "/images/banner4.webp",
    ],
    []
  );

  const [rotations, setRotations] = useState<number[]>([]);

  useEffect(() => {
    // Generate random rotations for the images
    setRotations(images.map(() => Math.random() * 20 - 10));
  }, [images]);

  const imageVariants = {
    whileHover: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
    whileTap: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
  };

  const handleImageClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent default link behavior
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top of the page
  };

  return (
    <div className="relative flex flex-col items-start p-8 gap-10 h-full overflow-hidden">
      <div className="flex flex-row -ml-20">
        {images.slice(0, 3).map((image, idx) => (
          <motion.div
            key={"images-first" + idx}
            variants={imageVariants}
            whileHover="whileHover"
            whileTap="whileTap"
            style={{
              rotate: rotations[idx] || 0,
            }}
            className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 shrink-0 overflow-hidden"
          >
            <Link href="#" onClick={handleImageClick}>
              <Image
                src={image}
                alt={`Image ${idx + 1}`}
                width={500}
                height={500}
                className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover shrink-0"
              />
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-row">
        {images.slice(3, 6).map((image, idx) => (
          <motion.div
            key={"images-second" + idx}
            variants={imageVariants}
            whileHover="whileHover"
            whileTap="whileTap"
            style={{
              rotate: rotations[idx + 3] || 0,
            }}
            className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 shrink-0 overflow-hidden"
          >
            <Link href="#" onClick={handleImageClick}>
              <Image
                src={image}
                alt={`Image ${idx + 4}`}
                width={500}
                height={500}
                className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover shrink-0"
              />
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent h-full pointer-events-none" />
      <div className="absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l from-white dark:from-black to-transparent h-full pointer-events-none" />
    </div>
  );
};

export const SkeletonThree = () => {
  return (
    <Link
      href="https://youtube.com/shorts/M4sTwnWq0_A?si=-nVijDShV0S_X67o"
      target="__blank"
      className="relative flex gap-10 h-full group/image"
    >
      <div className="w-full mx-auto bg-transparent dark:bg-transparent group h-full">
        <div className="flex flex-1 w-full h-full flex-col space-y-2 relative">
          <IconBrandYoutubeFilled className="h-20 w-20 absolute z-10 inset-0 text-red-500 m-auto" />
          <Image
            src="/images/drona_residency.webp"
            alt="header"
            width={800}
            height={800}
            className="h-full w-full aspect-square object-cover object-center rounded-sm blur-none group-hover/image:blur-md transition-all duration-200"
          />
        </div>
      </div>
    </Link>
  );
};

export const SkeletonFour = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full max-w-[80vw] sm:max-w-[20rem] md:max-w-[22rem] lg:max-w-[24rem] flex flex-col items-center justify-center relative bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-black via-transparent to-transparent opacity-50" />
        <Lens zoomFactor={1.5} lensSize={300}>
          <Image
            src="/images/bhoodhan_card.webp"
            alt="Bhoodhan Card"
            className="w-full h-auto object-cover"
            width={1200}
            height={1200}
          />
        </Lens>
      </div>
    </div>
  );
};


