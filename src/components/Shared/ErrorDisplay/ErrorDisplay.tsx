interface ErrorDisplayProps {
  error: string | null;
}

function ErrorDisplay({ error }: ErrorDisplayProps) {
  return (
    <div
      className={`py-2 text-sm font-bold text-red-500 transition-opacity ${
        error ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="inline-block text-wrap max-md:max-w-[230px]">
        {error}
      </span>
    </div>
  );
}

export default ErrorDisplay;
