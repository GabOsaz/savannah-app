
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
    <div style={{ background: "rgba(0, 0, 0, 0.40)", backdropFilter: "blur(6px)" }} className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-semibold mb-4">Create New Post</h2>

        <div className="space-y-4">
          <div>
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
          </div>

          <div>
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
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={() => setShowCreateModal(false)}
            className="px-4 py-3 text-gray-600 text-sm font-normal border border-[#E2E8F0] rounded hover:text-gray-800 hover:border-[var(--color-gray-700)]"
            disabled={isCreatingPost}
          >
            Cancel
          </button>
          <button
            onClick={() => handleCreatePost(postDetails)}
            disabled={isCreatePostButtonDisabled}
            className="px-4 py-2 font-semibold text-sm bg-[var(--color-gray-700)] text-white rounded-md hover:bg-[var(--color-gray-900)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreatingPost ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
