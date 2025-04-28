import { Metadata } from "next";
import { promises as fs } from "fs";
import Image from "next/image";
import path from "path";
import ReactMarkdown from "react-markdown";

// Project Interface
interface Project {
  date: string;
  type: string;
  heading: string;
  image1: string;
  image2?: string;
  text: string;
  slug: string;
  meta: string;
}

// Function to Load Project Data
const getProjects = async (): Promise<Project[]> => {
  const filePath = path.join(process.cwd(), "public", "projects.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  return JSON.parse(jsonData);
};

// **Dynamic Metadata**
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {

  const projects = await getProjects();
  const project = projects.find((project) => project.slug === params.slug);

  return {
    title: project ? `${project.heading} - Bhoodhan Infratech` : "Project Not Found",
    description: project ? project.text.substring(0, 150) : "This project does not exist.",
  };
}

// **Project Page Component**
export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const projects = await getProjects();
  const project = projects.find((project) => project.slug === params.slug);

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
        <Image
          src={project.image1}
          alt={project.heading}
          className="w-full rounded-lg mb-8"
          width={800}
          height={600}
          priority
        />
        {project.image2 && (
          <Image
            src={project.image2}
            alt={project.heading}
            className="w-full rounded-lg mb-8"
            width={800}
            height={600}
          />
        )}

        {/* Content */}
        <ReactMarkdown
          components={{
            h1: (props) => (
              <h1 className="text-3xl font-bold text-white mb-4 font-outfit" {...props} />
            ),
            h2: (props) => (
              <h2 className="text-2xl font-semibold text-white mb-3 font-outfit" {...props} />
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
