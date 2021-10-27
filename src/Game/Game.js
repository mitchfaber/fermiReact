import React, { Component, useState, useEffect } from 'react'
import HintsBox from './HintsBox';
import GuessControls from './GuessControls';
import SlideToggle from "react-slide-toggle";
import BezierEasing from "bezier-easing";

export default function Game() {
    const [showCard,setShowCard] = useState(false)
    const bezierEaseInOutQuart = BezierEasing(0.77, 0, 0.175, 1);

    let state = { toggleEvent: 0 };
    
    function onToggle(){
        this.setState({ toggleEvent: Date.now() });
    }
    console.log(state)
    return (
        <div className="container">
            <div className="columns">
                <div className="column">
                    <GuessControls></GuessControls>
                </div>
                <div className="column">
                    <HintsBox></HintsBox>
                </div>
                <div className="column">
                    <div className="card">
                        <div className="card-header">
                            <p className="card-header-title">Rules</p>
                            <button onClick={this.onToggle} className="card-header-icon" aria-label="more options">
                                <span className="icon">
                                    <i className = "fas fa-chevron-down" aria-hidden="true"></i>
                                </span>
                            </button>
                        </div>
                            
                        <SlideToggle toggleEvent={this.onToggle}>
                            {({ setCollapsibleElement }) => (
                                <div>
                                    <div className="card-content" ref={setCollapsibleElement}>
                                        <div className="content">
                                            testing rule card
                                        </div>
                                    </div>
                                </div>
                            )}
                        </SlideToggle>


                    </div>
                </div>
            </div>
        </div>
    )
}
