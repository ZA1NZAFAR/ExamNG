"use client"
import Image from "next/image";
import {AiOutlineHome} from "react-icons/ai";
import {BsCalendar, BsPeople} from "react-icons/bs";
import {TiContacts} from "react-icons/ti";
import {FiMail} from "react-icons/fi";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from "react-icons/md";
import {MdOutlineKeyboardArrowLeft} from "react-icons/md";
import Link from "next/link";
import {useContext, useState, useEffect} from "react";

interface SidebarItem {
    name: string;
    href: string;
    icon: React.ComponentType<any>;
}

const sidebarItems: SidebarItem[] = [
    {
        name: "Home",
        href: "/exams",
        icon: AiOutlineHome,
    },
    {
        name: "Calendar",
        href: "/calendar",
        icon: BsCalendar,
    },
    {
        name: "Support",
        href: "/support",
        icon: FiMail,
    },
    {
        name: "About",
        href: "/about",
        icon: TiContacts,
    },
];
/*
const useActiveLink = () => {
    const [activeLink, setActiveLink] = useState("");

    useEffect(() => {
        const handleRouteChange = () => {
            setActiveLink(window.location.pathname);
        };

        handleRouteChange(); // Set active link on initial render

        // Listen to navigation changes
        window.addEventListener("popstate", handleRouteChange);

        return () => {
            // Clean up listener
            window.removeEventListener("popstate", handleRouteChange);
        };
    }, []);

    return activeLink;
};*/

export default function Sidebar() {
    const [isCollapsed, setIsCollapsedSidebar] = useState<boolean>(false);
    const toggleSidebarCollapseHandler = () => {
        setIsCollapsedSidebar((prevState) => !prevState);
    }
    return (
        <div className="sidebar_wrapper">
            <button className="btn" onClick={toggleSidebarCollapseHandler}>
                {isCollapsed ? <MdKeyboardArrowRight/> : <MdKeyboardArrowLeft/>}
            </button>
            <aside className="sidebar" data-collapse={isCollapsed}>
                <div className="sidebar_top">
                    <Image
                        width={80}
                        height={80}
                        className="sidebar_logo"
                        src="/Avatar.svg"
                        alt="logo"
                    />
                    <p className="sidebar_logo-name">Meryem Kose</p>
                </div>
                <ul className="sidebar_list">
                    {sidebarItems.map(({name, href, icon: Icon}) => {
                        return (
                            <li className="sidebar_item" key={name}>
                                <Link href={href} className="sidebar_link">
                                    <span className="sidebar_icon">
                                      <Icon/>
                                    </span>
                                    <span className="sidebar_name">{name}</span>
                                </Link>
                            </li>
                        )
                            ;
                    })}
                </ul>
            </aside>
        </div>
    );
};
