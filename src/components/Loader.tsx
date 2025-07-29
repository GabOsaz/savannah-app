const Loader = ({ message }: { message: string }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className="text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  );
};

export const ButtonLoader = () => (
  <div className="lds-ellipsis-button space-x-1">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default Loader;
