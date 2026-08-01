import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import StudentPage from './pages/StudentPage';

export default function App() {
    return (
        <Router>
            <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<StudentPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}