interface UserHeaderProps {
  name: string;
  email: string;
  postCount: number;
}

function UserHeader({ name, email, postCount }: UserHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl md:text-4xl font-medium text-gray-dark mb-2 md:mb-4">
        {name}
      </h1>
      <p className="text-gray-medium text-sm font-normal lowercase">
        {email} •{" "}
        <span className="text-gray-medium text-sm font-medium lowercase">
          {postCount} {postCount === 1 ? "Post" : "Posts"}
        </span>
      </p>
    </div>
  );
}

export default UserHeader; 