import { GameController } from 'phosphor-react-native';
import { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { LoadContext } from '../../contexts/LoadContext';
import { THEME } from '../../theme';
import { DuoInfo } from './DuoInfo';

import { styles } from './styles';

export interface DuoCardProps {
	hourEnd: string;
	hourStart: string;
	id: string;
	name: string;
	useVoiceChannel: boolean;
	weekDays: string[];
	yearsPlaying: number;
}

interface Props {
	data: DuoCardProps;
	onConnect: () => void;
}

export function DuoCard({ data, onConnect }: Props) {
	const { loading } = useContext(LoadContext);
	return (
		<View style={styles.container}>
			<DuoInfo label="Nome" value={data.name} />

			<DuoInfo
				label="Tempo de jogo"
				value={`${data.yearsPlaying > 1 ? `${data.yearsPlaying} anos` : `${data.yearsPlaying} ano`}`}
			/>

			<DuoInfo
				label="Disponibilidade"
				value={`${
					data.weekDays.length > 1
						? `${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`
						: `${data.weekDays.length} dia \u2022 ${data.hourStart} - ${data.hourEnd}`
				}`}
			/>

			<DuoInfo
				label="Chamada de áudio"
				value={`${data.useVoiceChannel ? 'Sim' : 'Nâo'}`}
				colorValue={`${data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}`}
			/>

			<TouchableOpacity style={styles.button} onPress={onConnect} disabled={loading}>
				<GameController color={THEME.COLORS.TEXT} size={20} />
				<Text style={styles.buttonTitle}>Conectar</Text>
			</TouchableOpacity>
		</View>
	);
}
