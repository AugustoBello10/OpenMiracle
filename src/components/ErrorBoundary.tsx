import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      try {
        localStorage.removeItem('miracle_build_state');
        localStorage.removeItem('bm_live_settings');
      } catch (e) {
        // ignore
      }
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8 bg-black/80 border-2 border-red-500/40 rounded-xl max-w-xl mx-auto my-12 text-center shadow-2xl backdrop-blur-md">
          <div className="w-14 h-14 rounded-full bg-red-950/60 border border-red-500/50 flex items-center justify-center mb-4 text-red-400">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <h3 className="text-xl font-bold uppercase tracking-wider text-medieval-gold mb-2">
            {this.props.fallbackTitle || 'Ocorreu um erro ao carregar o módulo'}
          </h3>

          <p className="text-sm text-stone-300 font-sans mb-4 max-w-md">
            Identificamos uma incompatibilidade de dados temporária. Clique no botão abaixo para restaurar o estado padrão com segurança.
          </p>

          {this.state.error && (
            <div className="w-full bg-black/90 p-3 rounded border border-white/10 font-mono text-xs text-red-300/80 mb-5 text-left overflow-x-auto max-h-32">
              {this.state.error.message || String(this.state.error)}
            </div>
          )}

          <button
            onClick={this.handleReset}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-medieval-gold text-black font-bold text-xs uppercase tracking-wider hover:bg-yellow-400 transition-all cursor-pointer shadow-lg"
          >
            <RotateCcw className="w-4 h-4" />
            Restaurar Estado Padrão
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
