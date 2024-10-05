
import MyGif from "./pictures/moon_gif.gif";
import { useNavigate } from "react-router-dom";
import "./App.css"
const MoonPage = () => {
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate("/moonPage");
    };

    return(
        <div>
            <div>
                <img className="gif" src={MyGif} alt="Image of Moon Turning" />
            </div>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
                <button onClick={handleOnClick}>Explore</button>
            </div>
        </div>
    )
}

export default MoonPage;