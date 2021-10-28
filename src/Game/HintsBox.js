import React, { Component, useState } from 'react'

export default function HintsBox() {
    const [guesses, setGuesses] = useState([1,2,3])
    const [error, setError] = useState('')
    return (
        <div className="box" >
            <textarea value="Previous Guesses&#013;&#010;============&#013;&#010;{guesses}" className="textarea is-primary has-fixed-size is-vcentered" readOnly rows="13" cols="20"> 
            </textarea>
        </div>
    )
}
