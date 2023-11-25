import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";

interface SidebarItem {
    name: string;
    href: string;
    icon: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
    {
        name: "Home",
        href: "/exams",
        icon: <Image src="/exams.svg" alt="Exams" width={24} height={24} />,
    },
    {
        name: "Calendar",
        href: "/calendar",
        icon: <Image src="/Sheets.svg" alt="Sheets" width={24} height={24} />,
    },
    {
        name: "Support",
        href: "/support",
        icon: <Image src="/Notification.svg" alt="Notifications" width={24} height={24} />,
    },
];

export default function Sidebar(): JSX.Element {
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

    const handleHover = (index: number) => {
        const tooltip = document.getElementById(`tooltip-${index}`) as HTMLElement | null;
        if (tooltip) {
            tooltip.style.display = "block";
            const sidebarItems = document.querySelectorAll(".sidebar_item") as NodeListOf<HTMLElement>;
            for (let i = index +1; i < sidebarItems.length; i++) {
                sidebarItems[i].style.transform = "translateY(60%)";
            }
        }
    };

    const handleLeave = (index: number) => {
        const tooltip = document.getElementById(`tooltip-${index}`) as HTMLElement | null;
        if (tooltip) {
            tooltip.style.display = "none";
            const sidebarItems = document.querySelectorAll(".sidebar_item") as NodeListOf<HTMLElement>;
            for (let i = index +1; i < sidebarItems.length; i++) {
                sidebarItems[i].style.transform = "translateY(0)";
            }
        }
    };


    return (
        <div className="sidebar_wrapper">
            <button className="btn" onClick={toggleSidebarCollapseHandler}>
                {isCollapsed ? (
                    <Image
                        width={80}
                        height={80}
                        className="sidebar_logo"
                        src="/ArrowRight.svg"
                        alt="logo"
                    />
                ) : (
                    <Image
                        width={80}
                        height={80}
                        className="sidebar_logo"
                        src="/ArrowLeft.svg"
                        alt="logo"
                    />
                )}
            </button>
            <aside className={`sidebar ${isCollapsed ? '' : 'active'}`} data-collapse={isCollapsed}>
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
                    {sidebarItems.map(({ name, href, icon }, index) => {
                        return (
                            <li className="sidebar_item" key={name}>
                                <div className="sidebar_link" onMouseEnter={() => handleHover(index)} onMouseLeave={() => handleLeave(index)}>
                                    <div className="sidebar_icon-wrapper">
                                        <span className="sidebar_icon">{icon}</span>
                                    </div>
                                    <span className="sidebar_name">{name}</span>
                                </div>
                                <div className="tooltip" id={`tooltip-${index}`}>Tooltip content</div>
                            </li>
                        );
                    })}
                </ul>
            </aside>
        </div>
    );
}
