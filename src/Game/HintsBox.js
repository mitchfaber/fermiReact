import React, { Component, useState } from 'react'

export default function HintsBox() {
    return (
        <div className="box" >
            <div className="textarea is-primary has-fixed-size is-vcentered">
                <p>Previous Guesses<br />============</p><br />
                {/* TODO: Use 3 divs or p tags for each hint, fermi/pico/nano. Also use a single div for guesses used.*/}
            </div>
        </div>
    )
}
