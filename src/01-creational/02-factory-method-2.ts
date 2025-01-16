//Interface
interface Reporte {
  generate(): void;
}

//Concrete classes
class SalesReport implements Reporte {
  generate(): void {
    console.log("Generating sales report...");
  }
}

class InventoryReport implements Reporte {
  generate(): void {
    console.log("Generating inventory report...");
  }
}

//Base Class ReportFactory with Factory Method
abstract class ReportFactory {
  protected abstract createReport(): Reporte;

  generateReport(): void {
    const report = this.createReport();
    report.generate();
  }
}

//Concrete classes with Report Factory
class SalesReportFactory extends ReportFactory {
  createReport(): Reporte {
    return new SalesReport();
  }
}

class InventoryReportFactory extends ReportFactory {
  createReport(): Reporte {
    return new InventoryReport();
  }
}

//Client code
function mainFactoryMethod2() {
  let reportFactory: ReportFactory;

  const reportType = prompt("What report type do you want? (sales/inventory)");

  if (reportType === "sales") {
    reportFactory = new SalesReportFactory();
  } else {
    reportFactory = new InventoryReportFactory();
  }

  reportFactory.generateReport();
}

mainFactoryMethod2();
