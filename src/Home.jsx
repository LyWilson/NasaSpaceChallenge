import { useState } from "react";
import MoonPage from "./Moon"
import MarsPage from "./Mars";
import Footer from "./Footer";
import "./App.css";
function Home() {
    const [tabs, setTabs] = useState("lunar");

    const handleChange = (e) => {
        setTabs(e.target.id === "radioLunar" ? "lunar" : "mars");
    };
    
    return(
        <div>
            <img className="BackgroundImg" src={"./pictures/SpaceBackground.jpg"}></img>
            <div className="titleContainer">
                <label>Seismic Detection Across the Solar System</label>
            </div>
            <div className="container">
                <div className="tabs" onChange={handleChange}>
                    <input type="radio" id="radioLunar" name="tabs" checked = {tabs === "lunar"} onChange={() => {}}/>
                    <label className="tab" htmlFor="radioLunar">Lunar</label>
                    <input type="radio" id="radioMars" name="tabs" checked = {tabs === "mars"} onChange={() => {}}/>
                    <label className="tab" htmlFor="radioMars">Mars</label>
                    <span className="glider"></span>
                </div>
            </div>

            <div className="content">
                {tabs === "lunar" ? < MoonPage/>:<MarsPage />}
            </div>
            < Footer />
        </div>
    )
}

export default Home;