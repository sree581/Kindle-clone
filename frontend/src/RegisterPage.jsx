import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

// --- A New SVG Library for the "Story Time" Theme ---

const SceneBackground = () => (
    <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#E0F7FA]"></div>
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 200" preserveAspectRatio="none">
            <path d="M0,120 C240,80 480,150 720,120 C960,90 1200,150 1440,100 L1440,200 L0,200 Z" fill="#A7D7C5"></path>
        </svg>
    </div>
);

const BearCharacter = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g className="animate-float">
            <path d="M50 95 C 20 100, 5 70, 20 50 C 35 20, 65 20, 80 50 C 95 70, 80 100, 50 95" fill="#885A3B"/>
            <path d="M50 80 C 40 85, 30 75, 35 65 C 40 55, 60 55, 65 65 C 70 75, 60 85, 50 80" fill="#D4A77C"/>
            <circle cx="43" cy="60" r="3" fill="black"/><circle cx="57" cy="60" r="3" fill="black"/>
            <rect x="35" y="85" width="30" height="15" rx="3" fill="#ef4444"/>
        </g>
    </svg>
);

const ElephantCharacter = ({ className }) => (
     <svg className={className} viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
        <g className="animate-float" style={{animationDelay: '-2s'}}>
            <path d="M60 90 C 10 90, 5 40, 40 30 C 70 10, 100 20, 110 50 C 120 80, 100 90, 60 90" fill="#d1d5db"/>
            <path d="M5 40 C -15 30, -15 60, 5 70" fill="#e5e7eb"/>
             <rect x="-5" y="65" width="20" height="15" rx="3" fill="#60a5fa"/>
        </g>
    </svg>
);

const MonkeyCharacter = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g className="animate-float" style={{animationDelay: '-1s'}}>
            <path d="M50 90 C 30 90, 20 70, 20 50 S 30 10, 50 10 S 80 30, 80 50 S 70 90, 50 90" fill="#A16207"/>
            <path d="M50 80 C 40 80, 35 70, 35 55 S 40 30, 50 30 S 65 40, 65 55 S 60 80, 50 80" fill="#F7D9A3"/>
            <circle cx="45" cy="50" r="4" fill="black"/> <circle cx="55" cy="50" r="4" fill="black"/>
        </g>
    </svg>
);

const OwlCharacter = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g className="animate-float" style={{animationDelay: '-3s'}}>
            <path d="M50 90 C 25 90, 15 65, 20 45 S 40 10, 50 10 S 80 25, 80 45 S 75 90, 50 90" fill="#663300"/>
            <path d="M50 75 C 35 75, 30 60, 30 50 S 35 25, 50 25 S 70 35, 70 50 S 65 75, 50 75" fill="white"/>
            <circle cx="42" cy="50" r="8" fill="white"/>
            <circle cx="58" cy="50" r="8" fill="white"/>
            <circle cx="43" cy="50" r="4" fill="black"/>
            <circle cx="57" cy="50" r="4" fill="black"/>
        </g>
    </svg>
);


function RegisterPage() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', password2: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.password2) {
            alert("Passwords do not match!");
            return;
        }
        setIsSubmitting(true);
        try {
            await axios.post('https://kindle-clone-backend.onrender.com/api/auth/registration/', {
              username: formData.username,
              email: formData.email,
              password: formData.password,
              password2: formData.password2,
            });
            alert('Registration successful! Please log in to begin your adventure.');
            navigate('/login');
        } catch (error) {
            console.error("Registration error:", error.response?.data);
            alert(`Registration failed: ${JSON.stringify(error.response?.data)}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center font-sans overflow-hidden relative">
            <style>{`
                @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
                .animate-float { animation: float 6s infinite ease-in-out; }
            `}</style>
            <SceneBackground />
            
            <ElephantCharacter className="absolute w-48 h-48 bottom-10 left-10 z-10" />
            <BearCharacter className="absolute w-40 h-40 bottom-10 right-10 z-10" />
            <MonkeyCharacter className="absolute w-24 h-24 top-1/4 left-1/4 z-10" />
            <OwlCharacter className="absolute w-20 h-20 top-1/4 right-1/4 z-10" />

            <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 z-20 border-2 border-white/80">
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-extrabold text-[#0c4a6e]">Create Your Account</h1>
                    <p className="text-[#075985] mt-2">And start your reading adventure!</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-[#38bdf8] transition-all" id="username" type="text" placeholder="Your Name" name="username" onChange={handleChange} value={formData.username} required />
                    </div>
                     <div className="mb-4">
                        <input className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-[#38bdf8] transition-all" id="email" type="email" placeholder="Your Email" name="email" onChange={handleChange} value={formData.email} required />
                    </div>
                    <div className="mb-4">
                        <input className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-[#38bdf8] transition-all" id="password" type="password" placeholder="Secret Password" name="password" onChange={handleChange} value={formData.password} required />
                    </div>
                     <div className="mb-6">
                        <input className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-[#38bdf8] transition-all" id="password2" type="password" placeholder="Confirm Password" name="password2" onChange={handleChange} value={formData.password2} required />
                    </div>
                    <button
                        className="w-full bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] hover:from-[#0ea5e9] hover:to-[#0284c7] text-white font-bold text-lg py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all transform hover:scale-105 duration-300 disabled:bg-gray-400"
                        type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating Account...' : 'Join the Story'}
                    </button>
                    <p className="text-center text-[#075985] mt-6 text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="font-bold text-[#0ea5e9] hover:text-[#0284c7]">
                            Let's Go!
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;

