import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Flame,
  Volume2,
  VolumeX,
  X,
  ChevronUp,
  Sparkles,
  Heart,
  Trophy,
  Crown,
  Zap,
  Info,
  RotateCcw
} from 'lucide-react';

export type PetSpecies = 'dog' | 'cat';

interface ChapterPetInfo {
  chapterId: string;
  dogBreed: string;
  dogName: string;
  catBreed: string;
  catName: string;
  dogColor: string;
  dogEarColor: string;
  catColor: string;
  catStripes: string;
  specialty: string;
}

const CHAPTER_PET_DATABASE: Record<string, ChapterPetInfo> = {
  'at-01': {
    chapterId: 'at-01',
    dogBreed: 'Beagle',
    dogName: 'Sherlock the Beagle',
    catBreed: 'British Shorthair',
    catName: 'Mochi the Shorthair',
    dogColor: '#d97706',
    dogEarColor: '#78350f',
    catColor: '#94a3b8',
    catStripes: '#64748b',
    specialty: 'Assurance Engagement Detective',
  },
  'at-02': {
    chapterId: 'at-02',
    dogBreed: 'Golden Retriever',
    dogName: 'Barnaby the Retriever',
    catBreed: 'Calico',
    catName: 'Sunny the Calico',
    dogColor: '#f59e0b',
    dogEarColor: '#b45309',
    catColor: '#fdba74',
    catStripes: '#ea580c',
    specialty: 'Financial Audit Fundamentals',
  },
  'at-03': {
    chapterId: 'at-03',
    dogBreed: 'Pembroke Corgi',
    dogName: 'Watson the Corgi',
    catBreed: 'Siamese',
    catName: 'Oliver the Siamese',
    dogColor: '#ea580c',
    dogEarColor: '#9a3412',
    catColor: '#e2e8f0',
    catStripes: '#475569',
    specialty: 'System of Quality Management (PSQM)',
  },
  'at-04': {
    chapterId: 'at-04',
    dogBreed: 'Chocolate Labrador',
    dogName: 'Cooper the Lab',
    catBreed: 'Scottish Fold',
    catName: 'Milo the Scottish Fold',
    dogColor: '#78350f',
    dogEarColor: '#451a03',
    catColor: '#cbd5e1',
    catStripes: '#94a3b8',
    specialty: 'Audit Planning & Materiality Strategist',
  },
  'at-05': {
    chapterId: 'at-05',
    dogBreed: 'German Shepherd',
    dogName: 'Max the Shepherd',
    catBreed: 'Maine Coon',
    catName: 'Leo the Maine Coon',
    dogColor: '#b45309',
    dogEarColor: '#1e293b',
    catColor: '#a1a1aa',
    catStripes: '#52525b',
    specialty: 'Risk Assessment & Assertion Hunter',
  },
  'at-06': {
    chapterId: 'at-06',
    dogBreed: 'Boxer',
    dogName: 'Rocky the Boxer',
    catBreed: 'Persian',
    catName: 'Bella the Persian',
    dogColor: '#c2410c',
    dogEarColor: '#7c2d12',
    catColor: '#f1f5f9',
    catStripes: '#e2e8f0',
    specialty: 'Fraud Detection & Skepticism Guard',
  },
  'at-07': {
    chapterId: 'at-07',
    dogBreed: 'Dachshund',
    dogName: 'Bailey the Dachshund',
    catBreed: 'Bengal',
    catName: 'Simba the Bengal',
    dogColor: '#9a3412',
    dogEarColor: '#7c2d12',
    catColor: '#fbbf24',
    catStripes: '#b45309',
    specialty: 'Internal Control & COSO Architecture',
  },
  'at-08': {
    chapterId: 'at-08',
    dogBreed: 'Dalmatian',
    dogName: 'Duke the Dalmatian',
    catBreed: 'Russian Blue',
    catName: 'Chloe the Russian Blue',
    dogColor: '#f8fafc',
    dogEarColor: '#0f172a',
    catColor: '#64748b',
    catStripes: '#334155',
    specialty: 'Audit Evidence & Vouching Inspector',
  },
  'at-09': {
    chapterId: 'at-09',
    dogBreed: 'Poodle',
    dogName: 'Buster the Poodle',
    catBreed: 'Ragdoll',
    catName: 'Loki the Ragdoll',
    dogColor: '#fef08a',
    dogEarColor: '#eab308',
    catColor: '#f8fafc',
    catStripes: '#94a3b8',
    specialty: 'Audit Sampling & Precision Evaluator',
  },
  'at-11': {
    chapterId: 'at-11',
    dogBreed: 'Samoyed',
    dogName: 'Teddy the Samoyed',
    catBreed: 'Sphynx',
    catName: 'Cleo the Sphynx',
    dogColor: '#ffffff',
    dogEarColor: '#f1f5f9',
    catColor: '#fed7aa',
    catStripes: '#fb923c',
    specialty: 'Subsequent Events & Going Concern Watch',
  },
  'at-12': {
    chapterId: 'at-12',
    dogBreed: 'Rottweiler',
    dogName: 'Bruno the Guardian',
    catBreed: 'Tuxedo Cat',
    catName: 'Jasper the Tuxedo',
    dogColor: '#1e293b',
    dogEarColor: '#92400e',
    catColor: '#0f172a',
    catStripes: '#f8fafc',
    specialty: 'Audit Opinions & KAM Formalist',
  },
  'at-13': {
    chapterId: 'at-13',
    dogBreed: 'Border Collie',
    dogName: 'Toby the Collie',
    catBreed: 'Chartreux',
    catName: 'Shadow the Chartreux',
    dogColor: '#0f172a',
    dogEarColor: '#ffffff',
    catColor: '#475569',
    catStripes: '#1e293b',
    specialty: 'Special Reports & Compilation Master',
  },
  'at-14': {
    chapterId: 'at-14',
    dogBreed: 'Saint Bernard',
    dogName: 'Apollo the Saint Bernard',
    catBreed: 'Birman',
    catName: 'Lily the Birman',
    dogColor: '#92400e',
    dogEarColor: '#ffffff',
    catColor: '#fdf4ff',
    catStripes: '#d8b4fe',
    specialty: 'Code of Ethics & Independence Protector',
  },
  'at-15': {
    chapterId: 'at-15',
    dogBreed: 'Shiba Inu',
    dogName: 'Zeus the Shiba',
    catBreed: 'Tabby Cat',
    catName: 'Felix the Tabby',
    dogColor: '#f97316',
    dogEarColor: '#ffffff',
    catColor: '#e0e7ff',
    catStripes: '#6366f1',
    specialty: 'Business Transaction Cycles Auditor',
  },
  'at-finale': {
    chapterId: 'at-finale',
    dogBreed: 'Mythic Golden Griffin-Hound',
    dogName: 'Titan the CPALE Phoenix Champion',
    catBreed: 'Celestial Solar Lion',
    catName: 'Artemis the Mythic CPA Guardian',
    dogColor: '#ffd700',
    dogEarColor: '#b45309',
    catColor: '#ffd700',
    catStripes: '#ea580c',
    specialty: 'Ultimate CPALE Board Exam Topnotcher',
  },
};

