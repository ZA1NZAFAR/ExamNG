import Image from "next/image";
import Link from "next/link";
import React, {useEffect, useState} from "react";

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
    const [tooltipIndex, setTooltipIndex] = useState<number | null>(0);

    // Récupérer l'état stocké dans le localStorage au chargement de la page
    useEffect(() => {
        const collapsedState = localStorage.getItem("sidebarCollapsed");
        if (collapsedState) {
            setIsCollapsed(collapsedState === "true");
        }
    }, []);

    const toggleSidebarCollapseHandler = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        localStorage.setItem("sidebarCollapsed", newState.toString());
    };

    const handleHover = (index: number) => {
        setTooltipIndex(index);
        const sidebarItems = document.querySelectorAll(".sidebar_item") as NodeListOf<HTMLElement>;
        sidebarItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add("hovered");
            } else if (i > index) {
                item.style.transform = `translateY(40%)`;
            }
        });
    };

    const handleLeave = () => {
        setTooltipIndex(null);
        const sidebarItems = document.querySelectorAll(".sidebar_item") as NodeListOf<HTMLElement>;
        sidebarItems.forEach((item) => {
            item.style.transform = "translateY(0)";
            item.classList.remove("hovered");
        });
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
            <aside className={`sidebar ${isCollapsed ? "" : "active"}`} data-collapse={isCollapsed}>
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
                <ul className="sidebar_list" onMouseLeave={handleLeave}>
                    {sidebarItems.map(({ name, icon, href }, index) => (
                        <li
                            className="sidebar_item"
                            key={name}
                            onMouseEnter={() => handleHover(index)}
                            onMouseLeave={handleLeave}
                        >
                            <Link href={href}>
                                <div className="sidebar_link">
                                    <div className="sidebar_icon-wrapper">
                                        <span className="sidebar_icon">{icon}</span>
                                    </div>
                                    <span className="sidebar_name">{name}</span>
                                </div>
                            </Link>
                            {index==0 && (
                            <div
                                className={`tooltip ${tooltipIndex === index ? "show" : ""}`}
                                id={`tooltip-${index}`}
                            >
                                <ul>
                                    <li>
                                        JEE
                                    </li>
                                    <li>
                                        Scala
                                    </li>
                                    <li>
                                        Sociology
                                    </li>
                                </ul>
                            </div>
                                )}
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    );
}
