import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Sparkles, CreditCard, History, PlayCircle, Zap, TrendingUp, Trophy } from "lucide-react";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    },
  };

  const hoverEffect = {
    scale: 1.03,
    y: -5,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-10 relative overflow-hidden">
      
      {/* 🌌 Animated Background Elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.2, 0.4, 0.2] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -left-20 w-150 h-150 bg-blue-600/10 blur-[150px] rounded-full"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.3, 0.1] 
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 2 }}
        className="absolute -bottom-20 -right-20 w-150 h-150 bg-emerald-500/10 blur-[150px] rounded-full"
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* 🎙️ Header with Slide-In */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <div>
            <h1 className="text-5xl font-black tracking-tight mb-2 bg-linear-to-r from-white via-white to-gray-500 bg-clip-text text-transparent">
              नमस्ते, {user?.name || "Dev"}! ✨
            </h1>
            <p className="text-gray-400 text-lg flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-400" />
              Your interview performance is up **12%** this week.
            </p>
          </div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white/5 border border-white/10 px-4 py-2 rounded-full flex items-center gap-3 backdrop-blur-md"
          >
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm font-mono text-emerald-400 uppercase tracking-widest">AI Engine Online</span>
          </motion.div>
        </motion.div>

        {/* ⚡ Interactive Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          
          {/* Card 1: Credits */}
          <motion.div
            variants={itemVariants}
            whileHover={hoverEffect}
            className="group bg-linear-to-b from-white/10 to-transparent backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden"
          >
            <motion.div 
              initial={{ rotate: -20, opacity: 0 }}
              animate={{ rotate: 0, opacity: 0.05 }}
              className="absolute -right-4 -bottom-4 text-white group-hover:scale-110 transition-transform"
            >
              <CreditCard size={140} />
            </motion.div>
            
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                <CreditCard size={24} />
              </div>
              <span className="font-bold text-gray-500 tracking-tighter uppercase text-xs">Available Credits</span>
            </div>
            
            <h2 className="text-6xl font-black mb-8 italic">{user?.credit || 0}</h2>
            
            <button
              onClick={() => navigate("/payment")}
              className="w-full bg-white text-black py-4 rounded-2xl font-black hover:bg-emerald-400 transition-colors active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              REFUEL WALLET 💳
            </button>
          </motion.div>

          {/* Card 2: Start Interview */}
          <motion.div
            variants={itemVariants}
            whileHover={hoverEffect}
            className="group bg-blue-600 p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(37,99,235,0.3)] relative overflow-hidden border-t border-white/20"
          >
             <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -right-10 -top-10 text-white/10"
            >
              <Zap size={200} />
            </motion.div>

            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-white/20 rounded-2xl text-white">
                <PlayCircle size={24} />
              </div>
              <span className="font-bold text-blue-100 tracking-tighter uppercase text-xs">Ready Player One</span>
            </div>

            <h2 className="text-3xl font-black mb-2">Live Practice</h2>
            <p className="text-blue-100/70 mb-8 text-sm font-medium">Jump into a simulated DSA technical round. 🚀</p>
            
            <button
              onClick={() => navigate("/interview")}
              className="w-full bg-black text-white py-4 rounded-2xl font-black hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 group/btn"
            >
              START NOW <Zap size={18} className="fill-current group-hover/btn:animate-bounce" />
            </button>
          </motion.div>

          {/* Card 3: History */}
          <motion.div
            variants={itemVariants}
            whileHover={hoverEffect}
            className="group bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 shadow-2xl relative"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-purple-500/20 rounded-2xl text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                <History size={24} />
              </div>
              <span className="font-bold text-gray-500 tracking-tighter uppercase text-xs">Past Performance</span>
            </div>

            <h2 className="text-3xl font-black mb-2">Reports</h2>
            <p className="text-gray-400 mb-8 text-sm font-medium">Review AI feedback and code optimizations. 📊</p>
            
            <button
              onClick={() => navigate("/history")}
              className="w-full border-2 border-white/10 py-4 rounded-2xl font-black hover:bg-white hover:text-black transition-all"
            >
              VIEW HISTORY
            </button>
          </motion.div>

        </div>

        {/* 🏆 Pro Tips Section with Layout Animation */}
        <motion.div
          variants={itemVariants}
          className="bg-[#0f172a] p-1 border border-white/5 rounded-[3rem] shadow-inner"
        >
          <div className="bg-[#1e293b]/50 backdrop-blur-2xl p-10 rounded-[2.8rem] border border-white/10">
            <div className="flex items-center gap-4 mb-10">
              <motion.div 
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-14 w-14 bg-yellow-400 text-black rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.3)]"
              >
                <Trophy size={28} />
              </motion.div>
              <div>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter">Pro Insights</h2>
                <p className="text-yellow-400/80 text-xs font-bold tracking-[0.2em]">LEVEL UP YOUR GAME</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { id: "01", text: "Explain your thought process—the AI values 'How' over 'What'! 🗣️" },
                { id: "02", text: "Mastered the DSA PDF? Try the 'Hard' mode interviews next. 💪" },
                { id: "03", text: "Check your 'Complexity Score' in the reports for better Big O. 📉" },
                { id: "04", text: "Consistency beats intensity. Do 1 mock interview every day! 📅" }
              ].map((tip, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ x: 10 }}
                  className="flex gap-6 p-6 rounded-3xl bg-white/5 border border-transparent hover:border-white/10 hover:bg-white/[0.07] transition-all"
                >
                  <span className="text-yellow-400 font-black text-2xl opacity-50 tracking-tighter">{tip.id}</span>
                  <p className="text-gray-300 font-medium leading-relaxed">{tip.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;