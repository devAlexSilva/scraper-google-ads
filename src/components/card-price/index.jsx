import styles from './main.module.css'

export const CardPrice = ({urlLink, image, price = 0, title = 'realize uma busca', loja}) => {
  return (
    <>
      <div key={urlLink} className={styles.cards}>
        <div className={styles.itemCard}>
          <img src={image} alt="imagem do produto" />
          <div className={styles.detals}>
            <div className={styles.detalsItem}>
              <h4>preço:</h4>
              <div className={styles.description}>R$ {price}</div>
            </div>
            <div className={styles.detalsItem}>
              <h4>titulo:</h4>
              <div className={styles.description}>{title}</div>
            </div>
            <div className={styles.detalsItem}>
              <h4>origem:</h4>
              <a href={urlLink} target='_blank'><div className={styles.description}>{loja}</div></a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}