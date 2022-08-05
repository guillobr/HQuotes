import React from "react";
import styles from "../Styles/card.module.css"

export default function Card({quote , author}){


    return(
        <div className={styles.card}>
            <div>
            <p className={styles.quote}>"{quote}"</p>
           
            <p className={styles.author}>-{author}</p>
            </div>
        </div>
    )
}

//display: inline(en la misma linea)
//         block (debajo)
//         flex -->:
//EJE X --> justify content-- lo mueve de izquierda a derecha de acuerdo al flex

//EJE Y --> aling items: lo mueve de arriba hacia abajo de acuerdo al flex
//flex-direction: column--> pasa a ser columna

//aling-self: un elemento en particular