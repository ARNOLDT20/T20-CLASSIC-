const axios = require('axios');
const { cmd } = require('../command');

cmd({
    pattern: "weather",
    desc: "🌤 Get weather information for a location",
    react: "🌤",
    category: "utility",
    use: '.weather <city>',
    filename: __filename
},
async (conn, mek, m, { from, reply, args }) => {
    try {
        if (!args[0]) return reply("❌ Please provide a city name\nExample: .weather London");
        
        const city = args.join(' ');
        const apiUrl = `https://apis.davidcyriltech.my.id/weather?city=${encodeURIComponent(city)}`;
        
        const { data } = await axios.get(apiUrl);
        
        if (!data.success) return reply("❌ Couldn't fetch weather data for that location");
        
        const weatherInfo = `
🌤 *Weather for ${data.data.location}, ${data.data.country}*

🌡 Temperature: ${data.data.temperature}
💭 Feels Like: ${data.data.feels_like}
☁ Weather: ${data.data.weather} (${data.data.description})

💧 Humidity: ${data.data.humidity}
💨 Wind Speed: ${data.data.wind_speed}
📊 Pressure: ${data.data.pressure}

📍 Coordinates: ${data.data.coordinates.latitude}, ${data.data.coordinates.longitude}

_Provided by T20 classic Ai_
`.trim();

        await reply(weatherInfo);
        
    } catch (error) {
        console.error('Weather Error:', error);
        reply("❌ Failed to fetch weather data. Please try again later.");
    }
});
