import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
	notFound: { fontSize: THEME.FONT_SIZE.MD, fontFamily: THEME.FONT_FAMILY.BLACK, color: THEME.COLORS.TEXT },
});
