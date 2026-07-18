import Dexie from 'dexie';

export const db = new Dexie('ayni-db');

db.version(1).stores({
  wallet: '++id',
  messages: '++id, timestamp',
  contributors: '++id',
  monthlyData: '++id, monthIndex',
  settings: '++id, key',
  wasteLog: '++id, timestamp',
});

db.version(2).stores({
  registrationRequests: '++id, status',
});

// Esquema completo para asegurar la migración de navegadores que ya tenían
// una versión anterior del MVP antes de incorporar las inscripciones.
db.version(3).stores({
  wallet: '++id',
  messages: '++id, timestamp',
  contributors: '++id',
  monthlyData: '++id, monthIndex',
  settings: '++id, key',
  wasteLog: '++id, timestamp',
  registrationRequests: '++id, status, timestamp',
});

export default db;
