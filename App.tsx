import React, { useState } from 'react';
import ChatPanel from './components/ChatPanel';
import AccountPlanView from './components/AccountPlanView';
import { ChatMessage, AccountPlan, ResearchStatus, SectionKey, HistoryItem } from './types';
import { sendChatMessage, generateAccountPlan, updatePlanSection } from './services/geminiService';
import { Layout, BrainCircuit, UserCircle, ChevronDown, MapPin, X, Sparkles, ChevronRight, ShieldAlert, CheckCircle, MessageSquare, ArrowLeft } from 'lucide-react';

// --- Landing Page Component ---
const LandingPage = ({ onStart, onSignIn }: { onStart: () => void, onSignIn: () => void }) => (
  <div className="min-h-screen bg-[#09090b] text-white flex flex-col font-sans selection:bg-indigo-500/30 overflow-y-auto">
    {/* Navbar */}
    <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full z-50">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/20">
                <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Nexus AI</span>
        </div>
        
        <div className="flex items-center gap-4">
            <button onClick={onSignIn} className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Sign In</button>
            <button onClick={onStart} className="bg-white text-zinc-950 px-5 py-2 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10">
                Get Started
            </button>
        </div>
    </nav>

    {/* Hero */}
    <main className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto mt-16 mb-20 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1] relative z-10">
            Research companies <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">
                at the speed of thought.
            </span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed relative z-10">
            Nexus AI builds comprehensive account plans in seconds. Get deep insights into Work Culture, Tech Stacks, Financials, and Strategic Challenges.
        </p>
        
        <button 
            onClick={onStart}
            className="group relative z-10 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full text-lg hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20 flex items-center gap-2"
        >
            Try Nexus AI 
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full text-left relative z-10">
            {[
                {
                    icon: <ShieldAlert className="w-6 h-6 text-indigo-400" />,
                    title: "Deep Research",
                    desc: "Real-time data on revenue, leadership, and news."
                },
                {
                    icon: <Layout className="w-6 h-6 text-purple-400" />,
                    title: "Structured Plans",
                    desc: "Auto-formatted into clear, executive-ready sections."
                },
                {
                    icon: <CheckCircle className="w-6 h-6 text-green-400" />,
                    title: "Tech & Culture",
                    desc: "Uncover tech stacks and employee sentiment analysis."
                }
            ].map((f, i) => (
                <div key={i} className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-indigo-500/30 transition-colors backdrop-blur-sm">
                    <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
                        {f.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">{f.desc}</p>
                </div>
            ))}
        </div>
    </main>
  </div>
);

