import { motion } from "framer-motion";

interface UserHeaderProps {
  name: string;
  email: string;
  postCount: number;
}

function UserHeader({ name, email, postCount }: UserHeaderProps) {
  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 25 
      }}
    >
      <motion.h1 
        className="text-2xl md:text-4xl font-medium text-gray-dark mb-2 md:mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {name}
      </motion.h1>
      <motion.p 
        className="text-gray-medium text-sm font-normal lowercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {email} •{" "}
        <motion.span 
          className="text-gray-medium text-sm font-medium lowercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {postCount} {postCount === 1 ? "Post" : "Posts"}
        </motion.span>
      </motion.p>
    </motion.div>
  );
}

export default UserHeader; 