import "./Navbar.css";

export const Navbar = ({ children }) => {
    return (
        <>
            <div class="navbar">
                <div class="navbar-title">BSK</div>
                <hr/>
                <ul>
                    <li class="navbar-section-header">
                        Kryptografia
                    </li>
                    <li class="item">Zadanie 1</li>
                    <li class="item">Zadanie 2</li>
                    <li class="item">Zadanie 3</li>
                </ul>
            </div>
            <div class="content">
                {children}
            </div>
        </>
    );
}