// Interface
interface Observe {
  update(weatherData: string): void;
}

// Observer Class
class WeatherApp implements Observe {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  // Recibir actualización del clima
  update(weatherData: string): void {
    console.log(`${this.name} received wheather notification: ${weatherData}`);
  }
}
//Another Observer Class
class WeatherDevice implements Observe {
  constructor() {}
  // Recibir actualización del clima
  update(weatherData: string): void {
    console.log(
      `Weather Device received wheather notification: ${weatherData}`
    );
  }
}

//Subject class
class WeatherStation {
  private observers: Observe[] = [];
  private weatherData: string = "Soleado";

  //Add an observer
  subscribe(observer: Observe): void {
    this.observers.push(observer);

    //It's optional, but it will allow the subscriber to be updated as soon as it is subscribed.
    //observer.update(this.weatherData);

    console.log("New application subscribed to weather system.");
  }

  //Remove an observer
  unsubscribe(observer: Observe): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
    console.log(`One application unsubscribed from weather system.`);
  }

  //Updates weather and notifies the observers
  setWeather(weatherData: string): void {
    console.log(`\nWeather updated: ${weatherData}`);
    this.weatherData = weatherData;

    this.notifyObservers();
  }

  //Notify all the observers
  private notifyObservers(): void {
    this.observers.forEach((observer) => {
      observer.update(this.weatherData);
    });
  }
}

//Client code
function mainObserver2(): void {
  const weatherStation = new WeatherStation();

  //Create applications
  const flutterWeatherApp = new WeatherApp("Flutter WeatherApp");
  const reactNativeWeatherApp = new WeatherApp("React Native WeatherApp");
  const weatherTrackerApp = new WeatherApp("Weather Tracker App");
  const weatherDevice = new WeatherDevice();

  //Subscribe applications
  weatherStation.subscribe(flutterWeatherApp);
  weatherStation.subscribe(reactNativeWeatherApp);

  //Update the weather
  weatherStation.setWeather("Rainy");

  //Add new applications and device
  weatherStation.subscribe(weatherTrackerApp);
  weatherStation.subscribe(weatherDevice);
  weatherStation.setWeather("Cloudy");

  //Unsubscribe an application
  weatherStation.unsubscribe(reactNativeWeatherApp);
  weatherStation.setWeather("Thunderstorms");
}

mainObserver2();
