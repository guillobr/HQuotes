import styles from '../Styles/paginado.module.css'

export default function Paginado({ quotesPerPage, quote1, paginado, page }) {
  const pageNum = []

  for (let i = 1; i <= Math.ceil(quote1 / quotesPerPage); i++) {
    pageNum.push(i)
  }

  function handlePrevius(){
      if (page>1){
        paginado(page-1)
      }
      else paginado(pageNum.length)
  }
  function handleNext(){
    if (page<pageNum.length){
      paginado(page+1)
    }
    else paginado(1)
}

  return (
    <div className={styles.nav}>
      <button onClick={()=>handlePrevius()} className={styles.btnNav}>{'<'}</button>
      {/* {pageNum &&
        pageNum.map((num) => (
          <div key={num}>
            <button
              className={num === page ? styles.btnSel : styles.btnNav}
              onClick={() => paginado(num)}
            >
              {num}
            </button>
          </div>
        ))} */}
        <button onClick={()=>handleNext()} className={styles.btnNav}>{'>'}</button>
    </div>
  )
}