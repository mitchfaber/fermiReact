import React, { Component, useEffect, useState } from 'react'

const LOCAL_STORAGE_KEY = 'fermiGame.Hint'
export default function HintsBox() {
    const [hint,setHint] = useState()
    
    useEffect(() => {
        function checkHint() {
            const storedHint = (localStorage.getItem(LOCAL_STORAGE_KEY))
            if (storedHint) {
                console.log("local storage " + hint)
                setHint(storedHint)
            }
        }

        window.addEventListener('storage', checkHint)

        return () => {
            window.removeEventListener('storage', checkHint)
        }
    }, [])

    return (
        <div className="box" >
            <div className="textarea is-primary has-fixed-size is-vcentered">
                <p>Previous Guesses<br />============</p><br />
                {/* TODO: Use 3 divs or p tags for each hint, fermi/pico/nano. Also use a single div for guesses used.*/}
            </div>
        </div>
    )
}
