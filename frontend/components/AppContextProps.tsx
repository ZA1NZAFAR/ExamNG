// AppProvider.tsx

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface AppContextProps {
    isCollapsed: boolean;
    setIsCollapsed: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    const value = {
        isCollapsed,
        setIsCollapsed,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};
