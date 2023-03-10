import styles from './main.module.css'

export const Tag = ({name, getList, nameToSearch}) => {
  return (
    <>
      <li>
        <button 
        className={styles.menuItem} 
        onClick={() => getList(nameToSearch)}>
          {name}
          </button>
      </li>
    </>
  )
}