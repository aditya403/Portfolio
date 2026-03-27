import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, color: '#ff3366', fontFamily: 'monospace', background: '#0a0a0a', minHeight: '100vh' }}>
          <h1 style={{ color: '#ff3366', marginBottom: 16 }}>Runtime Error</h1>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#ffaa00' }}>{this.state.error.message}</pre>
          <pre style={{ whiteSpace: 'pre-wrap', color: 'rgba(255,255,255,0.4)', marginTop: 12, fontSize: 12 }}>{this.state.error.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
