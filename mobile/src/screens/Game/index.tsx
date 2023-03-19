import { Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameParams } from '../../@types/navigation';
import logoImg from '../../assets/logo-nlw-esports.png';
import { Background } from '../../components/Background';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { Heading } from '../../components/Heading';
import Api from '../../services/Api';
import { THEME } from '../../theme';
import { styles } from './styles';

export function Game() {
	const route = useRoute();
	const game = route.params as GameParams;
	const navigation = useNavigation();
	const [duos, setDuos] = useState<DuoCardProps[]>([]);

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

				<FlatList
					data={duos}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <DuoCard data={item} />}
					horizontal
					showsHorizontalScrollIndicator={false}
					style={styles.containerList}
					contentContainerStyle={styles.contentList}
					showsVerticalScrollIndicator={false}
				/>
			</SafeAreaView>
		</Background>
	);
}
