import db from './db';

export const WASTE_TYPES = {
  pet: { label: 'Botella PET', icon: 'Droplets', kg: 0.5, co2: 0.05, color: 'emerald' },
  carton: { label: 'Caja de Cartón', icon: 'Package', kg: 0.3, co2: 0.04, color: 'amber' },
  aluminum: { label: 'Lata de Aluminio', icon: 'Cpu', kg: 0.15, co2: 0.03, color: 'sky' },
};

export const MENU_OPTIONS = [
  { id: 'report', label: '📸 Reportar reciclaje' },
  { id: 'profile', label: '👤 Mi perfil' },
  { id: 'stats', label: '💰 Mi billetera y ahorro' },
  { id: 'benefits', label: '🎁 Beneficios' },
];

export const REPORT_OPTIONS = [
  { id: 'pet', label: '🥤 Botella PET' },
  { id: 'carton', label: '📦 Caja de Cartón' },
  { id: 'aluminum', label: '🥫 Lata de Aluminio' },
  { id: 'menu', label: '🏠 Volver al menú' },
];

export const RESULT_OPTIONS = [
  { id: 'report', label: '🔄 Reportar otro residuo' },
  { id: 'menu', label: '🏠 Volver al menú principal' },
];

export const REJECT_OPTIONS = [
  { id: 'report', label: '📸 Intentar de nuevo' },
  { id: 'menu', label: '🏠 Volver al menú principal' },
];

export function getScenario() {
  const r = Math.random();
  if (r < 0.6) return 'approved';
  if (r < 0.8) return 'rejected';
  return 'duplicate';
}

export function buildWelcomeMessages() {
  return [
    { role: 'bot', type: 'text', text: '¡Hola! 👋 Soy AYNI Bot, tu asistente de reciclaje inteligente.' },
    { role: 'bot', type: 'text', text: 'Puedo ayudarte a clasificar tus residuos, calcular tu impacto ambiental y gestionar tus beneficios municipales.' },
    { role: 'bot', type: 'text', text: '¿En qué puedo ayudarte hoy?' },
  ];
}

export function buildPhotoMessage(waste) {
  return { role: 'user', type: 'image', text: waste.label, metadata: { icon: waste.icon } };
}

export function buildResultMessage(waste) {
  return {
    role: 'bot', type: 'result',
    text: `✅ ¡Reciclaje verificado!`,
    metadata: {
      kg: waste.kg, co2: waste.co2,
      wasteType: waste.label,
    },
  };
}

export function buildRejectedMessage(waste) {
  return {
    role: 'bot', type: 'text',
    text: `❌ No pudimos identificar el material en la imagen. Asegúrate de que el material esté bien iluminado y enfocado, o prueba con un fondo de color contrastante.`,
  };
}

export function buildDuplicateMessage(waste) {
  return {
    role: 'bot', type: 'text',
    text: `⚠️ Este material (${waste.label}) ya fue registrado hoy. Cada material solo puede registrarse una vez por día para mantener la integridad del sistema de reciclaje. ¡Gracias por tu compromiso! 🌍`,
  };
}

export function buildProfileMessages(wallet) {
  return [
    {
      role: 'bot',
      type: 'text',
      text: `👤 Mi perfil\n\n- ID AYNI: AYNI-${String(wallet.id || 48291).padStart(5, '0')}\n- Estado: cuenta activa\n- Miembro desde: Julio 2026\n- Distrito: Municipalidad demostrativa`,
    },
  ];
}

export function buildStatsMessages(wallet) {
  return [
    {
      role: 'bot',
      type: 'text',
      text: `📊 Tu billetera AYNI\n\n- ♻️ Reciclado: ${wallet.kg} kg\n- 🌱 CO₂ evitado: ${wallet.co2} kg\n- 🎟️ Tickets Ayni: ${wallet.tickets}\n- 💰 Ahorro estimado: S/ ${wallet.savings}\n- 📈 Progreso al beneficio: ${wallet.progress}%\n\n¡Vas muy bien! Sigue reportando residuos validados para avanzar al siguiente nivel.`,
    },
  ];
}

export function buildBenefitsMessages() {
  return [
    { role: 'bot', type: 'text', text: '🎁 **Beneficios disponibles**' },
    { role: 'bot', type: 'text', text: '1️⃣ **Descuento en arbitrios municipales** — Acumula kg reciclados y recibe hasta 15% de descuento en tu recibo.' },
    { role: 'bot', type: 'text', text: '2️⃣ **Sorteo semanal "Canasta Verde"** — Canjea tus Tickets Ayni por canastas de productos ecológicos.' },
    { role: 'bot', type: 'text', text: '3️⃣ **Certificado "Vecino Sostenible"** — Obtén un certificado digital por tu compromiso con el medio ambiente.' },
  ];
}

export async function getMessages() {
  return db.messages.orderBy('timestamp').toArray();
}

export async function addMessage(msg) {
  const id = await db.messages.add({ ...msg, timestamp: Date.now() });
  return { ...msg, id, timestamp: Date.now() };
}

export function buildUserMessage(waste) {
  return { role: 'user', type: 'text', text: waste.label, metadata: { icon: waste.icon } };
}

export function buildClasificadorResponse(waste) {
  return {
    role: 'clasificador', type: 'text',
    text: `Material detectado: ${waste.label}. Estado: limpio y apto para reciclaje. Colócalo en tu Bolsa Verde municipal.`,
  };
}

export function buildImpactoResponse(waste) {
  return {
    role: 'impacto', type: 'text',
    text: `Impacto estimado: ${waste.co2.toFixed(2)} kg de CO₂ eq evitado. Este registro se suma al impacto ambiental de tu distrito.`,
  };
}

export function buildAyniResponse(waste) {
  return {
    role: 'ayni', type: 'text',
    text: `Transacción verificada. Se acreditaron ${waste.kg} kg a tu progreso y recibiste 1 Ticket Ayni.`,
  };
}

export default {
  getMessages, addMessage, WASTE_TYPES,
  MENU_OPTIONS, REPORT_OPTIONS, RESULT_OPTIONS, REJECT_OPTIONS, getScenario,
  buildWelcomeMessages, buildPhotoMessage, buildResultMessage,
  buildRejectedMessage, buildDuplicateMessage,
  buildProfileMessages, buildStatsMessages, buildBenefitsMessages,
  buildUserMessage, buildClasificadorResponse, buildImpactoResponse, buildAyniResponse,
};
