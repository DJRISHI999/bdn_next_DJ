"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Particles } from "./magicui/particles";
import { IconX } from "@tabler/icons-react"; // Import IconX

import Image from "next/image"; // Import Image from next/image

export default function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <div className="relative py-10">
      {/* Particles Background */}
      <Particles
        className="absolute inset-0 -z-10"
        quantity={10}
        color="#0000FF"
        size={6}
        vx={0.11}
      />

      {/* Overlay for Active Card */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      {/* Active Card */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="relative w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white cursor-pointer"
                aria-label="Close card"
              >
                <IconX size={20} />
              </motion.button>

              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  width={500}
                  height={320}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                  priority
                />
              </motion.div>
              <div>
                <div className="flex justify-between items-start p-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base"
                    >
                      {active.description}
                    </motion.p>
                  </div>
                  {/* Use motion.a for external navigation */}
                  <motion.a
                    layout
                    href={active.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white cursor-pointer"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cards Grid */}
      <ul className="max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col w-full">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <Image
                  width={500}
                  height={320}
                  src={card.src}
                  alt={card.title}
                  className="h-60 w-full rounded-lg object-cover object-top"
                  priority
                />
              </motion.div>
              <div className="flex justify-center items-center flex-col">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center text-base"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center text-base"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </div>
  );
}

const cards = [
  {
    description: "Jewar, Uttar Pradesh",
    title: "Avadh Enclave",
    src: "/images/avadh3.webp",
    ctaText: "Explore",
    ctaLink: "/projects/avadh-enclave",
    content: () => (
      <p>
        Super affordable housing project in Jewar in just minutes from Jewar
        Airport.
      </p>
    ),
  },
  {
    description: "Bilaspur, Gautam Budh Nagar",
    title: "Umang City",
    src: "/images/UMANG CITY 1.webp",
    ctaText: "Explore",
    ctaLink: "/projects/umang-city",
    content: () => (
      <p>
        Umang City is a premium residential project in Bilaspur, offering modern
        amenities and a serene living environment.
      </p>
    ),
  },
  {
    description: "Badalpur, Gautam Budh Nagar",
    title: "Golden City",
    src: "/images/golden-city-1.webp",
    ctaText: "Explore",
    ctaLink: "/projects/golden-city",
    content: () => (
      <p>
        Golden City is a luxurious high-rise apartment project in Badalpur,
        featuring breathtaking views and top-notch facilities for residents.
      </p>
    ),
  },
  {
    description: "Noida Extension, Uttar Pradesh",
    title: "Green Villa 1",
    src: "/images/green-villa1.webp",
    ctaText: "Explore",
    ctaLink: "/projects/green-villa-1",
    content: () => (
      <p>
        Green Villa 1 is a spacious villa project in Noida Extension, designed
        with modern architecture and amenities for a comfortable living
        experience.
      </p>
    ),
  },
];

export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement | null>, // Allow null here
  callback: () => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      callback();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};


