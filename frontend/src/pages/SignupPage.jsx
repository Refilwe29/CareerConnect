import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
    GraduationCap,
    User,
    Mail,
    Lock,
    Hash,
    Building2,
    ArrowRight,
    CheckCircle2,
    AlertCircle,
    Loader2
} from 'lucide-react';
import { createStudent } from '../services/studentService';

export default function SignupPage() {
    const navigate = useNavigate();
    const [role, setRole] = useState('STUDENT');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [formData, setFormData] = useState({
        studentNumber: '',
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (role === 'STUDENT') {
                const result = await createStudent(formData);

                if (result) {
                    const userSession = {
                        name: result.name,
                        studentNumber: result.studentNumber,
                        email: result.email,
                        role: 'STUDENT'
                    };
                    localStorage.setItem('currentUser', JSON.stringify(userSession));

                    window.location.href = from;
                } else {
                    setError('Registration failed. Student number or email may already exist.');
                }
            } else {
                setError('Employer registration is coming soon!');
            }
        } catch (err) {
            setError('Could not connect to Spring Boot backend. Ensure server is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-5rem)] bg-app-bg flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-5xl bg-card-bg/90 border border-ui-border rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 backdrop-blur-xl">

                {/* LEFT COLUMN: Hero & Branding Banner */}
                <div className="lg:col-span-5 bg-linear-to-br from-brand-primary/30 via-card-bg to-brand-accent/10 p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-ui-border relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />

                    <div>
                        <div className="inline-flex items-center space-x-2 bg-brand-primary/20 border border-brand-accent/30 px-3 py-1 rounded-full text-brand-accent text-xs font-mono font-semibold mb-6">
                            <GraduationCap className="w-4 h-4" />
                            <span>CareerConnect</span>
                        </div>

                        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-text-main tracking-tight leading-tight mb-4">
                            Start Your Journey to Industry Success
                        </h1>

                        <p className="text-text-muted text-sm leading-relaxed mb-8">
                            Connect directly with top tech companies, apply for verified internships, and track your application status in real-time.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 text-text-main text-xs font-medium">
                                <CheckCircle2 className="w-4 h-4 text-brand-mint shrink-0" />
                                <span>Verified Internship Opportunities</span>
                            </div>
                            <div className="flex items-center space-x-3 text-text-main text-xs font-medium">
                                <CheckCircle2 className="w-4 h-4 text-brand-mint shrink-0" />
                                <span>Real-Time Status Tracking</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-ui-border/60">
                        <p className="text-xs text-text-muted">
                            Already have an account?{' '}
                            <Link to="/login" className="text-brand-accent font-semibold hover:underline">
                                Sign In here
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Registration Form */}
                <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center">

                    {/* Header */}
                    <div className="mb-6">
                        <h2 className="font-heading text-2xl font-bold text-text-main">Create Your Account</h2>
                        <p className="text-text-muted text-xs mt-1">Select your account type to get started</p>
                    </div>

                    {/* Role Toggle Tabs */}
                    <div className="grid grid-cols-2 gap-2 bg-app-bg p-1.5 rounded-2xl border border-ui-border mb-6">
                        <button
                            type="button"
                            onClick={() => setRole('STUDENT')}
                            className={`flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                role === 'STUDENT'
                                    ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20'
                                    : 'text-text-muted hover:text-text-main'
                            }`}
                        >
                            <User className="w-3.5 h-3.5" />
                            <span>Student</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('COMPANY')}
                            className={`flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                role === 'COMPANY'
                                    ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20'
                                    : 'text-text-muted hover:text-text-main'
                            }`}
                        >
                            <Building2 className="w-3.5 h-3.5" />
                            <span>Employer / Company</span>
                        </button>
                    </div>

                    {/* Error Banner */}
                    {error && (
                        <div className="flex items-center space-x-2 bg-rose-950/40 border border-rose-800 text-rose-300 p-3.5 rounded-xl text-xs mb-6">
                            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Student Number Input */}
                        <div>
                            <label className="block text-xs font-semibold text-text-muted mb-1.5">
                                {role === 'STUDENT' ? 'CPUT Student Number' : 'Company Registration ID'}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
                                    <Hash className="w-4 h-4" />
                                </div>
                                <input
                                    type="text"
                                    name="studentNumber"
                                    value={formData.studentNumber}
                                    autoComplete="off"
                                    onChange={handleChange}
                                    placeholder={role === 'STUDENT' ? 'e.g. 240456890' : 'e.g. C001'}
                                    required
                                    className="w-full bg-app-bg border border-ui-border focus:border-brand-accent rounded-xl pl-10 pr-4 py-2.5 text-xs text-text-main placeholder-text-muted/60 focus:outline-none focus:ring-1 focus:ring-brand-accent transition-all font-mono"
                                />
                            </div>
                        </div>

                        {/* Full Name Input */}
                        <div>
                            <label className="block text-xs font-semibold text-text-muted mb-1.5">
                                {role === 'STUDENT' ? 'Full Name' : 'Company Name'}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
                                    <User className="w-4 h-4" />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    autoComplete="off"
                                    onChange={handleChange}
                                    placeholder={role === 'STUDENT' ? 'e.g. Ben Thamiso' : 'e.g. TechNova Inc.'}
                                    required
                                    className="w-full bg-app-bg border border-ui-border focus:border-brand-accent rounded-xl pl-10 pr-4 py-2.5 text-xs text-text-main placeholder-text-muted/60 focus:outline-none focus:ring-1 focus:ring-brand-accent transition-all"
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div>
                            <label className="block text-xs font-semibold text-text-muted mb-1.5">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="e.g. ben@cput.ac.za"
                                    required
                                    className="w-full bg-app-bg border border-ui-border focus:border-brand-accent rounded-xl pl-10 pr-4 py-2.5 text-xs text-text-main placeholder-text-muted/60 focus:outline-none focus:ring-1 focus:ring-brand-accent transition-all"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-xs font-semibold text-text-muted mb-1.5">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
                                    <Lock className="w-4 h-4" />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-app-bg border border-ui-border focus:border-brand-accent rounded-xl pl-10 pr-4 py-2.5 text-xs text-text-main placeholder-text-muted/60 focus:outline-none focus:ring-1 focus:ring-brand-accent transition-all font-mono"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold py-3 px-4 rounded-xl text-xs shadow-lg shadow-brand-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-2 mt-2 disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Registering...</span>
                                </>
                            ) : (
                                <>
                                    <span>Complete Registration</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                </div>

            </div>
        </div>
    );
}