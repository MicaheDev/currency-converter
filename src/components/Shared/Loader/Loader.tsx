import { LoaderProps } from "./types";

function Loader({ loader, text, sideText }: LoaderProps) {
  return (
    <div className="h-4 text-wrap text-center font-bold text-indigo-500">
      {loader ? text : sideText}
    </div>
  );
}

export default Loader;
