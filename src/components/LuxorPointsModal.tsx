import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Award,
  Crown,
  Gift,
  ArrowRight,
  CheckCircle2,
  Clock,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
  Tag,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { useLoyalty } from '../hooks/useLoyalty';
import {
  REWARD_CATALOG,
  TIER_BENEFITS,
  LoyaltyTier,
  LoyaltyReward,
} from '../utils/loyaltyService';
import { useI18n } from '../i18n/I18nContext';

interface LuxorPointsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking?: () => void;
}

export const LuxorPointsModal: React.FC<LuxorPointsModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  const { loyalty, points, tier, transactions, unlockedUpgrades, redeemReward, resetLoyaltyDemo } =
    useLoyalty();
  const { isRTL } = useI18n();
  const [activeTab, setActiveTab] = useState<'catalog' | 'myUpgrades' | 'tiers' | 'history'>('catalog');
  const [catalogCategory, setCatalogCategory] = useState<'all' | 'discount' | 'upgrade'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRedeem = (reward: LoyaltyReward) => {
    const res = redeemReward(reward.id);
    if (res.success) {
      showToast(res.message);
      if (reward.category === 'upgrade') {
        setActiveTab('myUpgrades');
      }
    } else {
      showToast(res.message);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
    showToast(`Pass code ${code} copied to clipboard!`);
  };

  // Tier progression calculation
  const tierKeys: LoyaltyTier[] = ['Scarab', 'Anubis', 'Horus', 'Pharaoh'];
  const currentTierIndex = tierKeys.indexOf(tier);
  const nextTier = currentTierIndex < tierKeys.length - 1 ? tierKeys[currentTierIndex + 1] : null;
  const nextTierPoints = nextTier ? TIER_BENEFITS[nextTier].minPoints : 3500;
  const currentTierMin = TIER_BENEFITS[tier].minPoints;
  const progressPercent = nextTier
    ? Math.min(100, Math.max(5, ((loyalty.lifetimePoints - currentTierMin) / (nextTierPoints - currentTierMin)) * 100))
    : 100;
  const pointsNeeded = nextTier ? Math.max(0, nextTierPoints - loyalty.lifetimePoints) : 0;

  const filteredRewards = REWARD_CATALOG.filter(
    (r) => catalogCategory === 'all' || r.category === catalogCategory
  );

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="relative w-full max-w-4xl bg-[#0F141C] border border-[#D6AD60]/40 rounded-3xl shadow-2xl overflow-hidden my-6 text-stone-100">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-[#D6AD60] text-stone-950 px-5 py-2.5 rounded-full font-semibold text-xs sm:text-sm shadow-xl flex items-center gap-2 animate-bounce">
            <Sparkles className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="bg-[#090C12] px-6 py-4 border-b border-stone-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D6AD60] to-[#8C6D28] flex items-center justify-center text-stone-950 font-bold shadow-md">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-cinzel text-lg sm:text-xl font-bold text-white tracking-wider flex items-center gap-2">
                LUXOR POINTS <span className="text-[#D6AD60] text-sm sm:text-base font-normal">ROYAL CLUB</span>
              </h2>
              <p className="text-[11px] text-stone-400">
                Earn 10–20 pts per $1 spent • Redeem for private upgrades & instant discounts
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-xl hover:bg-stone-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Digital Membership Card & Quick Status */}
        <div className="p-6 sm:p-8 bg-gradient-to-b from-[#141B26] to-[#0F141C] border-b border-stone-800/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* The Royal Cartouche Membership Card */}
            <div className="lg:col-span-7 relative group">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#0A0E17] border-2 border-[#D6AD60]/60 p-6 shadow-2xl transition-all duration-300 hover:border-[#D6AD60] hover:shadow-[#D6AD60]/10 hover:shadow-2xl">
                {/* Gold Foil Pattern Background Overlay */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#D6AD60]/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D6AD60_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                <div className="relative z-10 flex flex-col justify-between h-44 sm:h-48">
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-cinzel font-bold text-sm tracking-widest text-[#D6AD60]">
                        LUXOR.VIP
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-stone-400 border border-stone-700 px-2 py-0.5 rounded-full">
                        Royal Cartouche Pass
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D6AD60]/20 border border-[#D6AD60]/40 text-[#D6AD60] text-xs font-semibold">
                      <span>{TIER_BENEFITS[tier].icon}</span>
                      <span>{tier} Member</span>
                    </div>
                  </div>

                  {/* Points Display */}
                  <div className="my-auto">
                    <span className="text-[11px] uppercase tracking-wider text-stone-400 block mb-0.5">
                      Available Luxor Points
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-cinzel text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FFF] via-[#F3E5AB] to-[#D6AD60] tracking-tight">
                        {points.toLocaleString()}
                      </span>
                      <span className="text-xs text-[#D6AD60] font-semibold">PTS</span>
                      <span className="text-[11px] text-stone-400 ml-2">
                        ≈ ${Math.floor(points * 0.1)} USD value
                      </span>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="flex items-end justify-between border-t border-stone-800/80 pt-3 text-[11px]">
                    <div>
                      <p className="text-stone-400 font-mono tracking-wider">{loyalty.memberId}</p>
                      <p className="text-stone-200 font-medium">{loyalty.memberName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-stone-400">Multiplier</p>
                      <p className="text-[#D6AD60] font-semibold">
                        {TIER_BENEFITS[tier].multiplier} pts / $1
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tier Progress & Quick Actions */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="bg-[#141B26] border border-stone-800 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-stone-300">
                    Tier Status: <strong className="text-[#D6AD60]">{TIER_BENEFITS[tier].label}</strong>
                  </span>
                  {nextTier && (
                    <span className="text-[11px] text-stone-400">
                      Next: <strong className="text-stone-200">{nextTier}</strong>
                    </span>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-stone-900 rounded-full h-2.5 overflow-hidden border border-stone-800 mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-[#D6AD60] to-[#E8C576] transition-all duration-700 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <p className="text-[11px] text-stone-400 flex items-center justify-between">
                  {nextTier ? (
                    <>
                      <span>{pointsNeeded} pts to reach {nextTier} tier</span>
                      <span className="text-stone-300">{Math.round(progressPercent)}%</span>
                    </>
                  ) : (
                    <span className="text-[#D6AD60] font-semibold">
                      👑 Highest Royal Tier Reached
                    </span>
                  )}
                </p>
              </div>

              {/* Quick Actions & Demo Reset */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {onOpenBooking && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenBooking();
                    }}
                    className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-[#D6AD60] hover:bg-[#c49b4f] text-stone-950 font-bold transition-all shadow-md active:scale-95"
                  >
                    <span>Book & Earn Points</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => resetLoyaltyDemo()}
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-white transition-all text-xs"
                  title="Reset points balance to initial 350 pts for testing"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#D6AD60]" />
                  <span>Reset Demo Balance</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-6 border-b border-stone-800 bg-[#0C1017] flex items-center gap-2 overflow-x-auto py-2.5">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'catalog'
                ? 'bg-[#D6AD60] text-stone-950 font-bold shadow-md'
                : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Redeem Rewards Catalog</span>
          </button>
          <button
            onClick={() => setActiveTab('myUpgrades')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 relative ${
              activeTab === 'myUpgrades'
                ? 'bg-[#D6AD60] text-stone-950 font-bold shadow-md'
                : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Active Passes ({unlockedUpgrades.length})</span>
            {unlockedUpgrades.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#D6AD60] animate-ping" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('tiers')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'tiers'
                ? 'bg-[#D6AD60] text-stone-950 font-bold shadow-md'
                : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Tier Perks & Status</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'history'
                ? 'bg-[#D6AD60] text-stone-950 font-bold shadow-md'
                : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Activity Ledger ({transactions.length})</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 sm:p-8 max-h-[55vh] overflow-y-auto">
          {/* TAB 1: CATALOG */}
          {activeTab === 'catalog' && (
            <div className="space-y-6">
              {/* Category Filter Pills */}
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-[#141B26] p-1 rounded-xl border border-stone-800">
                  <button
                    onClick={() => setCatalogCategory('all')}
                    className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                      catalogCategory === 'all'
                        ? 'bg-[#D6AD60]/20 text-[#D6AD60] font-bold border border-[#D6AD60]/40'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    All Rewards ({REWARD_CATALOG.length})
                  </button>
                  <button
                    onClick={() => setCatalogCategory('discount')}
                    className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                      catalogCategory === 'discount'
                        ? 'bg-[#D6AD60]/20 text-[#D6AD60] font-bold border border-[#D6AD60]/40'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    Booking Discounts
                  </button>
                  <button
                    onClick={() => setCatalogCategory('upgrade')}
                    className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                      catalogCategory === 'upgrade'
                        ? 'bg-[#D6AD60]/20 text-[#D6AD60] font-bold border border-[#D6AD60]/40'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    Private VIP Upgrades
                  </button>
                </div>
                <span className="text-xs text-stone-400">
                  Your Balance: <strong className="text-[#D6AD60]">{points} pts</strong>
                </span>
              </div>

              {/* Rewards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredRewards.map((reward) => {
                  const canAfford = points >= reward.pointsCost;
                  return (
                    <div
                      key={reward.id}
                      className={`relative rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                        canAfford
                          ? 'bg-[#141B26]/90 border-stone-800 hover:border-[#D6AD60]/60 hover:shadow-lg'
                          : 'bg-[#10151E]/60 border-stone-800/60 opacity-70'
                      }`}
                    >
                      {/* Badge */}
                      {reward.badge && (
                        <span className="absolute top-4 right-4 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#D6AD60]/20 text-[#D6AD60] border border-[#D6AD60]/40">
                          {reward.badge}
                        </span>
                      )}

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {reward.category === 'discount' ? (
                            <Tag className="w-4 h-4 text-[#D6AD60]" />
                          ) : (
                            <Sparkles className="w-4 h-4 text-[#D6AD60]" />
                          )}
                          <h4 className="font-cinzel text-base font-bold text-white">
                            {reward.title}
                          </h4>
                        </div>
                        <p className="text-xs text-stone-300 mb-4 leading-relaxed">
                          {reward.valueDescription}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between">
                        <div>
                          <span className="font-cinzel text-lg font-bold text-[#D6AD60]">
                            {reward.pointsCost}
                          </span>
                          <span className="text-xs text-stone-400 ml-1">pts</span>
                        </div>

                        <button
                          onClick={() => handleRedeem(reward)}
                          disabled={!canAfford}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            canAfford
                              ? 'bg-[#D6AD60] hover:bg-[#c49b4f] text-stone-950 active:scale-95 shadow-md'
                              : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                          }`}
                        >
                          {canAfford ? 'Redeem Perk' : `Need ${reward.pointsCost - points} pts`}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: ACTIVE UPGRADE PASSES */}
          {activeTab === 'myUpgrades' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-cinzel text-base font-bold text-white">
                    Your Unlocked VIP Passes
                  </h3>
                  <p className="text-xs text-stone-400">
                    Present your digital code or reference to your driver, pilot, or concierge
                  </p>
                </div>
              </div>

              {unlockedUpgrades.length === 0 ? (
                <div className="text-center py-12 px-4 rounded-2xl bg-[#141B26] border border-dashed border-stone-800">
                  <Gift className="w-10 h-10 text-stone-500 mx-auto mb-3" />
                  <p className="text-stone-300 font-cinzel font-semibold mb-1">
                    No Active Upgrade Passes Yet
                  </p>
                  <p className="text-xs text-stone-500 max-w-md mx-auto mb-4">
                    Redeem your available Luxor Points from the catalog to activate airport fast-tracks, sunset felucca tastings, or late checkouts.
                  </p>
                  <button
                    onClick={() => setActiveTab('catalog')}
                    className="px-4 py-2 rounded-xl bg-[#D6AD60] text-stone-950 font-bold text-xs"
                  >
                    Browse Rewards Catalog
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {unlockedUpgrades.map((upg) => (
                    <div
                      key={upg.id}
                      className="rounded-2xl p-5 bg-gradient-to-br from-[#1A2332] to-[#121822] border border-[#D6AD60]/40 shadow-xl"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                          Active Pass
                        </span>
                        <span className="text-[11px] text-stone-400">{upg.redeemedAt}</span>
                      </div>
                      <h4 className="font-cinzel text-base font-bold text-white mb-2">
                        {upg.title}
                      </h4>
                      <p className="text-xs text-stone-300 mb-4">
                        Valid for your upcoming booking or present upon arrival in Luxor.
                      </p>

                      <div className="bg-[#0B0F15] p-3 rounded-xl border border-stone-800 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                            Pass Authorization Code
                          </span>
                          <span className="font-mono text-sm font-bold text-[#D6AD60] tracking-wider">
                            {upg.code}
                          </span>
                        </div>
                        <button
                          onClick={() => handleCopyCode(upg.code)}
                          className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
                          title="Copy pass code"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: TIERS & PRIVILEGES */}
          {activeTab === 'tiers' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tierKeys.map((tKey) => {
                  const info = TIER_BENEFITS[tKey];
                  const isCurrent = tKey === tier;
                  return (
                    <div
                      key={tKey}
                      className={`rounded-2xl p-5 border transition-all ${
                        isCurrent
                          ? 'bg-[#182232] border-[#D6AD60] shadow-xl'
                          : 'bg-[#121824] border-stone-800/80'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{info.icon}</span>
                          <div>
                            <h4 className="font-cinzel text-base font-bold text-white">
                              {info.label}
                            </h4>
                            <span className="text-[11px] text-stone-400">
                              {info.minPoints === 0 ? 'Entry Tier' : `${info.minPoints}+ lifetime pts`}
                            </span>
                          </div>
                        </div>
                        {isCurrent && (
                          <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-[#D6AD60] text-stone-950">
                            Current Tier
                          </span>
                        )}
                      </div>

                      <div className="mb-3 text-xs text-[#D6AD60] font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Earning Rate: {info.multiplier} points per $1 spent</span>
                      </div>

                      <ul className="space-y-2 text-xs text-stone-300">
                        {info.perks.map((perk, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#D6AD60] shrink-0 mt-0.5" />
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: ACTIVITY HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              <h3 className="font-cinzel text-base font-bold text-white mb-2">
                Points Ledger & Booking History
              </h3>

              <div className="space-y-2">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-3.5 rounded-xl bg-[#141B26] border border-stone-800/80 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-stone-200">
                          {tx.description}
                        </span>
                        {tx.bookingRef && (
                          <span className="text-[10px] font-mono text-stone-400 bg-stone-900 px-1.5 py-0.5 rounded">
                            {tx.bookingRef}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-stone-400">{tx.date}</span>
                    </div>

                    <div className="text-right">
                      <span
                        className={`font-cinzel text-sm font-bold ${
                          tx.points > 0 ? 'text-emerald-400' : 'text-amber-400'
                        }`}
                      >
                        {tx.points > 0 ? `+${tx.points}` : tx.points}
                      </span>
                      <span className="text-[10px] text-stone-400 block uppercase">PTS</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#0A0D14] px-6 py-4 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D6AD60]" />
            <span>Luxor Points never expire • Valid across East & West bank services</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
