import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express from 'express';
import { convertHoursToMinutes } from './utils/convert-hour-string-to-minutes';
import { minutesToHourString } from './utils/convert-minutes-to-hours-string';

const app = express();
app.use(express.json());
app.use(
	cors({
		// origin:'http://'
	}),
);
const prisma = new PrismaClient({
	log: ['query'],
});

app.get('/ads', async (request, response) => {
	return response.send([]);
});

app.get('/games', async (request, response) => {
	const games = await prisma.game.findMany({
		include: {
			_count: {
				select: {
					ads: true,
				},
			},
		},
	});
	return response.json(games);
});

app.get('/games/:id/ads', async (request, response) => {
	const gameId = request.params.id;
	const ads = await prisma.ad.findMany({
		select: {
			id: true,
			name: true,
			weekDays: true,
			useVoiceChannel: true,
			yearsPlaying: true,
			hourStart: true,
			hourEnd: true,
			createdAt: true,
		},
		where: {
			gameId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	return response.send(
		ads.map((ad) => {
			return {
				...ad,
				weekDays: ad.weekDays.split(','),
				hourStart: minutesToHourString(ad.hourStart),
				hourEnd: minutesToHourString(ad.hourEnd),
			};
		}),
	);
});

app.get('/ads/:id/discord', async (request, response) => {
	const adId = request.params.id;
	const ad = await prisma.ad.findUniqueOrThrow({
		select: {
			discord: true,
		},
		where: {
			id: adId,
		},
	});
	return response.json({ discord: ad.discord });
});

app.post('/games/:id/ads', async (request, response) => {
	/*
	{
	"name": "grazyy",
	"yearsPlaying": 2,
	"discord": "grazyy#3234",
	"weekDays": [
		0,
		5,
		6
	],
	"hourStart": "12:00",
	"hourEnd": "15:00",
	"useVoiceChannel": true
}
	*/
	const gameId = request.params.id;
	const body: any = request.body;
	const ad = await prisma.ad.create({
		data: {
			gameId,
			name: body.name,
			yearsPlaying: body.yearsPlaying,
			discord: body.discord,
			weekDays: body.weekDays.join(','),
			hourStart: convertHoursToMinutes(body.hourStart),
			hourEnd: convertHoursToMinutes(body.hourEnd),
			useVoiceChannel: body.useVoiceChannel,
			createdAt: body.createdAt,
		},
	});
	return response.status(201).json(ad);
});

app.listen(3000);
