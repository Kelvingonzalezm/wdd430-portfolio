
import SkillCard from "@/components/SkillCard";

export default function About() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-12 flex-1">
            <h2 className="text-3xl font-bold mb-4">About Me</h2>

            <p className="text-lg text-gray-700">
                I am a software development student interested in
                web development, technology, and problem-solving.
                I enjoy learning new tools and building applications
                that help people.
            </p>

            <SkillCard
                title="Technical Skills"
                skills={[
                    "JavaScript",
                    "TypeScript",
                    "React",
                    "Next.js",
                    "Node.js",
                    "HTML and CSS",
                    "PostgreSQL",
                    "Git and GitHub",
                ]}
            />
        </main>
    );
}
