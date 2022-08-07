import React from "react";
import styles from "../Styles/navbar.module.css"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SearchBar from "./SearchBar";
import LogInButton from "./LogIn";
import LogOutButton from "./LogOut";
import Profile from "./User/Profile";




export default function NavBar(){

  const navigate = useNavigate()

    const handleClick = (e) => {
        e.preventDefault()
        navigate('/home/')
      }

      const { user, isAuthenticated } = useAuth0()


      return(
        <div className={styles.container}>

          <h1 className={styles.h1}>HQuotes</h1>
         
          <Link className={styles.navItem} to="/home">
                <button className={styles.button}>Inicio</button>
          </Link>

          <div className={styles.log}>
             {isAuthenticated ? <LogOutButton /> : <LogInButton />} 
          </div>
           



        </div>

      )
}



//GROW UP


// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import {  getQuotes  } from '../actions'
// import { useAuth0 } from '@auth0/auth0-react'
// import { Link } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// //import SearchBar from './SearchBar'
// import LogInButton from './LogIn'
// import LogOutButton from './LogOut'
// import styles from "../Styles/navbar.module.css"
// import { Images } from '../assets'
// import {
//   Stack,
//   Button,
//   Typography,
//   Select,
//   IconButton,
//   MenuItem,
//   FormControl,
//   AppBar,
//   Toolbar,
//   ThemeProvider
// } from '@mui/material'
// import { createTheme } from '@mui/material/styles';

// const NavBar = () => {
//   const [state, setState] = useState('default')
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const { user, isAuthenticated } = useAuth0()
//   const usuario = useSelector((state) => state.userLogged)

//   const handleClick = (e) => {
//     e.preventDefault()
//     dispatch(getBooks())
//     //dispatch(changeGenreTitle(''))
//     navigate('/home/')
//     // setTimeout(() => {
//     //   scroller.scrollTo('gaston')
//     // }, 200)
//   }

//   // const handleSelectGenre = (e) => {
//   //   e.preventDefault()
//   //   dispatch(getBookGenre(e.target.value))
//   //   dispatch(changeGenreTitle(e.target.value))
//   //   navigate('/home/')
//   //   setTimeout(() => {
//   //     scroller.scrollTo('gaston')
//   //   }, 150)
//   //   setState('default')
//   // }

//   /* Styles Select */

//   const theme = createTheme({
//     status: {
//       danger: '#26a69a',
//     },
//     palette: {
//       primary: {
//         main: '#26a69a',
//         darker: '#053e85',
//       },
//       neutral: {
//         main: '#64748B',
//         contrastText: '#fff',
//       },
//     },
//   });

//   const genres = [
//     'Salud',
//     'Deportes',
//     'Biografia',
//     'Nutricion',
//     'Filosofia',
//     'Ensayo',
//     'Desarrollo Personal',
//     'Economia',
//     'Espiritualidad',
//     'Historia',
//     'Negocios',
//     'Psicologia',
//     'Neurociencia',
//   ]

//   return (
//     <div className={styles.container}>
//       <ThemeProvider theme={theme}>
//      <AppBar  
//       position='sticky'
//       color = 'primary'
//       >
//       <Toolbar disableGutters> 
//        <Stack
//           width={'100%'}
//           direction={'row'}
//           justifyContent={'space-between'}
//           alignItems='center'
//           px={2}
//         >
//           <Stack
//             spacing={2}
//             color='succes'
//             direction={'row'}
//             alignItems='center'
//           > 
//             {/* <IconButton as={Link} to='/'>
//               <img width={64} src={Images.logoBook} alt='book' />
//             </IconButton>*/}
            
//             <Typography variant='h5'>H-quotes</Typography>

//            </Stack> 
           
//           <Link to='/home' className={styles.Link}>
//             <Button 
//               color='info'
//               className={styles.navItem}
//               onClick={handleClick}
//               sx={{
//                 fontSize: '18px',
//               }}
//             >
//               Todas Las Frases
//             </Button>
//           </Link>

//           <Link to='/home' className={styles.Link}>
//             <Button
//               color='secondary'
//               className={styles.navItem}
//               onClick={handleClick}
//               sx={{
//                 fontSize: '18px',
//               }}
//             >
//               Inicio
//             </Button>
//           </Link>

//           <Link to='/author' className={styles.Link}>
//             <Button
//               color='secondary'
//               className={styles.navItem}
//               sx={{
//                 fontSize: '18px',
//               }}
//             >
//               Autores
//             </Button>
//           </Link>

//           {/* <FormControl>
//             <Select
//               onChange={handleSelectGenre}
//               defaultValue='default'
//               value={state}
//               MenuProps={{ disableScrollLock: true }}
//               sx={{
//                 backgroundColor: 'white',

//                 '& .MuiSvgIcon-root': {
//                   color: '#74c0fc',
//                 },
//               }}
//             >
//               <MenuItem value='default' disabled>
//                 Generos:
//               </MenuItem>
//               {genres?.map((e) => (
//                 <MenuItem as='' key={e} value={e}>
//                   {e}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl> */}


//           {isAuthenticated ? <LogOutButton /> : <LogInButton />}
//          </Stack> 
//        </Toolbar>
//     </AppBar> 
//     </ThemeProvider>
//     </div>
//   )
// }

// export default NavBar

