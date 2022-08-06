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
import {
    Stack,
    Button,
    Typography,
    Select,
    IconButton,
    MenuItem,
    FormControl,
    AppBar,
    Toolbar,
  } from '@mui/material'




export default function NavBar(){


    const handleClick = (e) => {
        e.preventDefault()
        navigate('/home/')
      }

      const { user, isAuthenticated } = useAuth0()


      return(
        <div className={styles.container}>
            <h1 className={styles.h1}>HQuotes</h1>

            {/* {isAuthenticated ? <LogOutButton /> : <LogInButton />} */}
            <LogInButton/>



        </div>

      )
}

//     return(
//     <AppBar position='sticky'>
//       <Toolbar disableGutters>
//         <Stack
//           width={'100%'}
//           direction={'row'}
//           justifyContent={'space-between'}
//           alignItems='center'
//           px={2}
//         >
//           <Stack
//             spacing={2}
//             color='white'
//             direction={'row'}
//             alignItems='center'
//           >
//             {/* <IconButton as={Link} to='/'>
//               <img width={64} src={Images.logoBook} alt='book' />
//             </IconButton> */}
//             <Typography variant='h5'>HQUOTES</Typography>
//           </Stack>

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

//           {/* <Link to='/home' className={styles.Link}>
//             <Button
//               color='secondary'
//               className={styles.navItem}
//               onClick={handleClick}
//               sx={{
//                 fontSize: '18px',
//               }}
//             >
//               Todas Las Frases
//             </Button>
//           </Link> */}

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

//           <FormControl>
//             {/* <Select
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
//             > */}
//               <MenuItem value='default' disabled>
//                 Generos:
//               </MenuItem>
//               {/* {genres?.map((e) => (
//                 <MenuItem as='' key={e} value={e}>
//                   {e}
//                 </MenuItem>
//               ))} */}
//             {/* </Select> */}
//           </FormControl>

//           <SearchBar />

//           {/* {isAuthenticated ? <LogOutButton /> : <LogInButton />} */}
//         </Stack>
//       </Toolbar>
//     </AppBar>
         
//     )
// }