import React, { Component } from 'react'
import HintsBox from './HintsBox';
import GuessControls from './GuessControls';

export default class Game extends Component {
    render() {
        return (
            <div className="section">
                Game component
                <HintsBox></HintsBox>
                <GuessControls></GuessControls>
            </div>
        )
    }
}
