import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

/* ---------------- Background ---------------- */
const SceneBackground = () => (
  <div className="absolute inset-0 z-0">
    {/* Sky */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#c1eeff] to-[#f0f9ff]"></div>

    {/* Clouds */}
    <div className="absolute top-[15%] left-[10%] w-40 h-40 bg-white rounded-full opacity-60 filter blur-2xl animate-cloud-slow"></div>
    <div className="absolute top-[20%] right-[15%] w-32 h-32 bg-white rounded-full opacity-50 filter blur-2xl animate-cloud-fast"></div>

    {/* Hills / Jungle base */}
    <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 200" preserveAspectRatio="none">
      <path d="M0,150 C200,100 450,180 720,130 C990,80 1200,160 1440,120 L1440,200 L0,200 Z" fill="#bbf7d0"></path>
    </svg>
    <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 150" preserveAspectRatio="none">
      <path d="M0,150 C300,80 600,150 900,100 C1200,50 1440,120 1440,120 L1440,150 L0,150 Z" fill="#86efac"></path>
    </svg>
  </div>
);

/* ---------------- Animals ---------------- */
const ReadingBear = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <g className="animate-breathe">
      {/* Body */}
      <path d="M100 190 C 40 195, 20 140, 30 100 C 40 50, 160 50, 170 100 C 180 140, 160 195, 100 190" fill="#885A3B"/>
      <circle cx="60" cy="70" r="25" fill="#6B4A2D"/>
      <circle cx="140" cy="70" r="25" fill="#6B4A2D"/>
      {/* Snout */}
      <path d="M100 130 C 80 135, 75 115, 85 105 C 95 95, 105 95, 115 105 C 125 115, 120 135, 100 130" fill="#D4A77C"/>
      <circle cx="92" cy="110" r="5" fill="black"/>
      <circle cx="108" cy="110" r="5" fill="black"/>
      {/* Book */}
      <path d="M70 140 L 130 140 L 110 180 L 50 180 Z" fill="#f87171"/>
      <path d="M70 140 L 50 180 L 40 175 L 60 135 Z" fill="#ef4444"/>
    </g>
  </svg>
);

const ReadingElephant = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 220 180" xmlns="http://www.w3.org/2000/svg">
    <g className="animate-breathe" style={{animationDelay: '-1s'}}>
      {/* Body */}
      <path d="M110 170 C 20 170, 5 90, 60 60 C 110 20, 180 30, 200 90 C 220 140, 180 170, 110 170" fill="#d1d5db"/>
      <path d="M60 60 C 0 40, -20 120, 50 120 Z" fill="#e5e7eb"/>
      {/* Trunk with Book */}
      <path d="M140 100 Q 170 150, 130 175" stroke="#9ca3af" fill="none" strokeWidth="15" strokeLinecap="round"/>
      <rect x="110" y="155" width="40" height="25" rx="3" fill="#60a5fa" transform="rotate(20 130 167.5)"/>
      <circle cx="80" cy="80" r="6" fill="black"/>
    </g>
  </svg>
);

const ReadingMonkey = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg">
    <g className="animate-bounce-slow">
      {/* Body */}
      <circle cx="80" cy="120" r="50" fill="#a16207" />
      <circle cx="50" cy="100" r="20" fill="#facc15" />
      <circle cx="110" cy="100" r="20" fill="#facc15" />
      {/* Face */}
      <circle cx="80" cy="110" r="25" fill="#fde68a" />
      <circle cx="70" cy="105" r="4" fill="black"/>
      <circle cx="90" cy="105" r="4" fill="black"/>
      {/* Book */}
      <rect x="60" y="140" width="40" height="25" rx="4" fill="#f87171"/>
    </g>
  </svg>
);

const ReadingOwl = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <g className="animate-breathe">
      <circle cx="80" cy="100" r="40" fill="#78350f"/>
      <circle cx="60" cy="90" r="15" fill="white"/>
      <circle cx="100" cy="90" r="15" fill="white"/>
      <circle cx="60" cy="90" r="7" fill="black"/>
      <circle cx="100" cy="90" r="7" fill="black"/>
      {/* Book */}
      <rect x="60" y="120" width="40" height="20" rx="3" fill="#3b82f6"/>
    </g>
  </svg>
);

/* ---------------- Login Page ---------------- */
function LoginPage() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY, currentTarget } = event;
      const { left, top, width, height } = currentTarget.getBoundingClientRect();
      const x = (clientX - left - width / 2) / (width / 2);
      const y = (clientY - top - height / 2) / (height / 2);
      setMousePos({ x, y });
    };
    const container = document.getElementById('scene-container');
    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const parallaxStyle = (factor) => ({
    transform: `translateX(${mousePos.x * factor}px) translateY(${mousePos.y * factor}px)`,
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post('https://kindle-clone-backend.onrender.com/api/auth/login/', formData);
      login(response.data.key);
      navigate('/library');
    } catch (error) {
      console.error("Login error:", error.response?.data);
      alert(`Login failed: ${JSON.stringify(error.response?.data)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="scene-container" className="w-screen h-screen flex items-center justify-center font-sans overflow-hidden relative">
      <style>{`
        @keyframes breathe { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .animate-breathe { animation: breathe 6s infinite ease-in-out; }
        @keyframes cloud-slow { 0% { transform: translateX(-20px); } 100% { transform: translateX(20px); } }
        .animate-cloud-slow { animation: cloud-slow 25s infinite alternate ease-in-out; }
        @keyframes cloud-fast { 0% { transform: translateX(15px); } 100% { transform: translateX(-15px); } }
        .animate-cloud-fast { animation: cloud-fast 18s infinite alternate ease-in-out; }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        .animate-bounce-slow { animation: bounce-slow 5s infinite ease-in-out; }
      `}</style>

      <SceneBackground />

      {/* Animals */}
      <div className="absolute inset-0 z-10">
        <ReadingElephant className="w-72 absolute bottom-[-2%] left-[5%]" style={parallaxStyle(15)} />
        <ReadingBear className="w-60 absolute bottom-[-2%] right-[5%]" style={parallaxStyle(20)} />
        <ReadingMonkey className="w-40 absolute bottom-[20%] left-[20%]" style={parallaxStyle(25)} />
        <ReadingOwl className="w-36 absolute top-[10%] right-[20%]" style={parallaxStyle(10)} />
      </div>

      {/* Login Box */}
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md shadow-2xl rounded-2xl p-8 z-20 border-2 border-white" style={parallaxStyle(-8)}>
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-[#0c4a6e]">Story Time</h1>
          <p className="text-[#075985] mt-2">Welcome back! Your next adventure awaits.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:border-transparent transition-all"
              id="username" type="text" placeholder="Your Name" name="username"
              onChange={handleChange} value={formData.username} required />
          </div>
          <div className="mb-6">
            <input
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:border-transparent transition-all"
              id="password" type="password" placeholder="Secret Password" name="password"
              onChange={handleChange} value={formData.password} required />
          </div>
          <button
            className="w-full bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] hover:from-[#0ea5e9] hover:to-[#0284c7] text-white font-bold text-lg py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all transform hover:scale-105 duration-300 disabled:bg-gray-400"
            type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Loading...' : 'Let\'s Go!'}
          </button>
          <p className="text-center text-[#075985] mt-6 text-sm">
            New adventurer?{' '}
            <Link to="/register" className="font-bold text-[#0ea5e9] hover:text-[#0284c7]">
              Join the story!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
