import "./App.css";
function App() {
    return <div>
        <img src={"./pictures/SpaceBackground.jpg"}></img>
        <div className="titleContainer">
            <label>Seismic Detection Across the Solar System</label>
        </div>
        <div className="container">
            <div className="tabs">
                <input type="radio" id="radioLunar" name="tabs" checked />
                <label className="tab" htmlFor="radioLunar">Lunar</label>
                <input type="radio" id="radioMars" name="tabs" />
                <label className="tab" htmlFor="radioMars">Mars</label>
                <span className="glider"/>
            </div>
        </div>
    </div>
}

export default App
