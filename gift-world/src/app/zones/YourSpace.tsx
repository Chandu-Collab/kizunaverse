import { useState, useEffect, Suspense, useMemo } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { useNavigation } from '@/hooks/useNavigation';
import { motion } from 'framer-motion';
import ParticleBackground from '@/components/ui/ParticleBackground';
import Scene from '@/components/3d/Scene';
import GoaBeachScene from '@/components/3d/GoaBeachScene';
import ThemeToggle from '@/components/ui/ThemeToggle';
import WeatherControls from '@/components/ui/WeatherControls';
import { useWeatherSystem } from '@/components/3d/weather/WeatherSystem';
import { useCharacter } from '@/hooks/useCharacter';
import { useTheme } from '@/hooks/useTheme';
import { MoodType, JournalEntry } from '@/types';

const MOODS: { type: MoodType; emoji: string; label: string; color: string }[] = [
  { type: 'happy', emoji: '😊', label: 'Happy', color: '#FFD700' },
  { type: 'calm', emoji: '😌', label: 'Calm', color: '#87CEEB' },
  { type: 'excited', emoji: '🤩', label: 'Excited', color: '#FF69B4' },
  { type: 'thoughtful', emoji: '🤔', label: 'Thoughtful', color: '#9370DB' },
  { type: 'grateful', emoji: '🙏', label: 'Grateful', color: '#FFA500' },
  { type: 'loved', emoji: '💕', label: 'Loved', color: '#FF1493' },
];

// Enhanced Mood Theme System
const MOOD_THEMES = {
  happy: {
    background: 'linear-gradient(135deg, #FFD700, #FFA500, #FF6347)',
    particleColor: '#FFD700',
    glassBackground: 'rgba(255, 215, 0, 0.15)',
    textGlow: '#FFD700',
    shadowColor: '0 8px 32px rgba(255, 215, 0, 0.3)',
    description: 'Sunshine and golden warmth fill your space',
    particles: { count: 30, speed: 1.2, size: 0.8 }
  },
  calm: {
    background: 'linear-gradient(135deg, #87CEEB, #B0E0E6, #E0F6FF)',
    particleColor: '#87CEEB',
    glassBackground: 'rgba(135, 206, 235, 0.15)',
    textGlow: '#87CEEB',
    shadowColor: '0 8px 32px rgba(135, 206, 235, 0.3)',
    description: 'Peaceful waters and gentle serenity',
    particles: { count: 20, speed: 0.6, size: 0.6 }
  },
  excited: {
    background: 'linear-gradient(135deg, #FF69B4, #FF1493, #DC143C)',
    particleColor: '#FF69B4',
    glassBackground: 'rgba(255, 105, 180, 0.15)',
    textGlow: '#FF69B4',
    shadowColor: '0 8px 32px rgba(255, 105, 180, 0.3)',
    description: 'Electric energy and vibrant excitement',
    particles: { count: 40, speed: 1.8, size: 1.0 }
  },
  thoughtful: {
    background: 'linear-gradient(135deg, #9370DB, #8A2BE2, #4B0082)',
    particleColor: '#9370DB',
    glassBackground: 'rgba(147, 112, 219, 0.15)',
    textGlow: '#9370DB',
    shadowColor: '0 8px 32px rgba(147, 112, 219, 0.3)',
    description: 'Deep contemplation and inner wisdom',
    particles: { count: 25, speed: 0.8, size: 0.7 }
  },
  grateful: {
    background: 'linear-gradient(135deg, #FFA500, #FF8C00, #DAA520)',
    particleColor: '#FFA500',
    glassBackground: 'rgba(255, 165, 0, 0.15)',
    textGlow: '#FFA500',
    shadowColor: '0 8px 32px rgba(255, 165, 0, 0.3)',
    description: 'Warm appreciation and thankful heart',
    particles: { count: 35, speed: 1.0, size: 0.9 }
  },
  loved: {
    background: 'linear-gradient(135deg, #FF1493, #FF69B4, #FFB6C1)',
    particleColor: '#FF1493',
    glassBackground: 'rgba(255, 20, 147, 0.15)',
    textGlow: '#FF1493',
    shadowColor: '0 8px 32px rgba(255, 20, 147, 0.3)',
    description: 'Pure love and heartfelt connection',
    particles: { count: 50, speed: 1.4, size: 1.2 }
  }
};

