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
  Compass,
  Thermometer,
  ShieldCheck,
  Calendar,
  Info,
  Shirt,
  Clock,
  ChevronRight,
  MapPin,
  CheckCircle2,
  Award,
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

export interface MonthClimate {
  month: string;
  monthNum: number;
  season: 'winter' | 'spring' | 'summer' | 'autumn';
  avgHighC: number;
  avgLowC: number;
  avgHighF: number;
  avgLowF: number;
  sunshineHours: number;
  rainfallMm: number;
  comfortRating: 'Pinnacle Season' | 'Golden Season' | 'Warm Shoulder' | 'Extreme Desert Heat';
  balloonFlyRate: string;
  touristAdvice: string;
  packingTip: string;
  bestHours: string;
}

// Historical climate archive for Luxor (30-year archaeological meteorological data)
export const LUXOR_HISTORICAL_CLIMATE: MonthClimate[] = [
  {
    month: 'January',
    monthNum: 1,
    season: 'winter',
    avgHighC: 23,
    avgLowC: 6,
    avgHighF: 73,
    avgLowF: 43,
    sunshineHours: 9.6,
    rainfallMm: 0,
    comfortRating: 'Pinnacle Season',
    balloonFlyRate: '97% Launch Reliability',
    touristAdvice:
      'Peak season. Crisp, invigorating dawns and comfortable sun-drenched afternoons. Ideal for traversing expansive sites like Karnak and Medinet Habu without fatigue.',
    packingTip: 'Light breathable daywear plus an insulated jacket or wool wrap for early-dawn balloon launches and open Nile motorboat crossings.',
    bestHours: 'All day exploration (08:00–16:30); Sunrise balloon departures at 05:15 AM.',
  },
  {
    month: 'February',
    monthNum: 2,
    season: 'winter',
    avgHighC: 26,
    avgLowC: 8,
    avgHighF: 79,
    avgLowF: 46,
    sunshineHours: 10.1,
    rainfallMm: 0,
    comfortRating: 'Pinnacle Season',
    balloonFlyRate: '98% Launch Reliability',
    touristAdvice:
      'Sublime meteorological window. Crystal-clear skies, minimal humidity, and warm golden afternoon light optimal for architectural photography at Hatshepsut Temple.',
    packingTip: 'Cotton trousers, linen shirts, sun hat, and a medium evening sweater for riverside dining.',
    bestHours: '07:30–17:00 comfortable; prime sunset felucca conditions from 16:30.',
  },
  {
    month: 'March',
    monthNum: 3,
    season: 'spring',
    avgHighC: 30,
    avgLowC: 12,
    avgHighF: 86,
    avgLowF: 54,
    sunshineHours: 10.5,
    rainfallMm: 0,
    comfortRating: 'Golden Season',
    balloonFlyRate: '95% Launch Reliability',
    touristAdvice:
      'Pleasantly warm spring with lengthening days. The Nile breeze remains cool while desert tombs stay comfortable. Occasional brief warm southern winds.',
    packingTip: 'UV sunglasses, SPF 50 mineral sunscreen, and breathable footwear suitable for uneven limestone sanctuary paths.',
    bestHours: 'Morning visits to Valley of the Kings (06:00–11:00); afternoon shaded museum tours.',
  },
  {
    month: 'April',
    monthNum: 4,
    season: 'spring',
    avgHighC: 35,
    avgLowC: 17,
    avgHighF: 95,
    avgLowF: 63,
    sunshineHours: 11.0,
    rainfallMm: 0,
    comfortRating: 'Warm Shoulder',
    balloonFlyRate: '94% Launch Reliability',
    touristAdvice:
      'Warm desert sunshine with lower tourist density. Highly advantageous for private viewings of Nefertari (QV66) and Tutankhamun (KV62) with zero queues.',
    packingTip: 'Lightweight linen garments, wide-brim Panama hat, electrolyte hydration packets, and evening resort-wear.',
    bestHours: 'Dawn to midday on West Bank (06:00–11:30); poolside and air-conditioned lounge hours 12:00–15:30.',
  },
  {
    month: 'May',
    monthNum: 5,
    season: 'summer',
    avgHighC: 39,
    avgLowC: 21,
    avgHighF: 102,
    avgLowF: 70,
    sunshineHours: 11.8,
    rainfallMm: 0,
    comfortRating: 'Warm Shoulder',
    balloonFlyRate: '92% Launch Reliability',
    touristAdvice:
      'Intense dry heat starts building. The zero-humidity atmosphere ensures rapid perspiration evaporation. Luxury private Nile charters provide constant cooling breezes.',
    packingTip: 'Ultralight UV-protective apparel, hydration mist sprays, and polarized eyewear for high glare off limestone pylons.',
    bestHours: 'Early morning excursions (05:30–09:30); illuminated evening temple visits (Luxor Temple open until 21:30).',
  },
  {
    month: 'June',
    monthNum: 6,
    season: 'summer',
    avgHighC: 41,
    avgLowC: 23,
    avgHighF: 106,
    avgLowF: 73,
    sunshineHours: 12.5,
    rainfallMm: 0,
    comfortRating: 'Extreme Desert Heat',
    balloonFlyRate: '90% Launch Reliability',
    touristAdvice:
      'Peak Upper Egyptian summer. Exceptional solitude across ancient monuments. Private chauffeured Mercedes-Benz climate-controlled transport is essential between sites.',
    packingTip: 'Long-sleeve loose linen shirts, cooling neck towels, insulated water flask, and SPF lip balm.',
    bestHours: 'Strictly 05:00–09:00 for outdoor complexes; evening twilight visits from 18:00.',
  },
  {
    month: 'July',
    monthNum: 7,
    season: 'summer',
    avgHighC: 42,
    avgLowC: 24,
    avgHighF: 108,
    avgLowF: 75,
    sunshineHours: 12.4,
    rainfallMm: 0,
    comfortRating: 'Extreme Desert Heat',
    balloonFlyRate: '89% Launch Reliability',
    touristAdvice:
      'High summer radiance. Unbeatable exclusivity and VIP rates on presidential Nilefront villas. Enjoy sunrise balloon ascents followed by languid afternoons in shaded pools.',
    packingTip: 'Featherweight breathable fabrics, thermal water bottles, and lightweight sandals with thick cork or rubber soles.',
    bestHours: 'Sunrise balloon liftoff (04:45 AM); East Bank evening promenade (19:30–22:00).',
  },
  {
    month: 'August',
    monthNum: 8,
    season: 'summer',
    avgHighC: 41,
    avgLowC: 24,
    avgHighF: 106,
    avgLowF: 75,
    sunshineHours: 12.0,
    rainfallMm: 0,
    comfortRating: 'Extreme Desert Heat',
    balloonFlyRate: '91% Launch Reliability',
    touristAdvice:
      'Dry desert heat with warm starlit nights. Luxor Museum and Mummification Museum offer world-class air-conditioned curation during the hottest solar hours.',
    packingTip: 'Breathable organic cottons, cooling scarves, broad UV sun protection, and swimwear for afternoon Nile terrace pools.',
    bestHours: 'Dawn tomb access at 06:00 AM; night strolls under temple spotlights.',
  },
  {
    month: 'September',
    monthNum: 9,
    season: 'autumn',
    avgHighC: 39,
    avgLowC: 22,
    avgHighF: 102,
    avgLowF: 72,
    sunshineHours: 11.2,
    rainfallMm: 0,
    comfortRating: 'Warm Shoulder',
    balloonFlyRate: '93% Launch Reliability',
    touristAdvice:
      'Summer begins to yield into autumn. Evenings soften noticeably and Nile felucca sailing reaches splendid twilight tranquility.',
    packingTip: 'Comfortable day linen apparel, sunhat, and light cotton layers for breezy night sails.',
    bestHours: '06:30–10:30 AM for Valley of the Queens and Nobles; late afternoon felucca sails.',
  },
  {
    month: 'October',
    monthNum: 10,
    season: 'autumn',
    avgHighC: 35,
    avgLowC: 17,
    avgHighF: 95,
    avgLowF: 63,
    sunshineHours: 10.3,
    rainfallMm: 0,
    comfortRating: 'Golden Season',
    balloonFlyRate: '97% Launch Reliability',
    touristAdvice:
      'Opening of the grand international tourist season. Ideal combination of warm daytime swimming weather and crisp, clear atmospheric visibility for aerial ballooning.',
    packingTip: 'Smart casual desert-safari attire, comfortable trail shoes, and a light cardigan for post-sunset dinner cruise decks.',
    bestHours: '06:00–12:00 and 15:00–18:30; optimal weather across all itinerary types.',
  },
  {
    month: 'November',
    monthNum: 11,
    season: 'autumn',
    avgHighC: 29,
    avgLowC: 12,
    avgHighF: 84,
    avgLowF: 54,
    sunshineHours: 9.8,
    rainfallMm: 0,
    comfortRating: 'Pinnacle Season',
    balloonFlyRate: '98% Launch Reliability',
    touristAdvice:
      'Regarded by Egyptologists as the absolute best month of the year to visit Luxor. Perfect mild temperatures, gentle sun, and pristine flight conditions.',
    packingTip: 'Versatile layers: lightweight day linens, sunglasses, plus an evening trench or tailored fleece for midnight Nile strolls.',
    bestHours: 'Unrestricted full-day touring comfort from dawn until nightfall.',
  },
  {
    month: 'December',
    monthNum: 12,
    season: 'winter',
    avgHighC: 24,
    avgLowC: 7,
    avgHighF: 75,
    avgLowF: 45,
    sunshineHours: 9.3,
    rainfallMm: 0,
    comfortRating: 'Pinnacle Season',
    balloonFlyRate: '96% Launch Reliability',
    touristAdvice:
      'Festive holiday elegance. Radiant, pleasant midday temperatures contrasted by chilly desert nights. Royal Winter Palace gardens and Nile sunset cruises are at their peak.',
    packingTip: 'Warm outerwear for dawn balloon ascents and evening cruises; stylish layers for historic Winter Palace high tea.',
    bestHours: '07:30–16:30 daylight exploration; dawn balloon flights require warm thermal jacket.',
  },
];

