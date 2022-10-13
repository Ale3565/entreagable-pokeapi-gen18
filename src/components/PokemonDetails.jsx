import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "../components/styles/PokemonDetails.css"
import LogoHeader from "../assets/logo-header.png"
import ProgressBar from "./ProgressBar"

const PokemonDetails = () => {

  const [pokeInfo, setPokeInfo] = useState()
  const { name } = useParams() // este useparams se usa para jalar la informacion de la linea 18 de Appp.jsx . ahi el path termina en "name" y es por eso que aqui al desestructurar se usa el "name" 

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${name}/`
    axios.get(URL)
      .then(res => setPokeInfo(res.data))
      .catch(err => console.log(err.message))
  }, [])

  const variantColor = pokeInfo?.types.map(type =>type.type.name)

  console.log(variantColor)

  return (

    <article className='card-details'>
      <div className='container-card__details-banner' >
        <img className='card__details-banner' src={LogoHeader} alt="pokemon_header_top" />
      </div>
      <div className='card-pokemondetails'>
        <header className={`card__header-details card__header-{}`}>
          <img className='card__avatar-details' src={pokeInfo?.sprites.other["official-artwork"].front_default} alt="" />
        </header>
        <div className='id'>
          <h2 className='name-id'>{`#${pokeInfo?.id}`}</h2>
        </div>
        <h1 className='card__details-name'>{name}</h1>
        <div className='card__details-weight'>
          <div className='card__details-weight-number'>
            <h3>Peso</h3>
            <h3>{pokeInfo?.weight}</h3>
          </div>
          <div className='card__details-weight-number'>
            <h3>Altura</h3>
            <h3>{pokeInfo?.height} </h3>
          </div>
        </div>
        <div className='card__type-container'>
          <div className='card__type_tipo'>
            <h2>Tipo</h2>
            <div className='card__type-container-map'>
              {
                pokeInfo?.types.map(type => (
                  <h3 className={`card__type__map ${type.type.name}`} key={type.type.url}>{type.type.name}</h3>
                ))
              }
            </div>
          </div>
          <div>
            <h2>Habilidades</h2>
            <div className='card__type-container-map'>
              {
                pokeInfo?.abilities.map(e => (
                  <h3 key={e.ability.url}>{e.ability.name}</h3>
                ))
              }
            </div>
          </div>
        </div>
        <div className='PokemonDetails__main-hero'>
          <h2>Stats</h2>
          <div>
            <div>
              <h3>{pokeInfo?.stats[0].stat.name}</h3>
              <h3></h3>
              <ProgressBar num={pokeInfo?.stats[0]["base_stat"]} />
            </div>
            <div>
              <h3>{pokeInfo?.stats[1].stat.name}</h3>
              <ProgressBar num={pokeInfo?.stats[1]["base_stat"]} />
            </div>
            <div>
              <h3>{pokeInfo?.stats[2].stat.name}</h3>
              <ProgressBar num={pokeInfo?.stats[2]["base_stat"]} />
            </div>
            <div>
              <h3>{pokeInfo?.stats[5].stat.name}</h3>
              <ProgressBar num={pokeInfo?.stats[5]["base_stat"]} />
            </div>
          </div>
        </div>

        <div className='pokemonDetails__footer-card'>
          <h2>Movements</h2>
          <div className='pokemonDetails__footer'>
            {
              pokeInfo?.moves.map(e => (
                <div className='pokemonDetails__footer-moves' key={e.move.url} >{e.move.name}</div>
              ))
            }
          </div>
        </div>
      </div>
    </article>
  )
}

export default PokemonDetails