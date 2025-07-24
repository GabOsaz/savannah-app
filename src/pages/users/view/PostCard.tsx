import { motion } from "framer-motion";

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
    <motion.div 
      className="relative h-[293px] max-w-full md:max-w-[270px] bg-white rounded-lg shadow-sm border border-gray-200 p-6 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ 
        y: -4,
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)"
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 25 
      }}
    >
      {/* Delete Button */}
      <motion.button
        className="absolute top-1 right-1 hover:bg-gray-100 rounded-full transition-colors p-1 cursor-pointer"
        onClick={() => onDelete(post.id)}
        disabled={isDeleting}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.img 
          src="/delete.svg" 
          alt="Delete" 
          className="w-6 h-6"
          whileHover={{ rotate: 180 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
      </motion.button>

      <motion.h3 
        className="text-lg font-medium text-gray-medium mt-2 mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {post.title}
      </motion.h3>
      <motion.p 
        className="text-gray-600 text-sm font-normal text-gray-medium leading-relaxed line-clamp-7"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {post.content}
      </motion.p>
    </motion.div>
  );
}

export default PostCard; 