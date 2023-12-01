import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import UserCard from "@/components/notif_card";
import Image from "next/image"; // Assurez-vous d'utiliser le bon chemin d'importation

interface Notification {
    id: number;
}

export default function Notifications() {
    const initialNotifications: Notification[] = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
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
                    <span className="sidebar_icon"><Image src="/Notification.svg" alt="Notifications" width={24} height={24} onClick={handleShowNotifications}/></span>
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
