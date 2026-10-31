
interface SkillCardProps {
    title: string;
    skills: string[];
}

export default function SkillCard({ title, skills }: SkillCardProps) {
    return (
        <section className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
                {title}
            </h3>

            <ul className="list-disc list-inside space-y-2 text-gray-700">
                {skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                ))}
            </ul>
        </section>
    );
}
