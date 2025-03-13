import { useEffect, useState } from 'react';

interface WeatherDate {
  location: string;
  temperature: number;
  condition: string;
}

export const Weather = () => {
  const [weather, setWeather] = useState<WeatherDate | null>(null);

  useEffect(() => {
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current_weather=true'
    )
      .then((response) => response.json())
      .then((data) => {
        setWeather({
          location: '東京',
          temperature: data.current_weather.temperature,
          condition: data.current_weather.weathercode,
        });
      });
  }, []);

  return (
    <div>
      <h2>天気予報</h2>
      {weather ? (
        <p>
          {weather.location}: {weather.temperature}℃ ({weather.condition})
        </p>
      ) : (
        <p>天気情報を取得中</p>
      )}
    </div>
  );
};
