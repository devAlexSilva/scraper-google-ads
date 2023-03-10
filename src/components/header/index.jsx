import styles from './main.module.css'

export const Header = () => {
  return (
    <>
      <header className={styles.container}>
        <div className={styles.header}>
          <div className={styles.logos}>
            <img className={styles.logoTipo} src="./images/logo_maranguape.png" alt="logo comercial maranguape" />
            <img className={styles.logoTipo} src="./images/logo_atacado_lojista_pq (1).png"
              alt="logo atacado do lojista" />
          </div>
          <div className={styles.nav}>
            <ul className={styles.menu}>
              <li><a className={styles.menuNav} href='/'>preços</a></li>
              <li><a className={styles.menuNav} href='/description'>descrição</a></li>
              <li><a className={styles.menuNav} href="#">tags</a></li>
            </ul>
          </div>
        </div>
      </header>
    </>
  )
}