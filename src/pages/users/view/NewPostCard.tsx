import { motion } from "framer-motion";

interface NewPostCardProps {
  onClick: () => void;
}

function NewPostCard({ onClick }: NewPostCardProps) {
  return (
    <motion.div
      className="min-h-[293px] max-w-full md:max-w-[270px] my-auto bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors cursor-pointer flex justify-center items-center"
      onClick={onClick}
      whileHover={{
        scale: 1.02,
        borderColor: "#9CA3AF",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <img src="/new-post.svg" alt="New Post" className="w-6 h-6 mb-2" />
        <p className="text-[#717680] text-sm font-semibold">New Post</p>
      </div>
    </motion.div>
  );
}

export default NewPostCard;
