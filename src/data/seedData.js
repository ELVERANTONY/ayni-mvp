import db from '@/services/db';

export const DEFAULT_WALLET = {
  kg: 24.5,
  co2: 18.2,
  tickets: 3,
  progress: 65,
  savings: 12.25,
};

export const INITIAL_MESSAGES = [
  {
    role: 'system',
    text: 'Bienvenido a AYNI. Selecciona un residuo para comenzar a reciclar y generar impacto ambiental.',
    timestamp: Date.now() - 60000,
  },
];

export const INITIAL_WASTE_LOGS = [
  { wasteType: 'Botella PET', kg: 1.2, co2: 0.12, scenario: 'approved', timestamp: Date.now() - 2 * 60 * 60 * 1000 },
  { wasteType: 'Caja de Cartón', kg: 3.5, co2: 0.47, scenario: 'approved', timestamp: Date.now() - 26 * 60 * 60 * 1000 },
  { wasteType: 'Lata de Aluminio', kg: 0.8, co2: 0.16, scenario: 'approved', timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000 },
];

export const INITIAL_CONTRIBUTORS = [
  { name: 'María Rodríguez', code: '45892-A', level: 'Constante', discount: 15, signed: false, blocked: false, blockReason: '' },
  { name: 'Juan Pérez', code: '47123-B', level: 'Constante', discount: 15, signed: true, blocked: false, blockReason: '' },
  { name: 'Carmen López', code: '50341-C', level: 'Moderado', discount: 10, signed: false, blocked: false, blockReason: '' },
  { name: 'Pedro Gómez', code: '38917-D', level: 'Moderado', discount: 10, signed: true, blocked: false, blockReason: '' },
  { name: 'Ana Martínez', code: '56234-E', level: 'Nuevo', discount: 0, signed: false, blocked: false, blockReason: '' },
  { name: 'Luis Torres', code: '44890-F', level: 'Constante', discount: 15, signed: true, blocked: true, blockReason: 'Incumplimiento de horarios de recolección' },
  { name: 'Sofía Castillo', code: '52367-G', level: 'Nuevo', discount: 5, signed: false, blocked: false, blockReason: '' },
  { name: 'Diego Navarro', code: '49512-H', level: 'Moderado', discount: 10, signed: false, blocked: false, blockReason: '' },
];

export const INITIAL_MONTHLY_DATA = [
  { month: 'Ene', monthIndex: 0, recovered: 24, target: 28 },
  { month: 'Feb', monthIndex: 1, recovered: 27, target: 28 },
  { month: 'Mar', monthIndex: 2, recovered: 22, target: 30 },
  { month: 'Abr', monthIndex: 3, recovered: 29, target: 30 },
  { month: 'May', monthIndex: 4, recovered: 31, target: 32 },
  { month: 'Jun', monthIndex: 5, recovered: 28, target: 32 },
  { month: 'Jul', monthIndex: 6, recovered: 33, target: 35 },
  { month: 'Ago', monthIndex: 7, recovered: 30, target: 35 },
  { month: 'Sep', monthIndex: 8, recovered: 35, target: 38 },
  { month: 'Oct', monthIndex: 9, recovered: 32, target: 38 },
  { month: 'Nov', monthIndex: 10, recovered: 38, target: 40 },
  { month: 'Dic', monthIndex: 11, recovered: 36, target: 40 },
];

export const INITIAL_SETTINGS = [
  { key: 'citizens', value: 12847 },
  { key: 'tons', value: 342.8 },
  { key: 'carbonFootprint', value: 156.2 },
  { key: 'savings', value: 89450 },
  { key: 'repAchieved', value: 423 },
  { key: 'repQuota', value: 500 },
];

export async function seedDatabase() {
  const walletCount = await db.wallet.count();
  if (walletCount === 0) {
    await db.wallet.add(DEFAULT_WALLET);
  } else {
    const existing = await db.wallet.toArray();
    for (const w of existing) {
      const updates = {};
      if (w.savings === undefined) updates.savings = (w.kg || 0) * 0.5;
      if (Object.keys(updates).length > 0) {
        await db.wallet.update(w.id, updates);
      }
    }
  }

  const msgCount = await db.messages.count();
  if (msgCount === 0) {
    await db.messages.bulkAdd(INITIAL_MESSAGES);
  }

  const wasteLogCount = await db.wasteLog.count();
  if (wasteLogCount === 0) {
    await db.wasteLog.bulkAdd(INITIAL_WASTE_LOGS);
  }

  const contribCount = await db.contributors.count();
  if (contribCount === 0) {
    await db.contributors.bulkAdd(INITIAL_CONTRIBUTORS);
  } else {
    const existing = await db.contributors.toArray();
    for (const c of existing) {
      const updates = {};
      if (c.signed === undefined) updates.signed = c.discount > 0 && Math.random() > 0.5;
      if (c.blocked === undefined) updates.blocked = false;
      if (c.blockReason === undefined) updates.blockReason = '';
      if (Object.keys(updates).length > 0) {
        await db.contributors.update(c.id, updates);
      }
    }
  }

  const monthlyCount = await db.monthlyData.count();
  if (monthlyCount === 0) {
    await db.monthlyData.bulkAdd(INITIAL_MONTHLY_DATA);
  }

  const settingsCount = await db.settings.count();
  if (settingsCount === 0) {
    await db.settings.bulkAdd(INITIAL_SETTINGS);
  }

  try {
    const regCount = await db.registrationRequests.count();
    if (regCount === 0) {
      await db.registrationRequests.bulkAdd([
        { name: 'Ricardo Silva', document: '71234567', phone: '+51 912 345 678', status: 'pending', timestamp: Date.now() - 3600000 },
        { name: 'Luciana Gómez', document: '45678912', phone: '+51 987 654 321', status: 'pending', timestamp: Date.now() - 7200000 },
        { name: 'Roberto Vásquez', document: '09876543', phone: '+51 999 888 777', status: 'approved', timestamp: Date.now() - 86400000 },
        { name: 'Valeria Castro', document: '44556677', phone: '+51 945 612 378', status: 'rejected', timestamp: Date.now() - 172800000 },
      ]);
    }
  } catch (err) {
    console.warn('Could not seed registration requests (DB might be upgrading):', err);
  }
}
