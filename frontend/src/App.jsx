import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast';
import HomePage from './pages/HomePage';
import ExpeditionsPage from './pages/ExpeditionsPage';
import ExpeditionDetailPage from './pages/ExpeditionDetailPage';
import SafetyPage from './pages/SafetyPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/expeditions" element={<ExpeditionsPage />} />
          <Route path="/expeditions/:slug" element={<ExpeditionDetailPage />} />
          <Route path="/safety" element={<SafetyPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}
