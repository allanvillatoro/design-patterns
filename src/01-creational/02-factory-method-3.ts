interface Hamburger {
  prepare: () => void;
}

class ChickenHamburger implements Hamburger {
  prepare(): void {
    console.log("Preparing chicken hamburger");
  }
}

class BeefHamburger implements Hamburger {
  prepare(): void {
    console.log("Preparing beef hamburger");
  }
}

class BeanHamburger implements Hamburger {
  prepare(): void {
    console.log("Preparing bean hamburger");
  }
}

abstract class Restaurant {
  protected abstract createHamburger(): Hamburger;

  orderHamburger(): void {
    const hamburger = this.createHamburger();
    hamburger.prepare();
  }
}

class ChickenRestaurant extends Restaurant {
  override createHamburger(): Hamburger {
    return new ChickenHamburger();
  }
}

class BeefRestaurant extends Restaurant {
  override createHamburger(): Hamburger {
    return new BeefHamburger();
  }
}

class BeanRestaurant extends Restaurant {
  override createHamburger(): Hamburger {
    return new BeanHamburger();
  }
}

function mainFactoryMethod3() {
  let restaurant: Restaurant;

  const burgerType = prompt(
    "What type of burger do you want? ( chicken/beef/bean )"
  );

  switch (burgerType) {
    case "chicken":
      restaurant = new ChickenRestaurant();
      break;

    case "beef":
      restaurant = new BeefRestaurant();
      break;

    case "bean":
      restaurant = new BeanRestaurant();
      break;

    default:
      throw new Error("Invalid option");
  }

  restaurant.orderHamburger();
}

mainFactoryMethod3();
