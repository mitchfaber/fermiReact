/* eslint-disable no-loop-func */
import React, { useState, useEffect } from 'react';
export default function GuessControls({ hint, changeHint, reset, changeReset }) {
    const [guess1, setGuess1] = useState([1, true]); // Using first value as guess num, second as validation
    const [guess2, setGuess2] = useState([1, true]);
    const [guess3, setGuess3] = useState([1, true]);
    const [guessCount, setGuessCount] = useState(0);
    const [numsToGuess, setNumsToGuess] = useState([0, 0, 0]);
    const [guessedNums, setGuessedNums] = useState([0, 0, 0]);
    const [gameOver, setGameOver] = useState(false);
    
    useEffect(() => {
        //Generate fermi numbers on first run.
        genNums();
    }, []);

    useEffect(() => {
        checkAnswers();
    }, [guessedNums]); //Whenever guessedNums changes (When "Guess" button is clicked) setHint and Check answers

    function genNums() {
        setGuessCount(0);
        let nums = [0, 0, 0];
        nums[0] = randomNum();
        do {
            nums[1] = randomNum();
        } while (nums[1] === nums[0]);
        do {
            nums[2] = randomNum();
        } while (nums[1] === nums[2]);
        setNumsToGuess([...nums]);
    }

    function randomNum() {
        return Math.floor(Math.random() * 10);
    }

    async function handleNumChange(e) {
        let newValue = e.target.value;
        switch (e.target.id) {
            case "num1":
                setGuess1([newValue, guess1[1]]);
                break;
            case "num2":
                setGuess2([newValue, guess2[1]]);
                break;
            case "num3":
                setGuess3([newValue, guess3[1]]);
                break;
            default:
                // No num change? Not sure what to do here really... 
                console.log("You must be a wizard or something...");
        }
    }

    async function validate(valNumber) {
        if ((valNumber > 9) || (valNumber < 0)) {
            return false;
        } else {
            return true;
        }
    }

    function guess() {
        guessSetter().then((res) => {
            console.log(res);
            // error validation
            if (res) {
                console.log("Guesses validated");
                setGuessCount(guessCount + 1);
                setGuessedNums([guess1[0], guess2[0], guess3[0]]);
            }
        });
    }

    async function guessSetter() {
        console.log("validating...");
        setGuess1([guess1[0], await validate(guess1[0])]);
        setGuess2([guess2[0], await validate(guess2[0])]);
        setGuess3([guess3[0], await validate(guess3[0])]);
        if (guess1[1] && guess2[1] && guess3[1]) {
            console.log("valid");
            return true;
        } else {
            console.log("invalid");
            return false;
        }
    }

    function checkAnswers() {
        hint[0] = '';
        guessedNums.forEach((numGuess, i) => {
            let hintFlag = false;
            while (!hintFlag) {
                if (numsToGuess.includes(Number(numGuess))) {
                    numsToGuess.forEach((numToGuess, x) => {
                        if (numGuess == numToGuess && i == x) {
                            hint[0] += ' Fermi';
                            hintFlag = true;
                        } else if (numGuess == numToGuess) {
                            hint[0] += ' Pico';
                            hintFlag = true;
                        }
                    });
                } else {
                    hint[0] += ' Nano';
                    hintFlag = true;
                }
            }
        });
        if (guessCount == 10) {
            if (!(hint[0].includes('Pico') || hint[0].includes('Nano'))) {
                switch (guessCount) {
                    case 1:
                        hint[0] += " ||  FIRST TRY!? YOU'RE A LORD, YOU OWN!";
                        break;
                    case 10:
                        hint[0] += ' ||  DANG! CUT IT CLOSE! ';
                        break;
                    default:
                        hint[0] += ' ||  WINNER! ';
                        break;
                }
                setGameOver(true);
            } else {
                hint[0] += ' LOSE - Better luck next time! ';
                setGameOver(true);
            }
        } else {
            if (!(hint[0].includes('Pico') || hint[0].includes('Nano'))) {
                switch (guessCount) {
                    case 1:
                        hint[0] += " || FIRST TRY!? YOU'RE A LORD, YOU OWN!";
                        break;
                    case 10:
                        hint[0] += ' ||  DANG! CUT IT CLOSE! ';
                        break;
                    default:
                        hint[0] += ' ||  WINNER! ';
                        break;
                }
                setGameOver(true);
            }
        }
        hint[0] = hint[0].split(" ").splice(0,1)
        shuffleArray(hint[0]).then(() => {
            console.log(hint[0]);
            changeHint([hint[0], guessCount]);
        })
    }

    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    async function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    function resetGame() {
        setGuessCount(0);
        changeHint(['', 0]);
        setGuess1([1, true]);
        setGuess2([1, true]);
        setGuess3([1, true]);
        genNums();
        setGameOver(false);
        changeReset();
    }

    return (
        <div className="box">
            <div> {numsToGuess} </div>
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
                    <button type="button" onClick={guess} className="button is-primary" disabled={gameOver ? true : false}>Guess!</button>
                </div>
                <div className="control">
                    <button type="button" onClick={resetGame} className="button is-secondary">Reset</button>
                </div>
            </div>
        </div>
    )
}
