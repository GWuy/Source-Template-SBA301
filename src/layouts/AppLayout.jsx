import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "./AppLayout.css";

function AppLayout() {
    return (
        <div className="app-body">
            <Header />

            <main>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default AppLayout;
