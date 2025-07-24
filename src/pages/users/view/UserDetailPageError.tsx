import { Link } from "react-router";

const UserDetailPageError = ({ error }: { error: string }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          User Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          {error || "The user you're looking for doesn't exist."}
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
};

export default UserDetailPageError;
