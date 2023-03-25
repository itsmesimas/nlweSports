import { MaterialIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { CheckCircle } from 'phosphor-react-native';
import React, { useContext } from 'react';
import { ActivityIndicator, Alert, Modal, ModalProps, Text, TouchableOpacity, View } from 'react-native';
import { LoadContext } from '../../contexts/LoadContext';
import { THEME } from '../../theme';
import { Heading } from '../Heading';
import { styles } from './styles';

interface Props extends ModalProps {
	discord: string;
	onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
	const { loading, handleChangeLoading } = useContext(LoadContext);
	async function handleCopyDiscordUserToClipboard() {
		handleChangeLoading(true);
		try {
			await Clipboard.setStringAsync(discord);
			Alert.alert('Discod copiado!', 'Usuário copiado para área de transferência.');
			handleChangeLoading(false);
		} catch (err) {
			console.error(err);
			handleChangeLoading(false);
		}
	}

	return (
		<Modal animationType="fade" transparent statusBarTranslucent {...rest}>
			<View style={styles.container}>
				<View style={styles.content}>
					<TouchableOpacity style={styles.closeIcon} onPress={onClose}>
						<MaterialIcons name="close" size={20} color={THEME.COLORS.CAPTION_500} />
					</TouchableOpacity>

					<CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />

					<Heading title="Let's play!" subtitle="Agora é só começar a jogar" style={styles.heading} />

					<Text style={styles.label}>Adicione seu discord</Text>

					<TouchableOpacity style={styles.discordButton} onPress={handleCopyDiscordUserToClipboard} disabled={loading}>
						<Text style={styles.discord}>{loading ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}
