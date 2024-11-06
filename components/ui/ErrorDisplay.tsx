interface ErrorDisplayProps {
  error?: string;
  message?: string;
}

export const ErrorDisplay = ({ error, message }: ErrorDisplayProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-red-500 mb-4">{error || message}</p>
      <button
        onClick={() => window.history.back()}
        className="text-blue-500 hover:text-blue-600"
      >
        返回上一页
      </button>
    </div>
  );
}; 