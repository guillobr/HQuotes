import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuotes } from '../actions'
import Card from './Card'
import NavBar from './NavBar'
import Paginado from './Paginado'
import styles from "../Styles/home.module.css"




export default function Home(){
    const dispatch = useDispatch()
    const allQuotes = useSelector((state) => state.quotes)

    const [currentPage, setCurrentPage] = useState(1)
    const [quotesPerPage, setbookPerPage] = useState(1)
    const lastQuote = currentPage * quotesPerPage
    const firstQuote = lastQuote - quotesPerPage
    const currentQuotes = allQuotes.slice(firstQuote, lastQuote)
    
    const paginado = (pageNumber) => {
      setCurrentPage(pageNumber)
    }

return(
    <div className={styles.color}>
        
      
       
        <div>
            {currentQuotes.map(quote=>{
                return(
                    <div>
                        <Card
                            quote={quote.quote}
                            author={quote.author.name}
                          />
                    </div>
                )
                
            })}
        </div>

        <Paginado
                quotesPerPage={quotesPerPage}
                quote1={allQuotes.length}
                paginado={paginado}
                page={currentPage}
              />
        



    </div>
)
    
}