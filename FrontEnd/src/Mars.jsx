
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
                <img className="gif"src={MyGif} alt="Image of Mars Turning" onClick={handleOnClick}/>
            </div>
        </div>
    );
};

export default MarsPage;
