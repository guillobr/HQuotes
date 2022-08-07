import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { postQuote } from '../../../actions'
import { useDispatch, useSelector } from 'react-redux'
import style from '../../../Styles/addQuote.module.css'


export default function AddAuthor() {
  const dispatch = useDispatch()

  const allQuotes = useSelector((state) => state.quotes)

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

  const [post, setPost] = useState({
    quote: '',
    author: {name:''},
  })

  const [errors, setErrors] = useState({
    quote: '',
    author: '',
  })

  function validate(post) {
    let errors = {}
    let nameRegex = /^[a-zA-Z0-9 _]*$/g
    let titleRegex = /^[a-zA-Z _]*$/g
    if (!post.quote) {
      errors.quote = 'Ingresar Frase (!)'
    }
    if (!post.author.name) {
      errors.author= 'Ingresar Autor '
    }
    return errors
  }

  useEffect(() => {
    setErrors(validate(post))
  }, [post])

  function handleChange(e) {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    })
  }

//   function handleGenres(e) {
//     if (!post.genres.includes(e.target.value))
//       setPost({
//         ...post,
//         genres: [...post.genres, e.target.value],
//       })
//   }

//   function handleGenreDelete(genre) {
//     setPost({
//       ...post,
//       genres: post.genres.filter((e) => e !== genre),
//     })
//   }

function handleAuthorName(e) {
    setPost({
      ...post,
      author: { ...post.author, [e.target.name]: e.target.value },
    })
  }
  const [failedSubmit, setFailedSubmit] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (Object.values(errors).length > 0) {
      setFailedSubmit(true)
    //   return Alert('Error, revisar formulario!', 'error')
    return('FAllo')
    } else {
      dispatch(postQuote(post))
      
      alert('Quote añadido!', 'success')
      setPost({
        quote: '',
        author: { name: ''},
      })
    }
  }

  return (
    <div className={style.form}>
      <h1 className={style.titleForm}>Add Quote</h1>
      <form className={style.containerForm} onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Frase:</label>
          <textarea
            value={post.quote}
            name='quote'
            onChange={(e) => handleChange(e)}
          />
          {(errors.quote && failedSubmit) ||
          !errors.quote?.split(' ').includes('Ingresar') ? (
            <p className={style.error}>{errors.quote}</p>
          ) : null}
        </div>

        
        <div>
          <label>Autor:</label>
          <input
            type='text'
            value={post.author.name}
            name='name'
            onChange={(e) => handleAuthorName(e)}
          />
          {(errors.author && failedSubmit) ||
          !errors.author?.split(' ').includes('Ingresar') ? (
            <p className={style.error}>{errors.author}</p>
          ) : null}
        </div>

       




      



        {/* <select
          className={style.select}
          onChange={(e) => handleGenres(e)}
          defaultValue='default'
        >
          <option value='default' disabled>
            Genres
          </option>
          {genres &&
            genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
        </select> */}
        {/* {(errors.genres && failedSubmit) ||
        !errors.genres?.split(' ').includes('Ingresar') ? (
          <p className={style.error}>{errors.genres}</p>
        ) : null} */}
        {/* {post.genres.map((genre) => (
          <div className={style.selectItems} key={genre}>
            <p className={style.selectGenre}>{genre}</p>
            <button
              className={style.selectButtonDelete}
              onClick={() => handleGenreDelete(genre)}
            >
              X
            </button>
          </div>
        ))} */}

        <button className={style.btn} type='submit'>
          Agregar Frase
        </button>
      </form>

      {/* <Link to='/add'>
        <button className={style.btnAdmin}>↼ Atras</button>
      </Link> */}
    </div>
  )
}
