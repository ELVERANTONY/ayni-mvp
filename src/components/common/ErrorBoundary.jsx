import { Component } from 'react';
import { AlertTriangle } from 'lucide-react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('[AYNI] Error caught:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen dark:bg-surface-dark bg-slate-50 flex items-center justify-center p-8">
          <div className="max-w-lg w-full glass rounded-2xl p-8 text-center">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-red-400" />
            <h2 className="text-xl font-bold dark:text-white text-slate-900 mb-2">Error de renderizado</h2>
            <p className="text-sm dark:text-slate-400 text-slate-500 mb-4 font-mono break-all">
              {this.state.error.message}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Recargar página
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
