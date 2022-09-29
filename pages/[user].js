import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import fs from 'fs'

export async function getStaticPaths() {
  const files = listFiles()
  console.log('files:', files)

  const paths = files.map(file => {
    return {
      params: { user: file.split(".")[0]}
    }
  })

  console.log('paths:', paths)

  return {
    paths,
    fallback: false
  }
  
  function listFiles() {
    const files = fs.readdirSync("database")
    return files
  }
}

export async function getStaticProps(context) {
  const { user } = context.params 

  const userInfo = fs.readFileSync(`database/${user}.json`)
  console.log('userInfo:', JSON.parse(userInfo)) 

  return {
    props: {user: JSON.parse(userInfo)}
  }
}

export default function User({user}) {

  return (
    <>
      <div className={styles.card}>
        <div>
          <Image className={styles.card_image}
            src={`${user.github}.png`} width={80} height={80} alt={user.name} />
        </div>
        <h2>{user.nome}</h2>
        <p>{user.email}</p>
        <a href={user.github}>{user.github}</a>
      </div>
    </>
  )

}