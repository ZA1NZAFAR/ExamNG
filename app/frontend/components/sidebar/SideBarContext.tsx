import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface SideBarContextProps {
    isCollapsed: boolean;
    setIsCollapsed: Dispatch<SetStateAction<boolean>>;
}

const SideBarContext = createContext<SideBarContextProps | undefined>(undefined);

export const useSideBarContext = () => {
	const context = useContext(SideBarContext);
	if (!context) {
		throw new Error('useSideBarContext must be used within an SideBarProvider');
	}
	return context;
};

interface SideBarProviderProps {
    children: ReactNode;
}

export const SideBarProvider: React.FC<SideBarProviderProps> = ({ children }) => {
	const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

	const value = {
		isCollapsed,
		setIsCollapsed,
	};

	return (
		<SideBarContext.Provider value={value}>
			{children}
		</SideBarContext.Provider>
	);
};
