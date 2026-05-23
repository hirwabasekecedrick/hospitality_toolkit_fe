// src/mocks/superAdminData.ts
export const mockStats = {
  totalUsers: 124,
  totalTenants: 8,
  totalCards: 542,
  totalTransactions: 3872,
};

export const mockSystemHealth = Array.from({ length: 12 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (11 - i));
  return {
    date: date.toISOString().split('T')[0],
    cpu: Math.round(30 + Math.random() * 40), // 30‑70%
    memory: Math.round(40 + Math.random() * 30), // 40‑70%
  };
});