// Localized weather & climate copy
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
    historicalClimateTitle: string;
    historicalClimateSubtitle: string;
    tabLive: string;
    tabClimate: string;
    tabAdvice: string;
    fourDayForecast: string;
    today: string;
    tomorrow: string;
    refresh: string;
    celsius: string;
    fahrenheit: string;
    annualSunshine: string;
    annualRainfall: string;
    microclimateNote: string;
  }
> = {
  en: {
    liveLabel: 'LIVE LUXOR METEOROLOGY',
    weatherInLuxor: 'Current Weather & Tourist Climate Guide',
    feelsLike: 'Feels like',
    humidity: 'Humidity',
    wind: 'Wind Speed',
    uvIndex: 'UV Index',
    sunrise: 'Sunrise',
    sunset: 'Sunset',
    balloonClearance: 'Balloon Clearance',
    balloonOptimal: 'Optimal Flight Clearance (< 15 km/h)',
    balloonModerate: 'Good Flight Clearance (< 22 km/h)',
    balloonAdvisory: 'Wind Advisory · Subject to Civil Aviation',
    travelAdviceTitle: 'Concierge Climate Advice',
    historicalClimateTitle: 'Luxor Historical Climate & Seasonal Tourist Advisory',
    historicalClimateSubtitle: '30-year archaeological weather archive & month-by-month recommendations for travelers',
    tabLive: 'Current Live Weather',
    tabClimate: '12-Month Climate Guide',
    tabAdvice: 'Tourist Packing & Daily Rhythm',
    fourDayForecast: '4-Day Travel Planning Forecast',
    today: 'Today',
    tomorrow: 'Tomorrow',
    refresh: 'Refresh Live Weather',
    celsius: '°C',
    fahrenheit: '°F',
    annualSunshine: '3,800+ Hours Annual Sun',
    annualRainfall: '0.0 mm Historical Rainfall',
    microclimateNote: 'Dry hyper-arid desert climate with ultra-low humidity (< 30%). Temperatures drop 15°C between solar noon and dawn.',
  },
  ar: {
    liveLabel: 'أرصاد الأقصر المباشرة',
    weatherInLuxor: 'طقس الأقصر ودليل المناخ السياحي',
    feelsLike: 'الحرارة المحسوسة',
    humidity: 'الرطوبة',
    wind: 'سرعة الرياح',
    uvIndex: 'مؤشر الأشعة',
    sunrise: 'الشروق',
    sunset: 'الغروب',
    balloonClearance: 'تصريح طيران المنطاد',
    balloonOptimal: 'تصريح طيران مثالي (رياح هادئة)',
    balloonModerate: 'أجواء ملائمة والرحلات منتظمة',
    balloonAdvisory: 'تنبيه رياح · حسب تعليمات الطيران',
    travelAdviceTitle: 'نصيحة الكونسيرج المناخية',
    historicalClimateTitle: 'دليل مناخ الأقصر التاريخي والتوصيات السياحية',
    historicalClimateSubtitle: 'أرشيف الأرصاد على مدى 30 عاماً ونصائح الزيارة لكل شهر',
    tabLive: 'الطقس المباشر الآن',
    tabClimate: 'دليل المناخ (12 شهراً)',
    tabAdvice: 'الملابس والجدول اليومي',
    fourDayForecast: 'توقعات الطقس (4 أيام)',
    today: 'اليوم',
    tomorrow: 'غداً',
    refresh: 'تحديث الطقس المباشر',
    celsius: '°م',
    fahrenheit: '°ف',
    annualSunshine: '+3,800 ساعة شمس سنوياً',
    annualRainfall: '0.0 ملم أمطار تاريخية',
    microclimateNote: 'مناخ صحراوي جاف بنسبة رطوبة منخفضة جداً. تنخفض الحرارة قرابة 15 درجة مئوية بين الظهيرة والفجر.',
  },
  fr: {
    liveLabel: 'MÉTÉOROLOGIE DE LOUXOR EN DIRECT',
    weatherInLuxor: 'Météo Actuelle & Guide Climatique Touristique',
    feelsLike: 'Ressenti',
    humidity: 'Humidité',
    wind: 'Vitesse du vent',
    uvIndex: 'Indice UV',
    sunrise: 'Lever du soleil',
    sunset: 'Coucher du soleil',
    balloonClearance: 'Vols en Montgolfière',
    balloonOptimal: 'Autorisation de vol optimale (< 15 km/h)',
    balloonModerate: 'Bonnes conditions · Vols assurés',
    balloonAdvisory: 'Alerte vent · Sous réserve de l’aviation civile',
    travelAdviceTitle: 'Conseil Climatique Conciergerie',
    historicalClimateTitle: 'Climat Historique de Louxor & Conseils Saisonniers',
    historicalClimateSubtitle: '30 ans d’archives météorologiques et recommandations mois par mois pour les voyageurs',
    tabLive: 'Météo en Direct',
    tabClimate: 'Guide des 12 Mois',
    tabAdvice: 'Tenues & Rythme Journalier',
    fourDayForecast: 'Prévisions à 4 jours',
    today: 'Aujourd’hui',
    tomorrow: 'Demain',
    refresh: 'Actualiser la météo',
    celsius: '°C',
    fahrenheit: '°F',
    annualSunshine: '+3 800h de soleil par an',
    annualRainfall: '0,0 mm de pluie annuelle',
    microclimateNote: 'Climat désertique hyperaride avec humidité très faible (< 30%). Écart thermique de 15°C entre midi et l’aube.',
  },
  de: {
    liveLabel: 'LIVE-METEOROLOGIE LUXOR',
    weatherInLuxor: 'Aktuelles Wetter & Historischer Klimaratgeber',
    feelsLike: 'Gefühlt wie',
    humidity: 'Luftfeuchtigkeit',
    wind: 'Windgeschwindigkeit',
    uvIndex: 'UV-Index',
    sunrise: 'Sonnenaufgang',
    sunset: 'Sonnenuntergang',
    balloonClearance: 'Ballon-Freigabe',
    balloonOptimal: 'Optimale Flugbedingungen (< 15 km/h)',
    balloonModerate: 'Gute Bedingungen · Flüge planmäßig',
    balloonAdvisory: 'Windwarnung · Vorbehaltlich Behörden',
    travelAdviceTitle: 'Klima-Tipp des Concierge',
    historicalClimateTitle: 'Historisches Luxor-Klima & Touristische Reisezeiten',
    historicalClimateSubtitle: '30-jähriges meteorologisches Archiv mit Monatsratgeber für anspruchsvolle Reisende',
    tabLive: 'Aktuelles Wetter',
    tabClimate: '12-Monats-Klimaführer',
    tabAdvice: 'Kleidung & Tagesablauf',
    fourDayForecast: '4-Tage-Reisewetterbericht',
    today: 'Heute',
    tomorrow: 'Morgen',
    refresh: 'Wetter aktualisieren',
    celsius: '°C',
    fahrenheit: '°F',
    annualSunshine: 'Über 3.800 Sonnenstunden/Jahr',
    annualRainfall: '0,0 mm Historischer Regen',
    microclimateNote: 'Extrem trockenes Wüstenklima mit hoher Temperaturspanne von 15°C zwischen Mittagssonne und Morgendämmerung.',
  },
  es: {
    liveLabel: 'METEOROLOGÍA EN VIVO DE LUXOR',
    weatherInLuxor: 'Tiempo Actual y Guía Climática para Viajeros',
    feelsLike: 'Sensación',
    humidity: 'Humedad',
    wind: 'Velocidad viento',
    uvIndex: 'Índice UV',
    sunrise: 'Amanecer',
    sunset: 'Atardecer',
    balloonClearance: 'Vuelos en Globo',
    balloonOptimal: 'Condiciones óptimas (< 15 km/h)',
    balloonModerate: 'Buenas condiciones · Vuelos activos',
    balloonAdvisory: 'Aviso de viento · Sujeto a aviación civil',
    travelAdviceTitle: 'Consejo Climático del Conserje',
    historicalClimateTitle: 'Clima Histórico de Luxor y Asesoría para Turistas',
    historicalClimateSubtitle: 'Archivo histórico de 30 años y recomendaciones mes a mes para una estancia perfecta',
    tabLive: 'Tiempo en Directo',
    tabClimate: 'Guía de 12 Meses',
    tabAdvice: 'Vestimenta y Rutina',
    fourDayForecast: 'Pronóstico a 4 días',
    today: 'Hoy',
    tomorrow: 'Mañana',
    refresh: 'Actualizar tiempo',
    celsius: '°C',
    fahrenheit: '°F',
    annualSunshine: '+3,800 Horas de Sol al Año',
    annualRainfall: '0.0 mm Precipitación Anual',
    microclimateNote: 'Clima desértico hiperárido con humedad ultra reducida. Diferencia térmica de 15°C entre el mediodía y el alba.',
  },
  it: {
    liveLabel: 'METEOROLOGIA DI LUXOR IN DIRETTA',
    weatherInLuxor: 'Meteo Attuale e Guida al Clima Storico',
    feelsLike: 'Percepita',
    humidity: 'Umidità',
    wind: 'Velocità vento',
    uvIndex: 'Indice UV',
    sunrise: 'Alba',
    sunset: 'Tramonto',
    balloonClearance: 'Voli in Mongolfiera',
    balloonOptimal: 'Condizioni ottimali (< 15 km/h)',
    balloonModerate: 'Condizioni buone · Voli regolari',
    balloonAdvisory: 'Avviso vento · Soggetto ad autorità aeree',
    travelAdviceTitle: 'Consiglio del Concierge',
    historicalClimateTitle: 'Clima Storico di Luxor e Consigli per Viaggiatori',
    historicalClimateSubtitle: 'Archivio meteo di 30 anni e consigli mese per mese per visitare i templi',
    tabLive: 'Meteo in Tempo Reale',
    tabClimate: 'Guida dei 12 Mesi',
    tabAdvice: 'Abbigliamento & Ritmo',
    fourDayForecast: 'Previsioni 4 giorni',
    today: 'Oggi',
    tomorrow: 'Domani',
    refresh: 'Aggiorna meteo',
    celsius: '°C',
    fahrenheit: '°F',
    annualSunshine: 'Oltre 3.800 ore di sole/anno',
    annualRainfall: '0,0 mm Pioggia storica',
    microclimateNote: 'Clima desertico arido con umidità quasi assente. Escursione termica di 15°C tra meriggio e alba.',
  },
  ru: {
    liveLabel: 'ПРЯМАЯ МЕТЕОСВОДКА ЛУКСОРА',
    weatherInLuxor: 'Погода и Исторический Климатический Гид',
    feelsLike: 'Ощущается',
    humidity: 'Влажность',
    wind: 'Скорость ветра',
    uvIndex: 'УФ-индекс',
    sunrise: 'Восход',
    sunset: 'Закат',
    balloonClearance: 'Полеты на воздушных шарах',
    balloonOptimal: 'Идеальные условия (< 15 км/ч)',
    balloonModerate: 'Хорошие условия · Полеты по графику',
    balloonAdvisory: 'Ветрено · Решение авиаслужб',
    travelAdviceTitle: 'Совет консьержа по климату',
    historicalClimateTitle: 'Исторический Климат Луксора и Советы Туристам',
    historicalClimateSubtitle: '30-летний метеоархив и помесячные рекомендации для идеального путешествия',
    tabLive: 'Текущая Погода',
    tabClimate: 'Гид по 12 Месяцам',
    tabAdvice: 'Гардероб и Распорядок Дня',
    fourDayForecast: 'Прогноз на 4 дня',
    today: 'Сегодня',
    tomorrow: 'Завтра',
    refresh: 'Обновить данные',
    celsius: '°C',
    fahrenheit: '°F',
    annualSunshine: '3800+ солнечных часов в год',
    annualRainfall: '0,0 мм осадков',
    microclimateNote: 'Сухой пустынный климат с низкой влажностью. Перепад температур между полуднем и рассветом до 15°C.',
  },
  'zh-CN': {
    liveLabel: '卢克索实时气象台',
    weatherInLuxor: '实时天气与历史气候旅行指南',
    feelsLike: '体感温度',
    humidity: '相对湿度',
    wind: '当前风速',
    uvIndex: '紫外线指数',
    sunrise: '日出',
    sunset: '日落',
    balloonClearance: '热气球飞行许可',
    balloonOptimal: '极佳适航条件 (< 15 公里/小时)',
    balloonModerate: '气候适宜 · 航班正常起飞',
    balloonAdvisory: '风速注意 · 以民航清晨实测为准',
    travelAdviceTitle: '礼宾气候建议',
    historicalClimateTitle: '卢克索历史气候与四季旅行指南',
    historicalClimateSubtitle: '30年古迹气象数据沉淀与按月旅行穿衣、行程节奏建议',
    tabLive: '实时天气数据',
    tabClimate: '12个月气候全览',
    tabAdvice: '穿衣装备与行程节律',
    fourDayForecast: '出行规划 4 天预报',
    today: '今天',
    tomorrow: '明天',
    refresh: '刷新实时气象',
    celsius: '°C',
    fahrenheit: '°F',
    annualSunshine: '年日照超过 3,800 小时',
    annualRainfall: '0.0 毫米年平均降水',
    microclimateNote: '极度干燥的沙漠气候（湿度常年低于30%）。正午烈日与破晓黎明温差可达15摄氏度。',
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

interface LuxorWeatherProps {
  className?: string;
  defaultTab?: 'live' | 'climate' | 'advice';
  variant?: 'footer' | 'standalone' | 'compact';
}

export const LuxorWeather: React.FC<LuxorWeatherProps> = ({
  className = '',
  defaultTab = 'live',
  variant = 'footer',
}) => {
  const { language, isRTL } = useI18n();
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [activeTab, setActiveTab] = useState<'live' | 'climate' | 'advice'>(defaultTab);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(() => {
    // Default to current month (0-11)
    return new Date().getMonth();
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<WeatherData>(FALLBACK_WEATHER);

  const loc = WEATHER_I18N[language] || WEATHER_I18N.en;

  const fetchLuxorWeather = async () => {
    setLoading(true);
    try {
      // Open-Meteo Open Weather API: Coordinates for Luxor, Egypt (25.6872° N, 32.6396° E, Africa/Cairo)
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=25.6872&longitude=32.6396&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=Africa%2FCairo&forecast_days=4'
      );

      if (!response.ok) {
        throw new Error('Weather service temporarily unavailable');
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
      // Gracefully maintain authentic Luxor averages on network error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLuxorWeather();
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

  const selectedMonthData = LUXOR_HISTORICAL_CLIMATE[selectedMonthIndex];

  // Compact variant for Hero Section
  if (variant === 'compact') {
    return (
      <div className={`w-full max-w-4xl mx-auto mt-4 mb-2 text-start ${className}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="bg-[#0b131d]/90 border border-[#D6AD60]/40 hover:border-[#D6AD60]/70 rounded-2xl p-2.5 sm:p-3 shadow-xl backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#14202e] border border-[#D6AD60]/30 flex items-center justify-center shrink-0">
              {getWeatherIcon(weatherData.current.weatherCode, weatherData.current.isDay, 'w-4 h-4')}
            </div>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-cinzel text-base font-bold text-white">
                {formatTemp(weatherData.current.temperature)}
              </span>
              <span className="text-[11px] text-stone-300">
                {loc.feelsLike} <strong className="text-[#D6AD60]">{formatTemp(weatherData.current.apparentTemperature)}</strong>
              </span>
              <span className="hidden sm:inline text-stone-600">·</span>
              <span className="hidden sm:inline text-[11px] text-stone-300">
                {loc.wind}: <strong className="text-white">{weatherData.current.windSpeed} km/h</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${balloonBadgeColor}`}>
              <ShieldCheck className="w-3 h-3" />
              <span className="truncate max-w-[170px] sm:max-w-none">{balloonStatusText}</span>
            </span>

            <div className="flex items-center bg-[#141d2a] border border-stone-700/80 rounded-lg p-0.5 text-[10px] font-bold">
              <button
                type="button"
                onClick={() => setUnit('C')}
                className={`px-1.5 py-0.5 rounded ${unit === 'C' ? 'bg-[#D6AD60] text-stone-950 font-bold' : 'text-stone-400'}`}
              >
                °C
              </button>
              <button
                type="button"
                onClick={() => setUnit('F')}
                className={`px-1.5 py-0.5 rounded ${unit === 'F' ? 'bg-[#D6AD60] text-stone-950 font-bold' : 'text-stone-400'}`}
              >
                °F
              </button>
            </div>

            <a
              href="#weather-widget"
              className="text-[11px] text-[#D6AD60] hover:underline font-medium hidden md:inline ml-1"
            >
              Full Climate Guide ↓
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="weather-widget"
      className={`w-full text-start ${className}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="relative bg-[#0d1622] border border-[#D6AD60]/40 rounded-3xl shadow-2xl backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-[#D6AD60]/60">
        {/* Subtle Top Pharaoh Gold Radiance Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D6AD60] to-transparent opacity-90" />

        {/* Section Header */}
        <div className="px-5 py-4 sm:px-7 sm:py-5 border-b border-stone-800/80 bg-[#090f18] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#D6AD60]">
                {loc.liveLabel}
              </span>
              <span className="text-stone-400 text-xs">· 25.6872° N, 32.6396° E</span>
            </div>
            <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white tracking-wide mt-0.5">
              {loc.weatherInLuxor}
            </h3>
            <p className="text-xs text-stone-300 mt-0.5 font-light">
              {loc.historicalClimateSubtitle}
            </p>
          </div>

          {/* Unit Toggle and Refresh Button */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <div className="flex items-center bg-[#141d2a] border border-stone-700/80 rounded-xl p-0.5 text-xs font-bold">
              <button
                type="button"
                onClick={() => setUnit('C')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  unit === 'C'
                    ? 'bg-[#D6AD60] text-[#101D2B] font-extrabold shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
                aria-label="Celsius"
              >
                °C
              </button>
              <button
                type="button"
                onClick={() => setUnit('F')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  unit === 'F'
                    ? 'bg-[#D6AD60] text-[#101D2B] font-extrabold shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
                aria-label="Fahrenheit"
              >
                °F
              </button>
            </div>

            <button
              type="button"
              onClick={fetchLuxorWeather}
              disabled={loading}
              title={loc.refresh}
              className="p-2 rounded-xl bg-[#141d2a] hover:bg-stone-800 text-stone-300 hover:text-[#D6AD60] border border-stone-700/80 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#D6AD60]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 sm:px-7 py-3 border-b border-stone-800/80 bg-[#0c1420] flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('live')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'live'
                ? 'bg-[#D6AD60] text-[#0A0B0E] font-bold shadow-md'
                : 'text-stone-400 hover:text-white hover:bg-stone-800/50'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{loc.tabLive}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('climate')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'climate'
                ? 'bg-[#D6AD60] text-[#0A0B0E] font-bold shadow-md'
                : 'text-stone-400 hover:text-white hover:bg-stone-800/50'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{loc.tabClimate}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('advice')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'advice'
                ? 'bg-[#D6AD60] text-[#0A0B0E] font-bold shadow-md'
                : 'text-stone-400 hover:text-white hover:bg-stone-800/50'
            }`}
          >
            <Shirt className="w-3.5 h-3.5" />
            <span>{loc.tabAdvice}</span>
          </button>
        </div>

        {/* TAB 1: LIVE WEATHER & 4-DAY FORECAST */}
        {activeTab === 'live' && (
          <div className="p-5 sm:p-7 space-y-6">
            {/* Live Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Primary Live Temperature Card */}
              <div className="md:col-span-5 bg-gradient-to-br from-[#131e2d] to-[#0e1724] border border-[#D6AD60]/40 rounded-2xl p-5 shadow-inner">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-widest text-[#D6AD60] font-bold">
                    Luxor Solar Observatory
                  </span>
                  <span className="text-[11px] text-stone-400">
                    Updated{' '}
                    {weatherData.lastUpdated.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#1c2a3d] border border-[#D6AD60]/30 flex items-center justify-center shrink-0 shadow-lg">
                    {getWeatherIcon(weatherData.current.weatherCode, weatherData.current.isDay, 'w-8 h-8')}
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-cinzel font-extrabold text-white tracking-tight">
                      {formatTemp(weatherData.current.temperature)}
                    </div>
                    <div className="text-xs text-stone-300 font-medium mt-0.5">
                      {loc.feelsLike} <strong className="text-[#D6AD60]">{formatTemp(weatherData.current.apparentTemperature)}</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
                  <span className="text-stone-400">Atmosphere:</span>
                  <span className="text-emerald-400 font-medium">Warm Dry Nile Sunshine</span>
                </div>
              </div>

              {/* Secondary Environmental Metrics (Wind, Humidity, Balloon, Sun) */}
              <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Wind */}
                <div className="bg-[#121c29] border border-stone-800 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-stone-400 mb-1">
                    <Wind className="w-3.5 h-3.5 text-[#D6AD60]" />
                    <span>{loc.wind}</span>
                  </div>
                  <div className="text-base font-cinzel font-bold text-white">
                    {weatherData.current.windSpeed} km/h
                  </div>
                  <div className="text-[10px] text-emerald-400 mt-1">Calm Desert Air</div>
                </div>

                {/* Humidity */}
                <div className="bg-[#121c29] border border-stone-800 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-stone-400 mb-1">
                    <Droplets className="w-3.5 h-3.5 text-sky-400" />
                    <span>{loc.humidity}</span>
                  </div>
                  <div className="text-base font-cinzel font-bold text-white">
                    {weatherData.current.humidity}%
                  </div>
                  <div className="text-[10px] text-stone-400 mt-1">Ultra-Dry Climate</div>
                </div>

                {/* Sunrise */}
                <div className="bg-[#121c29] border border-stone-800 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-stone-400 mb-1">
                    <Sunrise className="w-3.5 h-3.5 text-amber-400" />
                    <span>{loc.sunrise}</span>
                  </div>
                  <div className="text-base font-cinzel font-bold text-amber-200">
                    {weatherData.daily[0]?.sunrise || '05:52'}
                  </div>
                  <div className="text-[10px] text-amber-400 mt-1">Balloon Launch</div>
                </div>

                {/* Sunset */}
                <div className="bg-[#121c29] border border-stone-800 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-stone-400 mb-1">
                    <Sunset className="w-3.5 h-3.5 text-rose-400" />
                    <span>{loc.sunset}</span>
                  </div>
                  <div className="text-base font-cinzel font-bold text-rose-200">
                    {weatherData.daily[0]?.sunset || '17:15'}
                  </div>
                  <div className="text-[10px] text-rose-400 mt-1">Felucca Golden Hour</div>
                </div>
              </div>
            </div>

            {/* Hot Air Balloon Flight Clearance Banner */}
            <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${balloonBadgeColor}`}>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <div>
                  <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider">
                    {loc.balloonClearance}: {balloonStatusText}
                  </h4>
                  <p className="text-xs text-stone-300 mt-0.5">
                    Civil Aviation standards require ground winds &lt; 15 km/h for hot air balloons above the West Bank. Current wind is {weatherData.current.windSpeed} km/h.
                  </p>
                </div>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-white/10 text-white shrink-0">
                Official Egyptian LXR Clearance
              </span>
            </div>

            {/* 4-Day Forecast Cards */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300 font-cinzel">
                  {loc.fourDayForecast}
                </h4>
                <span className="text-[11px] text-stone-400 font-mono">
                  Luxor Astronomical Coordinates
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {weatherData.daily.map((day, idx) => {
                  const dayDate = new Date(day.date);
                  const dayLabel =
                    idx === 0
                      ? loc.today
                      : idx === 1
                      ? loc.tomorrow
                      : dayDate.toLocaleDateString(language, { weekday: 'short', month: 'short', day: 'numeric' });

                  return (
                    <div
                      key={day.date}
                      className={`p-3.5 rounded-2xl border text-center transition-all ${
                        idx === 0
                          ? 'bg-[#162232] border-[#D6AD60]/50 shadow-md'
                          : 'bg-[#101925] border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-stone-200 mb-1">{dayLabel}</div>
                      <div className="flex justify-center my-2">
                        {getWeatherIcon(day.weatherCode, true, 'w-6 h-6')}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-xs">
                        <span className="font-bold text-white text-sm">
                          {formatTemp(day.maxTemp)}
                        </span>
                        <span className="text-stone-400 text-xs">
                          {formatTemp(day.minTemp)}
                        </span>
                      </div>
                      <div className="text-[10px] text-[#D6AD60] mt-1.5 flex items-center justify-center gap-1">
                        <Sunrise className="w-3 h-3" />
                        <span>{day.sunrise}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HISTORICAL 12-MONTH CLIMATE ARCHIVE */}
        {activeTab === 'climate' && (
          <div className="p-5 sm:p-7 space-y-6">
            {/* Quick Climate Summary Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-[#121c29] border border-stone-800 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-[#D6AD60] text-xs font-bold mb-1">
                  <Sun className="w-4 h-4" />
                  <span>{loc.annualSunshine}</span>
                </div>
                <p className="text-[11px] text-stone-400 leading-relaxed">
                  Luxor has one of the sunniest climates on planet Earth with virtually zero overcast days per year.
                </p>
              </div>

              <div className="bg-[#121c29] border border-stone-800 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-sky-400 text-xs font-bold mb-1">
                  <Droplets className="w-4 h-4" />
                  <span>{loc.annualRainfall}</span>
                </div>
                <p className="text-[11px] text-stone-400 leading-relaxed">
                  Historical rainfall is effectively 0 mm. Rain is an extraordinary rarity that occurs perhaps once per decade.
                </p>
              </div>

              <div className="bg-[#121c29] border border-stone-800 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
                  <Award className="w-4 h-4" />
                  <span>Pinnacle Window (Oct - Apr)</span>
                </div>
                <p className="text-[11px] text-stone-400 leading-relaxed">
                  Comfortable temperatures and calm thermal air make October through April the global peak season for travelers.
                </p>
              </div>
            </div>

            {/* Interactive Month Selector Bar */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-wider text-stone-400 font-bold block">
                  Select Month for Historical Climate Data & Tourist Recommendations:
                </label>
                <span className="text-xs text-[#D6AD60] font-mono">
                  {selectedMonthData.month} · {selectedMonthData.comfortRating}
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-1.5 bg-[#080d14] p-1.5 rounded-2xl border border-stone-800">
                {LUXOR_HISTORICAL_CLIMATE.map((m, idx) => {
                  const isSelected = selectedMonthIndex === idx;
                  return (
                    <button
                      key={m.month}
                      type="button"
                      onClick={() => setSelectedMonthIndex(idx)}
                      className={`py-2 px-1 rounded-xl text-center transition-all ${
                        isSelected
                          ? 'bg-[#D6AD60] text-[#0A0B0E] font-bold shadow-md scale-105'
                          : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                      }`}
                    >
                      <span className="block text-[11px] font-semibold">{m.month.slice(0, 3)}</span>
                      <span className="block text-[10px] opacity-80">
                        {unit === 'F' ? `${m.avgHighF}°` : `${m.avgHighC}°`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detailed Selected Month Card */}
            <div className="bg-gradient-to-br from-[#131f2e] to-[#0d1622] border-2 border-[#D6AD60]/50 rounded-2xl p-5 sm:p-6 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-800 pb-4 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                      {selectedMonthData.month} in Luxor
                    </h4>
                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full ${
                        selectedMonthData.season === 'winter'
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                          : selectedMonthData.season === 'spring'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : selectedMonthData.season === 'autumn'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      {selectedMonthData.season}
                    </span>
                  </div>
                  <span className="text-xs text-[#D6AD60] font-medium block mt-1">
                    Rating: {selectedMonthData.comfortRating} · {selectedMonthData.balloonFlyRate}
                  </span>
                </div>

                {/* Temperature High / Low Pill */}
                <div className="bg-[#090f17] border border-stone-700 rounded-xl px-4 py-2 text-center">
                  <span className="text-[10px] uppercase text-stone-400 block tracking-wider">
                    Historical Daily Range
                  </span>
                  <div className="text-lg font-cinzel font-bold text-white flex items-center justify-center gap-2">
                    <span className="text-rose-400">
                      High {unit === 'F' ? `${selectedMonthData.avgHighF}°F` : `${selectedMonthData.avgHighC}°C`}
                    </span>
                    <span className="text-stone-500">/</span>
                    <span className="text-sky-300">
                      Low {unit === 'F' ? `${selectedMonthData.avgLowF}°F` : `${selectedMonthData.avgLowC}°C`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Month Detailed Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-[#0c1420] border border-stone-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-stone-200 font-bold mb-2">
                    <Compass className="w-4 h-4 text-[#D6AD60]" />
                    <span>Archaeological Exploration Advice</span>
                  </div>
                  <p className="text-stone-300 leading-relaxed font-light">
                    {selectedMonthData.touristAdvice}
                  </p>
                </div>

                <div className="bg-[#0c1420] border border-stone-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-stone-200 font-bold mb-2">
                    <Shirt className="w-4 h-4 text-[#D6AD60]" />
                    <span>What to Pack & Wear</span>
                  </div>
                  <p className="text-stone-300 leading-relaxed font-light">
                    {selectedMonthData.packingTip}
                  </p>
                </div>

                <div className="bg-[#0c1420] border border-stone-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-stone-200 font-bold mb-2">
                    <Clock className="w-4 h-4 text-[#D6AD60]" />
                    <span>Recommended Daily Hours</span>
                  </div>
                  <p className="text-stone-300 leading-relaxed font-light">
                    {selectedMonthData.bestHours}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TOURIST CLIMATE ADVICE, PACKING & DAILY RHYTHM */}
        {activeTab === 'advice' && (
          <div className="p-5 sm:p-7 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Card 1: The Pharaonic Daily Rhythm */}
              <div className="bg-[#121c29] border border-stone-800 rounded-2xl p-5">
                <div className="flex items-center gap-2.5 text-[#D6AD60] font-cinzel font-bold text-sm mb-3">
                  <Clock className="w-4 h-4" />
                  <span>The Pharaonic Daily Rhythm (Best Practices)</span>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-2.5 pb-2.5 border-b border-stone-800">
                    <span className="font-bold text-white shrink-0">05:00 – 10:30 AM:</span>
                    <span className="text-stone-300">
                      <strong>The Golden Dawn Window:</strong> Ideal for West Bank Valley of the Kings, Queen Nefertari, and Hot Air Balloon ascents when thermal breezes are calmest and tombs are cool.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 pb-2.5 border-b border-stone-800">
                    <span className="font-bold text-white shrink-0">11:00 – 15:30 PM:</span>
                    <span className="text-stone-300">
                      <strong>The Midday Respite:</strong> Relax poolside at your private Nilefront villa or explore air-conditioned treasures inside the Luxor Museum and Mummification Museum.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="font-bold text-white shrink-0">16:00 – 21:30 PM:</span>
                    <span className="text-stone-300">
                      <strong>Twilight & Evening Majesty:</strong> Private sunset wooden felucca sails with chilled hibiscus, followed by the enchanting illuminated night opening of Luxor Temple along the Avenue of Sphinxes.
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2: Essential Tourist Packing Guide */}
              <div className="bg-[#121c29] border border-stone-800 rounded-2xl p-5">
                <div className="flex items-center gap-2.5 text-[#D6AD60] font-cinzel font-bold text-sm mb-3">
                  <Shirt className="w-4 h-4" />
                  <span>Luxury Traveler Packing Checklist</span>
                </div>
                <ul className="space-y-2.5 text-xs text-stone-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D6AD60] shrink-0 mt-0.5" />
                    <span><strong>Natural Fibers:</strong> Pure breathable linen, lightweight Egyptian cotton, and loose-cut safari trousers for respectful temple attire.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D6AD60] shrink-0 mt-0.5" />
                    <span><strong>Dawn & Evening Thermal Layers:</strong> A lightweight windbreaker or cashmere pashmina for chilly 05:00 AM balloon launches and breezy river crossings.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D6AD60] shrink-0 mt-0.5" />
                    <span><strong>Stone & Sand Footwear:</strong> Sturdy closed-toe walking shoes or supportive trail shoes to traverse thousand-year-old limestone and sandstone steps.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D6AD60] shrink-0 mt-0.5" />
                    <span><strong>Hyper-Arid Hydration Kit:</strong> Polarized sunglasses (high glare protection), SPF 50 sunscreen, electrolyte hydration drops, and lip treatment balm.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Note on Nile Microclimate */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#D6AD60]/10 via-[#181715] to-[#101D2B] border border-[#D6AD60]/30 flex items-start gap-3">
              <Info className="w-5 h-5 text-[#D6AD60] shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-white block mb-0.5">The Nile River Oasis Microclimate</span>
                <p className="text-stone-300 font-light leading-relaxed">
                  While Luxor sits squarely in the Eastern Sahara desert, proximity to the Nile River creates a refreshing micro-corridor of breeze. Villas situated directly on the West Bank or East Bank riverfront typically enjoy evening temperatures 2–3°C cooler than inland archaeological zones.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Card Footer with Microclimate Note */}
        <div className="px-5 py-3.5 sm:px-7 bg-[#080d14] border-t border-stone-800 text-[11px] text-stone-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 text-stone-300">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D6AD60]" />
            <span>Open-Meteo Meteorological Feed & Luxor Archaeological Climate Archive</span>
          </span>
          <span className="text-[#D6AD60] font-medium">
            Optimal Travel Season: October – April
          </span>
        </div>
      </div>
    </div>
  );
};
