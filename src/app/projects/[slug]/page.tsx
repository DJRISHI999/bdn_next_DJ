import { Metadata } from "next";
import { promises as fs } from "fs";
import Image from "next/image";
import Link from "next/link";
import path from "path";
import ReactMarkdown from "react-markdown";
import { IconBrandYoutubeFilled } from "@tabler/icons-react";

// Project Interface
interface Project {
  date: string;
  type: string;
  heading: string;
  image1: string;
  image2?: string;
  video?: string; // Add video field for YouTube links
  thumbnail?: string; // Add thumbnail field for video
  text: string;
  slug: string;
  meta: string;
  images?: string[]; // Add images field for multiple images
  captions?: string[]; // Add captions field for image captions
  videos?: { url: string; thumbnail: string }[]; // Add videos field for multiple videos
}

// Function to Load Project Data
const getProjects = async (): Promise<Project[]> => {
  const filePath = path.join(process.cwd(), "public", "projects.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  return JSON.parse(jsonData);
};

// **Dynamic Metadata**
export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const projects = await getProjects();
  const project = projects.find((project) => project.slug === slug);

  return {
    title: project ? `${project.heading} - Bhoodhan Infratech` : "Project Not Found",
    description: project ? project.text.substring(0, 150) : "This project does not exist.",
  };
}

// **Project Page Component**
export default async function ProjectPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const projects = await getProjects();
  const project = projects.find((project) => project.slug === slug);

  if (!project) {
    return (
      <div className="text-center text-gray-400 mt-20">
        <h1 className="text-3xl font-bold">Project Not Found</h1>
        <p className="mt-4">The project you are looking for does not exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white px-6 py-24">
      <div className="max-w-3xl mx-auto font-outfit">
        {/* Heading */}
        <h1 className="text-5xl font-bold text-white mb-8 leading-tight font-barlow">
          {project.heading}
        </h1>

        {/* Meta Info */}
        <div className="flex justify-between text-sm text-gray-400 border-b border-gray-700 pb-4 mb-8">
          <span>{project.date}</span>
          <span>{project.type}</span>
        </div>

        {/* Images */}
        {project.images && project.images.length > 0 && (
          <div className="flex flex-col gap-8 mb-8">
            {project.images.map((image: string, index: number) => (
              image && ( // Ensure the image is not an empty string or undefined
                <div key={index} className="flex flex-col items-center">
                  <Image
                    src={image}
                    alt={`${project.heading} - Image ${index + 1}`}
                    className="w-full rounded-lg"
                    width={800}
                    height={600}
                  />
                  {project.captions && project.captions[index] && (
                    <p className="text-gray-300 text-sm mt-2 text-center">
                      {project.captions[index]}
                    </p>
                  )}
                </div>
              )
            ))}
          </div>
        )}

        {/* Videos (multiple) */}
        {project.videos && Array.isArray(project.videos) && project.videos.length > 0 && (
          <div className="flex flex-col gap-8 mb-8">
            {project.videos.map((video: { url: string; thumbnail: string }, index: number) => (
              <Link
                key={index}
                href={video.url}
                target="_blank"
                className="relative flex gap-10 h-full group/image"
              >
                <div className="w-full mx-auto bg-transparent dark:bg-transparent group h-full">
                  <div className="flex flex-1 w-full h-full flex-col space-y-2 relative">
                    <IconBrandYoutubeFilled className="h-20 w-20 absolute z-10 inset-0 text-red-500 m-auto" />
                    <Image
                      src={video.thumbnail}
                      alt={`Video Thumbnail ${index + 1}`}
                      width={800}
                      height={800}
                      className="h-full w-full aspect-square object-cover object-center rounded-sm blur-none group-hover/image:blur-md transition-all duration-200"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Video (single, fallback for old data) */}
        {project.video && project.thumbnail && !project.videos && (
          <Link
            href={project.video}
            target="_blank"
            className="relative flex gap-10 h-full group/image mb-8"
          >
            <div className="w-full mx-auto bg-transparent dark:bg-transparent group h-full">
              <div className="flex flex-1 w-full h-full flex-col space-y-2 relative">
                <IconBrandYoutubeFilled className="h-20 w-20 absolute z-10 inset-0 text-red-500 m-auto" />
                <Image
                  src={project.thumbnail}
                  alt="Video Thumbnail"
                  width={800}
                  height={800}
                  className="h-full w-full aspect-square object-cover object-center rounded-sm blur-none group-hover/image:blur-md transition-all duration-200"
                />
              </div>
            </div>
          </Link>
        )}

        {/* Content */}
        <ReactMarkdown
          components={{
            h1: (props) => (
              <h1 className="text-3xl font-bold text-white mb-4 font-outfit" {...props} />
            ),
            p: (props) => (
              <p className="text-gray-300 leading-relaxed mb-4 font-inter" {...props} />
            ),
            ul: (props) => (
              <ul className="list-disc list-inside text-gray-300 mb-4 font-inter" {...props} />
            ),
            ol: (props) => (
              <ol className="list-decimal list-inside text-gray-300 mb-4 font-inter" {...props} />
            ),
            li: (props) => (
              <li className="mb-2 text-gray-300 font-inter" {...props} />
            ),
            strong: (props) => (
              <strong className="font-bold text-white font-outfit" {...props} />
            ),
          }}
        >
          {project.text}
        </ReactMarkdown>

        {/* Meta */}
        <div className="mt-12">
          <span className="text-sm uppercase text-purple-400 bg-purple-900 px-3 py-1 rounded-lg font-barlow">
            {project.meta}
          </span>
        </div>
      </div>
    </div>
  );
}