import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import StudentPage from './pages/StudentPage';
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

export default function App() {
    return (
        <Router>
            <div className="min-h-screen bg-app-bg text-text-main font-sans selection:bg-brand-accent selection:text-white">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<StudentPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}