import React, { useState, useEffect } from 'react'

export default function HintsBox({ hint, guessCount }) {
    const [prevGuess, setPrevGuess] = useState([{hint : '',count : 0}])
    useEffect(() => {
        console.log("Hint changed I'm in hint box! " + hint)
        let newHints = [...prevGuess]
    }, [hint])

    return (
        <div className="box" >
            <div className="textarea is-primary has-fixed-size is-vcentered">
                <p>Previous Guesses<br />============</p><br />
                {hint[1] > 0 ? <div>Guess #{hint[1]} : {hint[0]}</div> : <div></div>}
            </div>
        </div>
    )
}
