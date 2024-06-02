import { SmokeBackground, CurrencyConverter, Footer } from "@/components";

export default function Home() {
  return (
    <>
      <SmokeBackground />
      <div className="h-screen grid place-content-center">
        <main>
          <CurrencyConverter />
        </main>
        <Footer />
      </div>
    </>
  );
}
