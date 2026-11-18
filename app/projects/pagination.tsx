
'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
    totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentPage = Number(searchParams.get('page')) || 1;

    function createPageURL(pageNumber: number) {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', pageNumber.toString());

        return `${pathname}?${params.toString()}`;
    }

    if (totalPages <= 1) {
        return null;
    }

    return (
        <nav
            aria-label="Pagination"
            className="flex items-center justify-center gap-4 mt-10"
        >
            <Link
                href={createPageURL(currentPage - 1)}
                aria-disabled={currentPage <= 1}
                tabIndex={currentPage <= 1 ? -1 : undefined}
                className={`rounded-lg px-4 py-2 font-medium ${currentPage <= 1
                    ? 'pointer-events-none bg-gray-200 text-gray-400'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
            >
                Previous
            </Link>

            <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
            </span>

            <Link
                href={createPageURL(currentPage + 1)}
                aria-disabled={currentPage >= totalPages}
                tabIndex={currentPage >= totalPages ? -1 : undefined}
                className={`rounded-lg px-4 py-2 font-medium ${currentPage >= totalPages
                    ? 'pointer-events-none bg-gray-200 text-gray-400'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
            >
                Next
            </Link>
        </nav>
    );
}
