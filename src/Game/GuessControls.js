import React, { Component, useState, useEffect } from 'react'

export default function GuessControls() {
    const [guess1, setGuess1] = useState(1)
    const [guess2, setGuess2] = useState(1)
    const [guess3, setGuess3] = useState(1)
    const [guessCount, setGuessCount] = useState(0)
    const [valid, setValid] = useState(true)
    
    useEffect(() => {
        //Generate fermi numbers on first run.
        genNums()
    }, [])
    
    function genNums() {
        setGuessCount(0)
    }
    
    function handleNumChange(e) {
        let newValue = e.target.value
        switch (e.target.id) {
            case "num1":
                setGuess1(newValue)
                break;
            case "num2":
                setGuess2(newValue)
                break;
            case "num3":
                setGuess3(newValue)
                break;
            default:
                // No num change? Not sure what to do here really... 
                console.log("You must be a wizard or something...")
        }
    }

    function validate() {
        if ((guess1 > 10 || guess2 > 10 || guess3 > 10) || (guess1 < 1 || guess2 < 1 || guess3 < 1))  {
            return false
        } else {
            return true
        }
    }

    function guess() {
        let valid = validate()
        if (valid) {
            setGuessCount(guessCount + 1)
        }
        console.log(guessCount)
    }

    function reset() {
        console.log("RESET")
        setGuessCount(0)
        setGuess1(1)
        setGuess2(1)
        setGuess3(1)
        genNums()
    }
    
    return (
        <div className="box">
            <div className="field">
                <label className="label">1st number</label>
                <div className="control">
                    <input type="number" className={valid ? "input is-primary" : "input is-error"} onChange={handleNumChange} id="num1" value={guess1} min="1" max="10"></input>
                </div>
            </div>
            <div className="field">
                <label className="label">2nd number</label>
                <div className="control">
                    <input type="number" className="input is-primary" onChange={handleNumChange} id="num2" value={guess2} min="1" max="10"></input>
                </div>
            </div>
            <div className="field">
                <label className="label">3rd number</label>
                <div className="control">
                    <input type="number" className="input is-primary" onChange={handleNumChange} id="num3" value={guess3} min="1" max="10"></input>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button type="button" onClick={guess} className="button is-primary">Guess!</button>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button type="button" onClick={reset} className="button is-secondary">Reset</button>
                </div>
            </div>
        </div>
    )
}
