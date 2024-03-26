import { NavLink, Outlet } from "react-router-dom";

export default function Nav() {
    return (
        <>
            <nav className="nav mx-auto w-75">
                <div className="nav-router">
                    <NavLink to='/' className="nav-link">Anasayfa</NavLink>
                    <NavLink to='/basket' className="nav-link">Sepet</NavLink>
                    <NavLink to='/categories' className="nav-link">Kategoriler</NavLink>
                    <NavLink to='/contact' className="nav-link">İletişim</NavLink>
                </div>
                <div className="nav-logo">E-Ticaret</div>
                <div className="nav-icons">
                    <a>arama kısmı</a>
                    <a>Profil sayfası</a>
                    <a>Sepet sayfası</a>
                </div>
            </nav>
            <Outlet />
        </>
    )
}