// --- Full Page History Component ---
const HistoryView = ({ items, onSelect, onBack }: { items: HistoryItem[], onSelect: (item: HistoryItem) => void, onBack: () => void }) => (
    <div className="flex-1 bg-zinc-950 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={onBack} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-bold text-white">Research History</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.length === 0 ? (
                    <div className="col-span-full text-center py-20 text-zinc-500">
                        <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>No research history yet.</p>
                    </div>
                ) : (
                    items.map((item) => (
                        <button 
                            key={item.id}
                            onClick={() => onSelect(item)}
                            className="text-left p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-indigo-500/50 hover:bg-zinc-900/80 transition-all group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-colors">
                                    <BrainCircuit className="w-5 h-5" />
                                </div>
                                <span className="text-xs text-zinc-500 font-mono">{item.date}</span>
                            </div>
                            <h3 className="text-white font-medium mb-2 truncate pr-2">{item.title}</h3>
                            <p className="text-sm text-zinc-400 line-clamp-2">
                                Click to resume research and view the detailed account plan for this session.
                            </p>
                        </button>
                    ))
                )}
            </div>
        </div>
    </div>
);

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'workspace' | 'history'>('landing');
  
  // Workspace State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [accountPlan, setAccountPlan] = useState<AccountPlan | null>(null);
  const [status, setStatus] = useState<ResearchStatus>(ResearchStatus.IDLE);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([
    { id: 1, title: "Microsoft AI Strategy", date: "Previous Session" },
    { id: 2, title: "Netflix Work Culture", date: "Previous Session" }
  ]);
  
  // Auth State
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const handleSendMessage = async (text: string) => {
    setStatus(ResearchStatus.RESEARCHING);
    
    // Add to History if first message
    if (messages.length === 0) {
        setHistoryItems(prev => [{
            id: Date.now(),
            title: text.length > 30 ? text.substring(0, 30) + '...' : text,
            date: 'Just now'
        }, ...prev]);
    }

    const newUserMsg: ChatMessage = {
      role: 'user',
      text,
      timestamp: Date.now()
    };
    
    const updatedHistory = [...messages, newUserMsg];
    setMessages(updatedHistory);

    try {
      const response = await sendChatMessage(updatedHistory, text);
      
      const newAiMsg: ChatMessage = {
        role: 'model',
        text: response.text,
        sources: response.sources,
        timestamp: Date.now()
      };
      
      setMessages([...updatedHistory, newAiMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = {
        role: 'model',
        text: "I encountered an error while researching. Please try again.",
        timestamp: Date.now()
      };
      setMessages([...updatedHistory, errorMsg]);
    } finally {
      setStatus(ResearchStatus.IDLE);
    }
  };

  const handleGeneratePlan = async () => {
    if (messages.length === 0) return;
    
    setStatus(ResearchStatus.GENERATING_PLAN);
    try {
      const plan = await generateAccountPlan(messages);
      setAccountPlan(plan);
      // On mobile, auto-close sidebar to see plan
      if (window.innerWidth < 768) {
          setSidebarOpen(false);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to generate plan. Please try adding more research context.");
    } finally {
      setStatus(ResearchStatus.IDLE);
    }
  };

  const handleUpdateSection = async (key: string, instruction: string) => {
    if (!accountPlan) return;
    alert("Update feature for nested sections requires further implementation.");
  };

  const handleNewChat = () => {
    setMessages([]);
    setAccountPlan(null);
    setStatus(ResearchStatus.IDLE);
    setView('workspace');
  };

  // Auth Handlers
  const handleSignInClick = () => {
    setAuthMode('signin');
    setShowAuthModal(true);
  };

  const handleGetStartedClick = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
        setShowAuthModal(false);
        setView('workspace'); // Auto enter workspace after login
    }, 500);
  };

  // Nav Top Companies Data
  const TOP_HQ_COMPANIES = [
    { name: "Microsoft", location: "Redmond, WA" },
    { name: "Google", location: "Mountain View, CA" },
    { name: "Amazon", location: "Seattle, WA" },
    { name: "Apple", location: "Cupertino, CA" },
    { name: "Meta", location: "Menlo Park, CA" },
    { name: "Tesla", location: "Austin, TX" },
    { name: "Oracle", location: "Austin, TX" },
  ];

  if (view === 'landing') {
      return <LandingPage onStart={() => setView('workspace')} onSignIn={handleSignInClick} />;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-zinc-950 font-sans">
      
      {/* Top Navbar */}
      <nav className="h-14 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-6 z-50 flex-shrink-0">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                 <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">Nexus AI</span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
             <button 
                onClick={() => setView(view === 'history' ? 'workspace' : 'history')}
                className={`hover:text-white transition-colors focus:outline-none ${view === 'history' ? 'text-white' : ''}`}
             >
                History
             </button>
             
             {/* Top Companies Dropdown */}
             <div className="relative group h-full flex items-center">
                <button className="flex items-center gap-1 hover:text-white transition-colors py-4">
                    Top Companies <ChevronDown className="w-3 h-3" />
                </button>
                {/* Dropdown Menu */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-72 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50 overflow-hidden">
                    <div className="bg-zinc-950/50 px-4 py-2 border-b border-zinc-800">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Main Branches (HQ)</span>
                    </div>
                    <div className="py-1">
                        {TOP_HQ_COMPANIES.map((company) => (
                            <button 
                                key={company.name}
                                onClick={() => {
                                    setView('workspace');
                                    handleSendMessage(`Analyze ${company.name} and generate an account plan`);
                                }}
                                className="w-full text-left px-4 py-2.5 hover:bg-zinc-800 flex justify-between items-center group/item transition-colors"
                            >
                                <span className="text-zinc-300 group-hover/item:text-white text-sm">{company.name}</span>
                                <span className="flex items-center gap-1 text-[10px] text-zinc-500 group-hover/item:text-indigo-400">
                                    <MapPin className="w-3 h-3" /> {company.location}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-3">
              <button 
                onClick={handleSignInClick}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors hidden sm:block"
              >
                Sign In
              </button>
              <button 
                onClick={handleGetStartedClick}
                className="bg-white text-zinc-900 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors"
              >
                  Get Started
              </button>
          </div>
      </nav>

      {/* Main Content Switcher */}
      {view === 'history' ? (
          <HistoryView 
             items={historyItems} 
             onBack={() => setView('workspace')} 
             onSelect={(item) => {
                 // For now, mock restore by resetting to workspace and setting title as input logic or just reset
                 handleNewChat(); 
                 // Ideally we would load the specific chat history here
             }}
          />
      ) : (
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar (Chat) */}
            <div 
                className={`${
                sidebarOpen ? 'w-full md:w-[400px] lg:w-[450px]' : 'w-0'
                } transition-all duration-300 ease-in-out h-full relative z-20 flex-shrink-0 border-r border-zinc-800`}
            >
                <ChatPanel 
                messages={messages} 
                onSendMessage={handleSendMessage}
                status={status}
                historyItems={historyItems}
                onNewChat={handleNewChat}
                />
                
                {/* Toggle Button for Desktop */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="absolute -right-8 top-1/2 -translate-y-1/2 bg-zinc-800 p-1.5 rounded-r-lg shadow-md border-y border-r border-zinc-700 text-zinc-400 hidden md:flex hover:text-indigo-400 transition-colors z-50"
                    title={sidebarOpen ? "Collapse Chat" : "Open Chat"}
                >
                    <Layout className="w-4 h-4" />
                </button>
            </div>

            {/* Main Content (Plan) */}
            <div className="flex-1 h-full overflow-hidden relative bg-zinc-950">
                {/* Mobile Header Toggle */}
                {!sidebarOpen && (
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="absolute left-4 top-4 z-30 bg-zinc-800 p-2 rounded-lg shadow-sm border border-zinc-700 md:hidden text-white hover:text-indigo-400"
                    >
                        <Layout className="w-5 h-5"/>
                    </button>
                )}

                <AccountPlanView 
                plan={accountPlan} 
                status={status}
                onGenerate={handleGeneratePlan}
                onUpdateSection={handleUpdateSection}
                />
            </div>
          </div>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md p-8 shadow-2xl relative animate-in zoom-in-95 fade-in duration-200">
                <button 
                    onClick={() => setShowAuthModal(false)}
                    className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
                
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-600/20">
                        <BrainCircuit className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                        {authMode === 'signin' ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-zinc-400 text-sm">
                        {authMode === 'signin' 
                            ? 'Enter your credentials to access your workspace.' 
                            : 'Get started with Nexus AI for free.'}
                    </p>
                </div>

                <form onSubmit={handleAuthSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-zinc-500 uppercase mb-1.5">Email Address</label>
                        <input type="email" required className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all placeholder-zinc-600" placeholder="name@company.com" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-zinc-500 uppercase mb-1.5">Password</label>
                        <input type="password" required className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all placeholder-zinc-600" placeholder="••••••••" />
                    </div>
                    
                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg transition-colors mt-2 shadow-lg shadow-indigo-600/20">
                        {authMode === 'signin' ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-zinc-500">
                    {authMode === 'signin' ? (
                        <>
                            Don't have an account?{' '}
                            <button onClick={() => setAuthMode('signup')} className="text-indigo-400 hover:underline font-medium transition-colors">
                                Sign Up
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{' '}
                            <button onClick={() => setAuthMode('signin')} className="text-indigo-400 hover:underline font-medium transition-colors">
                                Sign In
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default App;