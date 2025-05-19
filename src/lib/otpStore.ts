// lib/otpStore.ts
const globalAny: any = global;

if (!globalAny.otpStore) {
  globalAny.otpStore = {};
}

export const otpStore = globalAny.otpStore;
