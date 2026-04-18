import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const STARTER_POINTS = 800;

export const useStore = create(
  persist(
    (set, get) => ({
      // Auth
      user: null,
      isAuthenticated: false,

      login: (userData) => set({
        user: {
          ...userData,
          points: STARTER_POINTS,
          matches: 0,
          wins: 0,
          joinedAt: new Date().toISOString(),
        },
        isAuthenticated: true,
      }),

      logout: () => set({
        user: null,
        isAuthenticated: false,
        savedTeam: null,
        matchHistory: [],
        ownedCoupons: [],
      }),

      updateUser: (updates) => set(state => ({
        user: { ...state.user, ...updates }
      })),

      // Team
      savedTeam: null,
      saveTeam: (players) => set({ savedTeam: players }),

      // Match history
      matchHistory: [],
      addMatchResult: (result) => set(state => ({
        matchHistory: [result, ...state.matchHistory],
        user: {
          ...state.user,
          points: state.user.points + result.pointsEarned,
          matches: state.user.matches + 1,
          wins: state.user.wins + (result.won ? 1 : 0),
        }
      })),

      // Coupons
      ownedCoupons: [],
      redeemCoupon: (coupon) => {
        const { user } = get();
        if (!user || user.points < coupon.points) return false;
        const code = Math.random().toString(36).substring(2, 10).toUpperCase();
        set(state => ({
          ownedCoupons: [...state.ownedCoupons, { ...coupon, code, redeemedAt: new Date().toISOString() }],
          user: { ...state.user, points: state.user.points - coupon.points }
        }));
        return true;
      },
    }),
    {
      name: 'cricxp-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        savedTeam: state.savedTeam,
        matchHistory: state.matchHistory,
        ownedCoupons: state.ownedCoupons,
      }),
    }
  )
);
