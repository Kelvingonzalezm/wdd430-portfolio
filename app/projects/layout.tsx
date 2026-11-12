import Link from "next/link";

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>

            <nav className="flex justify-center items-center gap-4 font-bold text-gray-800 mb-2">
                <Link href="/projects" className="hover:text-blue-600 transition-colors">
                    Overview
                </Link>

                <span className="text-gray-400">|</span>

                <Link href="/projects/opensource" className="hover:text-blue-600 transition-colors">
                    Open Source
                </Link>

                <span className="text-gray-400">|</span>

                <Link href="/projects/school" className="hover:text-blue-600 transition-colors">
                    School
                </Link>
            </nav>


            {children}
        </section>
    );
}