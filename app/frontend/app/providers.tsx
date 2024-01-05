'use client';

import * as React from 'react';
import { NextUIProvider } from '@nextui-org/system';
import { useRouter } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import { ServiceRegistryContext } from '@/services/serviceContext';
import { ServiceRegistry } from '@/services/serviceRegistry';

export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
	const [ windowInstance, setWindowInstance ] = React.useState<Window | undefined>(undefined);
	const router = useRouter();

	React.useEffect(() => {
		setWindowInstance(window);
	}, [window]);
	

	return (
		<NextUIProvider navigate={router.push}>
			<ServiceRegistryContext.Provider value={new ServiceRegistry(windowInstance)}>
				<NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
			</ServiceRegistryContext.Provider>
		</NextUIProvider>
	);
}
