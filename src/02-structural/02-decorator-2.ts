//Component
interface Character {
  getDescription(): string;
  getStats(): { attack: number; defense: number };
}

//Concrete Component
class BasicCharacter {
  getDescription() {
    return "Basic character";
  }
  getStats() {
    return { attack: 10, defense: 10 };
  }
}

//Base Decorator class
abstract class CharacterDecorator implements Character {
  protected character: Character;

  constructor(character: Character) {
    this.character = character;
  }

  getDescription(): string {
    return this.character.getDescription();
  }

  getStats(): { attack: number; defense: number } {
    return this.character.getStats();
  }
}

//Concrete Decorators
class HelmetDecorator extends CharacterDecorator {
  override getDescription(): string {
    return this.character.getDescription() + "\n * with Helmet";
  }

  override getStats(): { attack: number; defense: number } {
    const stats = this.character.getStats();
    return { attack: stats.attack, defense: stats.defense + 5 };
  }
}

class ShieldDecorator extends CharacterDecorator {
  override getDescription(): string {
    return this.character.getDescription() + "\n * with Shield";
  }

  override getStats(): { attack: number; defense: number } {
    const stats = this.character.getStats();
    return { attack: stats.attack, defense: stats.defense + 10 };
  }
}

class SwordDecorator extends CharacterDecorator {
  override getDescription(): string {
    return this.character.getDescription() + "\n * with Sword";
  }

  override getStats(): { attack: number; defense: number } {
    const stats = this.character.getStats();
    return { attack: stats.attack + 7, defense: stats.defense };
  }
}

class RingDecorator extends CharacterDecorator {
  override getDescription(): string {
    return this.character.getDescription() + "\n * with Ring";
  }

  override getStats(): { attack: number; defense: number } {
    const stats = this.character.getStats();
    return { attack: stats.attack + 3, defense: stats.defense };
  }
}

//Client code
function mainDecorator2() {
  // Create basic character
  let character: Character = new BasicCharacter();
  console.log("\nInitial character:", character.getDescription());
  console.log("Stats:", character.getStats());

  //Adds helmet
  character = new HelmetDecorator(character);
  console.log("\nWith Helmet:", character.getDescription());
  console.log("Stats:", character.getStats());

  //Adds shield
  character = new ShieldDecorator(character);
  console.log("\nWith Shield:", character.getDescription());
  console.log("Stats:", character.getStats());

  //Adds Sword
  character = new SwordDecorator(character);
  console.log("\nWith Sword:", character.getDescription());
  console.log("Stats:", character.getStats());

  //Adds Ring
  character = new RingDecorator(character);
  console.log("\nWith Ring:", character.getDescription());
  console.log("Stats:", character.getStats());

  console.log("\n\n");
}

mainDecorator2();
