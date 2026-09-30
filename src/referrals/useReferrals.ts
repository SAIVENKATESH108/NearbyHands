import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import { useNavigation } from '@react-navigation/native';

/**
 * Referral hook that:
 * 1. Generates a unique invite code for an existing user
 * 2. Tracks referrals in Supabase
 * 3. Applies +3 streak boost when a referred user completes their first claim
 *
 * HALLUCINATION GUARDRAIL: Layers SDK integration points are flagged as TODOs.
 * The actual Layers SDK methods (trackReferral, identifyUser, etc.) need to be
 * verified against the official docs before integrating the real SDK.
 * Method signatures referenced below may not match the actual Layers SDK API.
 */

export const useReferrals = (currentUserId: string) => {
  const [referralCode, setReferralCode] = useState<string>('');
  const [isReferring, setIsReferring] = useState(false);
  const navigation = useNavigation();

  // Generate a unique referral code for the current user
  const generateReferralCode = async () => {
    const { data, error } = await supabase
      .from('referrals')
      .insert({ user_id: currentUserId, code: generateUniqueCode() })
      .select()
      .single();

    if (error && error.code !== 'PGT001') {
      console.error('Error generating referral code:', error);
      return;
    }

    if (data) {
      setReferralCode(data.code);
    }
  };

  // Generate a unique 6-character alphanumeric code
  const generateUniqueCode = (): string => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Avoid ambiguous chars
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  };

  // Check if the current user was referred (called with an invite code)
  const checkIfReferred = async (inviteCode: string) => {
    const { data, error } = await supabase
      .from('referrals')
      .select('referred_by, streak_boost_applied')
      .eq('code', inviteCode)
      .single();

    if (error) return { referredBy: null, boostApplied: false };

    // If boost not yet applied, mark it as pending (will be applied on first claim)
    if (data && !data.streak_boost_applied) {
      await supabase
        .from('referrals')
        .update({ streak_boost_applied: true })
        .eq('code', inviteCode);
    }

    return { referredBy: data?.referred_by, boostApplied: data?.streak_boost_applied || false };
  };

  // Apply the +3 streak boost to both the referrer and the new user
  // This should be called when the referred user completes their first claim
  // Note: The actual streak update logic depends on your Supabase schema
  const applyStreakBoost = async (userId: string, boostBy: number = 3) => {
    try {
      // Update the user's streak in Supabase
      const { error } = await supabase
        .from('users')
        .update({ helper_streak_count: supabase.rn.helper_streak_count + boostBy }) // TODO: Fix this - need proper column increment
        .eq('id', userId);

      if (error) throw error;
      console.log(`+${boostBy} streak days applied to user ${userId}`);
    } catch (err) {
      console.error('Error applying streak boost:', err);
    }
  };

  // Process referral when a new user signs up with an invite code
  // Called from onboarding with the invite code from the link
  const processReferral = async (inviteCode: string, newUserId: string) => {
    const { referredBy, boostApplied } = await checkIfReferred(inviteCode);

    if (boostApplied) return; // Already boosted

    if (referredBy) {
      // Apply +3 days to the referred user
      await applyStreakBoost(newUserId, 3);

      // Apply +3 days to the referrer
      await applyStreakBoost(referredBy, 3);

      // TODO: Call Layers SDK: trackReferralConversion(referredBy, newUserId)
      // layers.trackReferralConversion(referredBy, newUserId, 3); // UNVERIFIED METHOD SIGNATURE

      // TODO: Call Layers SDK: identifyUser(newUserId, { referred: true, streakBoost: 3 })
      // layers.identifyUser(newUserId, { referred: true, streakBoost: 3 }); // UNVERIFIED METHOD SIGNATURE
    }

    setReferralCode(''); // Clear code after processing
  };

  return {
    referralCode,
    generateReferralCode,
    processReferral,
    checkIfReferred,
  };
};