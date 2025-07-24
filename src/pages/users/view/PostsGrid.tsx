import NewPostCard from "./NewPostCard";
import PostCard from "./PostCard";

interface Post {
  id: string;
  title: string;
  content: string;
}

interface PostsGridProps {
  posts: Post[];
  onCreateNewPost: () => void;
  onDeletePost: (postId: string) => void;
  isDeletingPost: boolean;
}

function PostsGrid({ posts, onCreateNewPost, onDeletePost, isDeletingPost }: PostsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* New Post Card */}
      <NewPostCard onClick={onCreateNewPost} />

      {/* Post Cards */}
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onDelete={onDeletePost}
          isDeleting={isDeletingPost}
        />
      ))}
    </div>
  );
}

export default PostsGrid; 