export default function YourSpace() {
  const { navigateTo } = useNavigation();
  const { selectedCharacter, setSelectedCharacter } = useCharacter();
  const { isNight } = useTheme();
  const { weather, autoWeather, changeWeather, enableAutoWeather } = useWeatherSystem();
  const [activeTab, setActiveTab] = useState<'journal' | 'goa' | 'stats' | 'memories'>('goa');
  const [season, setSeason] = useState('summer'); // Beach default to summer
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [selectedMood, setSelectedMood] = useState<MoodType>('happy');
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [writingStreak, setWritingStreak] = useState(0);
  const [lastWriteDate, setLastWriteDate] = useState<string | null>(null);
  const [showStreakCelebration, setShowStreakCelebration] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'idle'>('idle');
  const [showMoodCalendar, setShowMoodCalendar] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [templateLoadedNotification, setTemplateLoadedNotification] = useState<string | null>(null);
  const [isAutoEnvironmentEnabled, setIsAutoEnvironmentEnabled] = useState(true);
  const [showWelcomeOverlay, setShowWelcomeOverlay] = useState(true);
  
  // Timeout references
  let typingTimeout: NodeJS.Timeout;
  let autoSaveTimeout: NodeJS.Timeout;
  
  // Automatic Season and Weather Cycling (Every 30 seconds)
  useEffect(() => {
    if (!isAutoEnvironmentEnabled) return;
    
    const seasons = ['spring', 'summer', 'autumn', 'winter'];
    // Only use WeatherType values
    const weathers = ['sunny', 'cloudy', 'rainy', 'monsoon', 'winter'];
    
    const seasonTimer = setInterval(() => {
      const currentSeasonIndex = seasons.indexOf(season);
      const nextSeasonIndex = (currentSeasonIndex + 1) % seasons.length;
      setSeason(seasons[nextSeasonIndex]);
    }, 30000); // 30 seconds
    
    const weatherTimer = setInterval(() => {
      const currentWeatherIndex = weathers.indexOf(weather);
      const nextWeatherIndex = (currentWeatherIndex + 1) % weathers.length;
      changeWeather(weathers[nextWeatherIndex] as any); // WeatherType enforced
    }, 30000); // 30 seconds
    
    return () => {
      clearInterval(seasonTimer);
      clearInterval(weatherTimer);
    };
  }, [season, weather, isAutoEnvironmentEnabled, changeWeather]);
  
  // Get current mood theme
  const currentMoodTheme = MOOD_THEMES[selectedMood];

  // Enhanced typing handler with micro-interactions and beach time acceleration
  const handleEntryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setCurrentEntry(text);
    setWordCount(text.trim().split(/\s+/).filter(word => word.length > 0).length);
    setCharCount(text.length);
    
    // Typing indicator
    setIsTyping(true);
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => setIsTyping(false), 1000);
    
    // Trigger beach time progression when user is actively writing
    if (text.length > currentEntry.length && activeTab === 'goa') {
      // User is adding content and goa tab is active - accelerate time
      window.dispatchEvent(new CustomEvent('accelerateBeachTime'));
    }
    
    // Auto-save draft
    if (text.trim().length > 0) {
      setAutoSaveStatus('saving');
      clearTimeout(autoSaveTimeout);
      autoSaveTimeout = setTimeout(() => {
        localStorage.setItem('draftEntry', text);
        setAutoSaveStatus('saved');
        setTimeout(() => setAutoSaveStatus('idle'), 2000);
      }, 800);
    }
  };

  // Load draft on component mount
  useEffect(() => {
    const draft = localStorage.getItem('draftEntry');
    if (draft && !currentEntry) {
      setCurrentEntry(draft);
      setWordCount(draft.trim().split(/\s+/).filter(word => word.length > 0).length);
      setCharCount(draft.length);
    }
  }, []);

  // Enhanced Statistics Calculations
  const calculateDetailedStats = (entries: JournalEntry[]) => {
    if (entries.length === 0) return null;

    const totalWords = entries.reduce((sum, entry) => {
      return sum + entry.content.trim().split(/\s+/).filter(word => word.length > 0).length;
    }, 0);

    const totalCharacters = entries.reduce((sum, entry) => sum + entry.content.length, 0);
    const averageWordsPerEntry = Math.round(totalWords / entries.length);
    const averageCharsPerEntry = Math.round(totalCharacters / entries.length);

    // Mood distribution
    const moodCounts = entries.reduce((counts, entry) => {
      counts[entry.mood] = (counts[entry.mood] || 0) + 1;
      return counts;
    }, {} as Record<string, number>);

    const mostFrequentMood = Object.entries(moodCounts).reduce((a, b) => 
      moodCounts[a[0]] > moodCounts[b[0]] ? a : b
    )[0];

    // Time analysis
    const entriesByHour = entries.reduce((hours, entry) => {
      const hour = new Date(entry.date).getHours();
      hours[hour] = (hours[hour] || 0) + 1;
      return hours;
    }, {} as Record<number, number>);

    const mostActiveHour = Object.entries(entriesByHour).reduce((a, b) => 
      entriesByHour[Number(a[0])] > entriesByHour[Number(b[0])] ? a : b
    )[0];

    // Weekly pattern
    const entriesByDay = entries.reduce((days, entry) => {
      const dayName = new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long' });
      days[dayName] = (days[dayName] || 0) + 1;
      return days;
    }, {} as Record<string, number>);

    const mostActiveDay = Object.entries(entriesByDay).reduce((a, b) => 
      entriesByDay[a[0]] > entriesByDay[b[0]] ? a : b
    )[0];

    // Recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentEntries = entries.filter(entry => new Date(entry.date) >= sevenDaysAgo);

    // Longest entry
    const longestEntry = entries.reduce((longest, entry) => 
      entry.content.length > longest.content.length ? entry : longest
    );

    return {
      totalEntries: entries.length,
      totalWords,
      totalCharacters,
      averageWordsPerEntry,
      averageCharsPerEntry,
      mostFrequentMood,
      moodDistribution: moodCounts,
      mostActiveHour: Number(mostActiveHour),
      mostActiveDay,
      recentEntriesCount: recentEntries.length,
      longestEntryWords: longestEntry.content.trim().split(/\s+/).filter(word => word.length > 0).length,
      longestEntryDate: new Date(longestEntry.date).toLocaleDateString(),
      entriesByDay
    };
  };

  // Calculate detailed stats from entries  
  const detailedStats = useMemo(() => {
    return calculateDetailedStats(journalEntries);
  }, [journalEntries]);

  // Clear current entry function
  const clearEntry = () => {
    setCurrentEntry('');
    setWordCount(0);
    setCharCount(0);
    setSelectedMood('happy');
    localStorage.removeItem('draftEntry');
  };

  // Load template function with notification
  const loadTemplate = (template: any) => {
    setSelectedMood(template.mood);
    setCurrentEntry(template.content);
    setWordCount(template.content.trim().split(/\s+/).filter((word: string) => word.length > 0).length);
    setCharCount(template.content.length);
    setShowTemplates(false);
    setActiveTab('journal');
    setTemplateLoadedNotification(template.title);
    setTimeout(() => setTemplateLoadedNotification(null), 3000);
  };

  // Quick Entry Templates System
  const journalTemplates = [
    {
      id: 'daily-reflection',
      title: '🌅 Daily Reflection',
      description: 'Reflect on your day with guided questions',
      mood: 'thoughtful' as MoodType,
      content: `📅 Today's Date: ${new Date().toLocaleDateString()}\n\n🌟 **What made today special?**\n\n\n🎯 **Key accomplishments:**\n- \n- \n- \n\n💭 **What I learned:**\n\n\n❤️ **Grateful for:**\n\n\n🔮 **Tomorrow I will:**\n\n\n✨ **Overall mood:** `,
      category: 'Daily'
    },
    {
      id: 'gratitude-practice',
      title: '🙏 Gratitude Practice',
      description: 'Count your blessings and appreciate life',
      mood: 'grateful' as MoodType,
      content: `🌺 **Three things I'm grateful for today:**\n\n1. **Big gratitude:**\n   \n\n2. **Small joy:**\n   \n\n3. **Person I appreciate:**\n   \n\n💖 **Why these matter to me:**\n\n\n🌟 **How gratitude changed my perspective:**\n\n\n🫶 **Gratitude affirmation:**\n"I am thankful for..."`,
      category: 'Mindfulness'
    },
    {
      id: 'goal-setting',
      title: '🎯 Goal Setting',
      description: 'Plan and track your aspirations',
      mood: 'excited' as MoodType,
      content: `🚀 **Dream/Goal:** \n\n\n📋 **Action Steps:**\n1. \n2. \n3. \n4. \n5. \n\n⏰ **Timeline:**\n- Short-term (1 month): \n- Medium-term (3 months): \n- Long-term (1 year): \n\n🎉 **Success looks like:**\n\n\n💪 **My commitment:**\n"I will..."`,
      category: 'Planning'
    },
    {
      id: 'mood-check',
      title: '💭 Mood Check-in',
      description: 'Explore and understand your current emotions',
      mood: 'calm' as MoodType,
      content: `🌡️ **Current mood:** \n\n🎨 **If my mood had a color, it would be:** \n\n🌤️ **What influenced this mood:**\n\n\n🔍 **Physical sensations I notice:**\n\n\n🌱 **What my mood is telling me:**\n\n\n🛠️ **How I can nurture myself:**\n\n\n💝 **Kind words for myself:**\n`,
      category: 'Emotional'
    },
    {
      id: 'creative-burst',
      title: '✨ Creative Burst',
      description: 'Free-flowing creative expression',
      mood: 'excited' as MoodType,
      content: `🎨 **Creative prompt:** Write about anything that sparks joy!\n\n💫 **Stream of consciousness:**\n(Let your thoughts flow freely without editing)\n\n\n🌈 **Colors of my imagination:**\n\n\n🎭 **If I could create anything today:**\n\n\n✍️ **Random thoughts and ideas:**\n\n\n🔥 **Creative energy feels like:**\n`,
      category: 'Creative'
    },
    {
      id: 'problem-solving',
      title: '🧩 Problem Solving',
      description: 'Work through challenges systematically',
      mood: 'thoughtful' as MoodType,
      content: `❓ **Challenge I'm facing:**\n\n\n🔍 **Current situation:**\n\n\n💡 **Possible solutions:**\n1. \n2. \n3. \n4. \n\n⚖️ **Pros and cons:**\n\n\n🎯 **Best next step:**\n\n\n🤝 **Who could help:**\n\n\n✅ **Action plan:**\n`,
      category: 'Problem-Solving'
    },
    {
      id: 'love-letter',
      title: '💕 Love & Appreciation',
      description: 'Express love for someone special',
      mood: 'loved' as MoodType,
      content: `💖 **Dear [Name],**\n\n🌟 **What I love about you:**\n\n\n📚 **Favorite memory together:**\n\n\n🎁 **How you've impacted my life:**\n\n\n🌺 **Things I admire:**\n\n\n🫶 **What I want you to know:**\n\n\n💝 **With all my love,**\n[Your name]`,
      category: 'Relationships'
    },
    {
      id: 'weekend-vibes',
      title: '🌴 Weekend Vibes',
      description: 'Capture your weekend energy and plans',
      mood: 'happy' as MoodType,
      content: `🎉 **Weekend mood:** \n\n🌞 **Perfect weekend would include:**\n\n\n🎨 **Fun activities planned:**\n- \n- \n- \n\n😌 **How I want to recharge:**\n\n\n👥 **People I want to spend time with:**\n\n\n🌟 **One thing to make this weekend special:**\n\n\n✨ **Weekend mantra:**\n"This weekend I choose..."`,
      category: 'Lifestyle'
    }
  ];

  // Template Selection Component
  const TemplateSelector = () => {
    const categories = [...new Set(journalTemplates.map(t => t.category))];
    const [selectedCategory, setSelectedCategory] = useState<string>('Daily');
    
    const filteredTemplates = journalTemplates.filter(t => t.category === selectedCategory);
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={(e) => e.target === e.currentTarget && setShowTemplates(false)}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
          style={{
            background: currentMoodTheme.glassBackground,
            boxShadow: currentMoodTheme.shadowColor,
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: currentMoodTheme.textGlow }}>
                📝 Quick Entry Templates
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Choose a template to jumpstart your journaling
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowTemplates(false)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <span className="text-2xl">✖️</span>
            </motion.button>
          </div>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/10'
                }`}
                style={{
                  background: selectedCategory === category ? currentMoodTheme.particleColor : 'transparent',
                  boxShadow: selectedCategory === category ? currentMoodTheme.shadowColor : 'none'
                }}
              >
                {category}
              </motion.button>
            ))}
          </div>
          
          {/* Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="glass rounded-lg p-4 cursor-pointer border transition-all duration-300"
                style={{
                  background: MOOD_THEMES[template.mood].glassBackground,
                  borderColor: `${MOOD_THEMES[template.mood].particleColor}30`,
                }}
                onClick={() => {
                  loadTemplate(template);
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{MOODS.find(m => m.type === template.mood)?.emoji}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2" style={{ color: MOOD_THEMES[template.mood].textGlow }}>
                      {template.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {template.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-2 py-1 rounded-full" style={{
                        background: `${MOOD_THEMES[template.mood].particleColor}20`,
                        color: MOOD_THEMES[template.mood].textGlow
                      }}>
                        {template.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        ~{template.content.split('\n').length} prompts
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Custom Template Option */}
          <motion.div
            className="mt-6 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center"
            whileHover={{ borderColor: currentMoodTheme.particleColor }}
          >
            <div className="text-3xl mb-2">➕</div>
            <h3 className="font-semibold mb-2" style={{ color: currentMoodTheme.textGlow }}>Create Custom Template</h3>
            <p className="text-gray-600 text-sm mb-3">
              Want to create your own template? Coming soon!
            </p>
            <button 
              className="text-sm px-4 py-2 rounded-lg opacity-50 cursor-not-allowed"
              style={{
                background: `${currentMoodTheme.particleColor}20`,
                color: currentMoodTheme.textGlow
              }}
              disabled
            >
              🚧 Coming Soon
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };

  // Statistics Dashboard Component
  const StatsDashboard = () => {
    if (!detailedStats) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">No Data Yet</h3>
          <p className="text-gray-500">Start writing to see your amazing journey statistics!</p>
        </motion.div>
      );
    }

    const moodEmojis: Record<string, string> = {
      happy: '😊', calm: '😌', excited: '🤩', 
      thoughtful: '🤔', grateful: '🙏', loved: '💕'
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div 
            className="glass rounded-lg p-4 text-center"
            style={{
              background: currentMoodTheme.glassBackground,
              boxShadow: currentMoodTheme.shadowColor,
            }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl font-bold" style={{ color: currentMoodTheme.textGlow }}>
              {detailedStats.totalEntries}
            </div>
            <div className="text-sm text-gray-600">Total Entries</div>
          </motion.div>

          <motion.div 
            className="glass rounded-lg p-4 text-center"
            style={{
              background: currentMoodTheme.glassBackground,
              boxShadow: currentMoodTheme.shadowColor,
            }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl font-bold" style={{ color: currentMoodTheme.textGlow }}>
              {detailedStats.totalWords.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Words Written</div>
          </motion.div>

          <motion.div 
            className="glass rounded-lg p-4 text-center"
            style={{
              background: currentMoodTheme.glassBackground,
              boxShadow: currentMoodTheme.shadowColor,
            }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl font-bold" style={{ color: currentMoodTheme.textGlow }}>
              {writingStreak}
            </div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </motion.div>

          <motion.div 
            className="glass rounded-lg p-4 text-center"
            style={{
              background: currentMoodTheme.glassBackground,
              boxShadow: currentMoodTheme.shadowColor,
            }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl font-bold" style={{ color: currentMoodTheme.textGlow }}>
              {detailedStats.averageWordsPerEntry}
            </div>
            <div className="text-sm text-gray-600">Avg Words/Entry</div>
          </motion.div>
        </div>

        {/* Mood Analysis */}
        <motion.div 
          className="glass rounded-lg p-6"
          style={{
            background: currentMoodTheme.glassBackground,
            boxShadow: currentMoodTheme.shadowColor,
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-bold mb-4" style={{ color: currentMoodTheme.textGlow }}>
            🎭 Mood Analysis
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Most Frequent Mood</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{moodEmojis[detailedStats.mostFrequentMood]}</span>
                <span className="font-semibold capitalize">{detailedStats.mostFrequentMood}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Mood Distribution</p>
              <div className="space-y-1">
                {Object.entries(detailedStats.moodDistribution)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 3)
                  .map(([mood, count]) => (
                    <div key={mood} className="flex items-center gap-2 text-sm">
                      <span>{moodEmojis[mood]}</span>
                      <span className="capitalize">{mood}</span>
                      <span className="ml-auto font-semibold">{count}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Writing Patterns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            className="glass rounded-lg p-6"
            style={{
              background: currentMoodTheme.glassBackground,
              boxShadow: currentMoodTheme.shadowColor,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-bold mb-4" style={{ color: currentMoodTheme.textGlow }}>
              ⏰ Time Patterns
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Most Active Hour</p>
                <p className="font-semibold">
                  {detailedStats.mostActiveHour === 0 ? '12:00 AM' : 
                   detailedStats.mostActiveHour === 12 ? '12:00 PM' :
                   detailedStats.mostActiveHour > 12 ? 
                     `${detailedStats.mostActiveHour - 12}:00 PM` : 
                     `${detailedStats.mostActiveHour}:00 AM`}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Most Active Day</p>
                <p className="font-semibold">{detailedStats.mostActiveDay}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Recent Activity (7 days)</p>
                <p className="font-semibold">{detailedStats.recentEntriesCount} entries</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="glass rounded-lg p-6"
            style={{
              background: currentMoodTheme.glassBackground,
              boxShadow: currentMoodTheme.shadowColor,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-bold mb-4" style={{ color: currentMoodTheme.textGlow }}>
              🏆 Achievements
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Longest Entry</p>
                <p className="font-semibold">
                  {detailedStats.longestEntryWords} words
                </p>
                <p className="text-xs text-gray-500">
                  Written on {detailedStats.longestEntryDate}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Characters</p>
                <p className="font-semibold">
                  {detailedStats.totalCharacters.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">{getStreakBadge(writingStreak).emoji}</span>
                <div>
                  <p className="text-sm font-semibold">{getStreakBadge(writingStreak).title}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Weekly Activity Chart */}
        <motion.div 
          className="glass rounded-lg p-6"
          style={{
            background: currentMoodTheme.glassBackground,
            boxShadow: currentMoodTheme.shadowColor,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-bold mb-4" style={{ color: currentMoodTheme.textGlow }}>
            📅 Weekly Activity Pattern
          </h3>
          <div className="grid grid-cols-7 gap-2">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
              const count = detailedStats.entriesByDay[day] || 0;
              const maxCount = Math.max(...Object.values(detailedStats.entriesByDay));
              const height = maxCount > 0 ? (count / maxCount) * 100 : 0;
              
              return (
                <div key={day} className="text-center">
                  <div className="mb-2 flex items-end justify-center h-20">
                    <motion.div 
                      className="w-full rounded-t"
                      style={{ 
                        height: `${height}%`,
                        backgroundColor: currentMoodTheme.textGlow,
                        opacity: 0.7
                      }}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    />
                  </div>
                  <div className="text-xs text-gray-500">{day.slice(0, 3)}</div>
                  <div className="text-sm font-semibold">{count}</div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Writing Streak System
  const calculateWritingStreak = (entries: JournalEntry[]) => {
    if (entries.length === 0) return 0;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const sortedEntries = entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    let streak = 0;
    let currentDate = today;
    
    for (const entry of sortedEntries) {
      const entryDate = new Date(entry.date);
      entryDate.setHours(0, 0, 0, 0);
      
      const diffDays = Math.floor((currentDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === streak) {
        streak++;
        currentDate = new Date(entryDate.getTime() - 24 * 60 * 60 * 1000);
      } else {
        break;
      }
    }
    
    return streak;
  };

  const getStreakBadge = (streak: number) => {
    if (streak >= 30) return { emoji: '🏆', title: 'Legendary Writer', color: '#FFD700' };
    if (streak >= 14) return { emoji: '🔥', title: 'On Fire', color: '#FF4500' };
    if (streak >= 7) return { emoji: '⭐', title: 'Week Warrior', color: '#FF69B4' };
    if (streak >= 3) return { emoji: '🌟', title: 'Getting Started', color: '#87CEEB' };
    return { emoji: '✨', title: 'Begin Journey', color: '#9370DB' };
  };

  const showStreakCelebrationEffect = (newStreak: number) => {
    if (newStreak > writingStreak && [3, 7, 14, 30].includes(newStreak)) {
      setShowStreakCelebration(true);
      setTimeout(() => setShowStreakCelebration(false), 3000);
    }
  };

  // Custom Mood-based Particle Component
  const MoodParticles = ({ theme }: { theme: typeof MOOD_THEMES.happy }) => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: theme.particles.count }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-60"
            style={{
              backgroundColor: theme.particleColor,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [theme.particles.size * 0.5, theme.particles.size, theme.particles.size * 0.3],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 4 / theme.particles.speed,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  };

  // Mood Calendar Component
  const MoodCalendar = () => {
    const getCurrentMonth = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      return { year, month };
    };

    const { year, month } = getCurrentMonth();
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const getDaysInMonth = (year: number, month: number) => {
      return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year: number, month: number) => {
      return new Date(year, month, 1).getDay();
    };

    const getDayMood = (day: number) => {
      const targetDate = new Date(year, month, day).toDateString();
      const entry = journalEntries.find(entry => 
        new Date(entry.date).toDateString() === targetDate
      );
      return entry ? entry.mood : null;
    };

    const getMoodStats = () => {
      const monthEntries = journalEntries.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate.getFullYear() === year && entryDate.getMonth() === month;
      });

      const moodCounts = MOODS.reduce((acc, mood) => {
        acc[mood.type] = monthEntries.filter(entry => entry.mood === mood.type).length;
        return acc;
      }, {} as Record<MoodType, number>);

      const totalEntries = monthEntries.length;
      const mostCommonMood = Object.keys(moodCounts).reduce((a, b) => 
        moodCounts[a as MoodType] > moodCounts[b as MoodType] ? a : b
      ) as MoodType;

      return { moodCounts, totalEntries, mostCommonMood };
    };

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const { moodCounts, totalEntries, mostCommonMood } = getMoodStats();
    const mostCommonMoodData = MOODS.find(m => m.type === mostCommonMood);

    // Create calendar grid
    const calendarDays = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(null);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(day);
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={() => setShowMoodCalendar(false)}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="enhanced-glass rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
          onClick={(e) => e.stopPropagation()}
          style={{
            background: currentMoodTheme.glassBackground,
            border: `1px solid ${currentMoodTheme.particleColor}40`,
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <motion.h2 
              className="text-2xl font-bold text-white"
              style={{
                textShadow: `0 0 20px ${currentMoodTheme.textGlow}`,
              }}
            >
              📅 {monthNames[month]} {year}
            </motion.h2>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowMoodCalendar(false)}
              className="text-white/60 hover:text-white text-xl"
            >
              ✕
            </motion.button>
          </div>

          {/* Month Stats */}
          {totalEntries > 0 && (
            <motion.div
              className="mb-6 p-4 rounded-lg"
              style={{
                background: `${mostCommonMoodData?.color}20`,
                border: `1px solid ${mostCommonMoodData?.color}40`,
              }}
              animate={{
                boxShadow: `0 0 20px ${mostCommonMoodData?.color}30`,
              }}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">
                  {mostCommonMoodData?.emoji}
                </div>
                <div className="text-white font-semibold">
                  This Month's Vibe: {mostCommonMoodData?.label}
                </div>
                <div className="text-white/70 text-sm mt-1">
                  {totalEntries} entries this month
                </div>
              </div>
            </motion.div>
          )}

          {/* Day Labels */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
              <div key={i} className="text-center text-white/60 text-sm font-medium p-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              if (!day) return <div key={index} className="p-2" />; // Empty cell

              const dayMood = getDayMood(day);
              const moodData = dayMood ? MOODS.find(m => m.type === dayMood) : null;
              const isToday = day === new Date().getDate() && 
                             month === new Date().getMonth() && 
                             year === new Date().getFullYear();

              return (
                <motion.div
                  key={day}
                  className={`relative p-2 rounded-lg text-center text-sm font-medium transition-all cursor-pointer ${
                    isToday ? 'ring-2 ring-yellow-400' : ''
                  }`}
                  style={{
                    background: moodData 
                      ? `${moodData.color}30` 
                      : 'rgba(255,255,255,0.05)',
                    color: moodData ? 'white' : 'rgba(255,255,255,0.6)',
                  }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: moodData 
                      ? `${moodData.color}50` 
                      : 'rgba(255,255,255,0.1)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div>{day}</div>
                  {moodData && (
                    <motion.div
                      className="absolute -top-1 -right-1 text-xs"
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {moodData.emoji}
                    </motion.div>
                  )}
                  {isToday && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full"
                      animate={{
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                      }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Mood Legend */}
          <div className="mt-6 pt-4 border-t border-white/20">
            <div className="text-white/90 text-sm font-medium mb-3">Mood Legend</div>
            <div className="grid grid-cols-3 gap-2">
              {MOODS.map((mood) => (
                <motion.div
                  key={mood.type}
                  className="flex items-center gap-2 p-2 rounded-lg"
                  style={{
                    background: `${mood.color}20`,
                  }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: `${mood.color}30`,
                  }}
                >
                  <span className="text-sm">{mood.emoji}</span>
                  <div className="flex flex-col">
                    <span className="text-white text-xs font-medium">{mood.label}</span>
                    <span className="text-white/60 text-xs">
                      {moodCounts[mood.type] || 0}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {totalEntries === 0 && (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📝</div>
              <div className="text-white/70">
                Start journaling to see your mood patterns!
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    );
  };

  useEffect(() => {
    // Load from localStorage
    const savedEntries = localStorage.getItem('journalEntries');
    const savedMessages = localStorage.getItem('messages');
    const savedStreak = localStorage.getItem('writingStreak');
    const savedLastWriteDate = localStorage.getItem('lastWriteDate');
    
    if (savedEntries) {
      const entries = JSON.parse(savedEntries);
      setJournalEntries(entries);
      
      // Calculate current streak
      const currentStreak = calculateWritingStreak(entries);
      setWritingStreak(currentStreak);
    }
    
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
    
    if (savedStreak) {
      setWritingStreak(parseInt(savedStreak));
    }
    
    if (savedLastWriteDate) {
      setLastWriteDate(savedLastWriteDate);
    }
  }, []);

  const saveJournalEntry = () => {
    if (!currentEntry.trim()) return;

    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      content: currentEntry,
      mood: selectedMood,
    };

    const updatedEntries = [entry, ...journalEntries].slice(0, 10); // Keep last 10
    setJournalEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    
    // Update writing streak
    const newStreak = calculateWritingStreak(updatedEntries);
    showStreakCelebrationEffect(newStreak);
    setWritingStreak(newStreak);
    
    const today = new Date().toDateString();
    setLastWriteDate(today);
    localStorage.setItem('writingStreak', newStreak.toString());
    localStorage.setItem('lastWriteDate', today);
    
    // Clear draft and reset counters
    localStorage.removeItem('draftEntry');
    setCurrentEntry('');
    setWordCount(0);
    setCharCount(0);
    setAutoSaveStatus('idle');
    setIsTyping(false);
  };

  const addMessage = () => {
    if (!newMessage.trim()) return;
    const updatedMessages = [newMessage, ...messages].slice(0, 5); // Keep last 5
    setMessages(updatedMessages);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
    setNewMessage('');
  };

  return (
    <div className={`relative w-full h-screen overflow-hidden transition-all duration-1000 ${
      isNight 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50'
    }`}>
      <ThemeToggle />
      {/* Enhanced Glassmorphism Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, ${currentMoodTheme.particleColor}, ${currentMoodTheme.particleColor}aa);
          border-radius: 3px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${currentMoodTheme.particleColor};
        }
        
        .enhanced-glass {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.05) 50%,
            rgba(255, 255, 255, 0.1) 100%
          );
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1);
        }
        
        .enhanced-glass:hover {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0.08) 50%,
            rgba(255, 255, 255, 0.15) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
          box-shadow: 
            0 12px 40px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1);
        }
        
        .super-glass {
          background: linear-gradient(135deg,
            ${currentMoodTheme.glassBackground} 0%,
            rgba(255, 255, 255, 0.05) 50%,
            ${currentMoodTheme.glassBackground} 100%
          );
          backdrop-filter: blur(25px) saturate(200%);
          border: 1px solid ${currentMoodTheme.particleColor}40;
          box-shadow: 
            ${currentMoodTheme.shadowColor},
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 ${currentMoodTheme.particleColor}20;
        }
      `}</style>
      {/* Enhanced Day/Night Atmospheric Background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isNight
            ? 'radial-gradient(circle at center, rgba(30, 58, 138, 0.4) 0%, rgba(15, 23, 42, 0.8) 100%)'
            : 'radial-gradient(circle at center, rgba(147, 197, 253, 0.3) 0%, rgba(219, 234, 254, 0.6) 100%)',
        }}
        animate={{
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Mood-based Background for Journal Tab */}
      {activeTab === 'journal' && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: currentMoodTheme.background,
            opacity: isNight ? 0.4 : 0.3,
          }}
          animate={{
            opacity: isNight ? [0.4, 0.6, 0.4] : [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
      
      {/* Mood-based Particles for Journal Tab */}
      {activeTab === 'journal' && <MoodParticles theme={currentMoodTheme} />}
      
      {/* Default Particle Background for other states */}
      {activeTab === 'journal' || <ParticleBackground />}
      
      {/* Enhanced Tab Navigation with Day/Night Adaptive Styling */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className={`relative flex glass rounded-2xl p-2 backdrop-blur-lg shadow-2xl transition-all duration-700 ${
          isNight 
            ? 'border border-purple-400/30 bg-slate-800/40' 
            : 'border border-white/20 bg-white/10'
        }`}>
          {/* Sliding Background Indicator */}
          <motion.div
            className="absolute top-2 bottom-2 rounded-xl shadow-lg"
            style={{
              background: activeTab === 'goa' 
                ? 'linear-gradient(135deg, #FF6B35, #F7931E, #FFD23F)' 
                : activeTab === 'journal'
                ? 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)'
                : activeTab === 'stats'
                ? 'linear-gradient(135deg, #4facfe, #00f2fe)'
                : 'linear-gradient(135deg, #fa709a, #fee140)',
            }}
            animate={{
              left: activeTab === 'goa' ? '8px' : 
                    activeTab === 'journal' ? '25%' :
                    activeTab === 'stats' ? '50%' : '75%',
              width: '23%',
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.3 
            }}
          />
          
          {/* Goa Beach Tab */}
          <motion.button
            whileHover={{ 
              scale: 1.02,
              y: -1
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('goa')}
            className={`relative z-10 px-6 py-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === 'goa'
                ? 'text-white shadow-lg'
                : 'text-white/80 hover:text-white'
            }`}
          >
            <motion.div 
              className="flex items-center gap-2"
              animate={{ 
                y: activeTab === 'goa' ? [0, -2, 0] : 0 
              }}
              transition={{ 
                duration: 0.6,
                repeat: activeTab === 'goa' ? Infinity : 0,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              <span className="text-lg">🏖️</span>
              <span>Goa</span>
            </motion.div>
            {activeTab === 'goa' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full shadow-lg"
              />
            )}
          </motion.button>
          
          {/* Journal Tab */}
          <motion.button
            whileHover={{ 
              scale: 1.02,
              y: -1
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('journal')}
            className={`relative z-10 px-6 py-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === 'journal'
                ? 'text-white shadow-lg'
                : 'text-white/80 hover:text-white'
            }`}
          >
            <motion.div 
              className="flex items-center gap-2"
              animate={{ 
                y: activeTab === 'journal' ? [0, -2, 0] : 0 
              }}
              transition={{ 
                duration: 0.6,
                repeat: activeTab === 'journal' ? Infinity : 0,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              <span className="text-lg">💌</span>
              <span>Journal</span>
            </motion.div>
            {activeTab === 'journal' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full shadow-lg"
              />
            )}
          </motion.button>
          
          {/* Stats Tab */}
          <motion.button
            whileHover={{ 
              scale: 1.02,
              y: -1
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('stats')}
            className={`relative z-10 px-6 py-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === 'stats'
                ? 'text-white shadow-lg'
                : 'text-white/80 hover:text-white'
            }`}
          >
            <motion.div 
              className="flex items-center gap-2"
              animate={{ 
                y: activeTab === 'stats' ? [0, -2, 0] : 0 
              }}
              transition={{ 
                duration: 0.6,
                repeat: activeTab === 'stats' ? Infinity : 0,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              <span className="text-lg">📊</span>
              <span>Stats</span>
            </motion.div>
            {activeTab === 'stats' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full shadow-lg"
              />
            )}
          </motion.button>
          
          {/* Memories Tab */}
          <motion.button
            whileHover={{ 
              scale: 1.02,
              y: -1
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('memories')}
            className={`relative z-10 px-6 py-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === 'memories'
                ? 'text-white shadow-lg'
                : 'text-white/80 hover:text-white'
            }`}
          >
            <motion.div 
              className="flex items-center gap-2"
              animate={{ 
                y: activeTab === 'memories' ? [0, -2, 0] : 0 
              }}
              transition={{ 
                duration: 0.6,
                repeat: activeTab === 'memories' ? Infinity : 0,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              <span className="text-lg">📖</span>
              <span>Memories</span>
            </motion.div>
            {activeTab === 'memories' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full shadow-lg"
              />
            )}
          </motion.button>
          
          {/* Sparkle Effects */}
          <div className="absolute -inset-1 opacity-20">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${20 + (i % 2) * 60}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {activeTab === 'goa' ? (
        <div className="relative h-full">
          <Suspense fallback={
            <div className="h-full flex items-center justify-center">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
                <p>Loading beautiful Goa...</p>
              </div>
            </div>
          }>
            <div className="h-full">
              <Scene cameraPosition={[0, 5, 10]}>
                <GoaBeachScene 
                  season={season} 
                  weather={weather} 
                  character={selectedCharacter}
                />
              </Scene>
            </div>
          </Suspense>
          
          {/* Enhanced Beach Overlay with Character & Environment Controls */}
          {showWelcomeOverlay && (
          <div className="absolute top-20 left-4 max-w-md">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-lg p-4 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowWelcomeOverlay(false)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-lg px-3 py-1.5 text-sm font-bold transition-all duration-200 hover:scale-110 shadow-md z-50"
                title="Close welcome overlay"
              >
                ✕ Close
              </button>
              
              <h1 className="text-2xl font-bold text-white mb-2">
                🏖️ Welcome to Goa {isNight ? '🌙' : '☀️'}
              </h1>
              <p className="text-white/90 text-sm mb-4">
                Experience the {isNight ? 'moonlit beaches' : 'sun-kissed shores'} of Goa - a dream destination filled with palm trees, 
                gentle waves, and peaceful vibes. This special place represents achievements and 
                beautiful memories {isNight ? 'under the stars' : 'in golden sunlight'}.
              </p>
              
              {/* Character Selection - prominently displayed */}
              <div className="mb-4">
                <label className="text-white/80 text-sm mb-2 block">Choose Your Avatar:</label>
                <div className="flex gap-3">
                  {[{id: 'priya', name: 'Priya', emoji: '👩'}, {id: 'ururu', name: 'Ururu', emoji: '👨'}, {id: 'galaxia', name: 'Galaxia', emoji: '👸'}].map((char) => (
                    <motion.button
                      key={char.id}
                      onClick={() => setSelectedCharacter(char.id as any)}
                      className={`flex flex-col items-center p-2 rounded-lg transition-all duration-300 ${
                        selectedCharacter === char.id 
                          ? 'bg-white/30 shadow-lg scale-105 border-2 border-white/50'
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-2xl">{char.emoji}</span>
                      <span className="text-white text-xs mt-1">{char.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* Auto Environment Toggle */}
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">Auto Environment:</span>
                  <motion.button
                    onClick={() => setIsAutoEnvironmentEnabled(!isAutoEnvironmentEnabled)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                      isAutoEnvironmentEnabled 
                        ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' 
                        : 'bg-gray-500 text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isAutoEnvironmentEnabled ? '✓ ON (30s)' : '✗ OFF'}
                  </motion.button>
                </div>
                <p className="text-white/60 text-xs mt-1">
                  {isAutoEnvironmentEnabled ? 'Season & weather change every 30 seconds' : 'Manual control enabled'}
                </p>
              </div>
              
              {/* Enhanced Environment Status Display with Auto-Change Indicators */}
              <motion.div
                className={`backdrop-blur-sm rounded-lg p-3 mb-4 transition-all duration-700 ${
                  isNight 
                    ? 'bg-slate-800/40 border border-purple-400/40'
                    : 'bg-white/20 border border-white/30'
                }`}
                animate={{
                  boxShadow: isNight 
                    ? ['0 0 10px rgba(147, 51, 234, 0.4)', '0 0 25px rgba(147, 51, 234, 0.6)', '0 0 10px rgba(147, 51, 234, 0.4)']
                    : ['0 0 10px rgba(255,255,255,0.3)', '0 0 20px rgba(255,255,255,0.5)', '0 0 10px rgba(255,255,255,0.3)'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="grid grid-cols-2 gap-3 text-white/90 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🌡️</span>
                    <div>
                      <div className="font-semibold">Season {isAutoEnvironmentEnabled && '🔄'}</div>
                      <div className="text-xs opacity-80 capitalize">{season}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {weather === 'sunny' && '☀️'}
                      {weather === 'rainy' && '🌧️'}
                      {weather === 'cloudy' && '☁️'}
                      {weather === 'monsoon' && '⛈️'}
                      {weather === 'winter' && '❄️'}
                    </span>
                    <div>
                      <div className="font-semibold">Weather {isAutoEnvironmentEnabled && '🔄'}</div>
                      <div className="text-xs opacity-80 capitalize">{weather}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{isNight ? '🌙' : '☀️'}</span>
                    <div>
                      <div className="font-semibold">Time</div>
                      <div className="text-xs opacity-80">{isNight ? 'Night' : 'Day'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {selectedCharacter === 'priya' && '👩'}
                      {selectedCharacter === 'ururu' && '👨'}
                      {selectedCharacter === 'galaxia' && '👸'}
                    </span>
                    <div>
                      <div className="font-semibold">Avatar</div>
                      <div className="text-xs opacity-80 capitalize">{selectedCharacter}</div>
                    </div>
                  </div>
                </div>
                
                {/* Next Change Timer (only when auto is enabled) */}
                {isAutoEnvironmentEnabled && (
                  <div className="mt-2 pt-2 border-t border-white/20">
                    <div className="flex items-center gap-2 text-xs text-white/70">
                      <span>🕐</span>
                      <span>Changes every 30 seconds</span>
                    </div>
                  </div>
                )}
                
                <div className="mt-3 pt-3 border-t border-white/20">
                  <div className="text-white/80 text-xs text-center">
                    💡 <strong>Tip:</strong> Use controls in the top corners to change season, weather, and time!
                    {autoWeather && ' Weather changes automatically.'}
                  </div>
                </div>
              </motion.div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => setActiveTab('journal')} 
                  variant="secondary" 
                  size="sm"
                >
                  💌 Open Journal
                </Button>
                <Button 
                  onClick={() => navigateTo('home')} 
                  variant="ghost" 
                  size="sm"
                >
                  ← Home
                </Button>
              </div>
            </motion.div>
          </div>
          )}
        </div>
      ) : (
      <div className="content-overlay flex items-center justify-center min-h-screen p-4 overflow-y-auto">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 py-8">
          {/* Enhanced Journal Section with Mood Themes */}
          <motion.div
            className="relative"
            animate={{
              boxShadow: currentMoodTheme.shadowColor,
            }}
            transition={{ duration: 0.3 }}
          >
            <GlassCard 
              className={`transition-all duration-700 ${
                isNight ? 'shadow-2xl shadow-purple-500/10' : 'shadow-xl shadow-blue-200/10'
              }`}
            >
              <div className="relative">
                {/* Mood Theme Indicator */}
                <motion.div
                  className="absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: currentMoodTheme.particleColor,
                    color: 'white',
                    boxShadow: currentMoodTheme.shadowColor,
                  }}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {currentMoodTheme.description}
                </motion.div>

                {/* Writing Streak Display */}
                <motion.div
                  className="absolute -top-2 -left-2 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
                  style={{
                    background: getStreakBadge(writingStreak).color,
                    color: 'white',
                    boxShadow: `0 0 15px ${getStreakBadge(writingStreak).color}50`,
                  }}
                  animate={{
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <span>{getStreakBadge(writingStreak).emoji}</span>
                  <span>{writingStreak} Day Streak</span>
                </motion.div>

                {/* Enhanced Streak Celebration Effect with Day/Night Theming */}
                {showStreakCelebration && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                  >
                    <motion.div
                      className={`rounded-2xl p-6 text-center shadow-2xl transition-all duration-500 ${
                        isNight 
                          ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600' 
                          : 'bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600'
                      }`}
                      animate={{
                        rotate: [0, -5, 5, 0],
                        scale: [1, 1.1, 1],
                        boxShadow: isNight 
                          ? ['0 0 20px rgba(147, 51, 234, 0.5)', '0 0 40px rgba(147, 51, 234, 0.8)', '0 0 20px rgba(147, 51, 234, 0.5)']
                          : ['0 0 20px rgba(255, 215, 0, 0.5)', '0 0 40px rgba(255, 215, 0, 0.8)', '0 0 20px rgba(255, 215, 0, 0.5)'],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: 3,
                        repeatType: "reverse",
                      }}
                    >
                      <div className="text-4xl mb-2">{getStreakBadge(writingStreak).emoji}</div>
                      <div className="text-white font-bold text-lg">
                        {getStreakBadge(writingStreak).title}!
                      </div>
                      <div className="text-white/90 text-sm">
                        {writingStreak} days in a row!
                      </div>
                      {/* Confetti particles */}
                      {Array.from({ length: 12 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 rounded-full"
                          style={{
                            background: ['#FFD700', '#FF69B4', '#87CEEB', '#9370DB'][i % 4],
                            left: '50%',
                            top: '50%',
                          }}
                          animate={{
                            x: [0, (Math.random() - 0.5) * 200],
                            y: [0, (Math.random() - 0.5) * 200],
                            opacity: [1, 0],
                            scale: [1, 0],
                          }}
                          transition={{
                            duration: 2,
                            delay: i * 0.1,
                            ease: "easeOut",
                          }}
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                )}

                <motion.h1 
                  className="text-3xl font-bold text-white mb-2"
                  style={{
                    textShadow: `0 0 20px ${currentMoodTheme.textGlow}`,
                  }}
                  animate={{
                    textShadow: [
                      `0 0 20px ${currentMoodTheme.textGlow}`,
                      `0 0 30px ${currentMoodTheme.textGlow}`,
                      `0 0 20px ${currentMoodTheme.textGlow}`,
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  💌 Your Space
                </motion.h1>

                {/* Streak Progress Indicator */}
                <div className="mb-4 p-3 rounded-lg" style={{ background: `${currentMoodTheme.particleColor}15` }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/90 text-sm font-medium">
                      {getStreakBadge(writingStreak).title}
                    </span>
                    <span className="text-white/70 text-xs">
                      Next: {getStreakBadge(writingStreak + 1).title}
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${getStreakBadge(writingStreak).color}, ${getStreakBadge(writingStreak + 1).color})`,
                      }}
                      animate={{
                        width: `${Math.min((writingStreak % 7 || 7) * (100 / 7), 100)}%`,
                      }}
                      transition={{
                        duration: 1,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-white/60 mt-1">
                    <span>Keep it up! 🌟</span>
                    <span>{writingStreak >= 7 ? '7+' : `${writingStreak}/7`} days</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-white/90 mb-2">How are you feeling?</label>
                  <div className="flex flex-wrap gap-2">
                    {MOODS.map((mood) => (
                      <motion.button
                        key={mood.type}
                        whileHover={{ scale: 1.15, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedMood(mood.type)}
                        className={`p-3 rounded-lg glass transition-all relative ${
                          selectedMood === mood.type
                            ? 'ring-2 ring-white scale-110'
                            : 'opacity-70'
                        }`}
                        style={{
                          background: selectedMood === mood.type ? mood.color : 'rgba(255,255,255,0.1)',
                          boxShadow: selectedMood === mood.type ? `0 0 20px ${mood.color}50` : 'none',
                        }}
                      >
                        <motion.span 
                          className="text-2xl block"
                          animate={{
                            rotate: selectedMood === mood.type ? [0, -10, 10, 0] : 0,
                          }}
                          transition={{
                            duration: 0.5,
                            ease: "easeInOut",
                          }}
                        >
                          {mood.emoji}
                        </motion.span>
                        <div className="text-xs text-white mt-1">{mood.label}</div>
                        {selectedMood === mood.type && (
                          <motion.div
                            className="absolute -inset-1 rounded-lg opacity-30"
                            style={{ background: mood.color }}
                            animate={{
                              scale: [1, 1.1, 1],
                              opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                {/* Quick Templates Section */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <motion.button
                      className="flex-1 glass rounded-lg px-4 py-3 font-semibold text-sm flex items-center justify-center gap-3"
                      style={{
                        background: currentMoodTheme.glassBackground,
                        boxShadow: currentMoodTheme.shadowColor,
                        color: currentMoodTheme.textGlow,
                      }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowTemplates(true)}
                    >
                      <span className="text-lg">📝</span>
                      <span>Quick Templates</span>
                      <span className="text-xs opacity-70">{journalTemplates.length}</span>
                    </motion.button>
                    
                    {currentEntry && (
                      <motion.button
                        className="glass rounded-lg px-4 py-3 font-semibold text-sm flex items-center justify-center gap-2"
                        style={{
                          background: 'rgba(239, 68, 68, 0.15)',
                          boxShadow: '0 8px 32px rgba(239, 68, 68, 0.3)',
                          color: '#f87171',
                        }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={clearEntry}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <span className="text-lg">🗑️</span>
                        <span>Clear</span>
                      </motion.button>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-white/90">Journal Entry</label>
                    <div className="flex items-center gap-3 text-xs">
                      {/* Word Count */}
                      <motion.span
                        className="px-2 py-1 rounded-full"
                        style={{
                          background: `${currentMoodTheme.particleColor}20`,
                          color: currentMoodTheme.particleColor,
                        }}
                        animate={{
                          scale: wordCount > 0 ? [1, 1.1, 1] : 1,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                      >
                        {wordCount} words
                      </motion.span>
                      
                      {/* Character Count */}
                      <motion.span
                        className={`px-2 py-1 rounded-full ${
                          charCount > 500 ? 'text-yellow-400' : 'text-white/70'
                        }`}
                        animate={{
                          color: charCount > 500 ? '#fbbf24' : 'rgba(255,255,255,0.7)',
                        }}
                      >
                        {charCount} chars
                      </motion.span>
                      
                      {/* Auto-save Status */}
                      <motion.div
                        className="flex items-center gap-1"
                        animate={{
                          opacity: autoSaveStatus !== 'idle' ? 1 : 0.6,
                        }}
                      >
                        {autoSaveStatus === 'saving' && (
                          <>
                            <motion.div
                              className="w-2 h-2 bg-yellow-400 rounded-full"
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                              }}
                            />
                            <span className="text-yellow-400">Saving...</span>
                          </>
                        )}
                        {autoSaveStatus === 'saved' && (
                          <>
                            <motion.div
                              className="w-2 h-2 bg-green-400 rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                            />
                            <span className="text-green-400">Saved</span>
                          </>
                        )}
                      </motion.div>
                      
                      {/* Typing Indicator */}
                      {isTyping && (
                        <motion.div
                          className="flex items-center gap-1"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                        >
                          <div className="flex gap-1">
                            {[0, 1, 2].map(i => (
                              <motion.div
                                key={i}
                                className="w-1 h-1 rounded-full"
                                style={{ background: currentMoodTheme.particleColor }}
                                animate={{
                                  y: [0, -4, 0],
                                  opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                  duration: 0.6,
                                  repeat: Infinity,
                                  delay: i * 0.2,
                                }}
                              />
                            ))}
                          </div>
                          <span className="text-white/60 text-xs">typing</span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                  
                  <div className="relative">
                    <motion.textarea
                      value={currentEntry}
                      onChange={handleEntryChange}
                      placeholder="Write your thoughts, dreams, or anything on your mind..."
                      className="w-full h-40 p-4 rounded-lg text-white placeholder-white/50 resize-none focus:outline-none transition-all duration-300 relative z-10"
                      style={{
                        background: currentMoodTheme.glassBackground,
                        border: `2px solid ${currentMoodTheme.particleColor}30`,
                        boxShadow: `inset 0 2px 10px ${currentMoodTheme.particleColor}20`,
                      }}
                      whileFocus={{
                        boxShadow: `inset 0 2px 10px ${currentMoodTheme.particleColor}40, 0 0 0 2px ${currentMoodTheme.particleColor}60`,
                        scale: 1.01,
                      }}
                    />
                    
                    {/* Enhanced Cursor Glow Effect */}
                    {isTyping && (
                      <motion.div
                        className="absolute inset-0 rounded-lg pointer-events-none"
                        style={{
                          background: `linear-gradient(45deg, ${currentMoodTheme.particleColor}10, transparent, ${currentMoodTheme.particleColor}10)`,
                        }}
                        animate={{
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                    
                    {/* Word count progress bar */}
                    <div className="absolute bottom-2 right-2 flex items-center gap-2">
                      <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: wordCount > 100 ? '#10b981' : currentMoodTheme.particleColor,
                          }}
                          animate={{
                            width: `${Math.min((wordCount / 100) * 100, 100)}%`,
                          }}
                          transition={{
                            duration: 0.3,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                      {wordCount >= 100 && (
                        <motion.span
                          className="text-xs text-green-400"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          ✓
                        </motion.span>
                      )}
                    </div>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    onClick={saveJournalEntry} 
                    variant="primary" 
                    size="md" 
                    className="w-full mb-4"
                    style={{
                      background: `linear-gradient(135deg, ${currentMoodTheme.particleColor}, ${currentMoodTheme.particleColor}dd)`,
                      boxShadow: currentMoodTheme.shadowColor,
                    }}
                  >
                    Save Entry ✨
                  </Button>
                </motion.div>

                {/* Recent Entries with Enhanced Animations */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 
                      className="text-xl font-bold text-white"
                      style={{
                        textShadow: `0 0 10px ${currentMoodTheme.textGlow}`,
                      }}
                    >
                      Recent Entries
                    </h3>
                    {/* Mood Calendar Button */}
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowMoodCalendar(true)}
                      className="px-3 py-1 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                      style={{
                        background: `${currentMoodTheme.particleColor}30`,
                        color: 'white',
                        border: `1px solid ${currentMoodTheme.particleColor}50`,
                        textShadow: `0 0 10px ${currentMoodTheme.textGlow}`,
                      }}
                    >
                      <span>📅</span>
                      <span>Calendar</span>
                    </motion.button>
                  </div>
                  <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                    {journalEntries.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-8"
                      >
                        <p className="text-white/60 text-sm mb-2">No entries yet. Start writing!</p>
                        <motion.div
                          animate={{
                            rotate: [0, -10, 10, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="text-2xl opacity-50"
                        >
                          ✍️
                        </motion.div>
                      </motion.div>
                    ) : (
                      journalEntries.map((entry, index) => (
                        <motion.div
                          key={entry.id}
                          initial={{ opacity: 0, x: -20, scale: 0.95 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          whileHover={{ 
                            scale: 1.02, 
                            x: 5,
                            boxShadow: `0 8px 25px ${MOODS.find(m => m.type === entry.mood)?.color}30`,
                          }}
                          transition={{
                            delay: index * 0.1,
                            duration: 0.3,
                            ease: "easeOut",
                          }}
                          className="p-4 glass rounded-xl relative overflow-hidden group cursor-pointer"
                          style={{
                            background: `${MOODS.find(m => m.type === entry.mood)?.color}20`,
                            border: `1px solid ${MOODS.find(m => m.type === entry.mood)?.color}40`,
                          }}
                        >
                          {/* Subtle hover glow effect */}
                          <motion.div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                            style={{
                              background: `linear-gradient(135deg, ${MOODS.find(m => m.type === entry.mood)?.color}10, transparent, ${MOODS.find(m => m.type === entry.mood)?.color}10)`,
                            }}
                            transition={{ duration: 0.3 }}
                          />
                          
                          <div className="flex items-center gap-2 mb-2 relative z-10">
                            <motion.span 
                              className="text-xl"
                              whileHover={{
                                rotate: [0, -15, 15, 0],
                                scale: 1.2,
                              }}
                              transition={{
                                duration: 0.5,
                                ease: "easeOut",
                              }}
                            >
                              {MOODS.find((m) => m.type === entry.mood)?.emoji}
                            </motion.span>
                            <div className="flex flex-col">
                              <span className="text-white/70 text-xs">
                                {new Date(entry.date).toLocaleDateString()}
                              </span>
                              <span 
                                className="text-xs font-medium"
                                style={{ color: MOODS.find(m => m.type === entry.mood)?.color }}
                              >
                                {MOODS.find((m) => m.type === entry.mood)?.label}
                              </span>
                            </div>
                          </div>
                          <motion.p 
                            className="text-white/90 text-sm leading-relaxed relative z-10"
                            style={{ lineHeight: '1.6' }}
                          >
                            {entry.content}
                          </motion.p>
                          
                          {/* Word count for entry */}
                          <div className="flex justify-between items-center mt-2 relative z-10">
                            <span className="text-white/50 text-xs">
                              {entry.content.trim().split(/\s+/).length} words
                            </span>
                            <motion.div
                              className="opacity-0 group-hover:opacity-100"
                              transition={{ duration: 0.2 }}
                            >
                              <span className="text-white/40 text-xs">Click to expand</span>
                            </motion.div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Message Board */}
          <GlassCard>
            <h2 className="text-2xl font-bold text-white mb-4">💬 Message Board</h2>
            
            <div className="mb-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addMessage()}
                placeholder="Leave a message for yourself..."
                className="w-full p-3 rounded-lg glass-strong text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              />
            </div>

            <Button onClick={addMessage} variant="secondary" size="md" className="w-full mb-4">
              Add Message
            </Button>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {messages.length === 0 ? (
                <p className="text-white/60 text-sm">No messages yet. Add one!</p>
              ) : (
                messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 glass rounded-lg"
                  >
                    <p className="text-white/90">{msg}</p>
                  </motion.div>
                ))
              )}
            </div>

            <Button
              onClick={() => navigateTo('home')}
              variant="ghost"
              size="md"
              className="w-full mt-6"
            >
              ← Back Home
            </Button>
          </GlassCard>
        </div>
      </div>      )}

      {/* Stats Tab Content */}
      {activeTab === 'stats' && (
        <div className="content-overlay flex items-center justify-center min-h-screen p-4 overflow-y-auto">
          <div className="max-w-6xl w-full py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold" style={{ color: currentMoodTheme.textGlow }}>
                    📊 Writing Analytics
                  </h2>
                  <p className="text-gray-600 text-lg mt-1">
                    Insights into your journaling journey
                  </p>
                </div>
                <motion.button
                  className="glass rounded-lg px-4 py-2 font-semibold text-sm"
                  style={{
                    background: currentMoodTheme.glassBackground,
                    boxShadow: currentMoodTheme.shadowColor,
                    color: currentMoodTheme.textGlow
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowMoodCalendar(true)}
                >
                  📅 View Calendar
                </motion.button>
              </div>
              
              <StatsDashboard />
            </motion.div>
          </div>
        </div>
      )}

      {/* Memories Tab Content */}
      {activeTab === 'memories' && (
        <div className="content-overlay flex items-center justify-center min-h-screen p-4 overflow-y-auto">
          <div className="max-w-4xl w-full py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="text-8xl mb-6">📖</div>
              <h2 className="text-3xl font-bold mb-4" style={{ color: currentMoodTheme.textGlow }}>
                Memory Lane
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Your cherished moments and milestones
              </p>
              <motion.div
                className="glass rounded-2xl p-8 mx-auto max-w-2xl"
                style={{
                  background: currentMoodTheme.glassBackground,
                  boxShadow: currentMoodTheme.shadowColor,
                }}
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center justify-center text-4xl mb-4">
                  🏗️✨
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: currentMoodTheme.textGlow }}>
                  Coming Soon!
                </h3>
                <p className="text-gray-600 mb-6">
                  A beautiful timeline of your memories, achievements, and special moments will be available here. 
                  We're crafting something truly magical for your personal history.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <span>📸</span>
                    <span>Photo memories</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🏆</span>
                    <span>Achievement timeline</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>💫</span>
                    <span>Milestone tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📚</span>
                    <span>Story collection</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}
      
      {/* Quick Templates Modal */}
      {showTemplates && <TemplateSelector />}
      
      {/* Quick Templates Modal */}
      {showTemplates && <TemplateSelector />}
      
      {/* Mood Calendar Modal */}
      {showMoodCalendar && <MoodCalendar />}
      
      {/* Enhanced Template Loaded Notification with Day/Night Theming */}
      {templateLoadedNotification && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.8 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[200]"
        >
          <motion.div
            className={`px-6 py-4 rounded-xl shadow-xl backdrop-blur-lg transition-all duration-500 ${
              isNight 
                ? 'bg-purple-900/80 border border-purple-400/50 text-purple-100' 
                : 'bg-white/90 border border-green-300/50 text-green-800'
            }`}
            animate={{
              boxShadow: isNight 
                ? ['0 0 20px rgba(147, 51, 234, 0.4)', '0 0 30px rgba(147, 51, 234, 0.6)', '0 0 20px rgba(147, 51, 234, 0.4)']
                : ['0 0 20px rgba(34, 197, 94, 0.4)', '0 0 30px rgba(34, 197, 94, 0.6)', '0 0 20px rgba(34, 197, 94, 0.4)'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{isNight ? '🌙' : '✨'}</span>
              <div>
                <div className="font-semibold">Template Loaded!</div>
                <div className="text-sm opacity-80">{templateLoadedNotification}</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
