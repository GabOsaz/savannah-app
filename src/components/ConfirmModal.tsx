import Modal from "./Modal";
import { ButtonLoader } from "./Loader";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isProcessing?: boolean;
}

const ConfirmModal = ({
  isOpen,
  title = "Delete Post",
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  isProcessing = false,
}: ConfirmModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      contentClassName="space-y-6 bg-white max-w-[90%] sm:max-w-[400px] rounded-lg p-6 w-full shadow-xl"
    >
      <h2 className="text-xl font-medium text-[var(--color-gray-900)]">{title}</h2>
      <p className="text-gray-600 text-sm">{message}</p>

      <div className="flex justify-end space-x-2 mt-6">
        <button
          onClick={onCancel}
          disabled={isProcessing}
          className="px-4 py-2 text-gray-600 text-sm font-normal border border-[#E2E8F0] rounded hover:text-gray-800 hover:border-[var(--color-gray-700)] disabled:opacity-50"
        >
          {cancelLabel}
        </button>
        <button
          onClick={onConfirm}
          disabled={isProcessing}
          className="flex items-center space-x-1 px-4 py-2 font-semibold text-sm bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <>
              Deleting
              <ButtonLoader />
            </>
          ) : (
            confirmLabel
          )}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal; 