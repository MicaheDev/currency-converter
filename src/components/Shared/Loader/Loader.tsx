import { LoaderProps } from "./types";

function Loader({ loader, text, sideText }: LoaderProps) {
  if (!loader) return <div className="h-4 text-center text-wrap text-indigo-500">{sideText && sideText}</div>;

  return <div className="h-4 font-bold text-center text-wrap text-indigo-500">{text && text}</div>;
}

export default Loader;
