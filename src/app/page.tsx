import styles from './page.module.css'

export default function Home() {
  // const data = await fetch(
  //   'https://main--time-pav6zq.apollographos.net/graphql',
  //   {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       query: '{ now(id: "1") }',
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }
  // )
  // const now = await data.json()

  return (
    <div className={styles.page}>
      <main className={styles.main}>Test</main>
    </div>
  )
}
