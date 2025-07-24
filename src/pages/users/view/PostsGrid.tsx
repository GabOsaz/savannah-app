import { motion } from "framer-motion";
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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* New Post Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 25,
          delay: 0.1
        }}
      >
        <NewPostCard onClick={onCreateNewPost} />
      </motion.div>

      {/* Post Cards */}
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 25,
            delay: 0.2 + (index * 0.1)
          }}
        >
          <PostCard
            post={post}
            onDelete={onDeletePost}
            isDeleting={isDeletingPost}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default PostsGrid; 