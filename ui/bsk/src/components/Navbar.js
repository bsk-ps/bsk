import "./Navbar.scss";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Home } from '../pages/home/Home';
import { zad2 } from '../pages/home/Zad2';

export const Navbar = () => {
    return (
        <>
            <div className="navbar cool-background">
                <div className="navbar-title">BSK</div>
                <hr/>
                <ul>
                    <li className="navbar-section-header">
                        Kryptografia
                    </li>
                    <Link className="default-link" to="/zadanie1">Zadanie 1 </Link>
                    <Link className="default-link" to="/zadanie2">Zadanie 2</Link>
                    <li className="item">Zadanie 3</li>
                </ul>
            </div>
            <div className="content">
            
            
            <Route exact path="/" component={Home} />
            <Route path="/zadanie1" component={Home} />
            <Route path="/zadanie2" component={zad2} />
            </div>
        </>
        
    );
}