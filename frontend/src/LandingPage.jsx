import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { Search, LogIn } from 'lucide-react';

// --- A High-Fidelity SVG Illustration of the Bear Scene ---
const HeroIllustration = ({ className }) => (
    <div className={`${className} relative`}>
        <style>{`
            @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
            .float-element { animation: float 6s infinite ease-in-out; }
            .cloud { animation: drift 20s infinite linear alternate; }
            @keyframes drift { from { transform: translateX(-20px); } to { transform: translateX(20px); } }
        `}</style>
        {/* Sun */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-orange-300 to-amber-300 rounded-full"></div>
        {/* Clouds */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <div className="cloud absolute w-40 h-20 bg-white/80 rounded-full -top-5 left-10"></div>
            <div className="cloud absolute w-32 h-16 bg-white/80 rounded-full top-5 right-5 animation-delay-[-10s]"></div>
        </div>
        {/* Tablet */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[250px] bg-purple-200 rounded-3xl border-8 border-white shadow-2xl"></div>
        {/* Bear */}
        <div className="float-element absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] w-64 h-64">
            <svg viewBox="0 0 200 200">
                <path d="M100 180 C 40 180, 20 120, 20 80 S 40 0, 100 0 S 160 40, 160 80 S 160 180, 100 180" fill="#885A3B"/>
                <path d="M100 150 C 70 150, 60 120, 60 100 S 70 50, 100 50 S 130 80, 140 100 S 130 150, 100 150" fill="#D4A77C"/>
                <circle cx="85" cy="70" r="8" fill="black"/><circle cx="115" cy="70" r="8" fill="black"/>
                <path d="M100 90 Q 105 100, 110 90" stroke="black" fill="none" strokeWidth="3" strokeLinecap="round"/>
                <path d="M30 50 C 0 30, 0 0, 30 10 Z" fill="#885A3B"/><path d="M170 50 C 200 30, 200 0, 170 10 Z" fill="#885A3B"/>
            </svg>
        </div>
        {/* Book */}
        <div className="float-element absolute top-1/2 left-1/2 -translate-x-[40%] -translate-y-[20%] w-40 h-32 transform rotate-[-15deg]">
             <div className="w-full h-full bg-orange-500 rounded-lg shadow-lg transform perspective-[500px] rotate-y-[-20deg]"></div>
        </div>
    </div>
);


function LandingPage() {
    // We keep the login logic here, but it's not the main focus of the page.
    // It can be moved to a modal later if needed.
    return (
        <div className="min-h-screen bg-white font-sans text-[#4F4F4F]">
            <div className="container mx-auto px-6 py-4">
                {/* --- Navigation --- */}
                <nav className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-purple-800">Kobot</div>
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#" className="hover:text-purple-600">School</a>
                        <a href="#" className="hover:text-purple-600">Work</a>
                        <a href="#" className="hover:text-purple-600">Home</a>
                        <a href="#" className="hover:text-purple-600">Self study</a>
                    </div>
                    <Link to="/login" className="flex items-center bg-purple-600 text-white font-bold py-2 px-6 rounded-full hover:bg-purple-700 transition-colors">
                        <LogIn className="w-4 h-4 mr-2" />
                        Sign In
                    </Link>
                </nav>

                {/* --- Hero Section --- */}
                <header className="grid md:grid-cols-2 gap-10 items-center mt-16 md:mt-24">
                    {/* Left Side: Content */}
                    <div className="text-center md:text-left">
                        <p className="text-purple-600 font-semibold">Best way to learn from anywhere</p>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-[#333] mt-4 leading-tight">
                            Learn with fun on <span className="text-purple-600">any schedule</span>
                        </h1>
                        <p className="text-lg mt-6">A global knowledge platform and marketplace for educators! Delivering engaging learning to billions.</p>
                        <div className="mt-8 relative">
                            <input type="text" placeholder="What do you want to learn?" className="w-full pl-6 pr-32 py-4 text-lg border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400" />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center bg-purple-600 text-white font-bold py-3 px-6 rounded-full hover:bg-purple-700 transition-colors">
                                <Search className="w-5 h-5 mr-2" />
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Right Side: Illustration */}
                    <div className="relative h-[500px]">
                       <HeroIllustration className="w-full h-full" />
                    </div>
                </header>
            </div>
        </div>
    );
}

// We will create a separate LoginPage component later that this page can link to.
// For now, let's update App.jsx to show this as the main page.
export default LandingPage;
