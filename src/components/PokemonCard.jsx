import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./styles/PokemonCard.css"

const PokemonCard = ({ pokemon }) => {

  const [detailsPokemon, setDetailsPokemon] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    const URL = pokemon
    axios.get(URL)
      .then(res => setDetailsPokemon(res.data))
      .catch(err => console.log(err.message))
  }, [])

  const handleClick = () => navigate(`/pokedex/${detailsPokemon.name}`)

  return (
    <article onClick={handleClick} className={`card card-${detailsPokemon?.types[0].type.name}`}>
      <header className={`card__header bg-${detailsPokemon?.types[0].type.name}`}>
        <img className='card__avatar' src={detailsPokemon?.sprites.other["official-artwork"]["front_default"]} alt={detailsPokemon?.name} />
      </header>
      <section className='card__body'>
        <h3 className='card__name'>{detailsPokemon?.name}</h3>
        <ul className='card__list-type'>
          {
            detailsPokemon?.types.map(typee => (
              <li className='card__item-type'
                key={typee.type.url}
              >
                {typee.type.name}
              </li>
            ))
          }
        </ul>
      </section>
      <footer className='footer__card'>
        <div>
          <ul>
            <li>{detailsPokemon?.stats[0].stat.name}</li>
            <li>{detailsPokemon?.stats[0]["base_stat"]}</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>{detailsPokemon?.stats[1].stat.name}</li>
            <li>{detailsPokemon?.stats[1]["base_stat"]}</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>{detailsPokemon?.stats[2].stat.name}</li>
            <li>{detailsPokemon?.stats[2]["base_stat"]}</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>{detailsPokemon?.stats[5].stat.name}</li>
            <li>{detailsPokemon?.stats[5]["base_stat"]}</li>
          </ul>
        </div>
      </footer>
    </article>
  )
}

export default PokemonCard