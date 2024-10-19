const axios = require('axios');
const Weather = require('./models/Weather');
const cron = require('node-cron');

const API_KEY = 'YOUR_API_KEY';
const CITIES = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

const getWeatherData = async (city) => {
  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4eb3703790b356562054106543b748b2&units=metric`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching weather data for ${city}:`, error);
  }
};

const processWeatherData = async (city) => {
  const data = await getWeatherData(city);
  if (data) {
    const weatherEntry = new Weather({
      city: data.name,
      temperature: data.main.temp,
      feels_like: data.main.feels_like,
      condition: data.weather[0].main,
      min_temp: data.main.temp_min,
      max_temp: data.main.temp_max
    });
    await weatherEntry.save();
    console.log(`Weather data for ${city} saved to MongoDB.`);
  }
};

const startMonitoring = () => {
  cron.schedule('*/5 * * * *', () => {
    CITIES.forEach(city => processWeatherData(city));
  });
};

const getWeatherSummary = async () => {
  const summary = await Weather.aggregate([
    {
      $group: {
        _id: '$city',
        avg_temp: { $avg: '$temperature' },
        max_temp: { $max: '$max_temp' },
        min_temp: { $min: '$min_temp' },
        dominant_condition: { $first: '$condition' }
      }
    }
  ]);
  return summary;
};

const getAlerts = async (threshold) => {
  const alerts = await Weather.find({
    temperature: { $gt: threshold }
  });
  return alerts;
};

module.exports = { startMonitoring, getWeatherSummary, getAlerts };
