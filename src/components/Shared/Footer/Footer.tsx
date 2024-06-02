function Footer() {
  return (
    <footer className="flex justify-center gap-2 p-4 text-center text-neutral-50 max-md:fixed max-md:bottom-0 max-md:m-auto max-md:flex-col max-md:gap-0 max-md:text-neutral-900">
      <span>Currency Converter - 2024</span>
      <a
        href="https://github.com/MicaheDev/currency-converter"
        target="_blank"
        className="font-medium text-emerald-500 hover:underline"
      >
        View on GitHub
      </a>
    </footer>
  );
}

export default Footer;
