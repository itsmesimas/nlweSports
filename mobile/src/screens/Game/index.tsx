import { Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameParams } from '../../@types/navigation';
import logoImg from '../../assets/logo-nlw-esports.png';
import { NotFound } from '../../components/404';
import { Background } from '../../components/Background';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';
import { Heading } from '../../components/Heading';
import { LoadContext } from '../../contexts/LoadContext';
import Api from '../../services/api';
import { THEME } from '../../theme';
import { styles } from './styles';

export function Game() {
	const route = useRoute();
	const game = route.params as GameParams;
	const navigation = useNavigation();
	const [duos, setDuos] = useState<DuoCardProps[]>([]);
	const [selectedDuo, setSelectedDuo] = useState('');
	const { handleChangeLoading } = useContext(LoadContext);

	function handleGoBack() {
		return navigation.goBack();
	}

	async function getAds() {
		try {
			const { data, status } = await Api.get(`/games/${game.id}/ads`);
			if (status === 200) {
				setDuos(data);
			}
		} catch (err) {
			console.error(err);
		}
	}
	async function getDiscordUser(adsId: string) {
		try {
			handleChangeLoading(true);
			const { data, status } = await Api.get(`/ads/${adsId}/discord`);

			if (status === 200) {
				setSelectedDuo(data.discord);
				handleChangeLoading(false);
			}
		} catch (err) {
			console.error(err);
			handleChangeLoading(false);
		}
	}

	useEffect(() => {
		getAds();
	}, []);

	return (
		<Background>
			<SafeAreaView style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity onPress={handleGoBack}>
						<Entypo name="chevron-thin-left" color={THEME.COLORS.CAPTION_300} size={20} />
					</TouchableOpacity>
					<Image source={logoImg} style={styles.logo} />
					<View style={styles.right} />
				</View>

				<Image source={{ uri: game.bannerUrl }} style={styles.cover} resizeMode="cover" />
				<Heading title={game.title} subtitle="Conecte-se e comece a jogar" />

				{duos.length > 0 ? (
					<FlatList
						data={duos}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => <DuoCard data={item} onConnect={() => getDiscordUser(item.id)} />}
						horizontal
						showsHorizontalScrollIndicator={false}
						style={styles.containerList}
						contentContainerStyle={styles.contentList}
						showsVerticalScrollIndicator={false}
					/>
				) : (
					<NotFound />
				)}

				<DuoMatch onClose={() => setSelectedDuo('')} visible={selectedDuo.length > 0} discord={selectedDuo} />
			</SafeAreaView>
		</Background>
	);
}
