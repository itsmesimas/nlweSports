import { createContext, ReactNode, useState } from 'react';

interface LoadContextProps {
	loading: boolean;
	handleChangeLoading: (value: boolean) => void;
}

interface LoadProviderProps {
	children: ReactNode;
}

export const LoadContext = createContext({} as LoadContextProps);

export const LoadProvider = ({ children }: LoadProviderProps) => {
	const [loading, setLoading] = useState(false);
	const handleChangeLoading = (value: boolean) => {
		setLoading(value);
	};

	return <LoadContext.Provider value={{ loading, handleChangeLoading }}>{children}</LoadContext.Provider>;
};
