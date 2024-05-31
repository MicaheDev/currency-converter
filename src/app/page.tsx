import { CurrencyConverter } from "@/components";
import styles from "./Home.module.css";
import classNames from "classnames";

export default function Home() {
  return (
    <main className="">
      <h1>Bienvenido a la app de conversion de monedas</h1>
      <CurrencyConverter />
    </main>
  );
}
