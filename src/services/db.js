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

export default db;
