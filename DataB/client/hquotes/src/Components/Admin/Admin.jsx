import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from '../../Styles/admin.module.css'
import { getAdminQuotes } from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
//import { animateScroll as scroll, Element } from 'react-scroll'

export function Admin() {
  const dispatch = useDispatch()

  //const usuarios = useSelector(state=>state.users)
  const usuario = useSelector((state) => state.userLogged)
  //console.log('U:',usuarios)

  // useEffect(() => {
  //   dispatch(get(getAdminQuotes))
  // })

 
//   useEffect(() => {
//     scroll.scrollToTop()
//   }, [])

  return (
    <div className={styles.admin}>
      <div className={styles.containerAdmin}>
        {/* {usuario[0].isAdminData === true ? (
          <Link to='/add'>
            <button className={styles.btn}>Agregar Data</button>
          </Link>
        ) : (
          ''
        )} */}
        <Link to='/add'>
            <button className={styles.btn}>Agregar</button>
        </Link>

        {/* {usuario[0].isAdminData === true ? (
          <Link to='/put'>
            <button className={styles.btn}>Modificar Data</button>
          </Link>
        ) : (
          ''
        )} */}
        <Link to='/put'>
            <button className={styles.btn}>Modificar</button>
        </Link>

        {/* {usuario[0].isAdminData === true ? (
          <Link to='/delete'>
            <button className={styles.btn}>Borrar/Ocultar Data</button>
          </Link>
        ) : (
          ''
        )} */}
        <Link to='/delete'>
            <button className={styles.btn}>Borrar/Ocultar</button>
        </Link>

       

        <Link to='/adminusers'>
          <button className={styles.btn}>Usuarios</button>
        </Link>

        {/* {usuario[0].isAdminUsers === true ? (
          <Link to='/adminusers2'>
            <button className={styles.btn}>Usuarios</button>
          </Link>
        ) : (
          ''
        )} */}

       
      </div>
    </div>
  )
}
