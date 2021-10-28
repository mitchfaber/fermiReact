import Game from "./Game/Game";
function App() {
    return (
        <>
            <div className="hero is-primary">
                <div className="hero-body">
                    <p className="title">Fermi</p>
                    <p className="subtitle">By Mitch Faber</p>
                </div>
            </div>
            <div className="section">
                <Game></Game>
            </div>
        </>
    );
}

export default App;