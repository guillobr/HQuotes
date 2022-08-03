import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuotes } from '../actions'
import Card from './Card'
import NavBar from './NavBar'




export default function Home(){
    const dispatch = useDispatch()
    const allQuotes = useSelector((state) => state.quotes)

return(
    <div>
        
        <div>HOME</div>
        <div>
            {allQuotes.map(quote=>{
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



    </div>
)
    
}