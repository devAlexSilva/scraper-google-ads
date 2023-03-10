import { useState } from 'react'
import styles from './main.module.css'

export const SearchTop = ({ getList }) => {
  const [query, setQuery] = useState('')
  
  return (
    <>
      <div className={styles.searchTop}>
        <div className={styles.search}>
          <input onChange={
            (e) => setQuery(e.target.value)}
            value={query} 
            className={styles.placeholder} 
            type="text" 
            placeholder='Bomba Elétrica Ecobomba 220v' />
          <button onClick={() => getList(query)} className={styles.icon}>
            <img src="./icons/search_icone.svg" alt="lupa" />
          </button>
        </div>
      </div>
    </>
  )
}