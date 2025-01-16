/* The Builder Design Pattern is a creational pattern used in software design
to construct a complex object step by step. It allows the construction of
a product in a step-by-step manner, where the construction process can
change based on the type of product being built.
*/

class Computer {
  public cpu: string = "cpu - not defined";
  public ram: string = "ram - not defined";
  public storage: string = "storage - not defined";
  public gpu?: string;

  displayConfiguration() {
    console.log(`Computer Configuration:
      CPU: ${this.cpu}
      RAM: ${this.ram}
      Storage: ${this.storage}
      GPU: ${this.gpu ?? "No GPU"}
      `);
  }
}

class ComputerBuilder {
  private computer: Computer;

  constructor() {
    this.computer = new Computer();
  }

  setCPU(cpu: string): ComputerBuilder {
    this.computer.cpu = cpu;
    return this;
  }

  setRam(ram: string): ComputerBuilder {
    this.computer.ram = ram;
    return this;
  }

  setGPU(gpu: string): ComputerBuilder {
    this.computer.gpu = gpu;
    return this;
  }

  setStorage(storage: string): ComputerBuilder {
    this.computer.storage = storage;
    return this;
  }

  build() {
    return this.computer;
  }
}

function mainBuilder1() {
  console.log("Builder Pattern");

  const basicComputer: Computer = new ComputerBuilder()
    .setCPU("Intel Core 2 Dúo")
    .setRam("4GB")
    .setStorage("256GB")
    .build();

  basicComputer.displayConfiguration();

  const gamingComputer = new ComputerBuilder()
    .setCPU("Intel Core i9")
    .setRam("32GB")
    .setRam("64GB")
    .setStorage("1TB")
    .setGPU("Nvidia RTX 3090")
    .build();

  gamingComputer.displayConfiguration();
}

mainBuilder1();
