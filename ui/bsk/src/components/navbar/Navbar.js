import "./Navbar.scss";
import "./../../pages/effects.scss";
import { Link } from "react-router-dom";

export const Navbar = ({ children }) => {
    return (
        <>
            <div className="navbar cool-background">
                <div className="navbar-title glitch" data-text="BSK"><Link className="default-link" to="/">BSK</Link></div>
                <hr />
                <ul>
                    <li className="navbar-section-header">
                        Kryptografia
                    </li>
                    <li className="item"> <Link className="default-link" to="/zadanie1">Zadanie 1 </Link></li>
                    <li className="item"> <Link className="default-link" to="/zadanie2">Zadanie 2</Link></li>
                    <li className="item"> <Link className="default-link" to="/zadanie3">Zadanie 3</Link></li>
                    <li className="item"> <Link className="default-link" to="/zadanie4">Zadanie 4</Link></li>               
                    </ul>
            </div>
            <div className="content">
                {children}
            </div>
        </>
    );
}