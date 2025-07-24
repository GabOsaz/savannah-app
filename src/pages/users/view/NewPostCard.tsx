interface NewPostCardProps {
  onClick: () => void;
}

function NewPostCard({ onClick }: NewPostCardProps) {
  return (
    <div
      className="min-h-[293px] max-w-full md:max-w-[270px] my-auto bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors cursor-pointer flex justify-center items-center"
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center">
        <img src="/new-post.svg" alt="New Post" className="w-6 h-6 mb-2" />
        <p className="text-[#717680] text-sm font-semibold">New Post</p>
      </div>
    </div>
  );
}

export default NewPostCard; 