import { useNavigate } from "react-router-dom";
const NotFound = () => {
    const navigate = useNavigate()

    const rediectToMainPage= () => {
        navigate("/")
    }
    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            {rediectToMainPage()}
        </div>
    );
};

export default NotFound;
