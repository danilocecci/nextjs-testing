import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

import fs from 'fs'

export async function getStaticProps() {
  const users = listFiles()
  
  const data = users.map((item) => {
    const json = fs.readFileSync(`database/${item}`)
    return (JSON.parse(json))
  })
  
  console.log("data:", data)
  
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
          <Link key={index} href={`/${user.github.split("/")[3]}`}>
              <div className={styles.card}>
                <div>
                  <Image className={styles.card_image}
                    src={`${user.github}.png`} width={80} height={80} alt={user.name} />
                </div>
                <h2>{user.nome}</h2>
                <p>Cidade - Estado</p>
              </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
