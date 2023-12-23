const {
    inrl,
    lang,
    badWordDetect,
    getJson,
    config
} = require('../lib');
const fs = require('fs');


inrl({
    pattern: "img",
    usage: 'send google image result for give text',
    react: "🖼",
    type: "search",
    desc : lang.IMG.IMG_DESC
}, async (message, match) => {
    if (!match) {
        return await message.send(lang.BASE.TEXT)
    }
    if(badWordDetect(match.toLowerCase()) && !message.isCreator) return await message.send(lang.BASE.NOT_AUTHR)
    let [text,number] = match.split(/[;,|]/)
    if(!text) text = match;
    if(!number) number = 1;
    if(number>3 && !message.isCreator) return await message.reply(lang.BASE.NOT_AUTHR);
    const data = await getJson(config.BASE_URL+'api/gis?text='+text+`&count=${number}`);
    const {result} = data;
    if(!result) return await message.send('_Not Found_');
    result.map(async(url)=>{
    return await message.sendReply(url,{caption:'*result for*: ```'+text+"```"},'image');
    });
});
