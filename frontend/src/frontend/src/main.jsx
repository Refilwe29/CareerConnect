import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import PostInternshipPage from './pages/PostInternshipPage.jsx';
import BrowseInternshipsPage from './pages/BrowseInternshipsPage.jsx';
import './index.css';

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen">
                <nav className="border-b border-ui-border bg-card-bg p-4">
                    <div className="mx-auto flex max-w-7xl gap-4">
                        <a href="/" className="text-text-main font-semibold">
                            Browse Internships
                        </a>

                        <a
                            href="/post-internship"
                            className="text-text-main font-semibold"
                        >
                            Post Internship
                        </a>
                    </div>
                </nav>

                {window.location.pathname === '/post-internship' ? (
                    <PostInternshipPage />
                ) : (
                    <BrowseInternshipsPage />
                )}
            </div>
        </BrowserRouter>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
