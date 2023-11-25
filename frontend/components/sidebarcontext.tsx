"use client"
import {createContext, ReactNode, useState} from "react";

const initialValue = {
    isCollapsed: false, toggleSidebarCollapseHandler: () => {
    }
};
export const SideBarContext = createContext(initialValue);

interface Props {
    children: ReactNode | ReactNode[];
}

const SideBarProvider = ({ children }: Props) => {
    const [isCollapsed, setIsCollapsedSidebar] = useState<boolean>(false);

    const toggleSidebarCollapseHandler = () => {
        setIsCollapsedSidebar((prevState) => !prevState);
    };

    return (
        <SideBarContext.Provider value={{ isCollapsed, toggleSidebarCollapseHandler }}>
            {children}
        </SideBarContext.Provider>
    );
};

export default SideBarProvider;