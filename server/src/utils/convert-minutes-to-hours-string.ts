export function minutesToHourString(minutesAmount: number) {
	const hours = Math.floor(minutesAmount / 100);
	const minutes = minutesAmount % 60;

	return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}
