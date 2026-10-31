
import ProjectList from "@/components/ProjectList";

const projects = [
  {
    title: "Movie & TV Explorer",
    description:
      "A web application for exploring movies and TV shows, viewing information, and saving favorite titles.",
    technologies: ["JavaScript", "Vite", "TMDB API", "YouTube API", "CSS"],
    link: "https://github.com/Kelvingonzalezm/movie-tv-explorer",
  },
  {
    title: "CSE340 Project Management",
    description:
      "A web application for managing organizations, projects, and categories, with user authentication and role-based access.",
    technologies: ["Node.js", "Express", "EJS", "PostgreSQL"],
    link: "https://github.com/Kelvingonzalezm/cse340",
  },
];

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-12 flex-1">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">My Portfolio</h1>

        <p className="text-lg text-gray-700">
          I'm a software development student learning full-stack
          development. Here are some of my projects.
        </p>
      </section>

      <ProjectList projects={projects} />
    </main>
  );
}
