import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black, useFonts } from '@expo-google-fonts/inter';
import { Subscription } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef } from 'react';
import { StatusBar } from 'react-native';
import { Background } from './src/components/Background';
import { Loading } from './src/components/Loading';
import { LoadProvider } from './src/contexts/LoadContext';
import { Routes } from './src/routes';
import { getPushNotificationToken } from './src/services/getPushNotificationToken';
import './src/services/notificationConfigs';

export default function App() {
	const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black });
	const receivedNotificationListener = useRef<Subscription>();
	const responseNotificationListener = useRef<Subscription>();

	useEffect(() => {
		getPushNotificationToken();
	}, []);

	useEffect(() => {
		receivedNotificationListener.current = Notifications.addNotificationReceivedListener(
			(notification) => notification,
		);
		responseNotificationListener.current = Notifications.addNotificationResponseReceivedListener(
			(response) => response,
		);

		return () => {
			if (receivedNotificationListener.current && responseNotificationListener.current) {
				Notifications.removeNotificationSubscription(receivedNotificationListener.current);
				Notifications.removeNotificationSubscription(responseNotificationListener.current);
			}
		};
	}, []);

	return (
		<Background>
			<StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
			{fontsLoaded ? (
				<LoadProvider>
					<Routes />
				</LoadProvider>
			) : (
				<Loading />
			)}
		</Background>
	);
}
