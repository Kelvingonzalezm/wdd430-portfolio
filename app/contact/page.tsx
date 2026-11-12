
export default function ContactPage() {
    return (
        <main className="max-w-4xl mx-auto px-6 pt-8 pb-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">
                    Contact
                </h1>

                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Feel free to contact me if you have questions or would like to
                    discuss a project.
                </p>
            </div>

            <section className="max-w-2xl mx-auto bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                    Get in Touch
                </h2>

                <div className="space-y-3 text-sm text-gray-700">
                    <p>
                        <span className="font-semibold">Name:</span> Kelvin Gonzalez
                    </p>

                    <p>
                        <span className="font-semibold">Email:</span>{' '}
                        <span>kelvingonzalezm@gmail.com</span>
                    </p>

                    <p>
                        <span className="font-semibold">GitHub:</span>{' '}
                        <a
                            href="https://github.com/Kelvingonzalezm"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 hover:underline"
                        >
                            github.com/Kelvingonzalezm
                        </a>
                    </p>
                </div>
            </section>
        </main>
    );
}
