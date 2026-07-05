import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Recycle, ArrowLeft, Eye, EyeOff, AlertCircle, Shield } from 'lucide-react';
import { login } from '@/store/authStore';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Completa todos los campos.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const session = await login(email, password);
      navigate(session.role === 'admin' ? '/admin' : '/citizen');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen dark:bg-surface-dark bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm font-medium dark:text-slate-400 text-slate-500 hover:text-ayni-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>

        <div className="glass rounded-3xl p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-ayni-400 to-ayni-600 flex items-center justify-center mx-auto mb-4 shadow-glow">
              <Recycle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold dark:text-white text-slate-900">Acceder al Sistema</h1>
            <p className="text-sm mt-1 dark:text-slate-400 text-slate-500">Ingresa tus credenciales para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium dark:text-slate-300 text-slate-700 mb-1.5">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ayni.pe"
                className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200
                  dark:bg-slate-800/60 dark:border-slate-700/30 dark:text-white dark:placeholder-slate-500
                  bg-white border-slate-200/50 text-slate-900 placeholder-slate-400
                  border focus:outline-none focus:border-ayni-500/50 focus:ring-1 focus:ring-ayni-500/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium dark:text-slate-300 text-slate-700 mb-1.5">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 pr-11
                    dark:bg-slate-800/60 dark:border-slate-700/30 dark:text-white dark:placeholder-slate-500
                    bg-white border-slate-200/50 text-slate-900 placeholder-slate-400
                    border focus:outline-none focus:border-ayni-500/50 focus:ring-1 focus:ring-ayni-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 dark:text-slate-500 text-slate-400 hover:text-ayni-400"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl dark:bg-red-900/20 dark:border-red-800/30 dark:text-red-300 bg-red-50 border border-red-200/50 text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-semibold
                bg-ayni-500 text-white shadow-lg shadow-ayni-500/20
                hover:bg-ayni-600 active:scale-[0.98] transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
                flex items-center justify-center gap-2"
            >
              {loading && (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {loading ? 'Verificando...' : 'Ingresar'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t dark:border-slate-700/30 border-slate-200/50">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 dark:text-slate-500 text-slate-400" />
              <span className="text-xs font-medium dark:text-slate-500 text-slate-400">Credenciales de prueba</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="dark:bg-slate-800/40 bg-slate-100 rounded-xl p-3">
                <span className="font-semibold dark:text-slate-300 text-slate-600 block">Administrador</span>
                <span className="dark:text-slate-500 text-slate-400">admin@ayni.pe</span>
                <span className="dark:text-slate-500 text-slate-400 block">admin123</span>
              </div>
              <div className="dark:bg-slate-800/40 bg-slate-100 rounded-xl p-3">
                <span className="font-semibold dark:text-slate-300 text-slate-600 block">Ciudadano</span>
                <span className="dark:text-slate-500 text-slate-400">user@ayni.pe</span>
                <span className="dark:text-slate-500 text-slate-400 block">user123</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
