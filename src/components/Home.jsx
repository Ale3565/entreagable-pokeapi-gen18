import React from "react"
import { useDispatch } from "react-redux"
import { setNameTrainer } from "../store/slices/name.slice"
import Image from "../assets/pokdexlogo.png"
import { useNavigate } from "react-router-dom"
import "./styles/Home.css"
import Header from "../assets/headerblackred.png"
import Video from "../assets/PokemonIntro.mp4"

const Home = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleChange = e => {

        e.preventDefault()
        const inputValue = e.target.name.value.trim()

        if (inputValue.length !== 0) {
            dispatch(setNameTrainer(inputValue))
            navigate("/pokedex")
        }
        e.target.name.value = ""
    }

    return (
        <div className="home-container">
            <div className="header__home">
                <div className="header__container-img">
                    <img className="header__img" src={Image} alt="Pokemon trainer image" />
                </div>
                <h1 className="header__home-tittle">Hello Trainer!</h1>
                <h2 className="header__basetittle">Give me your name to start!</h2>

                <form className="header__form" onSubmit={handleChange}>
                    <input className="header__input" type="text" id="name" placeholder="Insert your Name" />
                    <button className="header__btn">Start</button>

                </form>
            </div>
            <img className="header__img-footer" src={Header} alt="" />
        </div>
    )
}

export default Home