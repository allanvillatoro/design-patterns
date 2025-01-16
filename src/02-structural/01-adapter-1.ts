/* One structural design pattern that enables the usage of an existing
class’s interface as an additional interface is the adapter design pattern.
To make two incompatible interfaces function together, it serves as a bridge.
This pattern involves a single class, the adapter, responsible for joining
functionalities of independent or incompatible interfaces.

Useful for reusing existing classes that don't have the interface we need, or when we
want to create an abstraction layer for a third-party library.

This is also called: Wrapper
*/

import { LocalLogger } from "./adapter-files/local-logger";
import { JSLoggerAdapter } from "./adapter-files/logger-adapter";

function mainAdapter1() {
  //Logger without Adapter
  //const logger = new LocalLogger("01-adapter-1.ts");

  //Logger with Adapter
  const logger = new JSLoggerAdapter("01-adapter-1.ts");
  logger.writeLog("Normal log message");
  logger.writeWarning("Normal alert, information");
  logger.writeError("Something went wrong");
}

mainAdapter1();
