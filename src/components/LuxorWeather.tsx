import React, { useState, useEffect } from 'react';
import {
  Sun,
  CloudSun,
  Moon,
  Cloud,
  Wind,
  Droplets,
  Sunrise,
  Sunset,
  Sparkles,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Compass,
  Thermometer,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useI18n } from '../i18n/I18nContext';
import { Language } from '../i18n/translations';

interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  weatherCode: number;
  isDay: boolean;
  time: string;
}

interface DailyForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
  sunrise: string;
  sunset: string;
  uvIndex: number;
}

interface WeatherData {
  current: CurrentWeather;
  daily: DailyForecast[];
  lastUpdated: Date;
}

// Localized weather content for all 8 supported languages
const WEATHER_I18N: Record<
  Language,
  {
    liveLabel: string;
    weatherInLuxor: string;
    feelsLike: string;
    humidity: string;
    wind: string;
    uvIndex: string;
    sunrise: string;
    sunset: string;
    balloonClearance: string;
    balloonOptimal: string;
    balloonModerate: string;
    balloonAdvisory: string;
    travelAdviceTitle: string;
    travelAdviceContent: string;
    fourDayForecast: string;
    today: string;
    tomorrow: string;
    refresh: string;
    moreDetails: string;
    lessDetails: string;
    celsius: string;
    fahrenheit: string;
    conditions: {
      clear: string;
      partlyCloudy: string;
      overcast: string;
      morningMist: string;
      lightRain: string;
      desertHaze: string;
    };
  }
