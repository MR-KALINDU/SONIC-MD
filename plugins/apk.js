const {
        inrl,
        GenListMessage,
        config,
        getJson
} = require('../lib');


inrl({
        pattern: 'apk',
        type: "downloader",
        desc: "download applications from aptoid",
}, async (message, match) => {
        let NewArray = [];
                match = match || message.reply_message.text;
                if (!match) return await message.send("*please give me an application name*");
                const data = await getJson(config.BASE_URL + 'api/apk/search?query=' + encodeURIComponent(match));
                if (!data.status || !data.result) return await message.send("*No result Found*");
                data.result.map(r => NewArray.push(r.name));
                return await message.send(GenListMessage("APK DOWNLOADER", NewArray));
});
inrl({
        on: "text"
}, async (message, match) => {
        if (!message.reply_message?.fromMe) return;
                if (!message.body.includes("APK DOWNLOADER")) return;
                match = message.body.replace("APK DOWNLOADER", "").trim();
                const data = await getJson(config.BASE_URL + 'api/apk/download?query=' + encodeURIComponent(match));
                if (!data.status || !data.result) return await message.send("*No result Found*");
                return await message.send({
                                url: data.result.link
                        },{
                        mimetype: `application/vnd.android.package-archive`,
                        fileName: data.result.name
                }, 'document')
});
