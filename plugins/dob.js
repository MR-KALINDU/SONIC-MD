const {
	inrl,
	birthDetails
} = require("../lib/");

inrl({
		pattern: "dob",
		desc: "get birth details",
		type: "info",
	},
	async (message, match) => {
		if (!match) return await message.send('*provide a time!*\n*Example: dd/mm/yyyy*');
		let [a, b, c] = match.split(/[/-]/);
		if (!c) return await message.send('*invalid format!*\n*Example: dd/mm/yyyy*');
		if (a.length < 2) a = '0' + a;
		if (b.length < 2) b = '0' + b;
		if (c.length != 4) return await message.send('*invalid format!*\n*Example: dd/mm/yyyy*');
		const date = `${c}-${b}-${a}`;
		const {
			age,
			months,
			days,
			hours,
			minutes,
			seconds,
			next
		} = await birthDetails(date)

		return await message.send(`*🔖 Your birth day details*

*々 age :* ${age} 🧃

     *⸋ life time*

*☇ months :* ${months}
*☇ days :* ${days}
*☇ hours :* ${hours}
*☇ minutes :* ${minutes}
*☇ seconds :* ${seconds}

 *⸋ time left to next bday*

*☇ date :* ${next.date}
*☇ months :* ${next.remainingMonths}
*☇ day :* ${next.remainingDays}
*☇ hours :* ${next.remainingHours}
*☇ minutes :* ${next.remainingMinutes}
*☇ seconds :* ${next.remainingSeconds}`);
	}
);
