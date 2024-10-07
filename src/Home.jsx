import { useState } from "react";
import MoonPage from "./Moon";
import MarsPage from "./Mars";
import Footer from "./Footer";
import "./App.css";

function Home() {
    const [tabs, setTabs] = useState("lunar");

    const handleChange = (e) => {
        setTabs(e.target.id === "radioLunar" ? "lunar" : "mars");
    };

    return (
        <div>
            <img className="BackgroundImg" src={"./pictures/SpaceBackground.jpg"} alt="Space Background" />
            <div className="titleContainer">
                <label>Seismic Detection Across the Solar System</label>
            </div>
            <div className="container">
                <div className="tabs" onChange={handleChange}>
                    <input type="radio" id="radioLunar" name="tabs" checked={tabs === "lunar"} onChange={() => { }} />
                    <label className="tab" htmlFor="radioLunar">Lunar</label>
                    <input type="radio" id="radioMars" name="tabs" checked={tabs === "mars"} onChange={() => { }} />
                    <label className="tab" htmlFor="radioMars">Mars</label>
                    <span className="glider"></span>
                </div>
            </div>

            <div className="content">
                {tabs === "lunar" ? <MoonPage /> : <MarsPage />}
            </div>

            {/* Planet Information Section */}
            <div className="planetInfo">
                <div className="planetDetails">
                    {tabs === "lunar" ? (
                        <>
                            <div className="planetName">Moon</div>
                            <div className="planetSpeed">Orbit Velocity: 3,683 km/h</div>
                        </>
                    ) : (
                        <>
                            <div className="planetName">Mars</div>
                            <div className="planetSpeed">Orbit Velocity: 86,87 km/h</div>
                        </>
                    )}
                </div>
                <div className="line"></div>
            </div>

            <Footer />
        </div>
    )
}

export default Home;
