
'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function ProjectSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { push } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams.toString());

        params.set('page', '1');

        if (term.trim()) {
            params.set('query', term.trim());
        } else {
            params.delete('query');
        }

        push(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="mb-8">
            <label
                htmlFor="project-search"
                className="block text-sm font-medium text-gray-700 mb-2"
            >
                Search Projects
            </label>

            <input
                key={searchParams.get('query') ?? ''}
                id="project-search"
                type="search"
                placeholder="Search by title, description, or technology..."
                defaultValue={searchParams.get('query')?.toString() ?? ''}
                onChange={(event) => handleSearch(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
        </div>
    );
}
