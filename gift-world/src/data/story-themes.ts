// Enhanced Story Configuration with Emotional Themes
export interface ChapterTheme {
  primaryColor: string;
  secondaryColor: string;
  mood: 'nervous' | 'hopeful' | 'confused' | 'magical' | 'waiting' | 'connecting' | 'beautiful';
  backgroundGradient: string;
  particleEffect: 'hearts' | 'sparkles' | 'gentle' | 'warm' | 'dreamy';
  readingTime: string;
  emotionalHighlight?: string[]; // Special phrases to highlight
}

export const chapterThemes: ChapterTheme[] = [
  {
    primaryColor: '#10B981', // Green for growth
    secondaryColor: '#34D399',
    mood: 'nervous',
    backgroundGradient: 'from-emerald-900/20 to-green-800/10',
    particleEffect: 'gentle',
    readingTime: '1 min',
    emotionalHighlight: ['decided to dislike', 'something else for me']
  },
  {
    primaryColor: '#8B5CF6', // Purple for journey
    secondaryColor: '#A78BFA',
    mood: 'hopeful',
    backgroundGradient: 'from-violet-900/20 to-purple-800/10',
    particleEffect: 'sparkles',
    readingTime: '1.5 min',
    emotionalHighlight: ['naturally', 'first sign']
  },
  {
    primaryColor: '#F59E0B', // Orange for confusion
    secondaryColor: '#FBBF24',
    mood: 'confused',
    backgroundGradient: 'from-amber-900/20 to-orange-800/10',
    particleEffect: 'warm',
    readingTime: '2 min',
    emotionalHighlight: ['everything went wrong', 'exhausting']
  },
  {
    primaryColor: '#EC4899', // Pink for magic moment
    secondaryColor: '#F472B6',
    mood: 'magical',
    backgroundGradient: 'from-pink-900/20 to-rose-800/10',
    particleEffect: 'hearts',
    readingTime: '1.5 min',
    emotionalHighlight: ['she entered', 'nervousness disappeared', 'because of her']
  },
  {
    primaryColor: '#06B6D4', // Cyan for waiting
    secondaryColor: '#67E8F9',
    mood: 'waiting',
    backgroundGradient: 'from-cyan-900/20 to-sky-800/10',
    particleEffect: 'dreamy',
    readingTime: '2 min',
    emotionalHighlight: ['Wait', 'something inside me']
  },
  {
    primaryColor: '#3B82F6', // Blue for connection
    secondaryColor: '#60A5FA',
    mood: 'connecting',
    backgroundGradient: 'from-blue-900/20 to-indigo-800/10',
    particleEffect: 'warm',
    readingTime: '2.5 min',
    emotionalHighlight: ['How was your exam?', 'I liked answering her']
  },
  {
    primaryColor: '#F97316', // Orange for beautiful ending
    secondaryColor: '#FB923C',
    mood: 'beautiful',
    backgroundGradient: 'from-orange-900/20 to-amber-800/10',
    particleEffect: 'hearts',
    readingTime: '2 min',
    emotionalHighlight: ['good couple', 'everything felt… right']
  },
  {
    primaryColor: '#8B5CF6', // Purple for timeless connection
    secondaryColor: '#A78BFA',
    mood: 'connecting',
    backgroundGradient: 'from-violet-900/20 to-purple-800/10',
    particleEffect: 'dreamy',
    readingTime: '2 min',
    emotionalHighlight: ['almost an hour', 'time felt irrelevant', 'away from people\'s eyes']
  },
  {
    primaryColor: '#10B981', // Green for growth and decision
    secondaryColor: '#34D399',
    mood: 'hopeful',
    backgroundGradient: 'from-emerald-900/20 to-green-800/10',
    particleEffect: 'gentle',
    readingTime: '1.5 min',
    emotionalHighlight: ['something else spoke', 'This moment won\'t come back']
  },
  {
    primaryColor: '#EC4899', // Pink for caring gestures
    secondaryColor: '#F472B6',
    mood: 'beautiful',
    backgroundGradient: 'from-pink-900/20 to-rose-800/10',
    particleEffect: 'hearts',
    readingTime: '1 min',
    emotionalHighlight: ['gently pulled', 'felt natural']
  },
  {
    primaryColor: '#3B82F6', // Blue for changing paths
    secondaryColor: '#60A5FA',
    mood: 'magical',
    backgroundGradient: 'from-blue-900/20 to-indigo-800/10',
    particleEffect: 'sparkles',
    readingTime: '2 min',
    emotionalHighlight: ['felt right', 'my responsibility', 'just for her']
  },
  {
    primaryColor: '#F59E0B', // Amber for protective care
    secondaryColor: '#FBBF24',
    mood: 'connecting',
    backgroundGradient: 'from-amber-900/20 to-yellow-800/10',
    particleEffect: 'warm',
    readingTime: '1.5 min',
    emotionalHighlight: ['Come, we\'ll go together', 'enjoy the time']
  },
  {
    primaryColor: '#06B6D4', // Cyan for trust and ease
    secondaryColor: '#67E8F9',
    mood: 'hopeful',
    backgroundGradient: 'from-cyan-900/20 to-sky-800/10',
    particleEffect: 'gentle',
    readingTime: '1.5 min',
    emotionalHighlight: ['nothing to worry about', 'And we did']
  },
  {
    primaryColor: '#8B5CF6', // Purple for discovering similarities
    secondaryColor: '#A78BFA',
    mood: 'connecting',
    backgroundGradient: 'from-violet-900/20 to-purple-800/10',
    particleEffect: 'sparkles',
    readingTime: '2.5 min',
    emotionalHighlight: ['She was like me', 'inside I smiled', 'time disappears']
  },
  {
    primaryColor: '#10B981', // Green for career support
    secondaryColor: '#34D399',
    mood: 'connecting',
    backgroundGradient: 'from-emerald-900/20 to-green-800/10',
    particleEffect: 'warm',
    readingTime: '2 min',
    emotionalHighlight: ['wished me well', 'wishing for my career']
  },
  {
    primaryColor: '#F97316', // Orange for joy and lightness
    secondaryColor: '#FB923C',
    mood: 'hopeful',
    backgroundGradient: 'from-orange-900/20 to-amber-800/10',
    particleEffect: 'sparkles',
    readingTime: '1.5 min',
    emotionalHighlight: ['made things lighter', 'She understood']
  },
  {
    primaryColor: '#EC4899', // Pink for admiration
    secondaryColor: '#F472B6',
    mood: 'beautiful',
    backgroundGradient: 'from-pink-900/20 to-rose-800/10',
    particleEffect: 'hearts',
    readingTime: '2 min',
    emotionalHighlight: ['NEET rank scorer', 'I admired', 'I felt lucky']
  },
  {
    primaryColor: '#8B5CF6', // Purple for independence and support
    secondaryColor: '#A78BFA',
    mood: 'beautiful',
    backgroundGradient: 'from-violet-900/20 to-purple-800/10',
    particleEffect: 'gentle',
    readingTime: '2 min',
    emotionalHighlight: ['good decision', 'I meant it', 'quiet heaviness']
  }
];