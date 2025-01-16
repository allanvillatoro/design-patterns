/* Factory Method is a creational design pattern that provides an interface
for creating objects in a superclass, but allows subclasses to alter the
type of objects that will be created. This pattern is particularly useful
when the exact types of objects to be created may vary or need to be
determined at runtime, enabling flexibility and extensibility in object
creation.

It allows to create objects without specifying the exact class of object.
It uses the polymorphism of the object-oriented programming to decide which.
*/

//Product Interface
interface Pizza {
  prepare: () => void;
}

//Concrete Products
class PepperoniPizza implements Pizza {
  prepare(): void {
    console.log("Preparing pepperoni pizza");
  }
}

class HawaianPizza implements Pizza {
  prepare(): void {
    console.log("Preparing hawaian pizza");
  }
}

class MeatPizza implements Pizza {
  prepare(): void {
    console.log("Preparing meat pizza");
  }
}

//Factory Method class
class PizzaFactory {
  createPizza(type: string): Pizza {
    switch (type) {
      case "pepperoni":
        return new PepperoniPizza();
      case "hawaian":
        return new HawaianPizza();
      case "meat":
        return new MeatPizza();
      default:
        throw new Error("Unknown pizza type");
    }
  }

  //This is an alternative way to create the factory method
  static createPizza(type: string): Pizza {
    switch (type) {
      case "pepperoni":
        return new PepperoniPizza();
      case "hawaian":
        return new HawaianPizza();
      case "meat":
        return new MeatPizza();
      default:
        throw new Error("Unknown pizza type");
    }
  }
}

//Pattern use
function clientCode(factory: PizzaFactory, type: string) {
  try {
    const pizza = factory.createPizza(type);
    pizza.prepare();
  } catch (error) {
    console.log(error);
  }
}

//Client code
function mainFactoryMethod1() {
  const pizzaFactory = new PizzaFactory();
  //This is if we want to handle the errors
  clientCode(pizzaFactory, "pepperoni"); // Output: Preparing pepperoni pizza
  //This also works (doesn't handle the errors)
  pizzaFactory.createPizza("pepperoni").prepare(); // Output: Preparing pepperoni pizza

  //Another way to call the factory method is by using the static method
  const hawaianPizza = PizzaFactory.createPizza("hawaian");
  hawaianPizza.prepare(); // Output: Preparing hawaian pizza

  const meatPizza = PizzaFactory.createPizza("meat");
  meatPizza.prepare(); // Output: Preparing meat pizza
}

mainFactoryMethod1();
