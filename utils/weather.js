

export async function getweatherData(city) {
  if (city === "jaipur") {
    return { temperature: 25, humidity: 50, windSpeed: 10 };
  }
  return { error: "city not found" };
}
