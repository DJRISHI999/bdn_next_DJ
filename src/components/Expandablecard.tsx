"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Particles } from "./magicui/particles";

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
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
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
    description: "New Jewar Airport",
    title: "Avadh Enclave",
    src: "/images/gate.webp",
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
    description: "Noida, Uttar Pradesh",
    title: "Green Valley",
    src: "/images/green-valley-1.webp",
    ctaText: "Explore",
    ctaLink: "/projects/green-valley",
    content: () => (
      <p>
        Green Valley is a premier residential project in Noida, offering modern
        amenities and a serene environment for families.
      </p>
    ),
  },
  {
    description: "Gurgaon, Haryana",
    title: "Skyline Heights",
    src: "/images/skyline-heights-1.webp",
    ctaText: "Explore",
    ctaLink: "/projects/skyline-heights",
    content: () => (
      <p>
        Skyline Heights is a luxurious high-rise apartment complex in Gurgaon,
        providing breathtaking views and top-notch facilities for residents.
      </p>
    ),
  },
  {
    description: "Faridabad, Haryana",
    title: "Palm Residency",
    src: "/images/palm-residency-1.webp",
    ctaText: "Explore",
    ctaLink: "/projects/palm-residency",
    content: () => (
      <p>
        Palm Residency offers affordable villas surrounded by lush greenery in
        Faridabad. It is the perfect choice for families looking for a peaceful
        and eco-friendly living environment.
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


