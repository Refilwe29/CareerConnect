import React, { useState, useEffect } from 'react';
import { createStudent, getAllStudents } from '../services/studentService';

export default function StudentPage() {
    const [formData, setFormData] = useState({
        studentNumber: '',
        name: '',
        email: '',
        password: ''
    });

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const data = await getAllStudents();
            setStudents(data);
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to connect to Spring Boot backend.' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        try {
            const result = await createStudent(formData);
            if (result) {
                setMessage({ type: 'success', text: 'Student registered successfully!' });
                setFormData({ studentNumber: '', name: '', email: '', password: '' });
                fetchStudents();
            } else {
                setMessage({ type: 'error', text: 'Registration failed. Check if details already exist.' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'Error connecting to server. Is Spring Boot running?' });
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-3xl font-extrabold text-white mb-6">Student Portal Management</h2>

            {message.text && (
                <div className={`p-4 mb-6 rounded-lg font-medium text-sm ${
                    message.type === 'success' ? 'bg-emerald-900/50 text-emerald-300 border border-emerald-700' : 'bg-rose-900/50 text-rose-300 border border-rose-700'
                }`}>
                    {message.text}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Student Registration Form */}
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">Register New Student</h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Student Number</label>
                            <input
                                type="text"
                                name="studentNumber"
                                value={formData.studentNumber}
                                onChange={handleChange}
                                placeholder="e.g. 230480152"
                                required
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Ebenezer Kouakou"
                                required
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="e.g. ebenezer@cput.ac.za"
                                required
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-lg"
                        >
                            Submit Registration
                        </button>
                    </form>
                </div>

                {/* Database Student Directory */}
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-blue-400">Registered Students Directory</h3>
                        <button
                            onClick={fetchStudents}
                            className="text-xs text-slate-400 hover:text-white underline"
                        >
                            Refresh
                        </button>
                    </div>

                    {loading ? (
                        <p className="text-slate-400 my-auto text-center py-8">Loading database records...</p>
                    ) : students.length === 0 ? (
                        <p className="text-slate-500 my-auto text-center py-8">No students registered in MySQL database yet.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-300">
                                <thead className="bg-slate-900 text-slate-400 uppercase text-xs">
                                <tr>
                                    <th className="p-3">ID</th>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Email</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700">
                                {students.map((std) => (
                                    <tr key={std.studentNumber} className="hover:bg-slate-700/50">
                                        <td className="p-3 font-mono text-blue-300">{std.studentNumber}</td>
                                        <td className="p-3 font-medium text-white">{std.name}</td>
                                        <td className="p-3 text-slate-400">{std.email}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}