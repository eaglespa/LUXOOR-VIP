import { useState, useEffect } from 'react';
import {
  LoyaltyData,
  getInitialLoyaltyData,
  earnPoints,
  redeemReward,
  resetLoyaltyDemo,
} from '../utils/loyaltyService';

export function useLoyalty() {
  const [loyalty, setLoyalty] = useState<LoyaltyData>(getInitialLoyaltyData);

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<LoyaltyData>;
      if (customEvent.detail) {
        setLoyalty(customEvent.detail);
      } else {
        setLoyalty(getInitialLoyaltyData());
      }
    };

    window.addEventListener('luxor-points-updated', handleUpdate);
    return () => {
      window.removeEventListener('luxor-points-updated', handleUpdate);
    };
  }, []);

  return {
    loyalty,
    points: loyalty.points,
    tier: loyalty.tier,
    memberId: loyalty.memberId,
    transactions: loyalty.transactions,
    unlockedUpgrades: loyalty.unlockedUpgrades,
    earnPoints,
    redeemReward,
    resetLoyaltyDemo: () => {
      const fresh = resetLoyaltyDemo();
      setLoyalty(fresh);
    },
  };
}
