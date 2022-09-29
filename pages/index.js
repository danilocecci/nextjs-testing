import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import fs from 'fs'

export async function getStaticProps() {
  const users = listFiles()
  
  const data = users.map((item) => {
    const json = fs.readFileSync(`database/${item}`)
    return (JSON.parse(json))
  })
  
  console.log(data)
  
  function listFiles() {
    const files = fs.readdirSync("database")
    return files
  }

  return {
    props: { data }
  }
}

export default function Home({data}) {
  return (
    <div>
    <h1>Lista de devs</h1>
      <div className={styles.cards}>
        {data.map((user, index) => (
          <div className={styles.card} key={index}>
            <div>
            <Image className={styles.card_image}
               src={`${user.github}.png`} width={80} height={80} alt={user.name} />
            </div>
            <h2>{user.nome}</h2>
            <p>{user.email}</p>
            <a href={user.github}>{user.github}</a>
          </div>
        ))}
      </div>
    </div>
  )
}
