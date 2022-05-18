import Head from "next/head";
import styles from "../styles/home.module.css";
import wallet from "../components/wallet";
import Wallet from "../components/wallet";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>MemberShip NFT</title>
      </Head>

      <main className={styles.main}>
        <Wallet></Wallet>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://osaguild.github.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          @2022 osaguild.com
        </a>
      </footer>
    </div>
  )
}