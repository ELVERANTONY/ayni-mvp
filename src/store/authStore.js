import db from '@/services/db';

const CREDENTIALS = {
  admin: { email: 'admin@ayni.pe', password: 'admin123', role: 'admin', name: 'Administrador Municipal' },
  citizen: { email: 'user@ayni.pe', password: 'user123', role: 'citizen', name: 'Ciudadano' },
};

const sessionKey = (role) => `session-${role}`;

export async function login(email, password) {
  await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));

  const user = Object.values(CREDENTIALS).find(
    (u) => u.email === email.toLowerCase() && u.password === password
  );

  if (!user) {
    throw new Error('Credenciales inválidas. Verifica tu correo y contraseña.');
  }

  const session = {
    email: user.email,
    role: user.role,
    name: user.name,
    loggedAt: Date.now(),
    token: `ayni-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
  };

  const key = sessionKey(user.role);
  const existing = await db.settings.where('key').equals(key).first();
  if (existing) {
    await db.settings.update(existing.id, { value: session });
  } else {
    await db.settings.add({ key, value: session });
  }

  return session;
}

export async function logout(role) {
  const key = role ? sessionKey(role) : 'session';
  const existing = await db.settings.where('key').equals(key).first();
  if (existing) {
    await db.settings.update(existing.id, { value: null });
  }
}

export async function getSession(role) {
  if (role) {
    const record = await db.settings.where('key').equals(sessionKey(role)).first();
    if (record?.value?.token && record.value.role === role) return record.value;

    // Compatibilidad con sesiones creadas antes de separar las vistas por rol.
    const legacy = await db.settings.where('key').equals('session').first();
    if (legacy?.value?.token && legacy.value.role === role) return legacy.value;
    return null;
  }

  const sessions = await Promise.all(['admin', 'citizen'].map((item) =>
    db.settings.where('key').equals(sessionKey(item)).first()
  ));
  const active = sessions.map((record) => record?.value).filter((value) => value?.token);
  if (active.length) return active.sort((a, b) => b.loggedAt - a.loggedAt)[0];
  return null;
}

export function anonimizar(nombre) {
  if (!nombre || nombre.length < 2) return '***';
  const partes = nombre.split(' ');
  return partes
    .map((p) => p[0] + '***' + (p.length > 1 ? p[p.length - 1] : ''))
    .join(' ');
}
