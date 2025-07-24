const Error = ({ message }: { message: string }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
        <p className="text-red-800">{message}</p>
      </div>
    </div>
  );
};

export default Error;