import db from './db';

export async function getSettings() {
  const all = await db.settings.toArray();
  const map = {};
  all.forEach((s) => { map[s.key] = s.value; });
  return map;
}

export async function updateSetting(key, value) {
  const existing = await db.settings.where('key').equals(key).first();
  if (existing) {
    await db.settings.update(existing.id, { value });
  } else {
    await db.settings.add({ key, value });
  }
}

export async function syncAdminMetrics(kgAdded, co2Added) {
  const settings = await getSettings();

  const citizens = (settings.citizens || 12847) + Math.floor(Math.random() * 3) + 1;
  const tons = parseFloat(((settings.tons || 342.8) + kgAdded / 1000).toFixed(2));
  const carbonFootprint = parseFloat(((settings.carbonFootprint || 156.2) + co2Added).toFixed(2));
  const savings = (settings.savings || 89450) + Math.floor(Math.random() * 5) + 2;
  const repAchieved = parseFloat(((settings.repAchieved || 423) + kgAdded / 1000).toFixed(2));

  await updateSetting('citizens', citizens);
  await updateSetting('tons', tons);
  await updateSetting('carbonFootprint', carbonFootprint);
  await updateSetting('savings', savings);
  await updateSetting('repAchieved', repAchieved);

  await maybeAddContributor();

  const lastMonth = await db.monthlyData.orderBy('monthIndex').last();
  if (lastMonth) {
    const newRecovered = parseFloat((lastMonth.recovered + kgAdded / 1000 * 10).toFixed(1));
    await db.monthlyData.update(lastMonth.id, { recovered: newRecovered });
  }

  return { citizens, tons, carbonFootprint, savings, repAchieved };
}

async function maybeAddContributor() {
  if (Math.random() > 0.45) return;
  const names = ['Rosa Huamán', 'Miguel Ángel', 'Elena Vargas', 'Carlos Ruiz', 'Lucía Mendoza', 'Raúl Castro'];
  const levels = ['Constante', 'Moderado', 'Nuevo'];
  const discounts = [15, 10, 5, 0];
  const contributor = {
    name: names[Math.floor(Math.random() * names.length)],
    code: `${Math.floor(40000 + Math.random() * 20000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
    level: levels[Math.floor(Math.random() * levels.length)],
    discount: discounts[Math.floor(Math.random() * discounts.length)],
    signed: false,
    blocked: false,
    blockReason: '',
  };
  await db.contributors.add(contributor);
  const count = await db.contributors.count();
  if (count > 15) {
    const oldest = await db.contributors.orderBy('id').first();
    if (oldest) await db.contributors.delete(oldest.id);
  }
}

export async function getContributors() {
  return db.contributors.toArray();
}

export async function blockContributor(id, reason = 'Incumplimiento de reglas') {
  await db.contributors.update(id, { blocked: true, blockReason: reason });
  return db.contributors.get(id);
}

export async function unblockContributor(id) {
  await db.contributors.update(id, { blocked: false, blockReason: '' });
  return db.contributors.get(id);
}

export async function getMonthlyData() {
  return db.monthlyData.orderBy('monthIndex').toArray();
}

export async function getWasteLogs() {
  return db.wasteLog.orderBy('timestamp').reverse().toArray();
}

export async function clearWasteLog(id) {
  await db.wasteLog.delete(id);
}

export async function getRegistrationRequests() {
  return db.registrationRequests.orderBy('timestamp').reverse().toArray();
}

export async function approveRegistrationRequest(id) {
  await db.registrationRequests.update(id, { status: 'approved' });
  return db.registrationRequests.get(id);
}

export async function rejectRegistrationRequest(id) {
  await db.registrationRequests.update(id, { status: 'rejected' });
  return db.registrationRequests.get(id);
}

export function generateCSV(contributors) {
  const headers = 'Contribuyente,Código Predial,Nivel,Descuento(%),Estado';
  const rows = contributors.map(
    (c) => `${c.name},${c.code},${c.level},${c.discount},${c.blocked ? 'Bloqueado' : 'Activo'}`
  );
  return [headers, ...rows].join('\n');
}

export function downloadCSV(csv) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `ayni-conciliacion-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

export async function applyDiscount(id) {
  await db.contributors.update(id, { signed: true });
  return db.contributors.get(id);
}

export default {
  getSettings, syncAdminMetrics, getContributors, getMonthlyData,
  getWasteLogs, clearWasteLog,
  blockContributor, unblockContributor,
  getRegistrationRequests, approveRegistrationRequest, rejectRegistrationRequest,
  generateCSV, downloadCSV, applyDiscount,
};
