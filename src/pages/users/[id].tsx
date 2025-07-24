import { Link } from "react-router";
import Loader from "../../components/Loader";
import useUserDetailsCompLogic from "./controller/userDetailsCompLogic";
import CreatePostModal from "./view/CreatePostModal";

function UserDetail() {
  const componentLogic = useUserDetailsCompLogic();

  if (componentLogic.isLoading) {
    return <Loader message="Loading user details..." />;
  }

  if (componentLogic.error || !componentLogic.user) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            User Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            {componentLogic.error?.message ||
              "The user you're looking for doesn't exist."}
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to Users
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[80%] lg:min-w-[856px] mx-auto">
      <div className="mb-6">
        <Link
          to="/"
          className="group inline-flex items-center text-sm text-gray-medium mb-4 space-x-2"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-300 ease-out">
            ←
          </span>
          <span className="group-hover:underline transition-all duration-300 ease-out">
            Back to Users
          </span>
        </Link>
        <h1 className="text-2xl md:text-4xl font-medium text-gray-dark mb-2 md:mb-4">
          {componentLogic.user.name}
        </h1>
        <p className="text-gray-medium text-sm font-normal lowercase">
          {componentLogic.user.email} •{" "}
          <span className="text-gray-medium text-sm font-medium lowercase">
            {componentLogic.posts.length}{" "}
            {componentLogic.posts.length === 1 ? "Post" : "Posts"}
          </span>
        </p>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* New Post Card */}
        <div
          className="min-h-[293px] max-w-full md:max-w-[270px] my-auto bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors cursor-pointer flex justify-center items-center"
          onClick={() => componentLogic.setShowCreateModal(true)}
        >
          <div className="flex flex-col items-center justify-center">
            <img src="/new-post.svg" alt="New Post" className="w-6 h-6 mb-2" />
            <p className="text-[#717680] text-sm font-semibold">New Post</p>
          </div>
        </div>

        {/* Post Cards */}
        {componentLogic.posts.map((post) => (
          <div
            key={post.id}
            className="relative min-h-[293px] max-w-full md:max-w-[270px] bg-white rounded-lg shadow-sm border border-gray-200 p-6 overflow-hidden"
          >
            {/* Delete Button */}
            <div className="absolute top-1 right-1">
              <button
                className="hover:bg-gray-100 rounded-full transition-colors p-1"
                onClick={() => componentLogic.handleDeletePost(post.id)}
                disabled={componentLogic.isDeletingPost}
              >
                <img src="/delete.svg" alt="Delete" className="w-6 h-6" />
              </button>
            </div>

            <h3 className="text-lg font-medium text-gray-medium mt-2 mb-3">
              {post.title}
            </h3>
            <p className="text-gray-600 text-sm font-normal text-gray-medium leading-relaxed line-clamp-7">
              {post.content}
            </p>
          </div>
        ))}
      </div>

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
