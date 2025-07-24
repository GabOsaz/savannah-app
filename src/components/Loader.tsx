const Loader = ({ message }: { message: string }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4" />
          <p className="text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Loader;