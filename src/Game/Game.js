import React, {useState, useEffect} from 'react'
import HintsBox from './HintsBox';
import GuessControls from './GuessControls';
import SlideToggle from "react-slide-toggle";

export default function Game() {
    return (
        <div className="container">
            <div className="columns">
                <div className="column is-one-quarter">
                    <div className="card">
                        <SlideToggle collapsed>
                            {({ toggle, setCollapsibleElement }) => (
                                <>
                                    <div className="card-header">
                                        <p className="card-header-title">Rules</p>
                                        <button onClick={toggle} className="card-header-icon" aria-label="more options">
                                            <span className="icon">
                                                <i className = "fas fa-chevron-down" aria-hidden="true"></i>
                                            </span>
                                        </button>
                                    </div>
                                    <div ref={setCollapsibleElement}>
                                        <div className="card-content" >
                                            <div className="content">
                                                This game is called Fermi. It's a number guessing game where 
                                                You need to guess 3 numbers in the correct order. Number 1, 2, 3 reads left to right. <br /> <br />
                                                Fermi means it's the correct number in the correct column. <br /> <br />
                                                Pico means right number, wrong column. <br /> <br />
                                                Nano means wrong number. <br /> <br />
                                                However, the trick is that the hints are shuffled. For example, just because Fermi shows up in the second column, that does
                                                not mean it's the second number that was correct.
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </SlideToggle>
                    </div>
                </div>
                <div className="column">
                    <HintsBox></HintsBox>
                </div>
                <div className="column is-one-fifth">
                    <GuessControls></GuessControls>
                </div>
            </div>
        </div>
    )
}
