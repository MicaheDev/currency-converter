import { CurrencyConverter, SmokeBackground } from "@/components";

export default function Home() {
  return (
    <>
      <main className=" h-screen grid place-content-center">
        <CurrencyConverter />
        <SmokeBackground />
      </main>

      <footer className="fixed inset-x-0 bottom-0 max-md:flex-col max-md:mt-8 max-md:gap-0 text-center text-neutral-50 p-4 flex gap-2 justify-center">
        <span>Currency Converter - 2024</span>
        <a
          href="https://github.com/MicaheDev/currency-converter"
          target="_blank"
          className="text-emerald-500 hover:underline font-medium"
        >
          View on GitHub
        </a>
      </footer>
    </>
  );
}
