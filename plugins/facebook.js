const {
    inrl,
    extractUrlsFromString,
    config,
    getJson,
    getBuffer,
} = require('../lib/');

inrl({
    pattern: 'fb ? (.*)',
    desc: 'download medias from Facebook',
    react: "⬇️",
    type: "downloader"
}, async (message, match) => {
match = match || message.reply_message.text;
    if (!match)  return await message.reply("*_give me a url_*");
    const urls = extractUrlsFromString(match);
    if(!urls[0]) return await message.send("*_Give me a valid url_*");
        const data = await getJson(`${config.BASE_URL}api/fb?url=${urls[0]}`);
        const {status, result } = data;
        if(!status) return await message.send("*Not Found*");
        return await message.send(await getBuffer(result.hd), {}, 'video');
});
