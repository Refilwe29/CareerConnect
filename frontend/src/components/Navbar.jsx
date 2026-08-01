import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <span className="text-2xl">🎓</span>
                <h1 className="text-xl font-bold text-blue-400">CareerConnect</h1>
            </div>
            <div className="flex space-x-6 text-sm font-medium text-slate-300">
                <Link to="/" className="hover:text-blue-400 transition-colors">Students</Link>
                <span className="text-slate-600">|</span>
                <span className="text-slate-500 cursor-not-allowed">Internships (Coming Soon)</span>
            </div>
        </nav>
    );
}