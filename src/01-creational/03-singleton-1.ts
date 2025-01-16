/*
The Singleton Method Design Pattern ensures a class has only one instance and provides
a global access point to it. It’s ideal for scenarios requiring centralized control,
like managing database connections or configuration settings. This article explores its
principles, benefits, drawbacks, and best use cases in software development.
*/

class ConfigurationManager {
  // there should be only one instance of this class
  private static instance: ConfigurationManager;

  // Properties
  private settings: Record<string, any> = {};

  // This is just for avoiding the instantiation of the class
  private constructor() {}

  // Static method to obtain the only instance
  public static getInstance(): ConfigurationManager {
    if (!ConfigurationManager.instance) {
      ConfigurationManager.instance = new ConfigurationManager();
      console.log("New instance created.");
    }
    return ConfigurationManager.instance;
  }

  // Methods
  public set(key: string, value: any): void {
    this.settings[key] = value;
  }

  public get(key: string): any {
    return this.settings[key];
  }

  public doSomething(): void {
    console.log("Something is done.");
  }
}

function mainSingleton1() {
  // Use of Singleton
  const config1 = ConfigurationManager.getInstance();
  config1.set("apiUrl", "https://api.example.com");
  config1.doSomething();

  const config2 = ConfigurationManager.getInstance();
  console.log(config2.get("apiUrl")); // Output: https://api.example.com

  // Checking if both instances are the same
  console.log(config1 === config2); // Output: true
}

mainSingleton1();
