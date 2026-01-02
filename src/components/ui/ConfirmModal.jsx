import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { FiAlertTriangle } from 'react-icons/fi'
import './ConfirmModal.scss'

const ConfirmModal = ({ isOpen, onConfirm, onCancel, title, message, confirmText = "Confirmar", cancelText = "Cancelar" }) => {
  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="confirm-modal__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onCancel();
            }}
          />
          <motion.div
            className="confirm-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <div className="confirm-modal__icon">
              <FiAlertTriangle size={32} />
            </div>
            <h2 className="confirm-modal__title">{title}</h2>
            {message && <p className="confirm-modal__message">{message}</p>}
            <div className="confirm-modal__actions">
              <button
                type="button"
                className="confirm-modal__btn confirm-modal__btn--cancel"
                onClick={onCancel}
              >
                {cancelText}
              </button>
              <button
                type="button"
                className="confirm-modal__btn confirm-modal__btn--confirm"
                onClick={onConfirm}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
}

export default ConfirmModal
