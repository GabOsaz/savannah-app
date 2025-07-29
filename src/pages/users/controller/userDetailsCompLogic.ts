import { useParams } from "react-router";
import {
  useCreatePost,
  useDeletePost,
} from "../model/mutations/usePostMutations";
import { useGetUserWithPosts } from "../model/queries/useUserWithPosts";
import { useState } from "react";

const useUserDetailsCompLogic = () => {
  const { id } = useParams();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [postDetails, setPostDetails] = useState({
    title: "",
    content: "",
  });
  // TanStack Query hooks
  const { data, isLoading, error } = useGetUserWithPosts(id || "");
  const { mutateAsync: createPostMutation, isPending: isCreatingPost } = useCreatePost();
  const { mutateAsync: deletePostMutation, isPending: isDeletingPost } = useDeletePost();

  const user = data?.user || null;
  const posts = data?.posts || [];
  console.log(posts);

  const isCreatePostButtonDisabled = !id || !postDetails.title.trim() || !postDetails.content.trim() || isCreatingPost;

  const handleCreatePost = async (postDetails: { title: string; content: string }) => {
    if (!id || !postDetails.title.trim() || !postDetails.content.trim()) return;

    try {
      await createPostMutation({
        userId: id,
        title: postDetails.title.trim(),
        content: postDetails.content.trim(),
      });

      setPostDetails({ title: "", content: "" });
      setShowCreateModal(false);
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await deletePostMutation(postId);
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  return {
    user,
    posts,
    isLoading,
    error,
    showCreateModal,
    setShowCreateModal,
    postDetails,
    setPostDetails,
    handleCreatePost,
    handleDeletePost,
    isCreatingPost,
    isDeletingPost,
    isCreatePostButtonDisabled,
  };
};

export default useUserDetailsCompLogic;
