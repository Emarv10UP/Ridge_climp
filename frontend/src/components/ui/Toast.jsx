import { createContext, useCallback, useContext, useState } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

const ToastContext = createContext(null);

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message, type = 'success', duration = 5000) => {
      const id = ++idCounter;
      setToasts((prev) => [...prev, { id, message, type }]);
      if (duration) {
        setTimeout(() => removeToast(id), duration);
      }
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3" role="region" aria-live="polite">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onClose }) {
  const isSuccess = toast.type === 'success';
  return (
    <div
      className={`
        flex items-start gap-3 rounded-lg px-4 py-3 shadow-lg min-w-[280px] max-w-sm
        ${isSuccess ? 'bg-success text-white' : 'bg-danger text-white'}
      `}
      role="alert"
    >
      {isSuccess ? (
        <CheckCircle2 size={20} className="shrink-0 mt-0.5" />
      ) : (
        <XCircle size={20} className="shrink-0 mt-0.5" />
      )}
      <p className="text-sm font-medium flex-1">{toast.message}</p>
      <button onClick={onClose} aria-label="Dismiss notification" className="shrink-0">
        <X size={16} />
      </button>
    </div>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
}
