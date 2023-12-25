"use client";
import * as React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import FaqTop from "@/components/faq/faq_top";
import FaqCards from "@/components/faq/faq_cards";

export default function App() {
	return (
		<NextUIProvider>
			<FaqTop />
			<br/>
			<FaqCards />
		</NextUIProvider>
	);
}
