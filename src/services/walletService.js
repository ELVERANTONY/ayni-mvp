import db from './db';

const WALLET_ID = 1;
const SAVINGS_PER_KG = 0.5;

export async function getWallet() {
  const wallet = await db.wallet.get(WALLET_ID);
  if (!wallet) {
    const id = await db.wallet.add({ kg: 0, co2: 0, tickets: 0, progress: 0, savings: 0 });
    return db.wallet.get(id);
  }
  return wallet;
}

export async function updateWallet(updates) {
  await db.wallet.update(WALLET_ID, updates);
  return db.wallet.get(WALLET_ID);
}

export async function addWasteToWallet(kgAdd, co2Add, scenario = 'approved') {
  const wallet = await getWallet();
  const newKg = parseFloat((wallet.kg + kgAdd).toFixed(2));
  const newCo2 = parseFloat((wallet.co2 + co2Add).toFixed(3));
  const newTickets = wallet.tickets + 1;
  const newProgress = Math.min(100, parseFloat((wallet.progress + (kgAdd / 0.5) * 5).toFixed(1)));
  const newSavings = parseFloat((wallet.savings + kgAdd * SAVINGS_PER_KG).toFixed(2));

  await db.wallet.update(WALLET_ID, {
    kg: newKg,
    co2: newCo2,
    tickets: newTickets,
    progress: newProgress,
    savings: newSavings,
  });

  // Log to wasteLog for admin view
  await db.wasteLog.add({
    wasteType: '',
    kg: kgAdd,
    co2: co2Add,
    scenario,
    timestamp: Date.now(),
  });

  return { kg: newKg, co2: newCo2, tickets: newTickets, progress: newProgress, savings: newSavings };
}

export default { getWallet, updateWallet, addWasteToWallet };
