import React, { Component, useState } from 'react'

const LOCAL_STORAGE_KEY = 'fermiGame.Hint'
export default function HintsBox() {
    const storedHint = (localStorage.getItem(LOCAL_STORAGE_KEY))
    useEffect(() => {
        console.log('hintbox hint: ' + storedHint)
        localStorage.setItem(LOCAL_STORAGE_KEY)
    }, [storedHint])

    return (
        <div className="box" >
            <div className="textarea is-primary has-fixed-size is-vcentered">
                <p>Previous Guesses<br />============</p><br />
                {/* TODO: Use 3 divs or p tags for each hint, fermi/pico/nano. Also use a single div for guesses used.*/}
            </div>
        </div>
    )
}
