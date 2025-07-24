interface Post {
  id: string;
  title: string;
  content: string;
}

interface PostCardProps {
  post: Post;
  onDelete: (postId: string) => void;
  isDeleting: boolean;
}

function PostCard({ post, onDelete, isDeleting }: PostCardProps) {
  return (
    <div className="relative min-h-[293px] max-w-full md:max-w-[270px] bg-white rounded-lg shadow-sm border border-gray-200 p-6 overflow-hidden">
      {/* Delete Button */}
      <div className="absolute top-1 right-1">
        <button
          className="hover:bg-gray-100 rounded-full transition-colors p-1"
          onClick={() => onDelete(post.id)}
          disabled={isDeleting}
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
  );
}

export default PostCard; 