interface FoodNotification {
  id: number;
  text: string;
}

interface VirtualPetProps {
  score: number;
  totalAnswered: number;
  totalQuestions: number;
  chapterId: string;
  chapterCode: string;
}

export const VirtualPet: React.FC<VirtualPetProps> = ({
  score,
  totalAnswered,
  totalQuestions,
  chapterId,
  chapterCode,
}) => {
  // User Species Choice: Dog vs Cat (persisted)
  const [species, setSpecies] = useState<PetSpecies>(() => {
    try {
      const saved = localStorage.getItem('virtual_pet_species');
      return saved === 'cat' ? 'cat' : 'dog';
    } catch {
      return 'dog';
    }
  });

  // Sound enabled state
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem('virtual_pet_sound') !== 'false';
    } catch {
      return true;
    }
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [petLoveCount, setPetLoveCount] = useState<number>(0);
  const [foodNotifications, setFoodNotifications] = useState<FoodNotification[]>([]);

  const prevScoreRef = useRef<number>(score);
  const foodIdRef = useRef<number>(0);

  // Save species preference
  const handleSelectSpecies = (newSpecies: PetSpecies) => {
    setSpecies(newSpecies);
    try {
      localStorage.setItem('virtual_pet_species', newSpecies);
    } catch {
      // ignore
    }
  };

  const handleToggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('virtual_pet_sound', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Sound Synthesizer via Web Audio API (gentle high chime on point earned)
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880.00, now + 0.08); // A5
      osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.18); // D6
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch {
      // audio context blocked or unsupported
    }
  };

  // Point celebration detection: Jump & +1 Food icon
  useEffect(() => {
    if (score > prevScoreRef.current) {
      // User earned a point!
      setIsJumping(true);
      playChime();

      // Add a floating food badge
      const newId = ++foodIdRef.current;
      const foodIcon = species === 'dog' ? '+1 🍖' : '+1 🐟';
      setFoodNotifications((prev) => [...prev, { id: newId, text: foodIcon }]);

      // Reset jumping after animation completes
      const jumpTimer = setTimeout(() => {
        setIsJumping(false);
      }, 700);

      // Clean up food notification after 1.3s
      const foodTimer = setTimeout(() => {
        setFoodNotifications((prev) => prev.filter((item) => item.id !== newId));
      }, 1300);

      return () => {
        clearTimeout(jumpTimer);
        clearTimeout(foodTimer);
      };
    }
    prevScoreRef.current = score;
  }, [score, species]);

  // Current Chapter Pet Profile
  const petProfile = useMemo(() => {
    return CHAPTER_PET_DATABASE[chapterId] || CHAPTER_PET_DATABASE['at-01'];
  }, [chapterId]);

  // Milestone Stages based on TOTAL COMPLETION PERCENTAGE for this chapter:
  // 0-20% the pet is very thin and dying
  // 21-30% the pet is normal weight
  // 31-50% the pet is happy
  // 50-75% the pet is fatter and bigger
  // 76%- the pet turns gold and has a fire aura behind it
  const completionPct = totalQuestions > 0 ? (totalAnswered / totalQuestions) * 100 : 0;

  const milestone = useMemo(() => {
    if (completionPct <= 20) {
      return {
        stage: 1,
        title: 'Very Thin & Dying',
        description: 'Starving and weak. Needs study points to survive!',
        badgeClass: 'bg-rose-950/80 text-rose-300 border-rose-700/60',
        textColor: 'text-rose-400',
        scaleClass: 'scale-90',
        shiver: true,
        fat: false,
        gold: false,
        fireAura: false,
      };
    } else if (completionPct <= 30) {
      return {
        stage: 2,
        title: 'Normal Weight',
        description: 'Steady and alert. Gaining strength!',
        badgeClass: 'bg-amber-950/80 text-amber-300 border-amber-700/60',
        textColor: 'text-amber-400',
        scaleClass: 'scale-100',
        shiver: false,
        fat: false,
        gold: false,
        fireAura: false,
      };
    } else if (completionPct <= 50) {
      return {
        stage: 3,
        title: 'Happy & Energetic',
        description: 'Playful, smiling, and full of joy!',
        badgeClass: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60',
        textColor: 'text-emerald-400',
        scaleClass: 'scale-105',
        shiver: false,
        fat: false,
        gold: false,
        fireAura: false,
      };
    } else if (completionPct <= 75) {
      return {
        stage: 4,
        title: 'Fatter & Bigger',
        description: 'Well-fed, chubby, and delightfully plump!',
        badgeClass: 'bg-indigo-950/80 text-indigo-300 border-indigo-700/60',
        textColor: 'text-indigo-400',
        scaleClass: 'scale-115',
        shiver: false,
        fat: true,
        gold: false,
        fireAura: false,
      };
    } else {
      return {
        stage: 5,
        title: 'Mythic Gold & Fire Aura',
        description: 'CPALE Board Exam Topnotcher Blaze Mode!',
        badgeClass: 'bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 text-white border-yellow-300 font-bold',
        textColor: 'text-yellow-400',
        scaleClass: 'scale-120',
        shiver: false,
        fat: true,
        gold: true,
        fireAura: true,
      };
    }
  }, [completionPct]);

  const petName = species === 'dog' ? petProfile.dogName : petProfile.catName;
  const petBreed = species === 'dog' ? petProfile.dogBreed : petProfile.catBreed;

  // Manual petting reaction
  const handlePet = () => {
    setIsJumping(true);
    setPetLoveCount((prev) => prev + 1);
    playChime();
    setTimeout(() => setIsJumping(false), 600);
  };

  // Render SVG Pet Character
  const renderPetGraphic = () => {
    const isGold = milestone.gold;
    const isFat = milestone.fat;
    const isThin = milestone.stage === 1;
    const isHappy = milestone.stage >= 3;

    // Body colors
    const baseColor = isGold
      ? '#ffd700'
      : species === 'dog'
      ? petProfile.dogColor
      : petProfile.catColor;
    const accentColor = isGold
      ? '#f59e0b'
      : species === 'dog'
      ? petProfile.dogEarColor
      : petProfile.catStripes;
    const bellyColor = isGold ? '#fffbeb' : '#ffffff';

    // Proportions depending on stage
    const bodyWidth = isThin ? 38 : isFat ? 62 : 48;
    const bodyHeight = isThin ? 32 : isFat ? 48 : 40;
    const tummyRx = isThin ? 19 : isFat ? 31 : 24;
    const tummyRy = isThin ? 16 : isFat ? 24 : 20;

    return (
      <div className="relative flex items-center justify-center select-none">
        {/* Fire Aura Effect for 76%+ Milestone */}
        {milestone.fireAura && (
          <div className="absolute inset-0 -m-6 pointer-events-none flex items-center justify-center animate-fire-aura">
            <svg viewBox="0 0 200 200" className="w-40 h-40 sm:w-48 sm:h-48 overflow-visible opacity-90">
              <defs>
                <radialGradient id="fireGlow" cx="50%" cy="60%" r="50%">
                  <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
                  <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.8" />
                  <stop offset="70%" stopColor="#ef4444" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#b91c1c" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="flameGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#fef08a" />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="75" fill="url(#fireGlow)" />
              {/* Leaping Flames Behind Pet */}
              <path
                d="M100 20 C110 50 135 60 125 90 C145 70 155 100 135 125 C160 115 170 145 140 160 C155 175 130 185 100 180 C70 185 45 175 60 160 C30 145 40 115 65 125 C45 100 55 70 75 90 C65 60 90 50 100 20 Z"
                fill="url(#flameGrad)"
                opacity="0.85"
              />
              <path
                d="M100 45 C106 65 122 75 116 95 C128 82 135 102 122 118 C138 112 144 132 125 144 C134 154 118 162 100 158 C82 162 66 154 75 144 C56 132 62 112 78 118 C65 102 72 82 84 95 C78 75 94 65 100 45 Z"
                fill="#fef08a"
                opacity="0.9"
              />
            </svg>
          </div>
        )}

        {/* Happy Hearts / Music Notes for Stage 3 */}
        {milestone.stage === 3 && (
          <div className="absolute -top-3 -right-2 flex items-center gap-1 animate-pulse">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400" />
          </div>
        )}

        {/* Shivering Drops for Dying Stage 1 */}
        {isThin && (
          <div className="absolute -top-2 right-2 text-cyan-400 animate-bounce text-xs">
            💧
          </div>
        )}

        {/* Pet Vector SVG */}
        <div
          className={`transition-transform duration-300 ${milestone.scaleClass} ${
            isJumping ? 'animate-pet-jump' : ''
          } ${milestone.shiver ? 'animate-pet-shiver' : ''} ${
            isGold ? 'animate-gold-sparkle' : ''
          }`}
        >
          <svg viewBox="0 0 120 120" className="w-24 h-24 sm:w-28 sm:h-28 overflow-visible">
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fffbeb" />
                <stop offset="40%" stopColor="#fde047" />
                <stop offset="70%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#ca8a04" />
              </linearGradient>
            </defs>

            {/* Shadow under pet */}
            <ellipse
              cx="60"
              cy={isFat ? "106" : "104"}
              rx={isThin ? "22" : isFat ? "38" : "30"}
              ry={isThin ? "4" : isFat ? "8" : "6"}
              fill="rgba(0,0,0,0.18)"
            />

            {/* Dog Anatomy */}
            {species === 'dog' ? (
              <g id="dog-character">
                {/* Wagging Tail */}
                <path
                  d={
                    isHappy || isFat || isGold
                      ? "M84 75 C98 68 106 50 98 42 C92 46 90 60 82 72 Z"
                      : "M84 78 C92 86 96 92 92 96 C88 96 84 88 80 80 Z"
                  }
                  fill={accentColor}
                  className={isHappy || isFat || isGold ? "animate-pulse" : ""}
                />

                {/* Back Feet */}
                <ellipse cx="44" cy="98" rx="8" ry="6" fill={accentColor} />
                <ellipse cx="76" cy="98" rx="8" ry="6" fill={accentColor} />

                {/* Main Body */}
                <ellipse
                  cx="60"
                  cy="75"
                  rx={tummyRx}
                  ry={tummyRy}
                  fill={isGold ? "url(#goldGradient)" : baseColor}
                />

                {/* Tummy Patch */}
                <ellipse
                  cx="60"
                  cy="76"
                  rx={tummyRx * 0.65}
                  ry={tummyRy * 0.72}
                  fill={bellyColor}
                  opacity={isThin ? "0.6" : "0.9"}
                />

                {/* Chubby snack crumbs for Fat Stage 4 */}
                {isFat && !isGold && (
                  <g fill="#92400e">
                    <circle cx="54" cy="80" r="1.5" />
                    <circle cx="66" cy="84" r="1.5" />
                    <circle cx="62" cy="88" r="1.2" />
                  </g>
                )}

                {/* Front Paws */}
                <ellipse cx="52" cy="96" rx="6" ry="5" fill={bellyColor} />
                <ellipse cx="68" cy="96" rx="6" ry="5" fill={bellyColor} />

                {/* Head */}
                <circle
                  cx="60"
                  cy="46"
                  r={isThin ? "19" : isFat ? "26" : "22"}
                  fill={isGold ? "url(#goldGradient)" : baseColor}
                />

                {/* Cheeks if Fat/Happy */}
                {isFat && (
                  <>
                    <ellipse cx="40" cy="52" rx="7" ry="6" fill={baseColor} />
                    <ellipse cx="80" cy="52" rx="7" ry="6" fill={baseColor} />
                    <circle cx="43" cy="53" r="3" fill="#f43f5e" opacity="0.4" />
                    <circle cx="77" cy="53" r="3" fill="#f43f5e" opacity="0.4" />
                  </>
                )}

                {/* Dog Ears (Droopy beagle style or perky corgi style) */}
                <path
                  d={
                    isThin
                      ? "M42 36 C34 44 32 64 38 68 C42 66 44 50 46 40 Z" // drooping sad ear
                      : "M42 34 C32 40 30 58 38 64 C43 62 45 46 46 38 Z"
                  }
                  fill={accentColor}
                />
                <path
                  d={
                    isThin
                      ? "M78 36 C86 44 88 64 82 68 C78 66 76 50 74 40 Z"
                      : "M78 34 C88 40 90 58 82 64 C77 62 75 46 74 38 Z"
                  }
                  fill={accentColor}
                />

                {/* Eyes */}
                {isThin ? (
                  // Half-closed droopy sad eyes
                  <>
                    <path d="M50 45 Q54 48 58 46" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <path d="M62 46 Q66 48 70 45" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    {/* Sad tears */}
                    <circle cx="48" cy="50" r="1.5" fill="#38bdf8" />
                  </>
                ) : isHappy || isFat || isGold ? (
                  // Cheerful smiling crescent eyes ^‿^
                  <>
                    <path d="M49 44 Q54 39 59 44" stroke="#1e293b" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                    <path d="M61 44 Q66 39 71 44" stroke="#1e293b" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                    {/* Rosy cheeks */}
                    <circle cx="47" cy="50" r="3" fill="#fb7185" opacity="0.6" />
                    <circle cx="73" cy="50" r="3" fill="#fb7185" opacity="0.6" />
                  </>
                ) : (
                  // Normal alert round eyes
                  <>
                    <circle cx="53" cy="43" r="3" fill="#0f172a" />
                    <circle cx="54" cy="42" r="1" fill="#ffffff" />
                    <circle cx="67" cy="43" r="3" fill="#0f172a" />
                    <circle cx="68" cy="42" r="1" fill="#ffffff" />
                  </>
                )}

                {/* Snout & Nose */}
                <ellipse cx="60" cy="51" rx="7" ry="5" fill={bellyColor} />
                <ellipse cx="60" cy="49" rx="3.5" ry="2.5" fill="#0f172a" />

                {/* Mouth & Tongue */}
                {isThin ? (
                  <path d="M57 55 Q60 53 63 55" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                ) : isHappy || isFat || isGold ? (
                  <>
                    <path d="M56 52 Q60 55 64 52" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                    {/* Cute pink tongue */}
                    <path d="M58 54 C58 58 62 58 62 54 Z" fill="#f43f5e" />
                  </>
                ) : (
                  <path d="M57 53 Q60 56 63 53" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                )}
              </g>
            ) : (
              /* Cat Anatomy */
              <g id="cat-character">
                {/* Swishing Tail */}
                <path
                  d={
                    isHappy || isFat || isGold
                      ? "M84 76 C98 72 108 55 104 42 C100 44 94 62 82 72 Z"
                      : "M84 80 C94 88 100 94 96 98 C92 98 86 90 80 82 Z"
                  }
                  fill={accentColor}
                  className={isHappy || isFat || isGold ? "animate-pulse" : ""}
                />

                {/* Back Paws */}
                <ellipse cx="44" cy="98" rx="8" ry="6" fill={baseColor} />
                <ellipse cx="76" cy="98" rx="8" ry="6" fill={baseColor} />

                {/* Main Body */}
                <ellipse
                  cx="60"
                  cy="75"
                  rx={tummyRx}
                  ry={tummyRy}
                  fill={isGold ? "url(#goldGradient)" : baseColor}
                />

                {/* Tummy Patch */}
                <ellipse
                  cx="60"
                  cy="76"
                  rx={tummyRx * 0.65}
                  ry={tummyRy * 0.72}
                  fill={bellyColor}
                  opacity={isThin ? "0.6" : "0.9"}
                />

                {/* Front Paws */}
                <ellipse cx="52" cy="96" rx="6" ry="5" fill={bellyColor} />
                <ellipse cx="68" cy="96" rx="6" ry="5" fill={bellyColor} />

                {/* Cat Ears (Pointy & Alert) */}
                <polygon
                  points={isThin ? "36,44 44,22 52,36" : "36,40 44,18 52,34"}
                  fill={baseColor}
                />
                <polygon
                  points={isThin ? "39,42 44,25 50,36" : "39,38 44,22 50,34"}
                  fill={accentColor}
                />
                <polygon
                  points={isThin ? "84,44 76,22 68,36" : "84,40 76,18 68,34"}
                  fill={baseColor}
                />
                <polygon
                  points={isThin ? "81,42 76,25 70,36" : "81,38 76,22 70,34"}
                  fill={accentColor}
                />

                {/* Head */}
                <circle
                  cx="60"
                  cy="46"
                  r={isThin ? "19" : isFat ? "26" : "22"}
                  fill={isGold ? "url(#goldGradient)" : baseColor}
                />

                {/* Cat Forehead Tabby Stripes if not gold */}
                {!isGold && (
                  <path
                    d="M56 32 L60 36 L64 32 M54 36 L60 41 L66 36"
                    stroke={accentColor}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    fill="none"
                  />
                )}

                {/* Cheeks if Fat/Happy */}
                {isFat && (
                  <>
                    <ellipse cx="40" cy="52" rx="7" ry="6" fill={baseColor} />
                    <ellipse cx="80" cy="52" rx="7" ry="6" fill={baseColor} />
                    <circle cx="43" cy="53" r="3" fill="#f43f5e" opacity="0.4" />
                    <circle cx="77" cy="53" r="3" fill="#f43f5e" opacity="0.4" />
                  </>
                )}

                {/* Whiskers */}
                <line x1="38" y1="51" x2="26" y2="49" stroke="#64748b" strokeWidth="1.2" />
                <line x1="38" y1="53" x2="25" y2="55" stroke="#64748b" strokeWidth="1.2" />
                <line x1="82" y1="51" x2="94" y2="49" stroke="#64748b" strokeWidth="1.2" />
                <line x1="82" y1="53" x2="95" y2="55" stroke="#64748b" strokeWidth="1.2" />

                {/* Eyes */}
                {isThin ? (
                  // Half-closed sad cat eyes
                  <>
                    <path d="M50 45 Q54 48 58 46" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <path d="M62 46 Q66 48 70 45" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <circle cx="48" cy="50" r="1.5" fill="#38bdf8" />
                  </>
                ) : isHappy || isFat || isGold ? (
                  // Happy curved cat eyes ^‿^
                  <>
                    <path d="M49 44 Q54 39 59 44" stroke="#1e293b" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                    <path d="M61 44 Q66 39 71 44" stroke="#1e293b" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                    <circle cx="47" cy="50" r="3" fill="#fb7185" opacity="0.6" />
                    <circle cx="73" cy="50" r="3" fill="#fb7185" opacity="0.6" />
                  </>
                ) : (
                  // Cat slit eyes
                  <>
                    <ellipse cx="53" cy="43" rx="3.5" ry="4" fill="#10b981" />
                    <ellipse cx="53" cy="43" rx="1.2" ry="3.5" fill="#0f172a" />
                    <circle cx="54" cy="41" r="1" fill="#ffffff" />
                    <ellipse cx="67" cy="43" rx="3.5" ry="4" fill="#10b981" />
                    <ellipse cx="67" cy="43" rx="1.2" ry="3.5" fill="#0f172a" />
                    <circle cx="68" cy="41" r="1" fill="#ffffff" />
                  </>
                )}

                {/* Cat Nose & Mouth */}
                <polygon points="58,50 62,50 60,53" fill="#f43f5e" />
                {isThin ? (
                  <path d="M57 56 Q60 54 63 56" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                ) : isHappy || isFat || isGold ? (
                  <path d="M56 54 Q60 57 64 54" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                ) : (
                  <path d="M56 54 Q58 56 60 54 Q62 56 64 54" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                )}
              </g>
            )}

            {/* Stage 5: Champion Golden Crown */}
            {isGold && (
              <g id="champion-crown" transform="translate(42, 10)">
                <polygon points="0,16 6,4 18,12 30,4 36,16" fill="#fde047" stroke="#b45309" strokeWidth="1.5" />
                <circle cx="6" cy="4" r="2" fill="#ef4444" />
                <circle cx="18" cy="12" r="2.5" fill="#3b82f6" />
                <circle cx="30" cy="4" r="2" fill="#10b981" />
              </g>
            )}
          </svg>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Floating Food Badges (+1 🍖 / +1 🐟) popping up when user scores */}
      <div className="fixed bottom-24 right-6 sm:right-8 z-50 pointer-events-none flex flex-col items-center">
        {foodNotifications.map((food) => (
          <div
            key={food.id}
            className="animate-float-food px-3 py-1 rounded-full bg-amber-500 text-white font-extrabold text-sm sm:text-base shadow-xl flex items-center gap-1.5 border border-amber-200"
          >
            <span>{food.text}</span>
            <span className="text-xs bg-amber-700/60 px-1.5 py-0.5 rounded-full font-mono">
              +1 Point!
            </span>
          </div>
        ))}
      </div>

      {/* Main Floating Virtual Pet Widget */}
      <div className="fixed bottom-20 right-4 sm:right-6 z-40 max-w-[calc(100vw-2rem)] sm:max-w-xs transition-all">
        {/* Expanded View Dialog */}
        {isExpanded ? (
          <div className="bg-slate-900/95 text-white rounded-3xl shadow-2xl border border-slate-700/80 backdrop-blur-xl p-4 sm:p-5 space-y-4 ring-1 ring-white/10 w-80 sm:w-88">
            {/* Header with Pet Title & Close */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/30">
                  <Zap className="w-4 h-4 text-amber-400" />
                </span>
                <div>
                  <h3 className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                    <span>{petName}</span>
                    {milestone.gold && <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {chapterCode} • {petBreed}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Sound Toggle */}
                <button
                  type="button"
                  onClick={handleToggleSound}
                  title={soundEnabled ? 'Mute sound' : 'Unmute sound'}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 text-xs transition-colors"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
                </button>

                {/* Minimize Button */}
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  title="Minimize Pet"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 text-xs transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Pet Graphic Container */}
            <div
              onClick={handlePet}
              title="Click to pet!"
              className={`relative cursor-pointer rounded-2xl p-4 flex flex-col items-center justify-center transition-all overflow-hidden ${
                milestone.gold
                  ? 'bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/40'
                  : 'bg-slate-950/60 border border-slate-800/80'
              }`}
            >
              {renderPetGraphic()}

              <span className="mt-2 text-[11px] text-slate-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
                <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                <span>Tap pet to play! ({petLoveCount} pats)</span>
              </span>
            </div>

            {/* Stage Milestone Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Chapter Evolution</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${milestone.badgeClass}`}>
                  Stage {milestone.stage}: {milestone.title}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    milestone.gold
                      ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600'
                      : milestone.stage === 4
                      ? 'bg-indigo-500'
                      : milestone.stage === 3
                      ? 'bg-emerald-500'
                      : milestone.stage === 2
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${Math.min(100, Math.max(5, completionPct))}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>{Math.round(completionPct)}% Answered</span>
                <span>{score} points fed 🍖</span>
              </div>
            </div>

            {/* Milestone Criteria Guide */}
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] space-y-1 text-slate-300">
              <div className="font-semibold text-indigo-300 flex items-center gap-1">
                <Info className="w-3.5 h-3.5" />
                <span>Evolution Rules ({chapterCode}):</span>
              </div>
              <ul className="space-y-0.5 text-slate-400 text-[10px] pl-1">
                <li className={milestone.stage === 1 ? 'text-rose-400 font-bold' : ''}>
                  • 0-20%: Very thin and dying
                </li>
                <li className={milestone.stage === 2 ? 'text-amber-400 font-bold' : ''}>
                  • 21-30%: Normal weight
                </li>
                <li className={milestone.stage === 3 ? 'text-emerald-400 font-bold' : ''}>
                  • 31-50%: Happy & joyful
                </li>
                <li className={milestone.stage === 4 ? 'text-indigo-400 font-bold' : ''}>
                  • 51-75%: Fatter & bigger
                </li>
                <li className={milestone.stage === 5 ? 'text-yellow-400 font-bold' : ''}>
                  • 76%+: Turns GOLD with FIRE AURA!
                </li>
              </ul>
            </div>

            {/* Species Selector (Dog 🐶 vs Cat 🐱) */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Choose Companion:</span>
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-800 border border-slate-700">
                <button
                  type="button"
                  onClick={() => handleSelectSpecies('dog')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    species === 'dog'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>🐶 Dog</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectSpecies('cat')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    species === 'cat'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>🐱 Cat</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Minimized Floating Pet Pill / Avatar */
          <div
            onClick={() => setIsExpanded(true)}
            className={`group cursor-pointer rounded-2xl shadow-2xl border backdrop-blur-md p-2 sm:px-3 sm:py-2 flex items-center gap-2.5 transition-all hover:scale-105 select-none ${
              milestone.gold
                ? 'bg-slate-900/95 border-amber-500/70 ring-2 ring-amber-400/40 text-white'
                : 'bg-slate-900/90 border-slate-700/80 text-white'
            }`}
            title={`Click to view ${petName} details!`}
          >
            {/* Mini Avatar with Jump */}
            <div className={`w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 flex items-center justify-center ${isJumping ? 'animate-pet-jump' : ''}`}>
              <div className="scale-65 origin-center">
                {renderPetGraphic()}
              </div>
            </div>

            {/* Mini Pet Info */}
            <div className="flex flex-col pr-1">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-slate-100 flex items-center gap-1">
                  <span>{petName.split(' ')[0]}</span>
                  {milestone.gold && <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />}
                </span>
                <span className={`px-1.5 py-0.2 rounded-md text-[9px] font-bold border ${milestone.badgeClass}`}>
                  St.{milestone.stage}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <span>{species === 'dog' ? '🐶' : '🐱'}</span>
                <span>{Math.round(completionPct)}% done</span>
                <span className="text-amber-400 font-mono">• {score} pts</span>
              </span>
            </div>

            <ChevronUp className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
          </div>
        )}
      </div>
    </>
  );
};
