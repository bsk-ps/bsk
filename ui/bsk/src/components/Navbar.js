import "./Navbar.scss";

export const Navbar = ({ children }) => {
    return (
        <>
            <div className="navbar cool-background">
                <div className="navbar-title">BSK</div>
                <hr/>
                <ul>
                    <li className="navbar-section-header">
                        Kryptografia
                    </li>
                    <li className="item">Zadanie 1</li>
                    <li className="item">Zadanie 2</li>
                    <li className="item">Zadanie 3</li>
                </ul>
            </div>
            <div className="content">
                {children}
            </div>
        </>
    );
}