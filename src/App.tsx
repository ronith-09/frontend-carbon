import { useState, useRef, useEffect } from 'react';
import { 
  Leaf, 
  Bell, 
  User, 
  History, 
  Wallet, 
  ChevronRight, 
  TrendingUp,
  PlusCircle,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  ArrowLeft,
  Upload,
  ShieldCheck,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Car
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type View = 'landing' | 'login' | 'signup' | 'dashboard' | 'admin' | 'register-vehicle';

interface Vehicle {
  id: string;
  name: string;
  number: string;
  type: string;
  status: string;
  credits: number;
  rupees: number;
  totalPayout: number;
  lastPayout: number;
  history: { date: string; km: string; credits: string; earnings: string }[];
}

export default function App() {
  const [view, setView] = useState<View>('landing');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isVehicleDropdownOpen, setIsVehicleDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [newVehicle, setNewVehicle] = useState({
    name: '',
    number: '',
    type: '2 Wheeler'
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: 'v1',
      name: 'Ola S1 Pro',
      number: 'TS09AB1234',
      type: '2 Wheeler',
      status: 'Active',
      credits: 0.42,
      rupees: 336,
      totalPayout: 520,
      lastPayout: 150,
      history: [
        { date: '12 Mar 2026', km: '120 km', credits: '0.0077', earnings: '6.16' },
        { date: '15 Mar 2026', km: '180 km', credits: '0.0115', earnings: '9.20' },
        { date: '20 Mar 2026', km: '210 km', credits: '0.0134', earnings: '10.72' },
      ]
    },
    {
      id: 'v2',
      name: 'Ather 450X',
      number: 'KA01XY5678',
      type: '2 Wheeler',
      status: 'Active',
      credits: 0.85,
      rupees: 680,
      totalPayout: 1200,
      lastPayout: 450,
      history: [
        { date: '10 Mar 2026', km: '250 km', credits: '0.0160', earnings: '12.80' },
        { date: '18 Mar 2026', km: '300 km', credits: '0.0192', earnings: '15.36' },
      ]
    }
  ]);

  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(vehicles[0].id);
  const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId) || vehicles[0];

  const handleAddVehicle = () => {
    if (!newVehicle.name || !newVehicle.number) return;
    
    const vehicle: Vehicle = {
      id: `v${vehicles.length + 1}`,
      name: newVehicle.name,
      number: newVehicle.number,
      type: newVehicle.type,
      status: 'Pending',
      credits: 0,
      rupees: 0,
      totalPayout: 0,
      lastPayout: 0,
      history: []
    };

    setVehicles([...vehicles, vehicle]);
    setSelectedVehicleId(vehicle.id);
    setView('dashboard');
    setNewVehicle({ name: '', number: '', type: '2 Wheeler' });
  };

  const handleUploadProof = () => {
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      setUploadSuccess(true);
      
      // Update vehicle data
      setVehicles(prev => prev.map(v => {
        if (v.id === selectedVehicleId) {
          const newCredits = v.credits + 0.012;
          const newRupees = v.rupees + 12.50;
          return {
            ...v,
            credits: Number(newCredits.toFixed(3)),
            rupees: Number(newRupees.toFixed(2)),
            history: [
              { id: Date.now(), date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), credits: 0.012, status: 'Approved' },
              ...v.history
            ]
          };
        }
        return v;
      }));

      setTimeout(() => {
        setUploadSuccess(false);
        setIsUploadModalOpen(false);
      }, 2000);
    }, 3000);
  };

  const pendingRegistrations = [
    { id: 1, user: 'Rahul Sharma', vehicle: 'Ola S1', number: 'TS09AB1234', date: '25 Mar 2026' },
    { id: 2, user: 'Priya Verma', vehicle: 'Ather 450X', number: 'KA01XY5678', date: '26 Mar 2026' },
  ];

  // --- UI Components ---

  const Navbar = ({ isAdmin = false, isLanding = false }) => (
    <nav className={`bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 ${isLanding ? 'py-2' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView(isLanding ? 'landing' : isAdmin ? 'admin' : 'dashboard')}>
          <div className="bg-green-600 p-1.5 rounded-lg shadow-lg shadow-green-100">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-800">EcoMiles</span>
          {isAdmin && <span className="ml-2 px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded uppercase">Admin</span>}
        </div>
        
        {isLanding ? (
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-semibold text-slate-600 hover:text-green-600 transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-semibold text-slate-600 hover:text-green-600 transition-colors">How it Works</a>
            <a href="#impact" className="text-sm font-semibold text-slate-600 hover:text-green-600 transition-colors">Impact</a>
            <button 
              onClick={() => setView('login')}
              className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-green-100 transition-all active:scale-95"
            >
              Get Started
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
              <button 
                onClick={() => setView('login')}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
              <div 
                onClick={() => setIsProfileModalOpen(true)}
                className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden border border-slate-100 cursor-pointer hover:ring-2 hover:ring-green-500 transition-all"
              >
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${isAdmin ? 'Admin' : 'Felix'}`} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  const AuthLayout = ({ children, title, subtitle, linkText, linkAction }: any) => (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-10 border border-slate-100"
      >
        <div className="flex flex-col items-center text-center mb-10">
          <div className="bg-green-600 p-3 rounded-2xl mb-4 shadow-lg shadow-green-100">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">{title}</h1>
          <p className="text-slate-500 mt-2">{subtitle}</p>
        </div>
        
        {children}

        <div className="mt-8 text-center text-sm text-slate-500">
          {linkText} <button onClick={linkAction} className="text-green-600 font-bold hover:underline">Click here</button>
        </div>
      </motion.div>
    </div>
  );

  const LandingPage = () => (
    <div className="bg-white">
      <Navbar isLanding />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-green-50 rounded-full blur-3xl opacity-60"></div>
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-100">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-bold text-green-700 uppercase tracking-wider">Live in India</span>
            </div>
            <h1 className="text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight">
              Turn your EV rides into <span className="text-green-600">Real Earnings.</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-lg">
              EcoMiles helps EV users track their mileage, earn carbon credits, and convert them into cash—all with a simple photo of your odometer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => setView('signup')}
                className="bg-green-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-green-200 hover:bg-green-700 hover:scale-105 transition-all active:scale-95"
              >
                Join EcoMiles Now
              </button>
              <button className="bg-white text-slate-700 px-10 py-5 rounded-2xl font-bold text-lg border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                <Eye className="w-5 h-5" /> How it Works
              </button>
            </div>
            <div className="flex items-center gap-6 pt-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-500 font-medium">
                Joined by <span className="text-slate-900 font-bold">10,000+</span> EV riders this month
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-green-600 rounded-[3rem] rotate-3 blur-2xl opacity-10"></div>
            <div className="relative bg-white rounded-[3rem] border border-slate-100 shadow-2xl p-4">
              <img 
                src="https://picsum.photos/seed/ev-dashboard/1200/1600" 
                alt="App Preview" 
                className="rounded-[2.5rem] w-full shadow-inner"
              />
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-xl border border-slate-50 flex items-center gap-4 max-w-[240px]">
                <div className="bg-green-100 p-3 rounded-2xl">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase">Total Earnings</div>
                  <div className="text-xl font-bold text-slate-800">₹ 1,24,500+</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-slate-50/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <h2 className="text-sm font-bold text-green-600 uppercase tracking-widest">Platform Features</h2>
            <h3 className="text-4xl font-bold text-slate-900 tracking-tight">Everything you need to monetize your green commute.</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "AI-Powered OCR", desc: "Our advanced AI extracts mileage from your odometer photo instantly with 99.9% accuracy." },
              { icon: Wallet, title: "Instant Payouts", desc: "Convert your earned carbon credits into real cash and withdraw directly to your bank account." },
              { icon: LayoutDashboard, title: "Clean Analytics", desc: "Track your environmental contribution and earnings history through our intuitive dashboard." }
            ].map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8">
                  <f.icon className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-4">{f.title}</h4>
                <p className="text-slate-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-sm font-bold text-green-600 uppercase tracking-widest">The Process</h2>
                <h3 className="text-4xl font-bold text-slate-900 tracking-tight">Start earning in 4 simple steps.</h3>
              </div>
              
              <div className="space-y-8">
                {[
                  { step: "01", title: "Register your EV", desc: "Sign up and add your vehicle details for verification." },
                  { step: "02", title: "Drive as usual", desc: "Go about your daily commute in your electric vehicle." },
                  { step: "03", title: "Upload Screenshot", desc: "Upload a clear photo of your odometer once a month." },
                  { step: "04", title: "Get Paid", desc: "Credits are calculated and added to your wallet instantly." }
                ].map((s, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="text-3xl font-black text-slate-100 group-hover:text-green-100 transition-colors">{s.step}</div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-slate-800">{s.title}</h4>
                      <p className="text-slate-500 text-sm">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/20 rounded-full blur-3xl"></div>
              <div className="relative z-10 space-y-8">
                <div className="bg-green-600 w-12 h-12 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h4 className="text-3xl font-bold leading-tight">Join the green revolution and get rewarded for it.</h4>
                <p className="text-slate-400 leading-relaxed">
                  We've already distributed over ₹ 15 Lakhs in rewards to EV riders across India. Your commute matters.
                </p>
                <button 
                  onClick={() => setView('signup')}
                  className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold hover:bg-green-500 hover:text-white transition-all"
                >
                  Start Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-20 text-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-green-600 p-1.5 rounded-lg">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight">EcoMiles</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Empowering EV users to contribute to a greener planet while earning rewards for every kilometer driven.
            </p>
          </div>
          <div className="space-y-6">
            <h5 className="font-bold text-lg">Company</h5>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h5 className="font-bold text-lg">Support</h5>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 mt-20 pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
          © 2026 EcoMiles. All rights reserved.
        </div>
      </footer>
    </div>
  );

  // --- Views ---

  if (view === 'landing') {
    return <LandingPage />;
  }
  if (view === 'login') {
    return (
      <AuthLayout 
        title="Welcome Back" 
        subtitle="Login to track your Eco-savings"
        linkText="Don't have an account?"
        linkAction={() => setView('signup')}
      >
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Username</label>
            <input type="text" placeholder="Enter username" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all" />
          </div>
          <button 
            onClick={() => setView('dashboard')}
            className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-200 hover:bg-green-700 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4"
          >
            Sign In
          </button>
          <button 
            onClick={() => setView('admin')}
            className="w-full bg-slate-800 text-white py-4 rounded-2xl font-bold hover:bg-slate-900 transition-all mt-2"
          >
            Admin Login
          </button>
        </div>
      </AuthLayout>
    );
  }

  if (view === 'signup') {
    return (
      <AuthLayout 
        title="Join EcoMiles" 
        subtitle="Start earning from your EV rides"
        linkText="Already have an account?"
        linkAction={() => setView('login')}
      >
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Full Name</label>
            <input type="text" placeholder="John Doe" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Username</label>
            <input type="text" placeholder="johndoe123" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all" />
          </div>
          <button 
            onClick={() => setView('register-vehicle')}
            className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-200 hover:bg-green-700 hover:scale-[1.02] transition-all mt-4"
          >
            Create Account
          </button>
        </div>
      </AuthLayout>
    );
  }

  if (view === 'register-vehicle') {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4">
        <div className="max-w-xl mx-auto">
          <button onClick={() => setView('signup')} className="flex items-center gap-2 text-slate-500 font-bold mb-8 hover:text-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          <div className="bg-white rounded-[2.5rem] shadow-xl p-10 border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Register Your Vehicle</h2>
            <p className="text-slate-500 mb-8">We need these details to verify your EV and create your wallet.</p>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Vehicle Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Ola S1" 
                    value={newVehicle.name}
                    onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-green-500 transition-all" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Vehicle Number</label>
                  <input 
                    type="text" 
                    placeholder="TS09AB1234" 
                    value={newVehicle.number}
                    onChange={(e) => setNewVehicle({ ...newVehicle, number: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-green-500 transition-all" 
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Vehicle Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setNewVehicle({ ...newVehicle, type: '2 Wheeler' })}
                    className={`p-4 border-2 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${newVehicle.type === '2 Wheeler' ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-100 bg-slate-50 text-slate-500'}`}
                  >
                    <TrendingUp className="w-5 h-5" /> 2 Wheeler
                  </button>
                  <button 
                    onClick={() => setNewVehicle({ ...newVehicle, type: '3 Wheeler' })}
                    className={`p-4 border-2 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${newVehicle.type === '3 Wheeler' ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-100 bg-slate-50 text-slate-500'}`}
                  >
                    <LayoutDashboard className="w-5 h-5" /> 3 Wheeler
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Vehicle Screenshot</label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-slate-400 hover:border-green-400 hover:bg-green-50/30 transition-all cursor-pointer group">
                  <Upload className="w-10 h-10 mb-2 group-hover:text-green-500 transition-colors" />
                  <span className="text-sm font-medium">Click to upload or drag & drop</span>
                  <span className="text-[10px] uppercase font-bold mt-1 opacity-60">PNG, JPG up to 5MB</span>
                </div>
              </div>

              <button 
                onClick={handleAddVehicle}
                className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-200 hover:bg-green-700 transition-all mt-4"
              >
                Submit for Approval
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'admin') {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Navbar isAdmin />
        <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Admin Control Panel</h1>
              <p className="text-slate-500">Manage registrations and monitor system credits.</p>
            </div>
            <div className="flex gap-3">
              <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-bold text-slate-600">System Live</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Credits</span>
              <div className="text-3xl font-bold text-slate-800 mt-1">1,240.50</div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Payouts</span>
              <div className="text-3xl font-bold text-slate-800 mt-1">₹ 9,92,400</div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Active Users</span>
              <div className="text-3xl font-bold text-slate-800 mt-1">482</div>
            </div>
          </div>

          {/* Pending Approvals */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">Pending Vehicle Approvals</h2>
              <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase">{pendingRegistrations.length} Pending</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider">
                    <th className="px-6 py-4 font-semibold">User</th>
                    <th className="px-6 py-4 font-semibold">Vehicle Details</th>
                    <th className="px-6 py-4 font-semibold">Proof</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {pendingRegistrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                            <User className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-800">{reg.user}</div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase">{reg.date}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-slate-700">{reg.vehicle}</div>
                        <div className="text-xs text-slate-400 font-mono uppercase">{reg.number}</div>
                      </td>
                      <td className="px-6 py-4">
                        <button className="flex items-center gap-1 text-blue-600 text-xs font-bold hover:underline">
                          <Eye className="w-3 h-3" /> View Screenshot
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors" title="Reject">
                            <XCircle className="w-6 h-6" />
                          </button>
                          <button className="p-2 text-green-500 hover:bg-green-50 rounded-xl transition-colors" title="Approve">
                            <CheckCircle2 className="w-6 h-6" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Default User Dashboard
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Vehicle Switcher */}
        <div className="relative" ref={dropdownRef}>
          <div 
            onClick={() => setIsVehicleDropdownOpen(!isVehicleDropdownOpen)}
            className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:border-green-500 transition-all shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-2.5 rounded-xl">
                <Car className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{selectedVehicle.name}</h3>
                <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">{selectedVehicle.number}</p>
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isVehicleDropdownOpen ? 'rotate-180' : ''}`} />
          </div>

          <AnimatePresence>
            {isVehicleDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden"
              >
                <div className="p-2 space-y-1">
                  {vehicles.map((v) => (
                    <button 
                      key={v.id}
                      onClick={() => {
                        setSelectedVehicleId(v.id);
                        setIsVehicleDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${selectedVehicleId === v.id ? 'bg-green-50 text-green-700' : 'hover:bg-slate-50 text-slate-600'}`}
                    >
                      <div className="flex items-center gap-3">
                        <Car className={`w-5 h-5 ${selectedVehicleId === v.id ? 'text-green-600' : 'text-slate-400'}`} />
                        <div className="text-left">
                          <div className="text-sm font-bold">{v.name}</div>
                          <div className="text-[10px] font-mono uppercase opacity-60">{v.number}</div>
                        </div>
                      </div>
                      {selectedVehicleId === v.id && <CheckCircle2 className="w-4 h-4" />}
                    </button>
                  ))}
                  <div className="h-px bg-slate-100 my-1 mx-2"></div>
                  <button 
                    onClick={() => {
                      setView('register-vehicle');
                      setIsVehicleDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl text-green-600 font-bold hover:bg-green-50 transition-colors"
                  >
                    <PlusCircle className="w-5 h-5" />
                    <span className="text-sm">Add New Vehicle</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Wallet Hero */}
        <motion.div 
          key={selectedVehicleId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-green-500 via-green-600 to-emerald-700 p-10 text-white shadow-xl shadow-green-200"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full -ml-10 -mb-10 blur-2xl"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center space-y-2">
            <span className="text-green-100 font-medium tracking-wide uppercase text-xs">Wallet Credits</span>
            <div className="flex items-baseline gap-2">
              <h1 className="text-6xl font-bold tracking-tighter">{selectedVehicle.credits}</h1>
              <span className="text-2xl font-medium text-green-100">Credits</span>
            </div>
            <div className="flex items-center gap-1 text-2xl font-semibold opacity-90">
              <span className="text-green-200">₹</span>
              <span>{selectedVehicle.rupees}</span>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-green-200 transition-all group">
            <div className="bg-blue-100 p-2 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Clock className="w-5 h-5 text-blue-600 group-hover:text-white" />
            </div>
            <span className="font-semibold text-slate-700">History</span>
          </button>
          <button className="flex items-center justify-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-green-200 transition-all group">
            <div className="bg-green-100 p-2 rounded-xl group-hover:bg-green-600 group-hover:text-white transition-colors">
              <Wallet className="w-5 h-5 text-green-600 group-hover:text-white" />
            </div>
            <span className="font-semibold text-slate-700">Payouts</span>
          </button>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Vehicle Info */}
          <div className="md:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-800">My Vehicle</h2>
              <button className="text-green-600 text-sm font-semibold hover:underline flex items-center gap-1">
                Edit <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-slate-50">
                <span className="text-slate-500">Vehicle</span>
                <span className="font-semibold text-slate-800">{selectedVehicle.name}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-slate-50">
                <span className="text-slate-500">Number</span>
                <span className="font-semibold text-slate-800 uppercase tracking-wider">{selectedVehicle.number}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-slate-50">
                <span className="text-slate-500">Type</span>
                <span className="font-semibold text-slate-800">{selectedVehicle.type}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-slate-500">Status</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wider">{selectedVehicle.status}</span>
              </div>
            </div>
          </div>

          {/* Payout Summary */}
          <div className="bg-green-50/50 rounded-3xl border border-green-100 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-green-900 mb-6">Payout Summary</h2>
            <div className="space-y-6">
              <div>
                <span className="text-green-700/70 text-sm block mb-1">Total Payout</span>
                <span className="text-2xl font-bold text-green-900">₹ {selectedVehicle.totalPayout}</span>
              </div>
              <div>
                <span className="text-green-700/70 text-sm block mb-1">Last Payout</span>
                <span className="text-xl font-semibold text-green-800">₹ {selectedVehicle.lastPayout}</span>
              </div>
              <div className="pt-4 border-t border-green-100 flex items-center justify-between">
                <span className="text-green-700/70 text-sm">Status</span>
                <span className="text-green-700 font-bold text-sm">Paid</span>
              </div>
            </div>
          </div>
        </div>

        {/* History Table */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">Recent Activity</h2>
            <button className="bg-slate-50 hover:bg-slate-100 p-2 rounded-lg transition-colors">
              <TrendingUp className="w-4 h-4 text-slate-500" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">KM Driven</th>
                  <th className="px-6 py-4 font-semibold">Credits Earned</th>
                  <th className="px-6 py-4 font-semibold text-right">Earnings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {selectedVehicle.history.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-600">{row.date}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">{row.km}</td>
                    <td className="px-6 py-4 text-sm font-medium text-green-600">{row.credits} Credits</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-800 text-right">₹ {row.earnings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsUploadModalOpen(true)}
        className="fixed bottom-8 right-8 bg-green-600 text-white p-4 rounded-2xl shadow-lg shadow-green-200 hover:bg-green-700 hover:scale-105 transition-all flex items-center gap-2 z-40"
      >
        <PlusCircle className="w-6 h-6" />
        <span className="font-bold pr-2">Upload Proof</span>
      </button>

      {/* Upload Modal */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-10 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-slate-800">Upload Odometer</h3>
                <button onClick={() => setIsUploadModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <XCircle className="w-6 h-6 text-slate-400" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="border-2 border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center text-slate-400 hover:border-green-400 hover:bg-green-50/30 transition-all cursor-pointer group relative overflow-hidden">
                  {isProcessing ? (
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                      <span className="text-sm font-bold text-green-600">AI Extracting Mileage...</span>
                    </div>
                  ) : uploadSuccess ? (
                    <div className="flex flex-col items-center">
                      <div className="bg-green-100 p-4 rounded-full mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      </div>
                      <span className="text-sm font-bold text-green-600">Mileage Extracted Successfully!</span>
                      <span className="text-xs text-slate-400 mt-1">+0.012 Credits Added</span>
                    </div>
                  ) : (
                    <>
                      <div className="bg-slate-50 p-4 rounded-2xl mb-4 group-hover:bg-green-100 transition-colors">
                        <Upload className="w-8 h-8 group-hover:text-green-600 transition-colors" />
                      </div>
                      <span className="text-sm font-bold text-slate-600">Take Photo or Upload</span>
                      <span className="text-xs mt-1">Ensure odometer reading is clear</span>
                    </>
                  )}
                </div>

                <div className="bg-blue-50 p-4 rounded-2xl flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                  <p className="text-xs text-blue-700 leading-relaxed">
                    Our AI will automatically extract the mileage from your photo. Credits will be calculated and added to your wallet instantly.
                  </p>
                </div>

                <button 
                  onClick={handleUploadProof}
                  disabled={isProcessing || uploadSuccess}
                  className={`w-full py-4 rounded-2xl font-bold shadow-lg transition-all ${isProcessing || uploadSuccess ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' : 'bg-green-600 text-white shadow-green-200 hover:bg-green-700'}`}
                >
                  {isProcessing ? 'Processing...' : uploadSuccess ? 'Success!' : 'Confirm Upload'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Profile Modal */}
      <AnimatePresence>
        {isProfileModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProfileModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl p-10 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl overflow-hidden border-2 border-slate-100">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">Felix Patel</h3>
                    <p className="text-slate-500 text-sm font-medium">ronithpatel09@gmail.com</p>
                  </div>
                </div>
                <button onClick={() => setIsProfileModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <XCircle className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">My EV Fleet</h4>
                  <button 
                    onClick={() => {
                      setView('register-vehicle');
                      setIsProfileModalOpen(false);
                    }}
                    className="text-green-600 text-sm font-bold hover:underline flex items-center gap-1"
                  >
                    <PlusCircle className="w-4 h-4" /> Add Vehicle
                  </button>
                </div>

                <div className="grid gap-4">
                  {vehicles.map((v) => (
                    <div 
                      key={v.id}
                      className={`p-6 rounded-3xl border transition-all ${selectedVehicleId === v.id ? 'border-green-500 bg-green-50/50' : 'border-slate-100 bg-slate-50/50'}`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl ${selectedVehicleId === v.id ? 'bg-green-600 text-white' : 'bg-white text-slate-400 border border-slate-200'}`}>
                            <Car className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-800">{v.name}</div>
                            <div className="text-[10px] font-mono uppercase text-slate-400">{v.number}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-slate-800">₹ {v.rupees}</div>
                          <div className="text-[10px] font-bold text-green-600 uppercase">{v.credits} Credits</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100/50">
                        <div className="flex gap-4">
                          <div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase">Total Payout</div>
                            <div className="text-sm font-bold text-slate-700">₹ {v.totalPayout}</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase">Last Payout</div>
                            <div className="text-sm font-bold text-slate-700">₹ {v.lastPayout}</div>
                          </div>
                        </div>
                        {selectedVehicleId !== v.id && (
                          <button 
                            onClick={() => {
                              setSelectedVehicleId(v.id);
                              setIsProfileModalOpen(false);
                            }}
                            className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-green-600 hover:text-white hover:border-green-600 transition-all"
                          >
                            Switch to this
                          </button>
                        )}
                        {selectedVehicleId === v.id && (
                          <span className="flex items-center gap-1 text-green-600 text-xs font-bold">
                            <CheckCircle2 className="w-4 h-4" /> Active
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
