interface ErrorDisplayProps {
  error: string | null;
}

function ErrorDisplay({ error }: ErrorDisplayProps) {
  return (
    <div
      className={`transition-opacity text-sm h-2 text-red-500 font-bold ${
        error ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="inline-block max-md:max-w-[230px] overflow-hidden whitespace-nowrap overflow-ellipsis">
        {error}
      </span>
    </div>
  );
}

export default ErrorDisplay;
