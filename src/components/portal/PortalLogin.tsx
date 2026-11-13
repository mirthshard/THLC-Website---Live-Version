import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock,
  User,
  Key,
  ShieldCheck,
  Building2,
  Car,
  Compass,
  ArrowRight,
  Database,
  CheckCircle2,
} from 'lucide-react';
import { PortalUser, UserRole, simulatedSupabase } from '../../services/supabaseClient';

interface PortalLoginProps {
  onLoginSuccess: (user: PortalUser) => void;
}

interface DeskOption {
  role: UserRole;
  label: string;
  badge: string;
  subtext: string;
  icon: React.ReactNode;
}

export const PortalLogin: React.FC<PortalLoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('client');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showConfig, setShowConfig] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  const [customKey, setCustomKey] = useState('');
  const [configSaved, setConfigSaved] = useState(false);

  const deskOptions: DeskOption[] = [
    {
      role: 'client',
      label: 'Private Client Access',
      badge: 'Principal',
      subtext: 'Personal itineraries, VIP bookings, private fleet & bespoke commissions',
      icon: <User className="w-4 h-4 text-[#E2BA6B]" />,
    },
    {
      role: 'family_office',
      label: 'Family Office Desk',
      badge: 'Institutional',
      subtext: 'Multi-estate oversight, corporate executive travel & confidential ledgers',
      icon: <Building2 className="w-4 h-4 text-[#A3B8CC]" />,
    },
    {
      role: 'admin',
      label: 'Private Office Governance',
      badge: 'Admissions & Command',
      subtext: 'Central dispatch, member allocations & verified partner network',
      icon: <Compass className="w-4 h-4 text-[#D4AF37]" />,
    },
    {
      role: 'security',
      label: 'Tactical Mobility & Fleet',
      badge: 'Operations Desk',
      subtext: 'Executive convoy staging, airport FBO tarmac liaison & security escort',
      icon: <Car className="w-4 h-4 text-[#8BA888]" />,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Enter both your designated Member ID and confidential passphrase.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { user, error } = await simulatedSupabase.auth.signInWithPassword(
        email,
        password,
        selectedRole
      );
      if (error || !user) {
        setErrorMessage(error || 'Invalid credentials.');
        setIsLoading(false);
      } else {
        setTimeout(() => {
          setIsLoading(false);
          onLoginSuccess(user);
        }, 350);
      }
    } catch {
      setErrorMessage('Authentication service timeout. Please try again.');
      setIsLoading(false);
    }
  };

  const handleSaveCustomConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrl.trim()) {
      localStorage.setItem('tglc_custom_supabase_url', customUrl.trim());
      localStorage.setItem('tglc_custom_supabase_key', customKey.trim());
      setConfigSaved(true);
      setTimeout(() => setConfigSaved(false), 2500);
    }
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center py-10 sm:py-12 px-4 sm:px-6 lg:px-8 bg-[#07080B] text-[#F4F1EA]">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] bg-[#B98633]/8 blur-[140px]" />
        <div className="absolute -bottom-20 left-1/3 w-[420px] h-[420px] bg-[#2E3842]/20 blur-[160px]" />
      </div>

      <motion.div
        initial={{ opacity: 0.88, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-2xl bg-[#0D0F14]/98 border border-[#272B35] rounded-none p-5 sm:p-10 shadow-2xl backdrop-blur-xl"
      >
        {/* Header */}
        <div className="text-center mb-7 border-b border-[#232731] pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#151921] border border-[#2B313E] mb-4">
            <Lock className="w-3.5 h-3.5 text-[#CFA85E]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#CFA85E]">
              Member Command · Albemarle House
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0] tracking-wide font-light">
            The Global Luxury Consortium
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#D4D8E2] font-light max-w-lg mx-auto leading-relaxed">
            Opening doors that don’t usually exist. Discretion by default, British poise by nature.
          </p>
        </div>

        {/* 4 Anonymous Desk Options */}
        <div className="mb-7">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#E2BA6B]">
              Select Designated Portal Desk
            </span>
            <span className="text-[10px] font-mono text-[#8E99AF]">
              45 Albemarle Street · W1S
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {deskOptions.map((desk) => {
              const isSelected = selectedRole === desk.role;
              return (
                <button
                  key={desk.role}
                  type="button"
                  onClick={() => {
                    setSelectedRole(desk.role);
                    setErrorMessage(null);
                  }}
                  className={`min-h-[44px] p-3.5 text-left border transition-all duration-200 flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-[#181E29] border-[#E2BA6B] shadow-[0_0_15px_-3px_rgba(226,186,107,0.18)]'
                      : 'bg-[#10131B] border-[#222A38] hover:border-[#3A455A]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 bg-[#090B10] border border-[#272E3D]">
                        {desk.icon}
                      </span>
                      <span className="text-xs font-serif font-medium text-[#FAF7F0] group-hover:text-[#E2BA6B] transition-colors">
                        {desk.label}
                      </span>
                    </div>
                    {isSelected ? (
                      <span className="w-2 h-2 rotate-45 bg-[#E2BA6B] shrink-0 mt-1.5 shadow-[0_0_8px_#E2BA6B]" />
                    ) : (
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#687387] border border-[#202633] px-1.5 py-0.5">
                        {desk.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#9EA8BC] font-light leading-relaxed">
                    {desk.subtext}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Strict Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-[0.14em] text-[#9EA8BC] mb-1.5">
                Member ID
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5F697E]" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  autoComplete="username"
                  placeholder="Enter member ID"
                  className="w-full min-h-[44px] pl-10 pr-3.5 py-2.5 bg-[#12151D] border border-[#272C38] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#CFA85E] transition-colors placeholder:text-[#525B6E]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-[0.14em] text-[#9EA8BC] mb-1.5">
                Confidential Passphrase
              </label>
              <div className="relative">
                <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5F697E]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  autoComplete="current-password"
                  placeholder="Enter passphrase"
                  className="w-full min-h-[44px] pl-10 pr-3.5 py-2.5 bg-[#12151D] border border-[#272C38] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#CFA85E] transition-colors placeholder:text-[#525B6E]"
                />
              </div>
            </div>
          </div>

          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-[#2A1416] border border-[#8C2E34] text-[#F39DA2] text-xs font-mono"
            >
              {errorMessage}
            </motion.div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full min-h-[48px] py-3.5 bg-gradient-to-r from-[#F0CC83] via-[#E2BA6B] to-[#C4933F] hover:from-[#F7DB9C] hover:to-[#B98633] disabled:opacity-50 text-[#090B0E] font-serif text-sm tracking-widest uppercase transition-all duration-200 font-medium flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-mono">
                  <span className="w-2 h-2 bg-[#090B0E] animate-pulse" />
                  <span>Verifying Credentials...</span>
                </span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authenticate & Enter Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Optional External Vault Binding Accordion */}
        <div className="mt-7 pt-5 border-t border-[#232731]">
          <button
            type="button"
            onClick={() => setShowConfig(!showConfig)}
            className="w-full min-h-[44px] flex items-center justify-between text-left text-xs font-mono text-[#8D96A8] hover:text-[#CFA85E] transition-colors"
          >
            <span className="flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-[#CFA85E]" />
              Private Session Store: <span className="text-[#CFA85E]">Secured Local Ledger</span>
            </span>
            <span className="text-[10px] tracking-widest uppercase underline">
              {showConfig ? 'Close' : 'Custom Environment'}
            </span>
          </button>

          <AnimatePresence>
            {showConfig && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleSaveCustomConfig}
                className="mt-4 pt-4 border-t border-[#1C2029] space-y-3 overflow-hidden"
              >
                <p className="text-[11px] text-[#788296] leading-relaxed">
                  Optionally bind an institutional Supabase instance below for distributed household synchronisation:
                </p>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.12em] text-[#9EA8BC] mb-1">
                    Project URL
                  </label>
                  <input
                    type="url"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="https://your-instance.supabase.co"
                    className="w-full min-h-[44px] px-3 py-2 bg-[#12151D] border border-[#272C38] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#CFA85E]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.12em] text-[#9EA8BC] mb-1">
                    Public API Key
                  </label>
                  <input
                    type="password"
                    value={customKey}
                    onChange={(e) => setCustomKey(e.target.value)}
                    placeholder="eyJhbGci..."
                    className="w-full min-h-[44px] px-3 py-2 bg-[#12151D] border border-[#272C38] text-xs font-mono text-[#F4F1EA] focus:outline-none focus:border-[#CFA85E]"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="submit"
                    className="min-h-[44px] px-4 py-2 bg-[#1C222E] hover:bg-[#252E3E] text-xs font-mono text-[#CFA85E] border border-[#2E3747] transition-colors"
                  >
                    Save Configuration
                  </button>
                  {configSaved && (
                    <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Recorded
                    </span>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
