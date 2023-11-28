"use client"
import "@/styles/globals.css";
import type {NextComponentType, NextPageContext } from "next";
import {AppProps} from "next/app";
import Sidebar from "@/components/sidebar";
import {useEffect, useState} from "react";
import {Input} from "@nextui-org/react";

type CustomAppProps = AppProps & {
	Component: NextComponentType<NextPageContext, any, {}>;
};

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
		<Sidebar/>

	);
}