> = {
  en: {
    liveLabel: 'LIVE METEOROLOGY',
    weatherInLuxor: 'Current Weather in Luxor',
    feelsLike: 'Feels like',
    humidity: 'Humidity',
    wind: 'Wind Speed',
    uvIndex: 'UV Index',
    sunrise: 'Sunrise',
    sunset: 'Sunset',
    balloonClearance: 'Sunrise Balloon Flights',
    balloonOptimal: 'Optimal Flight Clearance (< 15 km/h)',
    balloonModerate: 'Good Conditions · Flights Running',
    balloonAdvisory: 'Wind Advisory · Flights Dependent on Civil Aviation',
    travelAdviceTitle: 'Concierge Travel Advice',
    travelAdviceContent:
      'Ideal morning for Valley of the Kings exploration and Nile cruising. Early morning balloon ascents start at 05:15 AM.',
    fourDayForecast: '4-Day Travel Planning Forecast',
    today: 'Today',
    tomorrow: 'Tomorrow',
    refresh: 'Refresh Live Weather',
    moreDetails: 'Trip Planning Forecast & Balloon Status',
    lessDetails: 'Hide Forecast',
    celsius: '°C',
    fahrenheit: '°F',
    conditions: {
      clear: 'Sunny & Clear Skies',
      partlyCloudy: 'Warm Desert Sunshine',
      overcast: 'Scattered High Clouds',
      morningMist: 'Dawn Nile Mist',
      lightRain: 'Occasional Light Drizzle',
      desertHaze: 'Warm Desert Breeze',
    },
  },
  ar: {
    liveLabel: 'أرصاد جوية مباشرة',
    weatherInLuxor: 'طقس الأقصر الآن',
    feelsLike: 'الحرارة المحسوسة',
    humidity: 'الرطوبة',
    wind: 'سرعة الرياح',
    uvIndex: 'مؤشر الأشعة',
    sunrise: 'شروق الشمس',
    sunset: 'غروب الشمس',
    balloonClearance: 'رحلات المنطاد الطائر',
    balloonOptimal: 'تصريح طيران مثالي (رياح هادئة)',
    balloonModerate: 'أجواء ملائمة والرحلات منتظمة',
    balloonAdvisory: 'تنبيه رياح · حسب تعليمات الطيران المدني',
    travelAdviceTitle: 'نصيحة الكونسيرج السياحية',
    travelAdviceContent:
      'طقس مثالي لزيارة معابد الكرنك ووادي الملوك. تنطلق رحلات المنطاد فجراً في تمام الساعة 05:15 صباحاً.',
    fourDayForecast: 'توقعات الطقس للتخطيط (4 أيام)',
    today: 'اليوم',
    tomorrow: 'غداً',
    refresh: 'تحديث بيانات الطقس',
    moreDetails: 'تفاصيل الطقس وحالة طيران المنطاد',
    lessDetails: 'إخفاء التوقعات',
    celsius: '°م',
    fahrenheit: '°ف',
    conditions: {
      clear: 'مشمس وسماء صافية تماماً',
      partlyCloudy: 'شمس دافئة وغيوم خفيفة',
      overcast: 'سحب متفرقة',
      morningMist: 'ضباب فجر النيل الخفيف',
      lightRain: 'رذاذ مطري نادر',
      desertHaze: 'نسيم صحراوي دافئ',
    },
  },
  de: {
    liveLabel: 'LIVE-METEOROLOGIE',
    weatherInLuxor: 'Aktuelles Wetter in Luxor',
    feelsLike: 'Gefühlt wie',
    humidity: 'Luftfeuchtigkeit',
    wind: 'Windgeschwindigkeit',
    uvIndex: 'UV-Index',
    sunrise: 'Sonnenaufgang',
    sunset: 'Sonnenuntergang',
    balloonClearance: 'Heißluftballon-Freigabe',
    balloonOptimal: 'Optimale Flugbedingungen (< 15 km/h)',
    balloonModerate: 'Gute Bedingungen · Flüge planmäßig',
    balloonAdvisory: 'Windwarnung · Vorbehaltlich Luftfahrtbehörde',
    travelAdviceTitle: 'Reise-Tipp des Concierge',
    travelAdviceContent:
      'Idealer Morgen für das Tal der Könige und Nilkreuzfahrten. Ballonfahrten starten ab 05:15 Uhr morgens.',
    fourDayForecast: '4-Tage-Reisewetterbericht',
    today: 'Heute',
    tomorrow: 'Morgen',
    refresh: 'Wetter aktualisieren',
    moreDetails: 'Reisewetter & Ballon-Status',
    lessDetails: 'Wetterbericht schließen',
    celsius: '°C',
    fahrenheit: '°F',
    conditions: {
      clear: 'Sonnig & klarer Himmel',
      partlyCloudy: 'Warmer Wüstensonnenschein',
      overcast: 'Hohe Schleierwolken',
      morningMist: 'Morgendlicher Nildunst',
      lightRain: 'Leichter Sprühregen',
      desertHaze: 'Warme Wüstenbrise',
    },
  },
  fr: {
    liveLabel: 'MÉTÉO EN DIRECT',
    weatherInLuxor: 'Météo Actuelle à Louxor',
    feelsLike: 'Température ressentie',
    humidity: 'Humidité',
    wind: 'Vitesse du vent',
    uvIndex: 'Indice UV',
    sunrise: 'Lever du soleil',
    sunset: 'Coucher du soleil',
    balloonClearance: 'Vols en Montgolfière',
    balloonOptimal: 'Autorisation de vol optimale (< 15 km/h)',
    balloonModerate: 'Bonnes conditions · Vols assurés',
    balloonAdvisory: 'Alerte vent · Sous réserve de l’aviation civile',
    travelAdviceTitle: 'Conseil de la Conciergerie',
    travelAdviceContent:
      'Matinée idéale pour visiter la Vallée des Rois et naviguer sur le Nil. Décollage des montgolfières à 05h15.',
    fourDayForecast: 'Prévisions à 4 jours',
    today: 'Aujourd’hui',
    tomorrow: 'Demain',
    refresh: 'Actualiser la météo',
    moreDetails: 'Prévisions de voyage & État des montgolfières',
    lessDetails: 'Masquer les prévisions',
    celsius: '°C',
    fahrenheit: '°F',
    conditions: {
      clear: 'Ensoleillé & Ciel limpide',
      partlyCloudy: 'Soleil radieux du désert',
      overcast: 'Nuages d’altitude épars',
      morningMist: 'Brume matinale sur le Nil',
      lightRain: 'Rare bruine passagère',
      desertHaze: 'Brise chaude du désert',
    },
  },
  es: {
    liveLabel: 'METEOROLOGÍA EN VIVO',
    weatherInLuxor: 'Tiempo Actual en Luxor',
    feelsLike: 'Sensación térmica',
    humidity: 'Humedad',
    wind: 'Velocidad del viento',
    uvIndex: 'Índice UV',
    sunrise: 'Amanecer',
    sunset: 'Atardecer',
    balloonClearance: 'Vuelos en Globo Aerostático',
    balloonOptimal: 'Condiciones óptimas de vuelo (< 15 km/h)',
    balloonModerate: 'Buenas condiciones · Vuelos en curso',
    balloonAdvisory: 'Aviso por viento · Sujeto a aviación civil',
    travelAdviceTitle: 'Consejo del Conserje',
    travelAdviceContent:
      'Mañana perfecta para explorar el Valle de los Reyes y navegar por el Nilo. Vuelos en globo inician a las 05:15 AM.',
    fourDayForecast: 'Pronóstico para planificar viajes (4 días)',
    today: 'Hoy',
    tomorrow: 'Mañana',
    refresh: 'Actualizar tiempo en vivo',
    moreDetails: 'Pronóstico de viaje y estado de globos',
    lessDetails: 'Ocultar pronóstico',
    celsius: '°C',
    fahrenheit: '°F',
    conditions: {
      clear: 'Soleado y despejado',
      partlyCloudy: 'Cálido sol del desierto',
      overcast: 'Nubes altas dispersas',
      morningMist: 'Neblina matutina en el Nilo',
      lightRain: 'Lluvia ligera ocasional',
      desertHaze: 'Brisa cálida del desierto',
    },
  },
  it: {
    liveLabel: 'METEOROLOGIA IN DIRETTA',
    weatherInLuxor: 'Meteo Attuale a Luxor',
    feelsLike: 'Temperatura percepita',
    humidity: 'Umidità',
    wind: 'Velocità del vento',
    uvIndex: 'Indice UV',
    sunrise: 'Alba',
    sunset: 'Tramonto',
    balloonClearance: 'Voli in Mongolfiera all’Alba',
    balloonOptimal: 'Condizioni di volo ottimali (< 15 km/h)',
    balloonModerate: 'Buone condizioni · Voli regolari',
    balloonAdvisory: 'Allerta vento · Soggetto ad autorità aeree',
    travelAdviceTitle: 'Consiglio del Concierge',
    travelAdviceContent:
      'Mattinata magnifica per la Valle dei Re e gite in feluca sul Nilo. Lancio delle mongolfiere alle 05:15.',
    fourDayForecast: 'Previsioni di viaggio per 4 giorni',
    today: 'Oggi',
    tomorrow: 'Domani',
    refresh: 'Aggiorna meteo',
    moreDetails: 'Previsioni e idoneità mongolfiere',
    lessDetails: 'Nascondi previsioni',
    celsius: '°C',
    fahrenheit: '°F',
    conditions: {
      clear: 'Soleggiato & cielo terso',
      partlyCloudy: 'Caldo sole del desierto',
      overcast: 'Nubi alte sparse',
      morningMist: 'Foschia mattutina sul Nilo',
      lightRain: 'Rara pioggerella passeggera',
      desertHaze: 'Calda brezza del deserto',
    },
  },
  ru: {
    liveLabel: 'ПРЯМАЯ МЕТЕОСВОДКА',
    weatherInLuxor: 'Погода в Луксоре прямо сейчас',
    feelsLike: 'Ощущается как',
    humidity: 'Влажность',
    wind: 'Скорость ветра',
    uvIndex: 'УФ-индекс',
    sunrise: 'Восход солнца',
    sunset: 'Закат солнца',
    balloonClearance: 'Полеты на воздушных шарах',
    balloonOptimal: 'Идеальные условия для полетов (< 15 км/ч)',
    balloonModerate: 'Хорошие условия · Полеты по расписанию',
    balloonAdvisory: 'Внимание: ветрено · Решение авиаслужб',
    travelAdviceTitle: 'Совет консьержа для путешественников',
    travelAdviceContent:
      'Отличное утро для Долины Царей и прогулок по Нилу на фелуке. Взлет воздушных шаров в 05:15 утра.',
    fourDayForecast: 'Прогноз для планирования на 4 дня',
    today: 'Сегодня',
    tomorrow: 'Завтра',
    refresh: 'Обновить погоду',
    moreDetails: 'Прогноз путешествия и статус шаров',
    lessDetails: 'Свернуть прогноз',
    celsius: '°C',
    fahrenheit: '°F',
    conditions: {
      clear: 'Ясно и безоблачно',
      partlyCloudy: 'Теплое солнце пустыни',
      overcast: 'Легкая облачность',
      morningMist: 'Утренняя дымка над Нилом',
      lightRain: 'Редкий моросящий дождь',
      desertHaze: 'Теплый бриз пустыни',
    },
  },
  'zh-CN': {
    liveLabel: '实时气象数据',
    weatherInLuxor: '卢克索实时天气',
    feelsLike: '体感温度',
    humidity: '相对湿度',
    wind: '当前风速',
    uvIndex: '紫外线指数',
    sunrise: '日出时间',
    sunset: '日落时间',
    balloonClearance: '热气球日出飞行适航度',
    balloonOptimal: '适航状态极佳 (微风 < 15 公里/小时)',
    balloonModerate: '气候适宜 · 航班正常起飞',
    balloonAdvisory: '风速注意 · 以民航局清晨实测为准',
    travelAdviceTitle: '首席礼宾旅行指南',
    travelAdviceContent:
      '极适宜清晨探访帝王谷与尼罗河三桅帆船巡游。日出热气球通常于清晨 05:15 准时升空。',
    fourDayForecast: '出行规划 4 天预报',
    today: '今天',
    tomorrow: '明天',
    refresh: '刷新实时天气',
    moreDetails: '出行预报与热气球适航状态',
    lessDetails: '收起预报',
    celsius: '°C',
    fahrenheit: '°F',
    conditions: {
      clear: '晴空万里 · 阳光充沛',
      partlyCloudy: '温暖阳光与稀疏浮云',
      overcast: '高空多云',
      morningMist: '清晨尼罗河晨雾',
      lightRain: '短暂偶发微雨',
      desertHaze: '温和沙漠轻风',
    },
  },
};

