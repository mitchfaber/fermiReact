import React, { Component } from 'react'

export default function GuessControls() {    
    return (
        <div className="box">
            <div className="field">
                <label className="label">1st number</label>
                <div className="control">
                    <input type="number" className="input is-primary"></input>
                </div>
            </div>
            <div className="field">
                <label className="label">2nd number</label>
                <div className="control">
                    <input type="number" className="input is-primary"></input>
                </div>
            </div>
            <div className="field">
                <label className="label">3rd number</label>
                <div className="control">
                    <input type="number" className="input is-primary"></input>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button type="button" className="button is-primary">Guess!</button>
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
