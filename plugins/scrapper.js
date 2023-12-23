const {
    inrl,
    googleIt,
    weather,
    ringtone,
    GenListMessage,
    lang
} = require('../lib');


inrl({
    pattern: 'google',
    desc: lang.SCRAP.GOOGLE_DESC,
    react : "🙃",
    type: "search"
}, async (message, match) => {
        if (!match) return message.send(lang.BASE.TEXT);
        let teks = await googleIt(match);
        return await message.send(teks)
});
inrl({
    pattern: 'ringtone',
    desc: lang.SCRAP.RING_DESC,
    react : "🙃",
    type: "search"
}, async (message, match) => {
        if (!match) return message.send(lang.BASE.TEXT);
        let result = await ringtone(match), res=[];
        await result.map(r=>res.push(r.title));
        return await message.send(GenListMessage(lang.SCRAP.RING_LIST, res));
});   

inrl({
    pattern: 'weather',
    desc: lang.SCRAP.WEATHER_DESC,
    react : "🔥",
    type: "search"
}, async (message, match) => {
    if(!match) return await m.send(lang.SCRAP.NEED_PLACE)
        return await weather(message);
});

inrl({
    on: "text"
}, async (m, match) => {
    if (!m.reply_message || !m.reply_message?.fromMe) return;
    if(!m.body.includes(lang.SCRAP.RING_LIST)) return;
    match = m.body.replace(lang.SCRAP.RING_LIST, "").trim();
    await m.send("*_downloading_*:-\n\n"+match);
    let result = await ringtone(match);
    return await m.send({
                url: result[0].audio
            },{
            fileName: result[0].title + '.mp3',
            mimetype: 'audio/mpeg'
        }, 'audio');
});