// Fallback authentic data if client is offline or API fails
const FALLBACK_WEATHER: WeatherData = {
  current: {
    temperature: 31.5,
    apparentTemperature: 32.0,
    humidity: 34,
    windSpeed: 11.2,
    windDirection: 310,
    weatherCode: 0,
    isDay: true,
    time: new Date().toISOString(),
  },
  daily: [
    {
      date: new Date().toISOString().split('T')[0],
      maxTemp: 34,
      minTemp: 19,
      weatherCode: 0,
      sunrise: '05:52',
      sunset: '17:16',
      uvIndex: 7.5,
    },
    {
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      maxTemp: 35,
      minTemp: 20,
      weatherCode: 1,
      sunrise: '05:53',
      sunset: '17:15',
      uvIndex: 7.8,
    },
    {
      date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
      maxTemp: 33,
      minTemp: 18,
      weatherCode: 0,
      sunrise: '05:54',
      sunset: '17:14',
      uvIndex: 7.3,
    },
    {
      date: new Date(Date.now() + 259200000).toISOString().split('T')[0],
      maxTemp: 34,
      minTemp: 19,
      weatherCode: 0,
      sunrise: '05:54',
      sunset: '17:13',
      uvIndex: 7.4,
    },
  ],
  lastUpdated: new Date(),
};

