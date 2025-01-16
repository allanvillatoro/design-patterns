//Target interface
interface IPrinter {
  print(): void;
}

class LegacyPrint {
  printDocument() {
    console.log("Legacy Printer is printing a document.");
  }
}

class LaserPrint {
  laserDocument() {
    console.log("Laser Printer is printing a document.");
  }
}

class LegacyPrinterAdapter implements IPrinter {
  private legacyPrinter: LegacyPrint;
  constructor() {
    this.legacyPrinter = new LegacyPrint();
  }

  print() {
    this.legacyPrinter.printDocument();
  }
}

class LaserPrinterAdapter implements IPrinter {
  private laserPrinter: LaserPrint;
  constructor() {
    this.laserPrinter = new LaserPrint();
  }

  print() {
    this.laserPrinter.laserDocument();
  }
}

function mainAdapter3() {
  const printer1 = new LegacyPrinterAdapter();
  printer1.print();

  const printer2 = new LaserPrinterAdapter();
  printer2.print();
}

mainAdapter3();
