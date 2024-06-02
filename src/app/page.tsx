import { SmokeBackground, CurrencyConverter, Footer } from "@/components";

export default function Home() {
  return (
    <>
      <SmokeBackground />
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <main>
          <CurrencyConverter />
        </main>
        <Footer />
      </div>
    </>
  );
}
