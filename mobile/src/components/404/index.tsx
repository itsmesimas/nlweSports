import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

export function NotFound() {
	return (
		<View style={styles.container}>
			<Text style={styles.notFound}>Nenhum anúncio encontrado</Text>
		</View>
	);
}
