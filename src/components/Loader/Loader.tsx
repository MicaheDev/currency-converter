interface LoaderProps {
  loading: boolean;
  text: string;
}

function Loader({ loading, text }: LoaderProps) {
  if (!loading) return;

  return <div>{text}</div>;
}

export default Loader;
