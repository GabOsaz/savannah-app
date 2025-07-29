import Loader from "../../components/Loader";
import useUserDetailsCompLogic from "./controller/userDetailsCompLogic";
import { useState } from "react";
import ConfirmModal from "../../components/ConfirmModal";
import {
  CreatePostModal,
  UserDetailPageError,
  BackNavigation,
  UserHeader,
  PostsGrid,
} from "./view";

function UserDetail() {
  const componentLogic = useUserDetailsCompLogic();

  // deletion confirmation states
  const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null);

  const handleRequestDelete = (postId: string) => {
    setPostIdToDelete(postId);
  };

  const closeDeleteModal = () => setPostIdToDelete(null);

  const confirmDelete = () => {
    if (postIdToDelete) {
      componentLogic.handleDeletePost(postIdToDelete);
    }
    closeDeleteModal();
  };

  if (componentLogic.isLoading) {
    return <Loader message="Loading user details..." />;
  }

  if (componentLogic.error || !componentLogic.user) {
    return (
      <UserDetailPageError error={componentLogic.error?.message ?? ""} />
    );
  }

  return (
    <div className="max-w-[80%] lg:min-w-[856px] mx-auto">
      <BackNavigation to="/" label="Back to Users" />
      
      <UserHeader
        name={componentLogic.user.name}
        email={componentLogic.user.email}
        postCount={componentLogic.posts.length}
      />

      <PostsGrid
        posts={componentLogic.posts}
        onCreateNewPost={() => componentLogic.setShowCreateModal(true)}
        onDeletePost={handleRequestDelete}
        isDeletingPost={componentLogic.isDeletingPost}
      />

      {/* Create Post Modal */}
      {componentLogic.showCreateModal && (
        <CreatePostModal
          postDetails={componentLogic.postDetails}
          setPostDetails={componentLogic.setPostDetails}
          isCreatingPost={componentLogic.isCreatingPost}
          isCreatePostButtonDisabled={componentLogic.isCreatePostButtonDisabled}
          handleCreatePost={componentLogic.handleCreatePost}
          setShowCreateModal={componentLogic.setShowCreateModal}
        />
      )}

      {/* Delete confirmation modal */}
      {postIdToDelete && (
        <ConfirmModal
          isOpen={true}
          message="Are you sure you want to delete this post? This action cannot be undone."
          onConfirm={confirmDelete}
          onCancel={closeDeleteModal}
          isProcessing={componentLogic.isDeletingPost}
        />
      )}
    </div>
  );
}

export default UserDetail;
