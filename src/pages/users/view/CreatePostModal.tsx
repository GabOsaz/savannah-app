import { motion, AnimatePresence } from "framer-motion";

interface CreatePostModalProps {
  isCreatingPost: boolean;
  isCreatePostButtonDisabled: boolean;
  handleCreatePost: (postDetails: { title: string; content: string }) => void;
  setShowCreateModal: (value: boolean) => void;
  postDetails: { title: string; content: string };
  setPostDetails: (value: { title: string; content: string }) => void;
}

const CreatePostModal = ({
  isCreatingPost,
  isCreatePostButtonDisabled,
  handleCreatePost,
  setShowCreateModal,
  postDetails,
  setPostDetails,
}: CreatePostModalProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{ background: "rgba(0, 0, 0, 0.40)", backdropFilter: "blur(6px)" }}
        className="fixed inset-0 flex items-center justify-center z-50"
        onClick={() => setShowCreateModal(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ 
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="text-xl font-semibold mb-4"
          >
            Create New Post
          </motion.h2>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={postDetails.title}
                onChange={(e) => setPostDetails({ ...postDetails, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter post title..."
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                value={postDetails.content}
                onChange={(e) => setPostDetails({ ...postDetails, content: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter post content..."
              />
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="flex justify-end space-x-2 mt-6"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-3 text-gray-600 text-sm font-normal border border-[#E2E8F0] rounded hover:text-gray-800 hover:border-[var(--color-gray-700)]"
              disabled={isCreatingPost}
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCreatePost(postDetails)}
              disabled={isCreatePostButtonDisabled}
              className="px-4 py-2 font-semibold text-sm bg-[var(--color-gray-700)] text-white rounded-md hover:bg-[var(--color-gray-900)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreatingPost ? "Publishing..." : "Publish"}
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CreatePostModal;
