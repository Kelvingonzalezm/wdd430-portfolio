import { Suspense } from 'react';
import NavLinks from './NavLinks';

export default function Header() {
    return (
        <header className="bg-slate-950 text-white py-4 shadow-md">
            <nav className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
                <div className="text-2xl font-bold">
                    Kelvin Gonzalez
                </div>

                <Suspense fallback={<div className="h-6" />}>
                    <NavLinks />
                </Suspense>
            </nav>
        </header>
    );
}
