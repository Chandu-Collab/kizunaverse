'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Section {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  gradient: string;
  content: React.ReactElement;
  isUnlocked: boolean;
}

export default function CareerGuidanceSystem() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  const [userReflections, setUserReflections] = useState<{[key: string]: string}>({});
  const [showSparkles, setShowSparkles] = useState(false);

  const sections: Section[] = [
    {
      id: 'welcome',
      title: "✨ Hey Beautiful Soul",
      subtitle: "Let's find your perfect path together",
      icon: '🌸',
      color: 'from-pink-400 to-rose-500',
      gradient: 'from-pink-500/20 to-rose-500/20',
      isUnlocked: true,
      content: <WelcomeSection />
    },
    {
      id: 'heart-to-heart',
      title: "💕 Heart to Heart Talk", 
      subtitle: "Understanding what you really want",
      icon: '💝',
      color: 'from-purple-400 to-pink-500',
      gradient: 'from-purple-500/20 to-pink-500/20',
      isUnlocked: completedSections.has(0),
      content: <HeartToHeartSection />
    },
    {
      id: 'two-beautiful-paths',
      title: "🌈 Two Beautiful Paths",
      subtitle: "Let's explore both with wonder",
      icon: '🦄',
      color: 'from-blue-400 to-teal-500',
      gradient: 'from-blue-500/20 to-teal-500/20',
      isUnlocked: completedSections.has(1),
      content: <TwoPathsSection />
    },
    {
      id: 'magic-reality',
      title: "✨ The Magic Reality",
      subtitle: "Real opportunities in India",
      icon: '🏰',
      color: 'from-emerald-400 to-cyan-500',
      gradient: 'from-emerald-500/20 to-cyan-500/20',
      isUnlocked: completedSections.has(2),
      content: <MagicRealitySection />
    },
    {
      id: 'creative-projects',
      title: "🎨 Creative Project Ideas",
      subtitle: "Beautiful projects to try",
      icon: '🌟',
      color: 'from-yellow-400 to-orange-500',
      gradient: 'from-yellow-500/20 to-orange-500/20',
      isUnlocked: completedSections.has(3),
      content: <CreativeProjectsSection />
    },
    {
      id: 'reflection-garden',
      title: "🌺 Reflection Garden",
      subtitle: "Your thoughts and feelings",
      icon: '🦋',
      color: 'from-indigo-400 to-purple-500',
      gradient: 'from-indigo-500/20 to-purple-500/20',
      isUnlocked: completedSections.has(4),
      content: <ReflectionGardenSection reflections={userReflections} setReflections={setUserReflections} />
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setShowSparkles(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSectionComplete = (sectionIndex: number) => {
    setCompletedSections(prev => new Set([...prev, sectionIndex]));
  };

  const FloatingSparkle = ({ delay = 0 }: { delay?: number }) => (
    <motion.div
      className="absolute w-2 h-2 bg-yellow-300 rounded-full"
      animate={{
        y: [-20, -60, -20],
        x: [0, 15, 0],
        opacity: [0, 1, 0],
        scale: [0, 1, 0]
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 1
      }}
    />
  );

  if (!isStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-indigo-500/10"
            animate={{ 
              background: [
                'linear-gradient(45deg, rgba(236, 72, 153, 0.1), rgba(147, 51, 234, 0.1), rgba(99, 102, 241, 0.1))',
                'linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(99, 102, 241, 0.1), rgba(59, 130, 246, 0.1))',
                'linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(59, 130, 246, 0.1), rgba(236, 72, 153, 0.1))'
              ]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          {showSparkles && (
            <>
              <FloatingSparkle delay={0} />
              <FloatingSparkle delay={0.5} />
              <FloatingSparkle delay={1} />
            </>
          )}
        </div>

        <motion.div 
          className="max-w-4xl w-full text-center relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="mb-8"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="text-8xl mb-6">🌸✨🦋</div>
          </motion.div>

          <motion.h1 
            className="text-6xl font-bold text-white mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Your <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
              Beautiful
            </span> Career Journey
          </motion.h1>

          <motion.p 
            className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Someone special believes in you and wants to help you find the perfect path. 
            This is your personal guide between <span className="text-blue-300 font-semibold">Full Stack Development</span> and 
            <span className="text-green-300 font-semibold"> Python AI Magic</span>.
          </motion.p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => setIsStarted(true)}
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white font-bold py-4 px-12 rounded-full text-xl shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 relative overflow-hidden"
            >
              <motion.span
                className="relative z-10"
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨ Begin This Beautiful Journey ✨
              </motion.span>
            </button>
          </motion.div>

          <motion.p 
            className="text-white/60 text-sm mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            💝 Made with love to help you make the right choice 💝
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-h-screen p-6 relative overflow-x-hidden overflow-y-auto">
      {/* Exit/Back Button */}
      <div className="absolute top-6 right-8 z-30">
        <button
          onClick={() => {
            if (typeof window !== 'undefined') {
              // Try to close the journey and go back to Study Tools or Home
              const evt = new CustomEvent('exitCareerJourney');
              window.dispatchEvent(evt);
            }
          }}
          className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-bold px-6 py-2 rounded-full shadow-lg text-lg"
        >
          ← Back to Study Zone
        </button>
      </div>
      {/* Beautiful Animated Background */}
      <div className="absolute inset-0 pointer-events-none fixed">
        <motion.div 
          className="absolute inset-0"
          animate={{ 
            background: [
              'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(147, 51, 234, 0.1), rgba(99, 102, 241, 0.1))',
              'linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(99, 102, 241, 0.1), rgba(16, 185, 129, 0.1))',
              'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(16, 185, 129, 0.1), rgba(236, 72, 153, 0.1))'
            ]
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-20 w-4 h-4 bg-pink-400/30 rounded-full"
          animate={{ y: [0, -20, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0 }}
        />
        <motion.div
          className="absolute top-40 right-32 w-3 h-3 bg-purple-400/30 rounded-full"
          animate={{ y: [0, -15, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-32 left-1/3 w-2 h-2 bg-blue-400/30 rounded-full"
          animate={{ y: [0, -10, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-4 pb-20">
        {/* Journey Progress Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Your Beautiful Journey
            </span>
          </h1>
          <div className="flex justify-center items-center gap-2 mb-6">
            {sections.map((_, index) => (
              <motion.div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSection 
                    ? 'bg-gradient-to-r from-pink-400 to-purple-500 scale-125' 
                    : completedSections.has(index)
                    ? 'bg-green-400'
                    : 'bg-white/20'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
          <p className="text-white/70 text-lg">
            Step {currentSection + 1} of {sections.length}: {sections[currentSection]?.subtitle}
          </p>
        </motion.div>

        {/* Section Navigation - Beautiful Card Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 max-w-6xl mx-auto">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              layout
              whileHover={{ scale: section.isUnlocked ? 1.05 : 1 }}
              whileTap={{ scale: section.isUnlocked ? 0.95 : 1 }}
              className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 ${
                section.isUnlocked 
                  ? `bg-gradient-to-br ${section.gradient} backdrop-blur-sm border border-white/20 hover:border-white/40 shadow-xl hover:shadow-2xl`
                  : 'bg-white/5 border border-white/10 opacity-50'
              }`}
              onClick={() => section.isUnlocked && setCurrentSection(index)}
            >
              {/* Active Section Indicator */}
              {index === currentSection && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5"
                  layoutId="activeSection"
                  transition={{ duration: 0.3 }}
                />
              )}
              
              <div className="p-6 text-center relative z-10">
                <motion.div
                  className="text-5xl mb-3"
                  animate={index === currentSection ? { rotate: [0, 10, -10, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {section.icon}
                </motion.div>
                <h3 className={`text-lg font-bold mb-2 ${
                  section.isUnlocked ? 'text-white' : 'text-white/40'
                }`}>
                  {section.title}
                </h3>
                <p className={`text-sm ${
                  section.isUnlocked ? 'text-white/70' : 'text-white/30'
                }`}>
                  {section.subtitle}
                </p>
                
                {/* Completion Badge */}
                {completedSections.has(index) && (
                  <motion.div
                    className="absolute top-3 right-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-white text-xs">✓</span>
                  </motion.div>
                )}
                
                {/* Lock Indicator */}
                {!section.isUnlocked && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white/60 text-xs">🔒</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Current Section Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className={`bg-gradient-to-br ${sections[currentSection]?.gradient} backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-visible max-w-6xl mx-auto`}
          >
            {/* Section Header */}
            <div className="text-center mb-8">
              <motion.div
                className="text-6xl mb-4"
                animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                {sections[currentSection]?.icon}
              </motion.div>
              <h2 className="text-4xl font-bold text-white mb-3">
                {sections[currentSection]?.title}
              </h2>
              <p className="text-xl text-white/80">
                {sections[currentSection]?.subtitle}
              </p>
            </div>

            {/* Section Content */}
            <div className="relative z-10">
              <div className="space-y-6">
                {sections[currentSection]?.content}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="relative mt-8 w-full">
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/20 bg-black/30 backdrop-blur-md px-4 py-4 shadow-xl">
                <button
                  onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                  disabled={currentSection === 0}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    currentSection === 0
                      ? 'text-white/40 cursor-not-allowed'
                      : 'text-white bg-white/10 hover:bg-white/20 hover:scale-105'
                  }`}
                >
                  ← Previous
                </button>
                <div className="text-center flex-1 min-w-[220px]">
                  <button
                    onClick={() => handleSectionComplete(currentSection)}
                    disabled={completedSections.has(currentSection)}
                    className={`w-full px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                      completedSections.has(currentSection)
                        ? 'bg-green-500 text-white cursor-default'
                        : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white hover:scale-105 shadow-lg'
                    }`}
                  >
                    {completedSections.has(currentSection) ? '✓ Completed' : '✨ Mark Complete'}
                  </button>
                </div>
                <button
                  onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
                  disabled={currentSection === sections.length - 1 || !sections[currentSection + 1]?.isUnlocked}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    currentSection === sections.length - 1 || !sections[currentSection + 1]?.isUnlocked
                      ? 'text-white/40 cursor-not-allowed'
                      : 'text-white bg-white/10 hover:bg-white/20 hover:scale-105'
                  }`}
                >
                  Next →
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Journey Progress */}
        <motion.div 
          className="mt-8 text-center max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-white/10 rounded-full h-3 max-w-md mx-auto overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
              initial={{ width: 0 }}
              animate={{ width: `${((completedSections.size) / sections.length) * 100}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <p className="text-white/60 text-sm mt-2">
            {completedSections.size} of {sections.length} steps completed ✨
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// Beautiful Section Components  
function WelcomeSection() {
  return (
    <div className="space-y-8 max-w-full overflow-visible pb-8">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl font-bold text-white mb-8">Let's remove the confusion, slowly. 🌸</h2>
        
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20">
          <div className="space-y-6 text-xl text-white/90 leading-relaxed">
            <p className="text-pink-300">You don't need to decide everything today.</p>
            <p>You just need clarity — one step at a time.</p>
            <p className="text-blue-300">This space is to help you explore, not pressure you.</p>
          </div>
        </div>

        <motion.div 
          className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-300/30"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p className="text-lg text-white/80 italic">
            "The best time to plant a tree was 20 years ago. The second best time is now." 🌱
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

function MarketReality() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <motion.h2 
        className="text-4xl font-bold text-white text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Indian Market Reality (Simple & Honest) 🟩
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Full Stack */}
        <motion.div 
          className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-8 border border-blue-300/30"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-blue-300 mb-6">🚀 Full Stack Development</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">What it looks like:</h4>
              <ul className="text-white/80 space-y-1">
                <li>• More jobs</li>
                <li>• Faster entry-level roles</li>
                <li>• Product companies & startups</li>
                <li>• Frontend + Backend + basics of DevOps</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-green-300 mb-2">Good if you like:</h4>
              <ul className="text-white/80 space-y-1">
                <li>• Building complete applications</li>
                <li>• Seeing visual results</li>
                <li>• Working on products</li>
                <li>• Learning continuously</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-orange-300 mb-2">Reality (honest):</h4>
              <ul className="text-white/80 space-y-1">
                <li>• Competitive</li>
                <li>• Needs consistency</li>
                <li>• Tech changes fast</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Python */}
        <motion.div 
          className="bg-gradient-to-br from-green-500/20 to-yellow-500/20 rounded-2xl p-8 border border-green-300/30"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-green-300 mb-6">🐍 Python Developer</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">What it looks like:</h4>
              <ul className="text-white/80 space-y-1">
                <li>• Automation</li>
                <li>• Backend services</li>
                <li>• Data, AI, scripting</li>
                <li>• Slower entry, but deep roles</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-green-300 mb-2">Good if you like:</h4>
              <ul className="text-white/80 space-y-1">
                <li>• Logic</li>
                <li>• Automation</li>
                <li>• Clean problem solving</li>
                <li>• Less UI, more thinking</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-orange-300 mb-2">Reality:</h4>
              <ul className="text-white/80 space-y-1">
                <li>• Fewer entry-level roles</li>
                <li>• Strong fundamentals needed</li>
                <li>• Long-term growth is solid</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <p className="text-xl text-pink-300 font-semibold">
          👉 Both are good careers. The wrong choice is choosing without trying.
        </p>
      </motion.div>
    </div>
  );
}

function DecisionHelper() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.h2 
        className="text-4xl font-bold text-white text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Decision Helper 🟨
      </motion.h2>

      <motion.div 
        className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl p-8 border border-yellow-300/30"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Soft Comparison (Not overwhelming numbers)</h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white/10 rounded-xl p-4">
            <span className="text-white">If you enjoy seeing things visually</span>
            <span className="text-blue-300 font-semibold">→ Full Stack</span>
          </div>
          
          <div className="flex items-center justify-between bg-white/10 rounded-xl p-4">
            <span className="text-white">If you enjoy solving quietly</span>
            <span className="text-green-300 font-semibold">→ Python</span>
          </div>
          
          <div className="flex items-center justify-between bg-white/10 rounded-xl p-4">
            <span className="text-white">If you like fast feedback</span>
            <span className="text-blue-300 font-semibold">→ Full Stack</span>
          </div>
          
          <div className="flex items-center justify-between bg-white/10 rounded-xl p-4">
            <span className="text-white">If you like depth</span>
            <span className="text-green-300 font-semibold">→ Python</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl p-6 text-center border border-pink-300/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-xl text-white font-semibold">
          The best way to know is to build something real. 🛠️
        </p>
      </motion.div>
    </div>
  );
}

function ProjectPrompts() {
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const copyPrompt = (prompt: string, type: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(type);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  const fullStackPrompt = `You are a senior full-stack developer and mentor.
Help me build a complete full-stack application from scratch.
Tech stack: React + Node.js + Express + MongoDB.

Project: A simple task & habit tracker for daily productivity.

Requirements:
• Authentication
• CRUD operations
• Clean UI
• Proper folder structure
• Step-by-step guidance
• Explain concepts simply
• Industry best practices

Act as my mentor and guide me daily.`;

  const pythonPrompt = `You are a senior Python developer and mentor.
Help me build a real-world Python project focused on automation.

Project: An automation tool that:
• Reads data from files
• Processes it logically
• Generates reports or actions

Requirements:
• Clean Python code
• Step-by-step explanation
• Focus on logic and structure
• Beginner-friendly but professional

Act as my mentor and help me understand deeply.`;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.h2 
        className="text-4xl font-bold text-white text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Ready-To-Use Project Prompts 🚀
      </motion.h2>

      <p className="text-xl text-center text-white/80 mb-8">
        This is the heart ❤️ — giving you confidence through action.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Full Stack Prompt */}
        <motion.div 
          className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-8 border border-blue-300/30"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-blue-300 mb-4">🚀 Full Stack – Starter Project</h3>
          <p className="text-white/80 mb-4">Build a real-world app in 7–10 days</p>
          
          <div className="bg-black/30 rounded-xl p-4 mb-4 max-h-96 overflow-y-auto">
            <pre className="text-sm text-white/90 whitespace-pre-wrap leading-relaxed">{fullStackPrompt}</pre>
          </div>
          
          <motion.button
            onClick={() => copyPrompt(fullStackPrompt, 'fullstack')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {copiedPrompt === 'fullstack' ? 'Copied! ✓' : 'Copy Prompt for ChatGPT/Claude'}
          </motion.button>
        </motion.div>

        {/* Python Prompt */}
        <motion.div 
          className="bg-gradient-to-br from-green-500/20 to-yellow-500/20 rounded-2xl p-8 border border-green-300/30"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-green-300 mb-4">🐍 Python – Starter Project</h3>
          <p className="text-white/80 mb-4">Build something useful + logical</p>
          
          <div className="bg-black/30 rounded-xl p-4 mb-4 max-h-96 overflow-y-auto">
            <pre className="text-sm text-white/90 whitespace-pre-wrap leading-relaxed">{pythonPrompt}</pre>
          </div>
          
          <motion.button
            onClick={() => copyPrompt(pythonPrompt, 'python')}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {copiedPrompt === 'python' ? 'Copied! ✓' : 'Copy Prompt for ChatGPT/Claude'}
          </motion.button>
        </motion.div>
      </div>

      <motion.div 
        className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl p-6 text-center border border-pink-300/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <p className="text-xl text-white mb-2">
          <span className="text-pink-300">This lets her feel</span> the real experience 💝
        </p>
        <p className="text-white/80">
          Copy either prompt, paste it in ChatGPT/Claude, and start building immediately.
        </p>
      </motion.div>
    </div>
  );
}

interface ReflectionSectionProps {
  userReflections: {[key: string]: string};
  setUserReflections: (reflections: {[key: string]: string}) => void;
}

function ReflectionSection({ userReflections, setUserReflections }: ReflectionSectionProps) {
  const [currentReflection, setCurrentReflection] = useState('');
  
  const reflectionQuestions = [
    "Which project felt lighter?",
    "Which one made time pass faster?", 
    "Which one made you curious to learn more?",
    "Which one felt less stressful?"
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.h2 
        className="text-4xl font-bold text-white text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Your Inner Voice 🧠
      </motion.h2>

      <motion.div 
        className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border border-purple-300/30"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold text-white mb-6 text-center">After both projects, ask yourself:</h3>
        
        <div className="space-y-4 mb-8">
          {reflectionQuestions.map((question, index) => (
            <motion.div 
              key={index}
              className="bg-white/10 rounded-xl p-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <p className="text-white text-lg">{question}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-black/20 rounded-xl p-6">
          <label className="block text-white mb-3 text-lg">Your honest thoughts:</label>
          <textarea
            value={currentReflection}
            onChange={(e) => setCurrentReflection(e.target.value)}
            placeholder="Write your feelings here... no judgment, just honesty."
            className="w-full h-32 bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-white/50 focus:border-pink-300 focus:outline-none resize-none"
          />
          <motion.button
            onClick={() => {
              setUserReflections({...userReflections, main: currentReflection});
              setCurrentReflection('');
            }}
            className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-semibold transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Save My Thoughts 💭
          </motion.button>
        </div>
      </motion.div>

      <motion.div 
        className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl p-6 text-center border border-pink-300/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-2xl text-white font-semibold mb-2">
          Your answer is already inside you. ✨
        </p>
        <p className="text-white/80">
          Trust your feelings, not just logic.
        </p>
      </motion.div>
    </div>
  );
}

function AdvancedSection() {
  const [copiedAdvanced, setCopiedAdvanced] = useState<string | null>(null);

  const advancedPrompts = {
    fullstack: `You are a senior full-stack engineer working at a product-based company in India.

I am a beginner developer. Help me build a real-world product the way companies do.

Project: Build a mini SaaS-style application (frontend + backend).

Requirements:
• Explain why each technology is used
• Show clean architecture
• Industry-style folder structure
• Error handling
• Simple UI but functional
• Code reviews and improvement suggestions

Teach me like a mentor, not like a teacher.`,

    python: `You are a senior Python engineer who builds automation and backend systems.

Help me solve real-world problems using Python.

Project: Build automation scripts that save time and reduce manual work.

Requirements:
• Focus on logic
• Explain thinking behind solutions
• Clean and readable code
• Best practices
• Beginner-friendly explanations

Guide me step-by-step and help me think like a developer.`,

    decision: `I am confused between two career paths.

Help me decide without pressure.

Ask me reflective questions based on:
• What energizes me
• How I think
• How I solve problems
• How I feel after building things

Don't tell me what to choose.
Help me understand myself better.`,

    support: `I feel confused, slow, or unmotivated while learning.

Talk to me calmly.

Help me break things into small steps.
Remind me that it's okay to take time.
Guide me without pressure.`,

    reality: `Tell me honestly:
• What beginners struggle with in Full Stack
• What beginners struggle with in Python
• Common mistakes in both paths

Don't scare me.
Just prepare me.`
  };

  const copyAdvancedPrompt = (prompt: string, type: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedAdvanced(type);
    setTimeout(() => setCopiedAdvanced(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.h2 
        className="text-4xl font-bold text-white text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Premium Upgrade & Support ⭐
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Advanced Full Stack */}
        <motion.div 
          className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-blue-300/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-xl font-bold text-blue-300 mb-4">🚀 "Real Company Style"</h3>
          <p className="text-white/80 mb-4 text-sm">Build like the industry does</p>
          <motion.button
            onClick={() => copyAdvancedPrompt(advancedPrompts.fullstack, 'fullstack')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl font-semibold transition-all text-sm"
            whileHover={{ scale: 1.02 }}
          >
            {copiedAdvanced === 'fullstack' ? 'Copied! ✓' : 'Copy Advanced Prompt'}
          </motion.button>
        </motion.div>

        {/* Advanced Python */}
        <motion.div 
          className="bg-gradient-to-br from-green-500/20 to-yellow-500/20 rounded-2xl p-6 border border-green-300/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-bold text-green-300 mb-4">🐍 "Problem Solver"</h3>
          <p className="text-white/80 mb-4 text-sm">Think like a Python engineer</p>
          <motion.button
            onClick={() => copyAdvancedPrompt(advancedPrompts.python, 'python')}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-xl font-semibold transition-all text-sm"
            whileHover={{ scale: 1.02 }}
          >
            {copiedAdvanced === 'python' ? 'Copied! ✓' : 'Copy Advanced Prompt'}
          </motion.button>
        </motion.div>

        {/* Decision Confidence */}
        <motion.div 
          className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-300/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-purple-300 mb-4">🧠 Decision Confidence</h3>
          <p className="text-white/80 mb-4 text-sm">Deep but gentle guidance</p>
          <motion.button
            onClick={() => copyAdvancedPrompt(advancedPrompts.decision, 'decision')}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-xl font-semibold transition-all text-sm"
            whileHover={{ scale: 1.02 }}
          >
            {copiedAdvanced === 'decision' ? 'Copied! ✓' : 'Copy Decision Prompt'}
          </motion.button>
        </motion.div>

        {/* Support */}
        <motion.div 
          className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-2xl p-6 border border-pink-300/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-pink-300 mb-4">🧘 When You Feel Stuck</h3>
          <p className="text-white/80 mb-4 text-sm">Calm, supportive guidance</p>
          <motion.button
            onClick={() => copyAdvancedPrompt(advancedPrompts.support, 'support')}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-xl font-semibold transition-all text-sm"
            whileHover={{ scale: 1.02 }}
          >
            {copiedAdvanced === 'support' ? 'Copied! ✓' : 'Copy Support Prompt'}
          </motion.button>
        </motion.div>

        {/* Reality Check */}
        <motion.div 
          className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-6 border border-orange-300/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-bold text-orange-300 mb-4">🏆 Reality Check</h3>
          <p className="text-white/80 mb-4 text-sm">Honest preparation</p>
          <motion.button
            onClick={() => copyAdvancedPrompt(advancedPrompts.reality, 'reality')}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-xl font-semibold transition-all text-sm"
            whileHover={{ scale: 1.02 }}
          >
            {copiedAdvanced === 'reality' ? 'Copied! ✓' : 'Copy Reality Prompt'}
          </motion.button>
        </motion.div>

        {/* Daily Challenges */}
        <motion.div 
          className="bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-2xl p-6 border border-indigo-300/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-xl font-bold text-indigo-300 mb-4">⏰ Daily 30-Min</h3>
          <p className="text-white/80 mb-4 text-sm">Challenge yourself daily</p>
          <div className="space-y-2 text-white/70 text-xs mb-4">
            <p>Full Stack: Build forms, APIs, UIs</p>
            <p>Python: Automate files, extract data</p>
          </div>
          <div className="text-center">
            <span className="text-indigo-300 font-semibold">Just 30 minutes a day is enough. ⭐</span>
          </div>
        </motion.div>
      </div>

      {/* Personal Touch */}
      <motion.div 
        className="bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-2xl p-8 text-center border border-rose-300/30"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
      >
        <h3 className="text-2xl font-bold text-rose-300 mb-4">💌 Hidden Personal Touch</h3>
        <div className="space-y-3 text-white/90">
          <p>You don't need to rush.</p>
          <p>You don't need to compare.</p>
          <p className="text-pink-300 font-semibold">I built this space so you can move forward without confusion — and without pressure.</p>
        </div>
        <p className="text-white/60 mt-4 italic">This will impress her more than any tech. 💝</p>
      </motion.div>
    </div>
  );
}



function HeartToHeartSection() {
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);
  
  const feelings = [
    { emoji: '😰', text: 'Confused about the future', color: 'from-gray-400 to-gray-500' },
    { emoji: '🤔', text: 'Unsure which path to choose', color: 'from-yellow-400 to-orange-500' },
    { emoji: '💭', text: 'Excited but overwhelmed', color: 'from-blue-400 to-purple-500' },
    { emoji: '🌟', text: 'Ready to learn something new', color: 'from-green-400 to-teal-500' },
    { emoji: '🚀', text: 'Want to build amazing things', color: 'from-pink-400 to-rose-500' },
    { emoji: '💡', text: 'Love solving problems', color: 'from-indigo-400 to-cyan-500' }
  ];

  const toggleFeeling = (feeling: string) => {
    setSelectedFeelings(prev => 
      prev.includes(feeling) 
        ? prev.filter(f => f !== feeling)
        : [...prev, feeling]
    );
  };

  return (
    <div className="space-y-8 max-w-full overflow-visible pb-8">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-6xl mb-6">💕🫂💕</div>
        <h3 className="text-3xl font-bold text-white mb-4">
          Let's Have a Heart-to-Heart
        </h3>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          It's okay to feel uncertain. Everyone does when making important decisions. 
          Let's start by understanding what you're feeling right now.
        </p>
      </motion.div>

      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-white font-semibold text-center mb-6">
          Click on any feelings that resonate with you (you can choose multiple):
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {feelings.map((feeling, index) => (
            <motion.button
              key={feeling.text}
              onClick={() => toggleFeeling(feeling.text)}
              className={`p-4 rounded-2xl border transition-all duration-300 ${
                selectedFeelings.includes(feeling.text)
                  ? 'border-white/60 bg-white/10 scale-105'
                  : 'border-white/20 bg-white/5 hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{feeling.emoji}</span>
                <span className="text-white font-medium">{feeling.text}</span>
                {selectedFeelings.includes(feeling.text) && (
                  <motion.span 
                    className="ml-auto text-green-400"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    ✓
                  </motion.span>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {selectedFeelings.length > 0 && (
        <motion.div 
          className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl p-6 border border-pink-300/30"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center">
            <div className="text-4xl mb-4">🤗</div>
            <h4 className="text-xl font-bold text-white mb-3">I Hear You</h4>
            <p className="text-white/80 mb-4">
              Your feelings are completely valid. What you're experiencing is part of every person's 
              journey toward finding their path. The fact that you're here, thinking about your future, 
              shows how much you care about making the right choice.
            </p>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-white/90 font-medium">
                "Every expert was once a beginner. Every professional was once an amateur. 
                Every icon was once an unknown." - Robin Sharma
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function TwoPathsSection() {
  const [exploringPath, setExploringPath] = useState<'fullstack' | 'python' | null>(null);

  const paths = {
    fullstack: {
      title: '🌐 Full Stack Development',
      emoji: '💻',
      gradient: 'from-blue-500/20 to-indigo-500/20',
      borderColor: 'border-blue-300/30',
      description: 'Creating complete web experiences from start to finish',
      whatYouDo: [
        '🎨 Design beautiful user interfaces',
        '⚡ Build interactive websites and apps', 
        '🔗 Connect frontend with backend systems',
        '📱 Create responsive, mobile-friendly experiences',
        '🚀 Deploy and maintain web applications'
      ],
      skills: [
        'HTML, CSS, JavaScript',
        'React, Next.js, Vue',
        'Node.js, Express',
        'Databases (SQL, MongoDB)', 
        'Git, Docker, Cloud Platforms'
      ],
      personality: [
        '🎨 Love visual design and user experience',
        '🔄 Enjoy seeing immediate results',
        '🤝 Work well with designers and clients',
        '📋 Good at managing multiple project aspects',
        '💡 Problem-solve across different technologies'
      ],
      dayInLife: 'You might start by designing a new feature, write code to implement it, test it across different devices, and deploy it for users to enjoy.'
    },
    python: {
      title: '🤖 Python AI & Automation',
      emoji: '🐍',
      gradient: 'from-green-500/20 to-teal-500/20',
      borderColor: 'border-green-300/30',
      description: 'Building intelligent systems that learn and automate tasks',
      whatYouDo: [
        '🧠 Train AI models to recognize patterns',
        '🤖 Create intelligent chatbots and agents',
        '📊 Analyze data to find insights',
        '⚙️ Automate repetitive tasks',
        '🔮 Build predictive systems'
      ],
      skills: [
        'Python fundamentals',
        'Machine Learning (TensorFlow, PyTorch)',
        'Data Science (Pandas, NumPy)',
        'API integrations',
        'Cloud AI services'
      ],
      personality: [
        '🔍 Curious about how things work',
        '📈 Love working with data and patterns',
        '🤖 Fascinated by artificial intelligence',
        '⚡ Enjoy automating and optimizing',
        '🧪 Like experimenting and testing theories'
      ],
      dayInLife: 'You might train an AI model to recognize images, build a chatbot to help customers, or create a script that automatically sorts thousands of files.'
    }
  };

  return (
    <div className="space-y-8 max-w-full overflow-visible pb-8">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-6xl mb-6">🌈✨🦄</div>
        <h3 className="text-3xl font-bold text-white mb-4">
          Two Magical Paths Await You
        </h3>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Both paths are incredible and lead to exciting careers. Let's explore them with wonder and curiosity!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {Object.entries(paths).map(([key, path]) => (
          <motion.div
            key={key}
            className={`bg-gradient-to-br ${path.gradient} rounded-3xl p-6 border ${path.borderColor} cursor-pointer transition-all duration-300 hover:scale-105`}
            whileHover={{ y: -5 }}
            onClick={() => setExploringPath(exploringPath === key ? null : key as 'fullstack' | 'python')}
          >
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{path.emoji}</div>
              <h4 className="text-2xl font-bold text-white mb-2">{path.title}</h4>
              <p className="text-white/80">{path.description}</p>
            </div>

            <AnimatePresence>
              {exploringPath === key && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h5 className="text-lg font-semibold text-white mb-3">What You'll Do:</h5>
                    <div className="space-y-2">
                      {path.whatYouDo.map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-2 text-white/80"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {item}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-lg font-semibold text-white mb-3">You Might Love This If You:</h5>
                    <div className="space-y-2">
                      {path.personality.map((trait, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-2 text-white/80"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index + path.whatYouDo.length) * 0.1 }}
                        >
                          {trait}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-2xl p-4">
                    <h5 className="text-lg font-semibold text-white mb-2">A Day in Your Life:</h5>
                    <p className="text-white/80 italic">"{path.dayInLife}"</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="text-center mt-4">
              <span className="text-white/60 text-sm">
                {exploringPath === key ? 'Click to collapse' : 'Click to explore this path'}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="text-center bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl p-6 border border-pink-300/30"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-4xl mb-4">💖</div>
        <p className="text-white/90 text-lg font-medium">
          Remember: There's no "wrong" choice here. Both paths can lead to fulfilling, 
          well-paid careers. The best path is the one that excites YOU!
        </p>
      </motion.div>
    </div>
  );
}

function MagicRealitySection() {
  const [selectedPath, setSelectedPath] = useState<'fullstack' | 'python' | 'both'>('both');

  const marketData = {
    fullstack: {
      salaryRange: '₹4-15 LPA (Fresher to Senior)',
      companies: ['Flipkart', 'Swiggy', 'Zomato', 'PayTM', 'Razorpay', 'PhonePe'],
      demand: 'Very High',
      growth: '25% yearly',
      locations: ['Bangalore', 'Hyderabad', 'Pune', 'Mumbai', 'Delhi'],
      pros: [
        '🎯 Direct impact - you build what users see',
        '💼 Most job openings in the market',
        '🌐 Work with global clients remotely',
        '🚀 Start freelancing quickly',
        '📱 Build your own products/startups'
      ],
      challenges: [
        '📚 Need to learn multiple technologies',
        '⚡ Fast-changing tech landscape',
        '🎨 Some design skills helpful'
      ]
    },
    python: {
      salaryRange: '₹5-20 LPA (Fresher to Senior)',
      companies: ['Google', 'Microsoft', 'Accenture', 'TCS', 'Wipro', 'Mindtree'],
      demand: 'High & Growing',
      growth: '30% yearly',
      locations: ['Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Mumbai'],
      pros: [
        '🤖 Work on cutting-edge AI projects',
        '📊 High problem-solving satisfaction',
        '💰 Generally higher starting salaries',
        '🔮 Future-proof career path',
        '🧠 Intellectually stimulating work'
      ],
      challenges: [
        '🔬 Requires strong analytical thinking',
        '📈 Math/statistics background helpful',
        '⏰ Longer learning curve initially'
      ]
    }
  };

  return (
    <div className="space-y-8">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-6xl mb-6">✨🏰✨</div>
        <h3 className="text-3xl font-bold text-white mb-4">
          The Magic Reality in India
        </h3>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Let's talk real numbers, real opportunities, and real companies that are hiring right now!
        </p>
      </motion.div>

      <div className="flex justify-center gap-4 mb-8">
        {['both', 'fullstack', 'python'].map((option) => (
          <button
            key={option}
            onClick={() => setSelectedPath(option as any)}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              selectedPath === option
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            {option === 'both' ? '🌈 Compare Both' : 
             option === 'fullstack' ? '🌐 Full Stack Only' : '🤖 Python AI Only'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {(selectedPath === 'both' ? ['fullstack', 'python'] : [selectedPath]).map((pathKey) => {
          const path = marketData[pathKey as keyof typeof marketData];
          const isFullStack = pathKey === 'fullstack';
          
          return (
            <motion.div
              key={pathKey}
              className={`bg-gradient-to-br ${isFullStack ? 'from-blue-500/15 to-indigo-500/15' : 'from-green-500/15 to-teal-500/15'} rounded-3xl p-6 border ${isFullStack ? 'border-blue-300/30' : 'border-green-300/30'}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: pathKey === 'fullstack' ? 0 : 0.2 }}
            >
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">{isFullStack ? '🌐' : '🤖'}</div>
                <h4 className="text-2xl font-bold text-white mb-2">
                  {isFullStack ? 'Full Stack Development' : 'Python AI & Automation'}
                </h4>
              </div>

              <div className="space-y-6">
                <div className="bg-white/10 rounded-2xl p-4">
                  <h5 className="text-lg font-semibold text-white mb-2">💰 Salary Reality</h5>
                  <p className="text-2xl font-bold text-green-300">{path.salaryRange}</p>
                  <p className="text-white/60 text-sm mt-1">Based on current Indian market</p>
                </div>

                <div>
                  <h5 className="text-lg font-semibold text-white mb-3">🏢 Top Companies Hiring</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {path.companies.map((company, index) => (
                      <div key={company} className="bg-white/5 rounded-lg p-2 text-white/80 text-sm text-center">
                        {company}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-3">
                    <h6 className="text-white font-semibold mb-1">📈 Demand</h6>
                    <p className="text-green-300 font-bold">{path.demand}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3">
                    <h6 className="text-white font-semibold mb-1">🚀 Growth</h6>
                    <p className="text-blue-300 font-bold">{path.growth}</p>
                  </div>
                </div>

                <div>
                  <h5 className="text-lg font-semibold text-white mb-3">✨ Why This Rocks</h5>
                  <div className="space-y-2">
                    {path.pros.map((pro, index) => (
                      <div key={index} className="flex items-start gap-2 text-white/80 text-sm">
                        {pro}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-lg font-semibold text-white mb-3">🤔 Things to Consider</h5>
                  <div className="space-y-2">
                    {path.challenges.map((challenge, index) => (
                      <div key={index} className="flex items-start gap-2 text-white/70 text-sm">
                        {challenge}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        className="text-center bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-3xl p-8 border border-pink-300/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-5xl mb-4">🌟</div>
        <h4 className="text-2xl font-bold text-white mb-4">The Beautiful Truth</h4>
        <p className="text-white/90 text-lg max-w-3xl mx-auto leading-relaxed">
          Both paths offer incredible opportunities in India's booming tech industry. 
          You're entering one of the most exciting times to be a developer. The choice isn't about 
          which one is "better" - it's about which one makes your heart sing! ✨
        </p>
      </motion.div>
    </div>
  );
}

function CreativeProjectsSection() {
  const [selectedPath, setSelectedPath] = useState<'fullstack' | 'python' | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const projectIdeas = {
    fullstack: [
      {
        title: '💖 Personal Memory Gallery',
        description: 'Beautiful photo gallery with stories and memories',
        difficulty: 'Beginner',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        prompt: `Create a personal memory gallery website with the following features:
- Beautiful photo grid layout with hover effects
- Modal view for larger images with captions
- Add story/memory text for each photo
- Responsive design for mobile and desktop
- Simple but elegant animations
- Use vanilla HTML, CSS, and JavaScript
- Include a contact section
Make it visually stunning with soft colors and glass morphism effects.`,
        outcome: 'A portfolio piece that shows your design and frontend skills'
      },
      {
        title: '🎵 Music Mood Tracker',
        description: 'Track your daily mood through music choices',
        difficulty: 'Intermediate',
        technologies: ['React', 'Node.js', 'Database'],
        prompt: `Build a music mood tracker application:
- User can log daily mood and associate spotify songs
- Beautiful mood visualization with charts
- Song recommendations based on mood history
- Social sharing of mood playlists
- Clean, modern UI with React
- Backend API with Node.js and Express
- Database to store user data and preferences
- Integration with Spotify API for music data
Focus on user experience and emotional design.`,
        outcome: 'Full-stack application showing both frontend and backend skills'
      },
      {
        title: '🌱 Habit Garden',
        description: 'Gamified habit tracker that grows virtual plants',
        difficulty: 'Advanced',
        technologies: ['Next.js', 'Database', 'Real-time features'],
        prompt: `Create a habit tracking app where habits grow virtual plants:
- Each habit is represented by a different plant
- Plants grow based on consistency
- Beautiful garden view with animations
- Streak tracking and achievement system
- Social features to share garden progress
- Mobile-responsive with PWA capabilities
- Real-time updates and notifications
- Use Next.js with modern styling (Tailwind)
- Include data visualization for habit analytics
Make it feel magical and rewarding!`,
        outcome: 'Advanced full-stack app showcasing modern web technologies'
      }
    ],
    python: [
      {
        title: '🤖 Smart Study Assistant',
        description: 'AI assistant that helps organize study materials',
        difficulty: 'Beginner',
        technologies: ['Python', 'File handling', 'Basic AI'],
        prompt: `Build a smart study assistant that helps organize files:
- Automatically categorize study materials by subject
- Extract key points from PDF and text files
- Create study schedules based on deadlines
- Generate quiz questions from notes
- Simple command-line interface to start
- Use Python libraries like PyPDF2, os, datetime
- Basic text processing and keyword extraction
- Can later add a simple web interface
Focus on practical utility for students.`,
        outcome: 'Practical Python tool showing file handling and automation'
      },
      {
        title: '📸 Smart Photo Organizer',
        description: 'AI that organizes photos by faces, events, and locations',
        difficulty: 'Intermediate',
        technologies: ['Python', 'Computer Vision', 'ML'],
        prompt: `Create an intelligent photo organizer:
- Use face recognition to group photos by people
- Automatically detect and categorize events (birthdays, trips)
- Extract location data and group by places
- Duplicate photo detection and removal
- Create automatic photo albums with AI-generated names
- Use OpenCV and face_recognition libraries
- Include a simple GUI with tkinter or web interface
- Add photo enhancement features (brightness, contrast)
- Export organized albums to folders
Make it user-friendly and visually appealing.`,
        outcome: 'Computer vision project showing AI and automation skills'
      },
      {
        title: '🧠 Personal AI Chat Companion',
        description: 'Intelligent chatbot trained on your interests and personality',
        difficulty: 'Advanced',
        technologies: ['Python', 'NLP', 'Machine Learning', 'APIs'],
        prompt: `Build a personalized AI chat companion:
- Train on user's chat history and preferences
- Personality matching based on conversation style
- Integration with multiple AI APIs (OpenAI, Claude)
- Memory system that remembers past conversations
- Mood detection and appropriate responses
- Voice input/output capabilities
- Web interface with real-time chat
- Learning system that improves over time
- Privacy-focused with local data storage
- Custom personality traits and knowledge domains
Create something that feels truly personal and helpful.`,
        outcome: 'Advanced AI project showcasing NLP and machine learning expertise'
      }
    ]
  };

  const copyPrompt = (prompt: string, title: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(title);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-full overflow-visible pb-12">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-6xl mb-6">🎨🌟🚀</div>
        <h3 className="text-3xl font-bold text-white mb-4">
          Creative Project Ideas
        </h3>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Beautiful, practical projects that will showcase your skills and help you decide which path excites you more!
        </p>
      </motion.div>

      <div className="flex justify-center gap-4 mb-8">
        {['fullstack', 'python'].map((path) => (
          <button
            key={path}
            onClick={() => setSelectedPath(selectedPath === path ? null : path as any)}
            className={`px-8 py-4 rounded-full font-semibold transition-all text-lg ${
              selectedPath === path
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white scale-105'
                : 'bg-white/10 text-white/70 hover:bg-white/20 hover:scale-105'
            }`}
          >
            {path === 'fullstack' ? '🌐 Full Stack Projects' : '🤖 Python AI Projects'}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedPath && (
          <motion.div
            key={selectedPath}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h4 className="text-2xl font-bold text-white mb-3">
                {selectedPath === 'fullstack' ? '🌐 Full Stack Development Projects' : '🤖 Python AI & Automation Projects'}
              </h4>
              <p className="text-white/70">
                Click on any project prompt to copy it and paste into ChatGPT or Claude for detailed guidance!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {projectIdeas[selectedPath].map((project, index) => (
                <motion.div
                  key={project.title}
                  className={`bg-gradient-to-br ${selectedPath === 'fullstack' ? 'from-blue-500/15 to-indigo-500/15' : 'from-green-500/15 to-teal-500/15'} rounded-3xl p-6 border ${selectedPath === 'fullstack' ? 'border-blue-300/30' : 'border-green-300/30'} hover:scale-105 transition-all duration-300 cursor-pointer`}
                  onClick={() => copyPrompt(project.prompt, project.title)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-center mb-4">
                    <h5 className="text-xl font-bold text-white mb-2">{project.title}</h5>
                    <p className="text-white/80 text-sm mb-3">{project.description}</p>
                    
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        project.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-300' :
                        project.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {project.difficulty}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="text-xs text-white/60 font-medium">Technologies:</div>
                      <div className="flex flex-wrap justify-center gap-1">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/70">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-white/60 mb-4 text-left">
                      <strong>What you'll build:</strong> {project.outcome}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-full py-2 px-4 rounded-xl font-semibold text-sm transition-all ${
                      copiedPrompt === project.title
                        ? 'bg-green-500 text-white'
                        : selectedPath === 'fullstack' 
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}>
                      {copiedPrompt === project.title ? '✓ Copied!' : '📋 Copy Project Prompt'}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="text-center bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl p-6 border border-pink-300/30 mt-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-4xl mb-3">✨</div>
              <p className="text-white/90 font-medium">
                Each project is designed to take 1-2 weeks. Pick the one that excites you most and 
                copy its prompt to get started with AI guidance immediately!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!selectedPath && (
        <motion.div 
          className="text-center bg-white/5 rounded-3xl p-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-7xl mb-6">🎯</div>
          <p className="text-xl text-white/70">
            Choose a path above to see beautiful project ideas that will help you learn and build your portfolio!
          </p>
        </motion.div>
      )}
    </div>
  );
}

function ReflectionGardenSection({ reflections, setReflections }: { 
  reflections: {[key: string]: string}, 
  setReflections: (value: any) => void 
}) {
  const [currentReflection, setCurrentReflection] = useState('');
  
  const reflectionPrompts = [
    {
      id: 'excitement',
      emoji: '✨',
      question: 'Which path made you feel more excited while reading about it?',
      placeholder: 'Share what sparked your interest...'
    },
    {
      id: 'natural',
      emoji: '🌱',
      question: 'Which type of work feels more natural to your personality?',
      placeholder: 'Think about your natural strengths and interests...'
    },
    {
      id: 'vision',
      emoji: '🔮',
      question: 'When you imagine your future self, what are you building or creating?',
      placeholder: 'Dream a little - what would make you proud to work on?'
    },
    {
      id: 'learning',
      emoji: '📚',
      question: 'Which learning path seems more enjoyable to you right now?',
      placeholder: 'Consider your current mood for learning new things...'
    },
    {
      id: 'impact',
      emoji: '💫',
      question: 'What kind of impact do you want to make through your work?',
      placeholder: 'How do you want to help people or change the world?'
    }
  ];

  const handleReflectionSave = (id: string, value: string) => {
    setReflections((prev: any) => ({
      ...prev,
      [id]: value
    }));
  };

  const completedReflections = Object.keys(reflections).filter(key => reflections[key].trim() !== '').length;

  return (
    <div className="space-y-8 max-w-full overflow-visible pb-12">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-6xl mb-6">🌺🦋🌸</div>
        <h3 className="text-3xl font-bold text-white mb-4">
          Your Reflection Garden
        </h3>
        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-6">
          This is your safe space to explore your thoughts and feelings. Take your time with each reflection.
          Your answers will help you understand which path feels right for you.
        </p>
        <div className="bg-white/10 rounded-full px-6 py-2 inline-block">
          <span className="text-white/90">🌸 {completedReflections} of {reflectionPrompts.length} reflections completed</span>
        </div>
      </motion.div>

      <div className="space-y-8">
        {reflectionPrompts.map((prompt, index) => (
          <motion.div
            key={prompt.id}
            className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl p-6 border border-purple-300/20"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl mt-2">{prompt.emoji}</div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-white mb-3">{prompt.question}</h4>
                <textarea
                  value={reflections[prompt.id] || ''}
                  onChange={(e) => handleReflectionSave(prompt.id, e.target.value)}
                  placeholder={prompt.placeholder}
                  className="w-full h-24 p-4 rounded-2xl bg-white/5 border border-white/20 text-white placeholder-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent transition-all duration-300"
                />
                {reflections[prompt.id] && reflections[prompt.id].trim() !== '' && (
                  <motion.div
                    className="mt-2 flex items-center gap-2 text-green-400"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <span>✓</span>
                    <span className="text-sm">Beautiful reflection!</span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {completedReflections >= 3 && (
        <motion.div 
          className="bg-gradient-to-br from-pink-500/15 to-purple-500/15 rounded-3xl p-8 border border-pink-300/30 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-5xl mb-4">💝</div>
          <h4 className="text-2xl font-bold text-white mb-4">You're Doing Amazing!</h4>
          <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
            Look at you, taking the time to really think about your future! This kind of self-reflection 
            shows incredible maturity and wisdom. Whatever path you choose, you're going to do wonderful things.
          </p>
          
          <div className="bg-white/10 rounded-2xl p-6 max-w-xl mx-auto">
            <h5 className="text-lg font-semibold text-white mb-3">💫 Based on Your Reflections</h5>
            <p className="text-white/80 text-sm mb-4">
              Take a moment to read through your thoughts above. Which path do you find yourself 
              writing more passionately about? Which one makes your eyes light up when you imagine yourself doing that work?
            </p>
            <div className="text-pink-300 font-medium">
              Trust your instincts - they know more than you think! ✨
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}