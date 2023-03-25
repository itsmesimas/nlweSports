import * as Notifications from 'expo-notifications';

export async function getPushNotificationToken() {
	const { granted } = await Notifications.getPermissionsAsync();

	if (!granted) {
		try {
			await Notifications.requestPermissionsAsync();
		} catch (err) {
			console.error(err);
		}
	}

	if (granted) {
		try {
			const pushToken = await Notifications.getExpoPushTokenAsync();
			return pushToken.data;
		} catch (err) {
			console.error(err);
		}
	}
}
