import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { 
  BookOpen, ChevronRight, PlayCircle, CheckCircle2, Search, LayoutDashboard, 
  GraduationCap, Trophy, Filter, Clock, BarChart, X, ArrowLeft, Home, User, 
  Bell, Compass, FileText, Lock, Bot, Gamepad2, PlusSquare, Users, Sparkles, TrendingUp,
  MessageSquare, Send, ThumbsUp, MoreHorizontal, Loader2
} from 'lucide-react';
import { COURSE_CONTENT, Module, Topic } from './constants';
import { supabase } from './lib/supabase';

type DiscussionComment = {
  id: string;
  topic_id: string;
  user_name: string;
  user_role: string;
  avatar_url: string;
  content: string;
  created_at: string;
  likes: number;
};

type UserProfile = {
  id?: string;
  name: string;
  email: string;
  avatar_url?: string;
  role?: string;
};

export default function App() {
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileTab, setMobileTab] = useState('home');

  const [comments, setComments] = useState<DiscussionComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // Authentication State
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showLogin, setShowLogin] = useState(true);
  const [loginName, setLoginName] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const filteredModules = COURSE_CONTENT.filter(mod => {
    const matchesSearch = mod.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      mod.topics.some(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const closeModuleDrawer = () => setActiveModule(null);
  const closeTopicViewer = () => setActiveTopic(null);

  useEffect(() => {
    const saved = localStorage.getItem('digilearn_user');
    if (saved) {
      setUserProfile(JSON.parse(saved));
      setShowLogin(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginName.trim() || !loginEmail.trim()) return;
    setIsLoggingIn(true);
    
    const profile: UserProfile = { 
      name: loginName, 
      email: loginEmail, 
      role: 'Member', 
      avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${loginName.replace(/\s+/g, '')}` 
    };

    if (supabase) {
      try {
        await supabase.from('users').upsert([profile], { onConflict: 'email' }).select().single();
      } catch (err) {
        console.warn("Could not save to Supabase users table:", err);
      }
    }

    localStorage.setItem('digilearn_user', JSON.stringify(profile));
    setUserProfile(profile);
    setShowLogin(false);
    setIsLoggingIn(false);
  };

  useEffect(() => {
    const fetchComments = async () => {
      if (!activeTopic) return;
      
      let fetchedComments: DiscussionComment[] = [];
      if (supabase) {
        try {
          const { data, error } = await supabase
            .from('comments')
            .select('*')
            .eq('topic_id', activeTopic.id)
            .order('created_at', { ascending: true });
          
          if (error) throw error;
          if (data) fetchedComments = data;
        } catch (err) {
          console.error("Error fetching comments from Supabase:", err);
        }
      }

      if (fetchedComments.length === 0) {
        // Fallback dummy data if no supabase or no comments
        fetchedComments = [
          {
            id: 'mock-1',
            topic_id: activeTopic.id,
            user_name: 'Budi Santoso',
            user_role: 'Kepala Sekolah SMP Bangsa',
            avatar_url: 'https://i.pravatar.cc/100?img=11',
            content: 'Materi yang sangat relevan! Saya berencana mulai implementasi sistem PPDB online bulan depan. Ada saran vendor sistem informasi sekolah yang bagus?',
            created_at: new Date(Date.now() - 7200000).toISOString(),
            likes: 12
          },
          {
            id: 'mock-2',
            topic_id: activeTopic.id,
            user_name: 'Diana Eka',
            user_role: 'Ketua Yayasan Mentari',
            avatar_url: 'https://i.pravatar.cc/100?img=5',
            content: 'Pak Budi, coba pelajari modul selanjutnya. Biasanya ada kurasi tools yang disarankan.',
            created_at: new Date(Date.now() - 3600000).toISOString(),
            likes: 4
          }
        ];
      }
      setComments(fetchedComments);
    };

    fetchComments();
  }, [activeTopic]);

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !activeTopic || !userProfile) return;
    
    setIsSubmittingComment(true);
    const commentObj = {
      topic_id: activeTopic.id,
      user_name: userProfile.name,
      user_role: userProfile.role || 'Member',
      avatar_url: userProfile.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${userProfile.name}`,
      content: newComment,
      likes: 0
    };

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('comments')
          .insert([commentObj])
          .select()
          .single();
          
        if (error) throw error;
        if (data) {
          setComments(prev => [...prev, data]);
        }
      } catch (err) {
        console.error("Failed to insert comment:", err);
        // Add locally anyway for UX preview
        setComments(prev => [...prev, { ...commentObj, id: Date.now().toString(), created_at: new Date().toISOString() }]);
      }
    } else {
      // Simulate network request if no supabase config
      await new Promise(resolve => setTimeout(resolve, 800));
      setComments(prev => [...prev, { ...commentObj, id: Date.now().toString(), created_at: new Date().toISOString() }]);
    }
    
    setNewComment('');
    setIsSubmittingComment(false);
  };

  return (
    <div className="flex w-full min-h-[100dvh] bg-slate-200 md:p-8 justify-center items-center font-sans text-slate-900">
      
      {/* Mobile Simulator Frame */}
      <div className="w-full h-[100dvh] md:h-[850px] md:max-h-[95vh] md:w-[400px] bg-slate-50 md:rounded-[40px] md:border-[10px] md:border-slate-800 md:shadow-2xl relative overflow-hidden flex flex-col shadow-black/20" id="app_container">
        
        {/* Registration Overlay */}
        <AnimatePresence>
          {showLogin && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-6"
            >
              <motion.div
                initial={{ y: 20, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                className="bg-white rounded-[32px] p-8 w-full max-w-[360px] shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-6">
                    <GraduationCap className="text-white w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Selamat Datang 👋</h2>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed">Masukkan nama dan email pembelian Anda untuk mengakses materi pembelajaran.</p>
                  
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                      <input 
                        type="text" 
                        required
                        value={loginName}
                        onChange={e => setLoginName(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm font-medium"
                        placeholder="Nama Anda"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Email Pembelian</label>
                      <input 
                        type="email" 
                        required
                        value={loginEmail}
                        onChange={e => setLoginEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm font-medium"
                        placeholder="email@contoh.com"
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={isLoggingIn || !loginName.trim() || !loginEmail.trim()}
                      className="w-full mt-2 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/30 active:scale-95 transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:active:scale-100"
                    >
                      {isLoggingIn ? <Loader2 size={18} className="animate-spin" /> : 'Mulai Belajar'}
                    </button>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Header */}
        <div className="sticky top-0 z-20 bg-slate-50/90 backdrop-blur-xl px-5 py-4 flex items-center justify-between border-b border-slate-200/50 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <GraduationCap className="text-white w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">DigiLearn</span>
          </div>
          <button className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center border border-slate-200 text-slate-600 shadow-sm active:scale-95 transition-transform">
            <Bell size={18} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pb-24 relative scroll-smooth will-change-scroll px-5 pt-2" id="main_content">
          
          {mobileTab === 'home' && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500 pt-2">
              
              {/* Selamat Datang Card */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[28px] p-6 text-white shadow-lg shadow-blue-600/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl -ml-10 -mb-10"></div>
                
                <div className="relative z-10">
                  <h2 className="text-[22px] font-extrabold mb-1">Halo, {userProfile?.name?.split(' ')[0] || 'Member'}! 👋</h2>
                  <p className="text-blue-100 text-xs mb-6 font-medium">Siap bertransformasi hari ini?</p>

                  <div className="flex gap-3">
                    <div className="flex-1 bg-white/10 border border-white/20 rounded-2xl p-3.5 backdrop-blur-md">
                      <div className="flex items-center gap-1.5 text-blue-100 text-[9px] font-bold uppercase tracking-widest mb-1.5"><TrendingUp size={12}/> Progres</div>
                      <div className="text-xl font-extrabold">24%</div>
                      <div className="w-full bg-white/20 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-white w-1/4 h-full rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex-1 bg-white/10 border border-white/20 rounded-2xl p-3.5 backdrop-blur-md">
                      <div className="flex items-center gap-1.5 text-blue-100 text-[9px] font-bold uppercase tracking-widest mb-1.5"><Sparkles size={12}/> Poin XP</div>
                      <div className="text-xl font-extrabold text-amber-300">1,450</div>
                      <div className="text-[10px] text-blue-100 mt-1 font-medium">Peringkat #4</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pintasan Menu */}
              <div>
                <h3 className="font-extrabold text-slate-900 mb-3 text-[15px] px-1">Pintasan Belajar</h3>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'ai', icon: Bot, label: 'AI Mentor', color: 'bg-violet-50 text-violet-600 border-violet-100' },
                    { id: 'quiz', icon: Gamepad2, label: 'Kuis', color: 'bg-amber-50 text-amber-600 border-amber-100' },
                    { id: 'extra', icon: PlusSquare, label: 'Modul +', color: 'bg-rose-50 text-rose-600 border-rose-100' },
                    { id: 'forum', icon: Users, label: 'Forum', color: 'bg-sky-50 text-sky-600 border-sky-100' }
                  ].map(item => (
                    <button key={item.id} className="flex flex-col items-center gap-2 group">
                      <div className={`w-[60px] h-[60px] rounded-[20px] border flex items-center justify-center shadow-sm active:scale-90 transition-transform ${item.color}`}>
                        <item.icon size={26} strokeWidth={2.5} />
                      </div>
                      <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Lanjutkan Belajar */}
              <div>
                <div className="flex justify-between items-end mb-3 px-1">
                  <h3 className="font-extrabold text-slate-900 text-[15px]">Lanjutkan Belajar</h3>
                  <button onClick={() => setMobileTab('courses')} className="text-blue-600 text-[11px] font-bold hover:underline">Lihat Semua</button>
                </div>
                
                <div className="flex flex-col gap-4">
                  {COURSE_CONTENT.slice(0, 1).map((module) => (
                    <motion.div
                      layoutId={`module-card-${module.id}`}
                      key={module.id}
                      onClick={() => setActiveModule(module)}
                      className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm active:scale-[0.98] transition-all cursor-pointer flex flex-col relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full blur-3xl opacity-50 -mr-10 -mt-10"></div>
                      <div className="flex justify-between items-start mb-3 relative z-10">
                        <div className="p-2.5 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl">
                          <BookOpen size={18} />
                        </div>
                        <span className="px-2.5 py-1 bg-blue-50 text-blue-600 font-bold border border-blue-100 rounded-full text-[9px] uppercase tracking-widest">
                          Modul Berjalan
                        </span>
                      </div>
                      <h3 className="font-extrabold text-base text-slate-900 leading-snug mb-1 relative z-10 pr-4">{module.title}</h3>
                      <p className="text-slate-500 text-[12px] line-clamp-2 leading-relaxed mb-4 relative z-10">{module.description}</p>
                      
                      <div className="w-full bg-slate-100 h-1.5 rounded-full mt-auto relative z-10 overflow-hidden">
                        <div className="bg-blue-600 w-[24%] h-full rounded-full"></div>
                      </div>
                      <div className="flex justify-between mt-2 relative z-10 text-[10px] font-bold text-slate-500">
                        <span>2 dari {module.topics.length} Topik</span>
                        <span className="text-blue-600">Terakhir: 2 jam lalu</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {mobileTab === 'courses' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 pt-2">
              {/* Greeting & Search */}
              <div className="mb-6">
                <h2 className="text-[22px] font-extrabold text-slate-900 leading-tight">Eksplorasi Materi 📚</h2>
                <p className="text-slate-500 text-xs mt-1">Cari modul atau topik bahasan</p>
                
                <div className="mt-5 flex gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="Cari materi..."
                      className="pl-10 pr-4 py-3 bg-white shadow-sm shadow-slate-200/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full text-sm font-medium placeholder:text-slate-400"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button className="p-3 w-12 bg-white shadow-sm flex-shrink-0 flex items-center justify-center shadow-slate-200/50 border border-slate-200 rounded-2xl text-slate-600 active:scale-95 transition-transform">
                    <Filter size={18} />
                  </button>
                </div>
              </div>

              {/* Module List (1 column for mobile) */}
              <div className="flex flex-col gap-4" id="module_grid">
                {filteredModules.map((module, idx) => (
                  <motion.div
                    layoutId={`module-card-${module.id}`}
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, ease: "easeOut" }}
                    onClick={() => setActiveModule(module)}
                    className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm active:scale-[0.98] transition-all cursor-pointer flex flex-col relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full blur-3xl opacity-50 -mr-10 -mt-10"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <div className="p-3 bg-blue-50 border border-blue-100 text-blue-600 rounded-2xl">
                        <BookOpen size={20} />
                      </div>
                      <span className="px-3 py-1 bg-slate-50 text-slate-500 font-bold border border-slate-100 rounded-full text-[10px] uppercase tracking-widest">
                        Modul {idx+1}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-[17px] text-slate-900 leading-snug mb-2 relative z-10">{module.title}</h3>
                    <p className="text-slate-500 text-[13px] line-clamp-2 leading-relaxed mb-4 relative z-10 min-h-[40px]">{module.description}</p>
                    
                    <div className="flex w-full items-center justify-between relative z-10 mt-auto pt-4 border-t border-slate-50">
                      <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                        <FileText size={14} className="text-blue-500"/>
                        <span>{module.topics.length} Topik</span>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400">
                        <ChevronRight size={14} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {mobileTab === 'dashboard' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 pt-10 flex flex-col items-center text-center">
               <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-blue-500 shadow-inner">
                 <LayoutDashboard size={32} />
               </div>
               <h2 className="text-xl font-extrabold text-slate-900 mb-2">Progres & Statistik</h2>
               <p className="text-slate-500 text-sm max-w-[250px]">Lacak perkembangan belajar, hasil kuis harian, dan ringkasan nilai Anda.</p>
            </div>
          )}

          {mobileTab === 'profile' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 pt-10 flex flex-col items-center text-center">
               <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400 border-4 border-white shadow-sm overflow-hidden">
                 {userProfile?.avatar_url ? (
                   <img src={userProfile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                 ) : (
                   <User size={36} />
                 )}
               </div>
               <h2 className="text-xl font-extrabold text-slate-900 mb-1">{userProfile?.name || 'Member'}</h2>
               <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{userProfile?.email || 'email@contoh.com'}</p>
               <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-4 bg-blue-50 px-3 py-1 rounded-full">{userProfile?.role || 'Member'}</p>
               <div className="flex gap-3">
                 <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/20 active:scale-95">Edit Profil</button>
                 <button 
                   onClick={() => {
                     localStorage.removeItem('digilearn_user');
                     setUserProfile(null);
                     setShowLogin(true);
                   }}
                   className="px-6 py-2.5 bg-white border border-slate-200 text-rose-600 rounded-xl text-sm font-bold shadow-sm active:scale-95"
                 >
                   Keluar
                 </button>
               </div>
            </div>
          )}

        </main>

        {/* BOTTOM NAVIGATION (Absolute within frame) */}
        <nav className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-200/60 z-40 pb-5 pt-3 px-6 flex justify-between items-center md:rounded-b-[28px]">
          {[
            { id: 'home', icon: Home, label: 'Beranda' },
            { id: 'courses', icon: Compass, label: 'Eksplor' },
            { id: 'dashboard', icon: LayoutDashboard, label: 'Progres' },
            { id: 'profile', icon: User, label: 'Profil' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setMobileTab(item.id)} 
              className={`flex flex-col items-center gap-1 p-1 transition-colors ${mobileTab === item.id ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <item.icon size={22} className={`${mobileTab === item.id ? 'fill-blue-600/20' : ''} transition-all ${mobileTab === item.id ? 'scale-110' : 'scale-100'}`} />
              <span className="text-[10px] font-bold tracking-wide mt-0.5">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* MODULE DRAWER OVERLAY */}
        <AnimatePresence>
          {activeModule && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModuleDrawer}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-[50]"
              />
              <motion.div 
                layoutId={`module-card-${activeModule.id}`}
                className="absolute inset-x-0 bottom-0 top-12 bg-white rounded-t-[32px] shadow-2xl z-[51] flex flex-col overflow-hidden"
              >
                <div className="flex-shrink-0 p-5 bg-slate-900 text-white relative pt-8 rounded-t-[32px] z-10">
                  <div className="w-12 h-1.5 bg-white/20 absolute top-3 left-1/2 -translate-x-1/2 rounded-full"></div>
                  <button 
                    onClick={closeModuleDrawer}
                    className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                  
                  <div className="flex items-start gap-3 mt-2 mb-2">
                    <div className="p-2 bg-blue-500/20 border border-blue-400/30 rounded-lg text-blue-400 flex-shrink-0">
                      <BookOpen size={18} />
                    </div>
                    <h2 className="text-lg font-extrabold leading-tight text-white pr-4">{activeModule.title}</h2>
                  </div>
                  <p className="text-slate-300 text-[13px] leading-relaxed opacity-90 line-clamp-2">{activeModule.description}</p>
                  
                  <div className="flex gap-3 mt-4">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs">
                      <FileText size={14} className="text-blue-400" />
                      <span className="font-bold text-white">0 / {activeModule.topics.length} Topik</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs">
                      <Clock size={14} className="text-emerald-400" />
                      <span className="font-bold text-white">~3 Jam</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto bg-slate-50 p-5">
                  <h3 className="font-extrabold text-slate-900 mb-4 flex items-center gap-2 text-sm">
                    <BarChart size={16} className="text-blue-500" /> Daftar Materi Topik
                  </h3>
                  <div className="space-y-3">
                    {activeModule.topics.map((topic, i) => (
                      <div 
                        key={topic.id}
                        onClick={() => setActiveTopic(topic)}
                        className={`flex items-center gap-3 p-4 rounded-[20px] border transition-all cursor-pointer ${topic.content ? 'bg-white border-blue-100 hover:border-blue-300 shadow-sm shadow-blue-500/5' : 'bg-slate-50 border-slate-200/60 opacity-80'}`}
                      >
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center font-bold text-[11px] ${topic.content ? 'bg-blue-50 border-blue-100 text-blue-600' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
                          {i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest border ${
                              topic.level === 'Beginner' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                              topic.level === 'Intermediate' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                              'bg-rose-50 text-rose-600 border-rose-100'
                            }`}>
                              {topic.level}
                            </span>
                          </div>
                          <h4 className={`font-bold text-[13px] leading-tight line-clamp-2 pr-2 ${topic.content ? 'text-slate-800' : 'text-slate-600'}`}>{topic.title}</h4>
                          <div className="flex items-center gap-3 mt-2 text-slate-500 text-[10px] font-bold">
                            <span className="flex items-center gap-1"><Clock size={12} /> {topic.duration}</span>
                            {topic.content ? (
                              <span className="flex items-center gap-1 text-blue-500"><FileText size={12} /> Teks Lengkap</span>
                            ) : (
                              <span className="flex items-center gap-1 text-slate-400"><Lock size={12} /> Terkunci</span>
                            )}
                          </div>
                        </div>
                        <ChevronRight size={18} className={`flex-shrink-0 ${topic.content ? 'text-blue-500' : 'text-slate-300'}`} />
                      </div>
                    ))}
                  </div>
                  {/* Padding to allow scrolling past bottom */}
                  <div className="h-10"></div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* READING VIEW OVERLAY (Fullscreen Absolute covering the frame) */}
        <AnimatePresence>
          {activeTopic && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-0 bg-white z-[70] flex flex-col md:rounded-[28px] overflow-hidden"
            >
              {/* Toolbar */}
              <div className="flex-shrink-0 border-b border-slate-100 bg-white p-4 flex items-center justify-between z-20 shadow-sm">
                <div className="flex items-center gap-2 overflow-hidden mr-2">
                  <button 
                    onClick={closeTopicViewer}
                    className="flex-shrink-0 p-2 -ml-2 text-slate-500 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors flex items-center"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <h3 className="font-bold text-slate-900 truncate text-[12px] opacity-80">{activeTopic.title}</h3>
                </div>
                <button className="flex-shrink-0 bg-emerald-500 text-white px-3 py-1.5 rounded-xl font-bold text-[10px] flex items-center gap-1.5 shadow-sm active:scale-95 uppercase tracking-wider">
                  <CheckCircle2 size={12} /> Selesai
                </button>
              </div>
              
              {/* Content Scroll Area */}
              <div className="flex-1 overflow-y-auto bg-slate-50 scroll-smooth w-full relative">
                <div className="w-full mx-auto py-6 px-5">
                  <div className="mb-6">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="px-2.5 py-1 bg-slate-200 text-slate-700 font-bold text-[9px] rounded-full uppercase tracking-widest">{activeTopic.level}</span>
                      <span className="flex items-center gap-1 text-slate-500 text-[11px] font-bold tracking-wide"><Clock size={12} /> {activeTopic.duration}</span>
                    </div>
                    <h1 className="text-[22px] font-extrabold text-slate-900 leading-tight tracking-tight">{activeTopic.title}</h1>
                  </div>

                  <div className="bg-white p-5 rounded-[24px] shadow-sm border border-slate-200">
                    {activeTopic.content ? (
                      <div className="prose prose-slate prose-blue max-w-none text-[14px] prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-lg prose-h2:mt-6 prose-h2:mb-3 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-blue-600 prose-img:rounded-xl prose-li:text-slate-600 selection:bg-blue-100 pb-2">
                        <Markdown>{activeTopic.content}</Markdown>
                      </div>
                    ) : (
                      <div className="py-16 text-center flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
                          <Lock size={24} className="text-slate-300" />
                        </div>
                        <h3 className="text-lg font-extrabold text-slate-900 mb-1.5">Materi Belum Terbuka</h3>
                        <p className="text-slate-500 text-xs leading-relaxed max-w-[250px]">Topik ini masih dikunci atau sedang dalam tahap penyusunan. Pelajari materi sebelumnya.</p>
                        <button onClick={closeTopicViewer} className="mt-6 px-5 py-2.5 bg-blue-50 border border-blue-100 rounded-xl text-blue-600 font-bold text-xs">Kembali ke Daftar</button>
                      </div>
                    )}
                  </div>
                  
                  {activeTopic.content && (
                    <div className="mt-6 flex justify-between items-center bg-transparent border-2 border-slate-200 border-dashed p-4 rounded-2xl active:bg-blue-50/50 hover:bg-blue-50/30 transition-colors cursor-pointer group mb-8">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Selanjutnya</p>
                        <p className="font-bold text-slate-900 text-[13px]">Menuju Topik Berikutnya</p>
                      </div>
                      <div className="w-10 h-10 bg-white text-slate-400 rounded-full flex items-center justify-center shadow-sm border border-slate-100 text-blue-500">
                        <ChevronRight size={20} />
                      </div>
                    </div>
                  )}

                  {/* Diskusi Member */}
                  {activeTopic.content && (
                    <div className="mt-2 mb-8" id="discussion-section">
                      <div className="flex items-center gap-2 mb-4 px-1">
                        <MessageSquare size={18} className="text-blue-500" />
                        <h3 className="font-extrabold text-slate-900 text-base">Diskusi Member</h3>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-[10px] font-bold ml-auto">{comments.length} Komentar</span>
                      </div>
                      
                      <div className="space-y-4 mb-4">
                        {comments.map((comment, index) => (
                          <div key={comment.id} className={`bg-white p-4 rounded-2xl border border-slate-200 shadow-sm relative ${index > 0 ? "ml-8 relative before:absolute before:left-[-16px] before:top-[-20px] before:w-[2px] before:h-8 before:bg-slate-200 before:content-[''] after:absolute after:left-[-16px] after:top-[16px] after:w-4 after:h-[2px] after:bg-slate-200 after:content-['']" : ""}`}>
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 overflow-hidden">
                                  <img src={comment.avatar_url} alt="avatar" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                  <p className="font-bold text-[13px] text-slate-900">{comment.user_name}</p>
                                  <p className="text-[10px] text-slate-400">{comment.user_role} • {new Date(comment.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                                </div>
                              </div>
                              <button className="text-slate-400 p-1 hover:text-slate-600 transition-colors"><MoreHorizontal size={16} /></button>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">{comment.content}</p>
                            {index === 0 && (
                              <div className="flex gap-4 mt-3">
                                <button className="flex items-center gap-1.5 text-xs text-slate-500 font-medium hover:text-blue-600 transition-colors"><ThumbsUp size={14} /> {comment.likes}</button>
                                <button className="flex items-center gap-1.5 text-xs text-slate-500 font-medium hover:text-blue-600 transition-colors">Balas</button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Input Komentar */}
                      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex items-end gap-2 sticky bottom-4 z-10 shadow-slate-200/50">
                        <div className="flex-1">
                          <textarea 
                            rows={1}
                            placeholder="Tulis pendapat Anda..."
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                            onKeyDown={e => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmitComment();
                              }
                            }}
                            className="w-full px-3 py-2 text-sm text-slate-700 bg-transparent resize-none focus:outline-none placeholder:text-slate-400 min-h-[40px] max-h-[100px]"
                          ></textarea>
                        </div>
                        <button 
                          onClick={handleSubmitComment}
                          disabled={!newComment.trim() || isSubmittingComment}
                          className="p-2.5 bg-blue-600 flex-shrink-0 text-white rounded-xl shadow-md shadow-blue-500/30 active:scale-95 transition-transform disabled:opacity-50 flex items-center justify-center min-w-[40px]"
                        >
                          {isSubmittingComment ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Bottom Padding */}
                  <div className="h-14"></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
