import { Outlet } from "react-router-dom";
import SidebarAccount from "../SideBar/SideBar";

const AccountLayout = () => {
    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-page-bg text-text-main transition-colors duration-300">

            <SidebarAccount />

            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
};

export default AccountLayout;