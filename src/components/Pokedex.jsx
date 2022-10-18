import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PokemonCard from "../components/PokemonCard"
import SearchInput from './SearchInput'
import SelectType from './SelectType'
import "./styles/Pokedex.css"
import LogoHeader from "../assets/logo-header.png"
import Pagination from './Pagination'


const Pokedex = () => {

  const nameOficialTrainer = useSelector(state => state.nameSlice)

  const [pokemonName, setPokemonName] = useState()
  const [pokeSearch, setPokeSearch] = useState()
  const [typeInfo, setTypeInfo] = useState("All")

  useEffect(() => {
    let URL
    if (pokeSearch || typeInfo !== "All") {
      // Aqui se hace la logica cuando se filtra por el input
      if (pokeSearch) {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokeSearch}`
        const obj = {
          results: [{ url }]
        }
        setPokemonName(obj)
      }
      else {
        // Aqui se hace la logica cuando el usuario filtra por tipo
        const URL = `https://pokeapi.co/api/v2/type/${typeInfo}/`
        axios.get(URL)
          .then(res => {
            const arr = res.data.pokemon.map(e => e.pokemon)
            setPokemonName({ results: arr })
          })
          .catch(err => console.log(err.message))
      }
    } else {
      //Aqui se hace la logica cuando el usuario quiere todos los pokemons
      const URL = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
      axios.get(URL)
        .then(res => setPokemonName(res.data))
        .catch(err => console.log(err.message))
    }
  }, [pokeSearch, typeInfo])

  //pagination logic
  const [page, setPage] = useState(1)
  const [pokePerPage, setPokePerPage] = useState(12)
  const initialPoke = (page - 1) * pokePerPage;
  const finalPoke = page * pokePerPage

  return (
    <div>
      <img className='header__img-pokedex' src={LogoHeader} alt="Logo Pokemon" />
      <h2><span>{` Welcome ${nameOficialTrainer}, `}</span>Catch them All!</h2>
      <SearchInput
        setPokeSearch={setPokeSearch}
        setTypeInfo={setTypeInfo}
      />
      <SelectType
        setTypeInfo={setTypeInfo}
        typeInfo={typeInfo}
        setPokeSearch={setPokeSearch} />

      <div className='card-container'>
        {
          pokemonName?.results.slice(initialPoke, finalPoke).map(pokemon => (
            <PokemonCard
              pokemon={pokemon.url}
              key={pokemon.url}
            />
          ))
        }
      </div>
      <Pagination
        page={page}
        pagesLength={pokemonName && Math.ceil(pokemonName.length / pokePerPage)}
        setPage={setPage}
      />
    </div>
  )
}

export default Pokedex