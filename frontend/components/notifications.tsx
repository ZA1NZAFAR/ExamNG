// notifications.tsx
import React, { useState } from "react";
import UserCard from "@/components/notif_card";
import Image from "next/image";
import {useAppContext} from "@/components/AppContextProps";

interface Notification {
    id: number;
    sideBarActive: boolean;
}

interface NotificationsProps {
    sideBarIsActive: boolean;
}

export default function Notifications({ sideBarIsActive }: NotificationsProps) {
    const { isCollapsed } = useAppContext();
    const initialNotifications: Notification[] = [
        { id: 1, sideBarActive: sideBarIsActive },
        { id: 2, sideBarActive: sideBarIsActive },
        { id: 3, sideBarActive: sideBarIsActive },
        { id: 4, sideBarActive: sideBarIsActive },
    ];
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
    const [showNotifications, setShowNotifications] = useState(false);
    const handleShowNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const handleDeleteNotification = (id: number) => {
        const updatedNotifications = notifications.filter((notification) => notification.id !== id);
        setNotifications(updatedNotifications);
    };

    return (
        <div>
            <div className="sidebar_link">
                <div className="sidebar_icon-wrapper">
                    <span className="sidebar_icon">
                        {notifications.length > 0 ? (
                            <Image src="/NotifOn.svg" alt="Notifications On" width={24} height={24} onClick={handleShowNotifications} />
                        ) : (
                            <Image src="/NotifOff.svg" alt="Notifications empty" width={24} height={24} onClick={handleShowNotifications} />
                        )}
                    </span>
                </div>
                <span className="sidebar_name" onClick={handleShowNotifications}>Notifications</span>
            </div>
            {showNotifications && (
                <div>
                    {notifications.length === 0 ? (
                        <p>Aucune notification</p>
                    ) : (
                        notifications.map((notification) => (
                            <UserCard
                                key={notification.id}
                                id={notification.id}
                                onDelete={() => handleDeleteNotification(notification.id)}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
