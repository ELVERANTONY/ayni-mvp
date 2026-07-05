import { WASTE_TYPES } from '@/services/chatService';

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function timestamp() {
  return new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
}

const TIMING = {
  clasificador: { base: 600, jitter: 400 },
  impacto: { base: 500, jitter: 300 },
  ayni: { base: 400, jitter: 200 },
};

async function simularTiempo(etapa) {
  const t = TIMING[etapa];
  await sleep(t.base + Math.random() * t.jitter);
}

export class AgenteClasificador {
  async analizar(tipoResiduo) {
    await simularTiempo('clasificador');

    const waste = WASTE_TYPES[tipoResiduo];
    if (!waste) throw new Error(`Residuo desconocido: ${tipoResiduo}`);

    const variante = [
      'Limpia y aplastada',
      'Ligeramente sucia, apta para reciclaje',
      'En óptimas condiciones',
    ][Math.floor(Math.random() * 3)];

    return {
      agente: 'clasificador',
      residuo: waste.label,
      estado: variante,
      instruccion: `Colócala en tu Bolsa Verde municipal.`,
      icono: waste.icon,
      timestamp: timestamp(),
      confianza: (85 + Math.random() * 14).toFixed(1) + '%',
    };
  }
}

export class AgenteImpacto {
  async calcular(residuoAnalizado) {
    await simularTiempo('impacto');

    const waste = Object.values(WASTE_TYPES).find(
      (w) => w.label === residuoAnalizado.residuo
    );
    if (!waste) throw new Error('Residuo no encontrado en catalogo');

    const co2Evitado = waste.co2 + (Math.random() * 0.01 - 0.005);
    const metanoMitigado = co2Evitado * 0.28;
    const equivalencias = [
      `${(co2Evitado * 1000).toFixed(0)} días de respiración de un árbol`,
      `equivalente a cargar ${Math.ceil(co2Evitado * 5)} smartphones`,
      `${(metanoMitigado * 100).toFixed(1)}g de metano (CH₄) evitado`,
    ];

    return {
      agente: 'impacto',
      co2Evitado: parseFloat(co2Evitado.toFixed(4)),
      metanoMitigado: parseFloat(metanoMitigado.toFixed(4)),
      equivalencia: equivalencias[Math.floor(Math.random() * equivalencias.length)],
      timestamp: timestamp(),
    };
  }
}

export class AgenteAyni {
  async verificar(impacto) {
    await simularTiempo('ayni');

    const ticketGanador = Math.random() > 0.97;
    const kgArbitrio = parseFloat((impacto.co2Evitado * 10).toFixed(2));

    return {
      agente: 'ayni',
      transaccionId: `AYNI-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 9999)}`,
      kgAcreditados: kgArbitrio,
      ticketGanador,
      ticketMensaje: ticketGanador
        ? '¡Felicidades! Has ganado un Ticket Dorado para el sorteo premium.'
        : '1 Ticket Ayni acumulado para el sorteo de este fin de semana.',
      descuentoAplicado: `${(kgArbitrio * 2).toFixed(2)}% de descuento en arbitrios`,
      timestamp: timestamp(),
      hashVerificacion: `${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
    };
  }
}

export const agentes = {
  clasificador: new AgenteClasificador(),
  impacto: new AgenteImpacto(),
  ayni: new AgenteAyni(),
};
