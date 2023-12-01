"use client"
import "@/styles/globals.css";

import Sidebar from "@/components/sidebar";
import {useEffect, useState} from "react";

import Notifications from "@/components/notifications";


export default function ExamPage() {
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(true);

	const toggleSidebarCollapseHandler = () => {
		setIsSidebarCollapsed((prevState: any) => !prevState);
	};

	useEffect(() => {
		const handleRouteChange = () => {
			// Check if the current path is /exams
			if (window.location.pathname === '/exams') {
				// Set the sidebar collapsed state when returning to /exams
				setIsSidebarCollapsed(true);
			}
		};

		// Listen to navigation changes
		window.addEventListener("popstate", handleRouteChange);

		// Clean up listener
		return () => {
			window.removeEventListener("popstate", handleRouteChange);
		};
	}, []);
	return (
		<><Sidebar/></>
	);
}
