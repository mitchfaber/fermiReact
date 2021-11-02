import React, { Component, useState, useEffect } from 'react'

export default function GuessControls() {
    const [guess1,setGuess1] = useState(0)
    const [guess2, setGuess2] = useState(0)
    const [guess3, setGuess3] = useState(0)
    let guessCount = 0
    
    useEffect(() => {
        //Generate fermi numbers on first run.
        genNums()
    }, [])
    
    function genNums() {
        
    }
    
    function handleNumChange(e) {
        console.log(e.target.id)
        switch (e.target.id) {
            case "num1":
                setGuess1(e.target.value)
                break;
            case "num2":
                setGuess2(e.target.value)
                break;
            case "num3":
                setGuess3(e.target.value)
                break;
            default:
                // No num change? Not sure what to do here really... 
                console.log("You must be a wizard or something...")
        }
    }

    function guess() {
        guessCount++
        console.log("num 1: " + guess1)
        console.log("num 2: " + guess2)
        console.log("num 3: " + guess3)
        console.log("Guess Count: " + guessCount)
    }

    function reset() {
        guessCount = 0
        setGuess1(0)
        setGuess2(0)
        setGuess3(0)
        genNums()
    }
    
    return (
        <div className="box">
            <div className="field">
                <label className="label">1st number</label>
                <div className="control">
                    <input type="number" className="input is-primary" onChange={handleNumChange} id="num1" value={guess1}></input>
                </div>
            </div>
            <div className="field">
                <label className="label">2nd number</label>
                <div className="control">
                    <input type="number" className="input is-primary" onChange={handleNumChange} id="num2" value={guess2}></input>
                </div>
            </div>
            <div className="field">
                <label className="label">3rd number</label>
                <div className="control">
                    <input type="number" className="input is-primary" onChange={handleNumChange} id="num3" value={guess3}></input>
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
