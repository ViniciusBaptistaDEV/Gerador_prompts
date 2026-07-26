import { useEffect } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  X,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import './AlertModal.css';

export default function AlertModal({ isDark, alertState, onClose }) {
  const {
    isOpen,
    title,
    message,
    type = 'info',
    confirmText = 'Entendido',
    cancelText = 'Cancelar',
    showCancel = false,
    onConfirm
  } = alertState || {};

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const renderIcon = () => {
    switch (type) {
      case 'warning':
        return <ShieldAlert className="alert-modal__icon alert-modal__icon--warning" />;
      case 'success':
        return <CheckCircle2 className="alert-modal__icon alert-modal__icon--success" />;
      case 'confirm':
        return <HelpCircle className="alert-modal__icon alert-modal__icon--confirm" />;
      case 'error':
        return <AlertTriangle className="alert-modal__icon alert-modal__icon--error" />;
      default:
        return <Sparkles className="alert-modal__icon alert-modal__icon--info" />;
    }
  };

  const defaultTitle = type === 'confirm' 
    ? 'Confirmação Requerida' 
    : type === 'warning' || type === 'error' 
    ? 'Atenção do Sistema' 
    : type === 'success' 
    ? 'Operação Concluída' 
    : 'Notificação do Sistema';

  return (
    <div className="alert-modal__overlay" onClick={handleCancel}>
      <div
        className={`alert-modal ${isDark ? 'alert-modal--dark' : 'alert-modal--light'} alert-modal--${type}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Borda holográfica superior */}
        <div className="alert-modal__top-glow"></div>

        {/* Header com badge e botão fechar */}
        <div className="alert-modal__header">
          <div className="alert-modal__badge">
            <span className="alert-modal__badge-dot"></span>
            CYBER ALERT v2.0
          </div>
          <button
            onClick={handleCancel}
            className="alert-modal__close-btn"
            title="Fechar Notificação (Esc)"
            aria-label="Fechar"
          >
            <X style={{ width: '1.1rem', height: '1.1rem' }} />
          </button>
        </div>

        {/* Corpo com Título e Caixa de Texto com Efeito Laser */}
        <div className="alert-modal__body">
          <div className="alert-modal__title-box">
            <div className="alert-modal__icon-wrapper">
              {renderIcon()}
            </div>
            <h3 className="alert-modal__title">{title || defaultTitle}</h3>
          </div>

          {/* Container da mensagem com varredura a Laser Futurista */}
          <div className="alert-modal__message-container">
            {/* Feixe de Laser reluzente subindo e descendo */}
            <div className="alert-modal__laser-beam" aria-hidden="true">
              <div className="alert-modal__laser-head"></div>
            </div>
            <div className="alert-modal__laser-grid" aria-hidden="true"></div>

            <p className="alert-modal__message-text">
              {message}
            </p>
          </div>
        </div>

        {/* Rodapé com botões de ação */}
        <div className="alert-modal__footer">
          {showCancel && (
            <button
              onClick={handleCancel}
              className="alert-modal__btn alert-modal__btn--cancel"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={handleConfirm}
            className={`alert-modal__btn alert-modal__btn--confirm alert-modal__btn--${type}`}
            autoFocus
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
