import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.post("/users/logout");
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav className="navbar">

            <Link to="/dashboard" className="logo">
                🔗 Shortify
            </Link>

            <div className="nav-links">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/links">My Links</Link>
            </div>

            <button onClick={handleLogout}>
                Logout
            </button>

        </nav>
    );
}

export default Navbar;