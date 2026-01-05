import fetch from "node-fetch";

export async function handler(event, context) {
  const mood = event.queryStringParameters.mood || "happy";

  const moods = {
    happy: "happy pop music",
    sad: "sad acoustic song",
    chill: "lofi chill music",
    focus: "coding focus music instrumental",
    angry: "rock metal music"
  };

  const API_KEY = process.env.YOUTUBE_API_KEY; // aman, tidak terlihat publik
  const query = moods[mood] || "happy pop music";
  const MAX_RESULT = 6;

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${MAX_RESULT}&q=${encodeURIComponent(query)}&key=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" }, // penting supaya bisa dipanggil dari GitHub Pages
      body: JSON.stringify(data)
    };
  } catch (err) {
    return { statusCode: 500, body: "Error fetching YouTube API" };
  }
}
