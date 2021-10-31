import React, { Component, useState, useEffect } from 'react'

export default function GuessControls() {
    let guess1 = 0, guess2 = 0,guess3 = 0
    
    
    let myVar
    useEffect((e) => {
        console.log(e)
        // if (guess1 != null && guess2 != null && guess3 != null) {
        //     switch()
        // }
    },[guess1,guess2,guess3])

    function guess() {
        console.log("guess!")
    }
    
    return (
        <div className="box">
            <div className="field">
                <label className="label">1st number</label>
                <div className="control">
                    <input type="number" className="input is-primary" value={guess1}></input>
                </div>
            </div>
            <div className="field">
                <label className="label">2nd number</label>
                <div className="control">
                    <input type="number" className="input is-primary" value={guess2}></input>
                </div>
            </div>
            <div className="field">
                <label className="label">3rd number</label>
                <div className="control">
                    <input type="number" className="input is-primary" value={guess3}></input>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button type="button" onClick={guess} className="button is-primary">Guess!</button>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button type="button" className="button is-secondary">Reset</button>
                </div>
            </div>
        </div>
    )
}
