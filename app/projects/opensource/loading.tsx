export default function Loading() {
    return (
        <main className="max-w-7xl mx-auto px-6 pt-8 pb-4">
            <div className="text-center mb-8">
                <div className="h-10 w-72 bg-gray-200 rounded mx-auto mb-3 animate-pulse"></div>
                <div className="h-6 max-w-2xl bg-gray-200 rounded mx-auto animate-pulse"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2].map((item) => (
                    <div
                        key={item}
                        className="bg-blue-50 border border-blue-200 rounded-xl p-5 shadow-md animate-pulse"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="h-5 w-24 bg-gray-200 rounded-full"></div>
                            <div className="h-4 w-16 bg-gray-200 rounded"></div>
                        </div>

                        <div className="h-7 w-3/4 bg-gray-200 rounded mb-3"></div>
                        <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 w-2/3 bg-gray-200 rounded mb-5"></div>

                        <div className="h-4 w-24 bg-gray-200 rounded mb-3"></div>

                        <div className="flex gap-2">
                            <div className="h-6 w-20 bg-gray-200 rounded"></div>
                            <div className="h-6 w-20 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}