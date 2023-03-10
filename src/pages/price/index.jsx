import axios from 'axios'
import { useState, useEffect } from 'react'
import { CardPrice } from '../../components/card-price'
import { SearchTop } from '../../components/search-top'
import { ComponentSkeleton } from '../../components/skeleton'
import { Tag } from '../../components/tag'
import styles from './main.module.css'

export const Price = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const productToSearch = [
    ['cabo', 'Cabo Flexivel-2,5mm-750V-Vermelho-100-Metros-Sil'],
    ['bomba', 'Bomba-Periferica-1/2Cv-(220V)-Ecobomba'],
    ['arame', ''],
    ['ducha', ''],
    ['trena', ''],
    ['discos', ''],
    ['eletrodo', '']
  ]

  const getList = async (query) => {
    setIsLoading(true)
    const { data: result } = await axios.get(`http://localhost:2222/price/?name=${query}`)
    setData(result)
    setIsLoading(false)
  }

  useEffect(() => { }, [data])
  return (
    <>
    <SearchTop getList={getList}/>
      <div className={styles.tags}>
        <ul className={styles.nameProduct}>
          {
            productToSearch.map(product => <Tag
              key={product[0]}
              name={product[0]}
              getList={getList}
              nameToSearch={product[1]}
            />)
          }
        </ul>
      </div>
      <div className={styles.precos}>
        {data?.listWithAL && !isLoading ? (
          <div className={styles.nossoPreco}>
            <div className={styles.preco}>
              <ul className={styles.precoItem}>
                <li className={styles.item}><span>preço: </span><span className={styles.itemPreco}>{data.listWithAL[0]?.price}</span></li>
                <li className={styles.item}><span>titulo: </span><span className={styles.itemPreco}>{data.listWithAL[0]?.title}</span></li>
                <li className={styles.item}><span>origem: </span><a target='_blank' href={data.listWithAL[0]?.urlLink}><span className={styles.itemPreco}>{data.listWithAL[0]?.loja}</span></a></li>
              </ul>
            </div>
          </div>
        )
          : null
        }
      </div>
      <main className={styles.searchScraping}>
        <div>
          <h1 className={styles.title}>Resultado da Pesquisa</h1>
        </div>
        <div className={styles.containerCard}>
          {data.fullList && !isLoading ? (
            <>
              {data.fullList.map(card => <CardPrice
                key={card.urlLink}
                image={card.image}
                loja={card.loja}
                urlLink={card.urlLink}
                price={card.price}
                title={card.title}
              />
              )
              }
            </>
          ) : isLoading ? <ComponentSkeleton /> : <CardPrice />}
        </div>
      </main>
    </>
  )
}