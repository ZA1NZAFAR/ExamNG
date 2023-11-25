"use client"
import "@/styles/globals.css";
import type {NextComponentType, NextPageContext } from "next";
import {AppProps} from "next/app";
import Sidebar from "@/components/sidebar";

type CustomAppProps = AppProps & {
	Component: NextComponentType<NextPageContext, any, {}>;
};

export default function ExamPage() {
	return (
		<Sidebar/>
	);
}
