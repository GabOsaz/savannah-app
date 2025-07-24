import Loader from "../../components/Loader";
import useUserDetailsCompLogic from "./controller/userDetailsCompLogic";
import {
  CreatePostModal,
  UserDetailPageError,
  BackNavigation,
  UserHeader,
  PostsGrid,
} from "./view";

function UserDetail() {
  const componentLogic = useUserDetailsCompLogic();

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
        onDeletePost={componentLogic.handleDeletePost}
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
    </div>
  );
}

export default UserDetail;
