import axios from 'axios'
import { useEffect, useState } from 'react'
import { SearchTop } from '../../components/search-top'
import { ComponentSkeleton } from '../../components/skeleton'
import styles from './main.module.css'

export const Description = () => {

  /** To Do
   * add function to get description data in API
   * pass function by search component
   * show data and conditions
   */

  const [loading, setIsLoading] = useState(false)
  const [data, setData] = useState([])

  const getList = async (query) => {
    setIsLoading(true)
    const { data: result } = await axios.get(`http://localhost:2222/description?name=${query}`)
    console.log(result)
    setIsLoading(false)
    setData(result)
  }

  useEffect(() => { }, [data])

  return (
    <>
      <SearchTop getList={getList} />
      <main className={styles.searchScraping}>
        <div><h1 className={styles.titleDescri}>Resultado da Pesquisa</h1></div>
        <div className={styles.containerCardDes}>
          {loading ? (<ComponentSkeleton />) : (
            <div className={styles.cards}>
              <div className={styles.itemCard}>
                <img src="" alt="imagem do produto" />
                <div className={styles.detals}>
                  <div className={styles.detalsItem}>
                    <h4>preço:</h4>
                    <div className={styles.description}></div>
                  </div>
                  <div className={styles.detalsItem}>
                    <h4>titulo:</h4>
                    <div className={styles.description}></div>
                  </div>
                  <div className={styles.detalsItem}>
                    <h4>origem:</h4>
                    <div className={styles.description}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}