import React, { useState, useEffect } from 'react'

export default function GuessControls() {
    const [guess1, setGuess1] = useState([1, true]) // Using first value as guess num, second as validation
    const [guess2, setGuess2] = useState([1, true])
    const [guess3, setGuess3] = useState([1, true])
    const [guessCount, setGuessCount] = useState(0)
    const [numsToGuess, setNumsToGuess] = useState([0, 0, 0])
    const [hint, setHint] = useState("")
    const [guessedNums, setGuessedNums] = useState([0,0,0])

    useEffect(() => {
        //Generate fermi numbers on first run.
        genNums()
    }, [])

    useEffect(() => {
        console.log(guessedNums)
        setHint(checkAnswers())
    }, [guessedNums])

    function genNums() {
        setGuessCount(0)

        let nums = [0, 0, 0]
        nums[0] = randomNum()
        do {
            nums[1] = randomNum()
        } while (nums[1] === nums[0])
        do {
            nums[2] = randomNum()
        } while (nums[1] === nums[2])
        setNumsToGuess([...nums])
    }

    function randomNum() {
        return Math.floor(Math.random() * 10) + 1;
    }

    async function handleNumChange(e) {
        let newValue = e.target.value
        switch (e.target.id) {
            case "num1":
                setGuess1([newValue,guess1[1]])
                break;
            case "num2":
                setGuess2([newValue,guess2[1]])
                break;
            case "num3":
                setGuess3([newValue,guess3[1]])
                break;
            default:
                // No num change? Not sure what to do here really... 
                console.log("You must be a wizard or something...")
        }
    }

    function validate(valNumber) {
        if ((valNumber > 10) || (valNumber < 1)) {
            return false
        } else {
            return true
        }
    }

    async function guess() {
        guessSetter().then(() => {
            // error validation
            if (guess1[1] && guess2[1] && guess3[1]) {
                setGuessCount(guessCount + 1)
                setGuessedNums([guess1[0], guess2[0], guess3[0]])
            }
        })
    }

    async function guessSetter() {
        setGuess1([guess1[0], validate(guess1[0])])
        setGuess2([guess2[0], validate(guess2[0])])
        setGuess3([guess3[0], validate(guess3[0])])
        console.log("Nums to guess: " + numsToGuess)
    }

    function checkAnswers() {
        let hint = ''
        numsToGuess.forEach((numToGuess, x) => {
            let locNumToGuess = Number(numToGuess) //so I can use ===
            let hintDone = false
            guessedNums.forEach((guessNum, i) => {    
                let locNumGuessed = Number(guessNum) // so I can use ===
                if (!hintDone) {
                    if (locNumGuessed === locNumToGuess && i === x) {
                        console.log("fermi: " + locNumGuessed, locNumToGuess)
                        hint += ' fermi '
                        hintDone = true
                    } else if (locNumGuessed === locNumToGuess && i !== x) {
                        console.log("pico: " + locNumGuessed, locNumToGuess)
                        hint += ' pico '
                        hintDone = true
                    } else {
                        console.log("Nano: " + locNumGuessed, locNumToGuess)
                        hint += ' nano '
                        hintDone = true
                    }
                }
            })
        })
        console.log(hint)
        return hint
    }

    function reset() {
        setGuessCount(0)
        setGuess1([1, true])
        setGuess2([1, true])
        setGuess3([1, true])
        genNums()
    }

    return (
        <div className="box">
            <div className="field">
                <label className="label">1st number</label>
                <div className="control">
                    <input type="number" className={guess1[1] ? "input is-primary" : "input is-danger"} onChange={handleNumChange} id="num1" value={guess1[0]} min="1" max="10"></input>
                    {guess1[1] ? <p></p> : <p className="help is-danger">Verify number. Should be 1-10</p>}
                </div>
            </div>
            <div className="field">
                <label className="label">2nd number</label>
                <div className="control">
                    <input type="number" className={guess2[1] ? "input is-primary" : "input is-danger"} onChange={handleNumChange} id="num2" value={guess2[0]} min="1" max="10"></input>
                </div>
                {guess2[1] ? <p></p> : <p className="help is-danger">Verify number. Should be 1-10</p>}
            </div>
            <div className="field">
                <label className="label">3rd number</label>
                <div className="control">
                    <input type="number" className={guess3[1] ? "input is-primary" : "input is-danger"} onChange={handleNumChange} id="num3" value={guess3[0]} min="1" max="10"></input>
                    {guess3[1] ? <p></p> : <p className="help is-danger">Verify number. Should be 1-10</p>}
                </div>
            </div>
            <div className="field is-grouped">
                <div className="control">
                    <button type="button" onClick={guess} className="button is-primary">Guess!</button>
                </div>
                <div className="control">
                    <button type="button" onClick={reset} className="button is-secondary">Reset</button>
                </div>
            </div>
        </div>
    )
}
