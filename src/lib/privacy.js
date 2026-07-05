import db from '@/services/db';

export const PRIVACY_NOTICE = {
  ley: 'Ley N° 29733 — Ley de Protección de Datos Personales',
  entidad: 'AYNI · Municipalidad Distrital (Simulación Hackathon QuipuSoft 2026)',
  finalidad:
    'Los datos proporcionados serán utilizados exclusivamente para fines de simulación del prototipo AYNI: gestión de reciclaje, cálculo de impacto ambiental y aplicación de descuentos tributarios simulados.',
  datosRecolectados: [
    'Nombre y código predial (simulados)',
    'Registro de kilogramos segregados',
    'Historial de interacciones con los agentes de IA',
    'Métricas de impacto ambiental generadas',
  ],
  derechos: [
    'Acceder a tus datos personales almacenados',
    'Solicitar la rectificación de datos inexactos',
    'Solicitar la cancelación o supresión de tus datos',
    'Oponerte al tratamiento de tus datos',
  ],
  usoIA:
    'Este prototipo utiliza agentes de inteligencia artificial simulados (Clasificador, Impacto, Ayni) para procesar las acciones de reciclaje. No se almacena ni comparte información con terceros.',
  alcance: 'Este aviso aplica únicamente al entorno de simulación de la Hackathon QuipuSoft 2026 organizada por TECSUP.',
};

export async function hasConsent() {
  const record = await db.settings.where('key').equals('privacy-consent').first();
  return record?.value === true;
}

export async function grantConsent() {
  const existing = await db.settings.where('key').equals('privacy-consent').first();
  if (existing) {
    await db.settings.update(existing.id, { value: true });
  } else {
    await db.settings.add({ key: 'privacy-consent', value: true });
  }
}

export async function revokeConsent() {
  const existing = await db.settings.where('key').equals('privacy-consent').first();
  if (existing) {
    await db.settings.update(existing.id, { value: false });
  }
}
