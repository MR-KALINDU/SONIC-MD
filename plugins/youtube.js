const {
	inrl,sleep,extractUrlsFromString,searchYT,downloadMp3,downloadMp4,
	lang,getYTInfo,getBuffer,AudioMetaData,toAudio,config
} = require('../lib');


inrl({
	pattern: 'song',
	type: "downloader",
	desc: lang.YT.SONG_DESC
}, async (message, match) => {
	match = match || message.reply_message.text;
	if (!match) return await message.send(lang.BASE.NEED);
	const url = await extractUrlsFromString(match);
	if (!url[0]) {
		const result = await searchYT(match);
		if (!result[0]) return await message.send('_not found_');
		return await message.send({
			name: lang.YT.INFO_SONG,
			values: result.splice(0,10),
			withPrefix: false,
			onlyOnce: true,
			participates: [message.sender],
			selectableCount: true
		}, {}, 'poll');
	} else {
		const {
			seconds,
			title,
			thumbnail
		} = await getYTInfo(url[0]);
		const ress = await downloadMp3(url[0]);
		const AudioMeta = await AudioMetaData(await toAudio(ress), {
			title,
			image: thumbnail
		});
		return await message.send(AudioMeta, {
			mimetype: 'audio/mpeg',
			linkPreview: {
				mediaType: 2,
				title,
				thumbnailUrl: thumbnail
			}
		}, 'audio');
	}
});
inrl({
	pattern: 'video',
	type: "downloader",
	desc: lang.YT.VIDEO_DESC
}, async (message, match) => {
	match = match || message.reply_message.text;
	if (!match) return await message.send(lang.BASE.NEED);
	const url = await extractUrlsFromString(match);
	if (!url[0]) {
		const result = await searchYT(match);
		if (!result[0]) return await message.send('_not found_');
		return await message.send({
			name: lang.YT.INFO_VIDEO,
			values: result.splice(0,10),
			withPrefix: false,
			onlyOnce: true,
			participates: [message.sender],
			selectableCount: true
		}, {}, 'poll');
	} else {
		const {
			seconds
		} = await getYTInfo(url[0]);
		const ress = await downloadMp4(url[0]);
		await message.send(ress, {
			mimetype: 'video/mp4'
		}, 'video');
	}
});
inrl({
	on: "text"
}, async (message, match) => {
	const video_reg = new RegExp(lang.YT.INFO_VIDEO, "gi");
	const song_reg = new RegExp(lang.YT.INFO_SONG, "gi");
	if (message.body.match(video_reg)) {
		match = message.body.replace(video_reg, "").trim();
		await message.send(lang.BASE.DOWNLOAD.format(match));
		const result = await searchYT(match, true);
		const {
			seconds
		} = await getYTInfo(result[0]);
		const ress = await downloadMp4(result[0]);
		return await message.send(ress, {
			mimetype: 'video/mp4'
		}, 'video');
	} else if (message.body.match(song_reg)) {
		match = message.body.replace(song_reg, "").trim();
		await message.send(lang.BASE.DOWNLOAD.format(match));
		const result = await searchYT(match, true);
		const {
			seconds,
			title,
			thumbnail
		} = await getYTInfo(result[0]);
		const ress = await downloadMp3(result[0]);
		const AudioMeta = await AudioMetaData(await toAudio(ress), {
			title,
			image: thumbnail
		});
		return await message.send(AudioMeta, {
			mimetype: 'audio/mpeg',
			linkPreview: {
				mediaType: 2,
				title,
				thumbnailUrl: thumbnail
			}
		}, 'audio');
	}
});
