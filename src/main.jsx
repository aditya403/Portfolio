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
        <div style={{ padding: 32, fontFamily: "'JetBrains Mono', ui-monospace, monospace", background: '#0a0a0a', color: '#d4d8d4', minHeight: '100vh', fontSize: 13 }}>
          <div style={{ color: '#00ff88', marginBottom: 12 }}>$ ./portfolio &mdash; runtime error</div>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#d4d8d4' }}>{this.state.error.message}</pre>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#6f7672', marginTop: 12, fontSize: 12 }}>{this.state.error.stack}</pre>
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
