import { motion } from "framer-motion";
import Modal from "../../../components/Modal";
import { ButtonLoader } from "../../../components/Loader";
import { useState } from "react";

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

  const [titleError, setTitleError] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.length > 25) {
      value = value.slice(0, 25);
    }
    setPostDetails({ ...postDetails, title: value });
    if (value.length === 25) {
      setTitleError("Maximum character limit of 25 reached");
    } else {
      setTitleError("");
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={() => setShowCreateModal(false)}
      contentClassName="space-y-6 bg-white max-w-[90%] sm:max-w-[679px] rounded-lg p-6 w-full shadow-xl"
    >
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="text-4xl font-medium text-[var(--color-gray-900)]"
          >
            New Post
          </motion.h2>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <div className="space-y-2.5 w-full">
                <PostLabel>
                  Post title
                </PostLabel>
                <input
                  type="text"
                  value={postDetails.title}
                  onChange={handleTitleChange}
                  className={`w-full px-4 py-[9.5px] text-[#334155] ${titleError ? "focus:ring-0" : "focus:ring-1"} focus:ring-[var(--color-brand-600)] text-sm border rounded-md focus:outline-none ${titleError ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Give your post a title"
                  maxLength={25}
                />
              </div>
              <div className="flex items-center text-xs mt-1 justify-between">
                <p className="text-red-500 min-h-[1em]">
                  {titleError || <span>&nbsp;</span>}
                </p>
                {postDetails.title && (
                  <span className="text-gray-medium"> typed: {postDetails.title.length} | max: 25 </span>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <div className="space-y-2.5 w-full">
                <PostLabel>
                  Post content
                </PostLabel>
                <textarea
                  value={postDetails.content}
                  onChange={(e) =>
                    setPostDetails({ ...postDetails, content: e.target.value })
                  }
                  rows={4}
                  className="w-full h-[179px] px-4 py-2.5 text-[#334155] text-sm border border-gray-300 rounded-md focus:ring-1 focus:outline-none focus:ring-[var(--color-brand-600)]"
                  placeholder="Write something mind-blowing"
                />
              </div>
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
              className="flex items-center space-x-1 px-4 py-2 font-semibold text-sm bg-[var(--color-gray-700)] text-white rounded-md hover:bg-[var(--color-gray-900)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreatingPost ? "Publishing" : "Publish"}
              {isCreatingPost && <ButtonLoader />}
            </motion.button>
          </motion.div>
    </Modal>
  );
};

export default CreatePostModal;

const PostLabel = ({ children }: { children: React.ReactNode }) => {
  return (
    <label className="block text-lg font-medium text-[var(--color-gray-600)]">
      {children}
    </label>
  );
};
