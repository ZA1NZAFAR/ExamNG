"use client"
import Image from "next/image";
import React, {ReactNode} from "react";
import Link from "next/link";
import {useContext, useState, useEffect} from "react";

interface SidebarItem {
    name: string;
    href: string;
    icon: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
    {
        name: "Home",
        href: "/exams",
        icon: <Image src="/exams.svg" alt="Exams" width={24} height={24}/>
    },
    {
        name: "Calendar",
        href: "/calendar",
        icon: <Image src="/Sheets.svg" alt="Sheets" width={24} height={24}/>,
    },
    {
        name: "Support",
        href: "/support",
        icon: <Image src="/Notification.svg" alt="Notifications" width={24} height={24}/>
    }
];

export default function Sidebar() : JSX.Element {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    useEffect(() => {
        const storedCollapsedState = localStorage.getItem("sidebarCollapsed");
        setIsCollapsed(storedCollapsedState === "true");
    }, []);

    const toggleSidebarCollapseHandler = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        localStorage.setItem("sidebarCollapsed", newState.toString());
    };

    return (
        <div className="sidebar_wrapper">
            <button className="btn" onClick={toggleSidebarCollapseHandler}>
                {isCollapsed ? <Image
                    width={80}
                    height={80}
                    className="sidebar_logo"
                    src="/ArrowRight.svg"
                    alt="logo"
                /> : <Image
                    width={80}
                    height={80}
                    className="sidebar_logo"
                    src="/ArrowLeft.svg"
                    alt="logo"
                />}
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
                    {sidebarItems.map(({ name, href, icon }) => {
                        return (
                            <li className="sidebar_item" key={name}>
                                <Link href={href} className="sidebar_link">
                    <span className="sidebar_icon">
                        {typeof icon === 'string' ? (
                            <img src={icon} alt={name} />
                        ) : (
                            <span>{icon}</span>
                        )}
                    </span>
                                    <span className="sidebar_name">{name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </aside>
        </div>
    );
};
