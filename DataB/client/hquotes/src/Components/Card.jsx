import React from "react";

export default function Card({quote , author}){


    return(
        <div>
            <p>"{quote}"</p>
            <p>{author}</p>
        </div>
    )
}