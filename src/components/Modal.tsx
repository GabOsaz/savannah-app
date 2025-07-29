import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

interface ModalProps {
  /**
   * Controls whether the modal should be shown.
   */
  isOpen: boolean;
  /**
   * Callback fired when the backdrop is clicked (or any dimiss action is triggered).
   */
  onClose: () => void;
  /**
   * Modal content
   */
  children: ReactNode;
  /**
   * Additional classes applied to the dark backdrop (optional)
   */
  overlayClassName?: string;
  /**
   * Additional classes applied to the content container (optional)
   */
  contentClassName?: string;
}

/**
 * A reusable, animated modal component.
 * It provides a blurred, semi-transparent backdrop and scales/fades the dialog in & out.
 *
 * Usage:
 * ```tsx
 * <Modal isOpen={open} onClose={() => setOpen(false)}>
 *   <h2>Title</h2>
 *   <p>Body</p>
 * </Modal>
 * ```
 */
const Modal = ({
  isOpen,
  onClose,
  children,
  overlayClassName = "",
  contentClassName = "",
}: ModalProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={`fixed inset-0 flex items-center justify-center z-50 ${overlayClassName}`}
        style={{ background: "rgba(0, 0, 0, 0.40)", backdropFilter: "blur(6px)" }}
        onClick={onClose}
      >
        {/* Dialog */}
        <motion.div
          key="content"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={contentClassName}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Modal; 