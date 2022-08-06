import { style } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from "../Styles/landing.module.css"

export default function LandingPage(){


    return(
        <div className={styles.landing}>
            <h1>HQUOTES!!!!</h1>
            <Link to="/home">
                <button>HOME</button>
            </Link>

        </div>
    )
}