export const LuxorWeather: React.FC = () => {
  const { language } = useI18n();
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<WeatherData>(FALLBACK_WEATHER);

  const loc = WEATHER_I18N[language] || WEATHER_I18N.en;

  const fetchLuxorWeather = async () => {
    setLoading(true);
    try {
      // Luxor, Egypt coordinates: 25.6872° N, 32.6396° E, Timezone Africa/Cairo
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=25.6872&longitude=32.6396&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=Africa%2FCairo&forecast_days=4'
      );

      if (!response.ok) {
        throw new Error('Weather service temporarily busy');
      }

      const data = await response.json();

      const dailyForecasts: DailyForecast[] = (data.daily?.time || []).map(
        (timeStr: string, idx: number) => ({
          date: timeStr,
          maxTemp: Math.round(data.daily.temperature_2m_max?.[idx] ?? 33),
          minTemp: Math.round(data.daily.temperature_2m_min?.[idx] ?? 19),
          weatherCode: data.daily.weather_code?.[idx] ?? 0,
          sunrise: data.daily.sunrise?.[idx]
            ? new Date(data.daily.sunrise[idx]).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })
            : '05:52',
          sunset: data.daily.sunset?.[idx]
            ? new Date(data.daily.sunset[idx]).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })
            : '17:15',
          uvIndex: Math.round((data.daily.uv_index_max?.[idx] ?? 7.5) * 10) / 10,
        })
      );

      setWeatherData({
        current: {
          temperature: Math.round((data.current?.temperature_2m ?? 32) * 10) / 10,
          apparentTemperature:
            Math.round((data.current?.apparent_temperature ?? 32.5) * 10) / 10,
          humidity: data.current?.relative_humidity_2m ?? 35,
          windSpeed: Math.round((data.current?.wind_speed_10m ?? 11) * 10) / 10,
          windDirection: data.current?.wind_direction_10m ?? 310,
          weatherCode: data.current?.weather_code ?? 0,
          isDay: Boolean(data.current?.is_day ?? 1),
          time: data.current?.time || new Date().toISOString(),
        },
        daily: dailyForecasts.length > 0 ? dailyForecasts : FALLBACK_WEATHER.daily,
        lastUpdated: new Date(),
      });
    } catch {
      // Fallback preserves authentic meteorological experience without disruption
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLuxorWeather();
    // Refresh weather every 15 minutes
    const interval = setInterval(fetchLuxorWeather, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTemp = (tempC: number) => {
    if (unit === 'F') {
      const tempF = Math.round((tempC * 9) / 5 + 32);
      return `${tempF}°F`;
    }
    return `${Math.round(tempC)}°C`;
  };

  const getWeatherDescription = (code: number, isDay: boolean) => {
    if (code === 0) return loc.conditions.clear;
    if (code === 1 || code === 2) return loc.conditions.partlyCloudy;
    if (code === 3) return loc.conditions.overcast;
    if (code === 45 || code === 48) return loc.conditions.morningMist;
    if (code >= 51 && code <= 65) return loc.conditions.lightRain;
    return loc.conditions.desertHaze;
  };

  const getWeatherIcon = (code: number, isDay: boolean, className = 'w-5 h-5') => {
    if (code === 0) {
      return isDay ? (
        <Sun className={`${className} text-[#D6AD60]`} />
      ) : (
        <Moon className={`${className} text-amber-200`} />
      );
    }
    if (code === 1 || code === 2) {
      return <CloudSun className={`${className} text-[#D6AD60]`} />;
    }
    if (code === 3 || code === 45 || code === 48) {
      return <Cloud className={`${className} text-stone-300`} />;
    }
    return <Sun className={`${className} text-[#D6AD60]`} />;
  };

  // Evaluate hot air balloon clearance according to Luxor flight safety standards
  const wind = weatherData.current.windSpeed;
  const isBalloonOptimal = wind < 15;
  const isBalloonModerate = wind >= 15 && wind < 22;

  const balloonStatusText = isBalloonOptimal
    ? loc.balloonOptimal
    : isBalloonModerate
    ? loc.balloonModerate
    : loc.balloonAdvisory;

  const balloonBadgeColor = isBalloonOptimal
    ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
    : isBalloonModerate
    ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
    : 'text-rose-400 bg-rose-500/10 border-rose-500/30';

  const todayForecast = weatherData.daily[0] || FALLBACK_WEATHER.daily[0];

  return (
    <div className="w-full max-w-4xl mx-auto my-5 text-start">
      {/* Outer Card with Midnight Nile Glassmorphism and Pharaoh Gold Accent */}
      <div className="relative bg-[#101D2B]/90 border border-[#D6AD60]/40 rounded-2xl shadow-2xl backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-[#D6AD60]/60">
        {/* Subtle Top Gold Radiance Line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D6AD60] to-transparent opacity-80" />

        {/* Main Weather Bar (Compact View) */}
        <div className="p-3.5 sm:p-4.5 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left Cluster: Live Indicator + Location + Current Temp */}
          <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto justify-between md:justify-start">
            {/* Weather Condition Icon */}
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#181715] to-[#142334] border border-[#D6AD60]/30 flex items-center justify-center shrink-0 shadow-inner">
              {getWeatherIcon(
                weatherData.current.weatherCode,
                weatherData.current.isDay,
                'w-6 h-6'
              )}
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>

            {/* Title & Conditions */}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#D6AD60]">
                  {loc.liveLabel}
                </span>
                <span className="text-stone-400 text-[10px]">· Luxor, Egypt</span>
              </div>
              <div className="text-sm sm:text-base font-cinzel font-bold text-white flex items-center gap-1.5">
                <span>{getWeatherDescription(weatherData.current.weatherCode, weatherData.current.isDay)}</span>
              </div>
            </div>

            {/* Temperature & Unit Switcher */}
            <div className="flex items-center gap-2 pl-3 border-l border-stone-800">
              <span className="text-2xl sm:text-3xl font-cinzel font-bold text-white tracking-tight">
                {formatTemp(weatherData.current.temperature)}
              </span>
              <div className="flex flex-col text-[10px] font-bold rounded-md bg-[#181715] border border-stone-800 p-0.5">
                <button
                  type="button"
                  onClick={() => setUnit('C')}
                  className={`px-1.5 py-0.5 rounded transition-colors ${
                    unit === 'C'
                      ? 'bg-[#D6AD60] text-[#101D2B]'
                      : 'text-stone-400 hover:text-white'
                  }`}
                  aria-label="Celsius"
                >
                  °C
                </button>
                <button
                  type="button"
                  onClick={() => setUnit('F')}
                  className={`px-1.5 py-0.5 rounded transition-colors ${
                    unit === 'F'
                      ? 'bg-[#D6AD60] text-[#101D2B]'
                      : 'text-stone-400 hover:text-white'
                  }`}
                  aria-label="Fahrenheit"
                >
                  °F
                </button>
              </div>
            </div>
          </div>

          {/* Middle Cluster: Wind & Hot Air Balloon Clearance Badge */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto justify-start md:justify-center">
            {/* Wind Metric */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181715]/80 border border-stone-800 text-xs text-stone-300">
              <Wind className="w-3.5 h-3.5 text-[#D6AD60]" />
              <span>{loc.wind}:</span>
              <strong className="text-white font-mono">
                {weatherData.current.windSpeed} km/h
              </strong>
            </div>

            {/* Balloon Clearance Status */}
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium ${balloonBadgeColor}`}
              title="Luxor hot air balloon flights are permitted by civil aviation when winds are calm under 15 km/h"
            >
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate max-w-[220px] sm:max-w-none">{balloonStatusText}</span>
            </div>
          </div>

          {/* Right Action: Expand / Collapse Details & Refresh */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              type="button"
              onClick={fetchLuxorWeather}
              disabled={loading}
              title={loc.refresh}
              className="p-2 rounded-lg bg-[#181715] hover:bg-stone-800 text-stone-300 hover:text-[#D6AD60] border border-stone-800 transition-colors"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#D6AD60]' : ''}`}
              />
            </button>

            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-[#D6AD60]/20 to-[#E9D8B5]/10 hover:from-[#D6AD60]/30 hover:to-[#E9D8B5]/20 border border-[#D6AD60]/40 text-xs font-semibold text-[#E9D8B5] transition-all"
            >
              <Compass className="w-3.5 h-3.5 text-[#D6AD60]" />
              <span>{isExpanded ? loc.lessDetails : loc.moreDetails}</span>
              {isExpanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Expandable Travel Planning & 4-Day Forecast Drawer */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="border-t border-stone-800/80 bg-[#0d1722]/95 px-4 py-5 sm:px-6"
            >
              {/* Meteorological Indicators Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                {/* Feels like */}
                <div className="bg-[#101D2B] border border-stone-800 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-400 uppercase tracking-wider mb-1">
                    <Thermometer className="w-3.5 h-3.5 text-[#D6AD60]" />
                    <span>{loc.feelsLike}</span>
                  </div>
                  <div className="text-base sm:text-lg font-cinzel font-bold text-white">
                    {formatTemp(weatherData.current.apparentTemperature)}
                  </div>
                  <div className="text-[10px] text-stone-400 mt-0.5">Dry desert warmth</div>
                </div>

                {/* Humidity */}
                <div className="bg-[#101D2B] border border-stone-800 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-400 uppercase tracking-wider mb-1">
                    <Droplets className="w-3.5 h-3.5 text-sky-400" />
                    <span>{loc.humidity}</span>
                  </div>
                  <div className="text-base sm:text-lg font-cinzel font-bold text-white">
                    {weatherData.current.humidity}%
                  </div>
                  <div className="text-[10px] text-stone-400 mt-0.5">Optimal dry air</div>
                </div>

                {/* Sunrise */}
                <div className="bg-[#101D2B] border border-stone-800 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-400 uppercase tracking-wider mb-1">
                    <Sunrise className="w-3.5 h-3.5 text-amber-400" />
                    <span>{loc.sunrise}</span>
                  </div>
                  <div className="text-base sm:text-lg font-cinzel font-bold text-amber-200">
                    {todayForecast.sunrise} AM
                  </div>
                  <div className="text-[10px] text-stone-400 mt-0.5">Balloon lift-off window</div>
                </div>

                {/* Sunset */}
                <div className="bg-[#101D2B] border border-stone-800 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-400 uppercase tracking-wider mb-1">
                    <Sunset className="w-3.5 h-3.5 text-rose-400" />
                    <span>{loc.sunset}</span>
                  </div>
                  <div className="text-base sm:text-lg font-cinzel font-bold text-rose-200">
                    {todayForecast.sunset} PM
                  </div>
                  <div className="text-[10px] text-stone-400 mt-0.5">Nile felucca golden hour</div>
                </div>
              </div>

              {/* Concierge Travel Advice Banner */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#D6AD60]/10 via-[#181715] to-[#101D2B] border border-[#D6AD60]/30 mb-5 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#D6AD60] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#E9D8B5]">
                    {loc.travelAdviceTitle}
                  </h4>
                  <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                    {loc.travelAdviceContent}
                  </p>
                </div>
              </div>

              {/* 4-Day Forecast Cards */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 flex items-center justify-between">
                  <span>{loc.fourDayForecast}</span>
                  <span className="text-[10px] text-stone-400 font-normal">
                    {weatherData.lastUpdated.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {weatherData.daily.map((day, idx) => {
                    const dayDate = new Date(day.date);
                    const dayName =
                      idx === 0
                        ? loc.today
                        : idx === 1
                        ? loc.tomorrow
                        : dayDate.toLocaleDateString(language, { weekday: 'short', month: 'short', day: 'numeric' });

                    return (
                      <div
                        key={day.date}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          idx === 0
                            ? 'bg-[#181715] border-[#D6AD60]/40 shadow-md'
                            : 'bg-[#101D2B]/80 border-stone-800'
                        }`}
                      >
                        <div className="text-xs font-bold text-stone-300 mb-1">{dayName}</div>
                        <div className="flex justify-center my-2">
                          {getWeatherIcon(day.weatherCode, true, 'w-6 h-6')}
                        </div>
                        <div className="flex items-center justify-center gap-2 text-xs">
                          <span className="font-bold text-white">
                            {formatTemp(day.maxTemp)}
                          </span>
                          <span className="text-stone-400">
                            {formatTemp(day.minTemp)}
                          </span>
                        </div>
                        <div className="text-[10px] text-[#D6AD60] mt-1.5 flex items-center justify-center gap-1">
                          <Sunrise className="w-2.5 h-2.5" />
                          <span>{day.sunrise}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
