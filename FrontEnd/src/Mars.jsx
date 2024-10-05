
import MyGif from "./pictures/mars.gif";
import { useNavigate } from "react-router-dom";

const MarsPage = () => {
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate("/marsPage");
    };

    return (
        <div>
            <div style={{ cursor: "pointer" }}>
                <img className="gif"src={MyGif} alt="Image of Mars Turning" style={{transform: "scaleX(-1)"}}
                />
            </div>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
                <button onClick={handleOnClick}> Explore: </button>
            </div>
        </div>
    );
};

export default MarsPage;
