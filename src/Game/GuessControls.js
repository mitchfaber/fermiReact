/* eslint-disable no-loop-func */
import React, { useState, useEffect } from 'react';
export default function GuessControls({ hint, reset,count,changeCount,changeHint,changeReset,changeNums }) {
    const [guess1, setGuess1] = useState([0, true]); // Using first value as guess num, second as validation
    const [guess2, setGuess2] = useState([0, true]);
    const [guess3, setGuess3] = useState([0, true]);
    const [numsToGuess, setNumsToGuess] = useState([0, 0, 0]);
    const [guessedNums, setGuessedNums] = useState([0, 0, 0]);
    const [gameOver, setGameOver] = useState(false);
    
    useEffect(() => {
        //Generate fermi numbers on first run.
        genNums();
        setGameOver(false);
    }, []);

    useEffect(() => {
        checkAnswers();
    }, [guessedNums]); //Whenever guessedNums changes (When "Guess" button is clicked) setHint and Check answers

    function genNums() {
        changeCount(0);
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
                setGuess1([newValue, await validate(newValue)]);
                break;
            case "num2":
                setGuess2([newValue, await validate(newValue)]);
                break;
            case "num3":
                setGuess3([newValue, await validate(newValue)]);
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
            // error validation
            if (res) {
                changeCount(count + 1);
                setGuessedNums([guess1[0], guess2[0], guess3[0]]);
            }
        });
    }

    async function guessSetter() {
        setGuess1([guess1[0], await validate(guess1[0])]);
        setGuess2([guess2[0], await validate(guess2[0])]);
        setGuess3([guess3[0], await validate(guess3[0])]);
        if (guess1[1] && guess2[1] && guess3[1]) {
            return true;
        } else {
            return false;
        }
    }

    async function checkAnswers() {
        changeNums(guessedNums[0] + "," + guessedNums[1] + "," + guessedNums[2]);
        for (let i = 0; i < 3; i++) {
            hint.forEach(() => {
                hint.pop();
            })
        }
        guessedNums.forEach((numGuess, i) => {
            let hintFlag = false;
            while (!hintFlag) {
                if (numsToGuess.includes(Number(numGuess))) {
                    numsToGuess.forEach((numToGuess, x) => {
                        if (numGuess == numToGuess && i == x) {
                            hint.push(' Fermi');
                            hintFlag = true;
                        } else if (numGuess == numToGuess) {
                            hint.push(' Pico');
                            hintFlag = true;
                        }
                    });
                } else {
                    hint.push(' Nano');
                    hintFlag = true;
                }
            }
        });
        let checkFlag = await checkHint();
        if (count == 10) {
            if (checkFlag) {
                hint.push(' ||  WINNER!');
                setGameOver(true);
            } else {
                hint.push(' || LOSE - Better luck next time! The numbers to guess were: (' + numsToGuess + ")");
                setGameOver(true);
            }
        } else if (count > 0){
            if (checkFlag) {
                hint.push(' ||  WINNER!');
                setGameOver(true);
            }
        }
        changeHint([hint]);
    }

    async function checkHint() {
        let fermiCount = 0;
        hint.forEach((myHint) => {
            if (myHint.includes('Fermi')) {
                fermiCount++;
            }
        });
        if (fermiCount === 3) {
            return true;
        } else {
            shuffleArray(hint);
            return false;
        }
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
        changeCount(0);
        changeHint(['', 0]);
        setGuess1([0, true]);
        setGuess2([0, true]);
        setGuess3([0, true]);
        genNums();
        setGameOver(false);
        changeReset();
    }
//   "homepage":"/Users/mitchfaber/Documents/WebDev/fermiReact/build",
    return (
        <div className="box">
            {/* testing:  {numsToGuess} */}
            <div className="field">
                <label className="label">1st number</label>
                <div className="control">
                    <input type="number" className={guess1[1] ? "input is-primary" : "input is-danger"} onChange={handleNumChange} id="num1" value={guess1[0]} min="1" max="10"></input>
                    {guess1[1] ? <p></p> : <p className="help is-danger">Verify number. Should be 0-9</p>}
                </div>
            </div>
            <div className="field">
                <label className="label">2nd number</label>
                <div className="control">
                    <input type="number" className={guess2[1] ? "input is-primary" : "input is-danger"} onChange={handleNumChange} id="num2" value={guess2[0]} min="1" max="10"></input>
                </div>
                {guess2[1] ? <p></p> : <p className="help is-danger">Verify number. Should be 0-9</p>}
            </div>
            <div className="field">
                <label className="label">3rd number</label>
                <div className="control">
                    <input type="number" className={guess3[1] ? "input is-primary" : "input is-danger"} onChange={handleNumChange} id="num3" value={guess3[0]} min="1" max="10"></input>
                    {guess3[1] ? <p></p> : <p className="help is-danger">Verify number. Should be 0-9</p>}
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
