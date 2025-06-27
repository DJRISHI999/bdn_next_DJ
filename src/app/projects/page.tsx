"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const realEstateProjects = [
	{
		title: "Avadh Enclave",
		location: "Jewar, Uttar Pradesh",
		date: "March 29, 2025",
		slug: "avadh-enclave",
		image: "/images/gate.webp",
		description: "Affordable housing project near Jewar Airport.",
	},
	{
		title: "Umang City",
		location: "Bilaspur Town Area, Uttar Pradesh",
		date: "June 27, 2025",
		slug: "umang-city",
		image: "/images/UMANG CITY 1.webp",
		description: "Premium residential project with modern amenities.",
	},
	{
		title: "Golden City",
		location: "Badalpur, Uttar Pradesh",
		date: "March 10, 2025",
		slug: "golden-city",
		image: "/images/golden-city-1.webp",
		description: "Luxurious high-rise apartments with breathtaking views.",
	},
	{
		title: "Green Villa 1",
		location: "Noida Extension, Uttar Pradesh",
		date: "May 5, 2025",
		slug: "green-villa-1",
		image: "/images/green-villa1.webp",
		description: "Spacious villas with modern architecture and amenities.",
	},
];

const Projects = () => {
	const [selectedLocation, setSelectedLocation] = useState("All");

	return (
		<div className="min-h-screen bg-[#1e1e1e] text-white w-full overflow-x-hidden max-w-full">
			<Head>
				<title>Projects || Bhoodhan Infratech</title>
				<meta
					name="description"
					content="Explore our real estate projects and find your dream property."
				/>
			</Head>

			{/* Header */}
			<div className="py-12 px-6 md:px-12">
				{/* Main Heading */}
				<h1 className="text-5xl font-extrabold text-white font-barlow mt-20">
					Our Projects
				</h1>

				{/* Location Filter */}
				<div className="flex space-x-6 mt-4">
					{["All", "Jewar", "Noida", "Bilaspur", "Badalpur"].map((location) => (
						<button
							key={location}
							onClick={() => setSelectedLocation(location)}
							className={`cursor-pointer text-lg font-outfit ${
								selectedLocation === location
									? "text-white font-bold"
									: "text-gray-400"
							} hover:text-white transition-colors duration-300`}
						>
							{location}
						</button>
					))}
				</div>
			</div>

			{/* Projects Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-2 sm:px-4 md:px-8 pb-20 w-full max-w-7xl mx-auto">
				{realEstateProjects
					.filter(
						(project) =>
							selectedLocation === "All" ||
							project.location.includes(selectedLocation)
					)
					.map((project, index) => (
						<Link key={index} href={`/projects/${project.slug}`} passHref>
							<div className="cursor-pointer rounded-lg overflow-hidden shadow-lg group bg-black">
								{/* Image Section */}
								<div className="relative">
									<Image
										src={project.image}
										alt={project.title}
										width={400} // Set a fixed width
										height={300} // Set a fixed height
										className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
									/>
								</div>

								{/* Title and Details Section */}
								<div className="p-4">
									{/* Title */}
									<h2 className="text-lg font-outfit text-white leading-tight line-clamp-2 h-[48px]">
										{project.title}
									</h2>

									{/* Location */}
									<p className="text-sm text-gray-400 mt-2">
										{project.location}
									</p>

									{/* Date */}
									<p className="text-sm text-gray-500 mt-1">
										{project.date}
									</p>

									{/* Description */}
									<p className="text-sm text-gray-300 mt-2">
										{project.description}
									</p>
								</div>
							</div>
						</Link>
					))}
			</div>
		</div>
	);
};

export default Projects;
