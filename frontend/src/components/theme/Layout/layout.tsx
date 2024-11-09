import Sidebar from './Sidebar/__sidebar.tsx';
import Header from "./Header/__header.tsx";
import './layout.css';
import React, {PropsWithChildren} from "react";

const Layout: React.FC<PropsWithChildren> = ({children}) => {
    return (
        <div className="flex w-full">
            <div id="wrapper"></div>
            <Sidebar />
            <div className="body-content-right">
                <Header />
                {children}
            </div>
        </div>
    );
}

export default Layout;