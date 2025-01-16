/*
The Command Design Pattern is a behavioral design pattern that turns a request into a stand-alone
object called a command. With the help of this pattern, you can capture each component of a request,
including the object that owns the method, the parameters for the method, and the method itself.
By doing this, you can easily pass, queue, or log requests and support operations like undo/redo.
*/

//Receiver interface
interface Device {
  turnOn(): void;
  turnOff(): void;
}

//Receiver classes
class Stereo implements Device {
  turnOn() {
    console.log("Stereo is now on");
  }

  turnOff() {
    console.log("Stereo is now off");
  }

  adjustVolume() {
    console.log("Volume adjusted");
  }
}

class TV implements Device {
  turnOn() {
    console.log("TV is now on");
  }

  turnOff() {
    console.log("TV is now off");
  }

  changeChannel() {
    console.log("Channel changed");
  }
}

//Command interface
interface Commander {
  execute(): void;
}

//Command classes
class TurnOnCommand implements Commander {
  private device: Device;

  constructor(device: Device) {
    this.device = device;
  }

  execute() {
    this.device.turnOn();
  }
}

class TurnOffCommand implements Commander {
  private device: Device;

  constructor(device: Device) {
    this.device = device;
  }

  execute() {
    this.device.turnOff();
  }
}

class ChangeChannelCommand implements Commander {
  private tv: TV;

  constructor(tv: TV) {
    this.tv = tv;
  }

  execute() {
    this.tv.changeChannel();
  }
}

class AdjustVolumeCommand implements Commander {
  private stereo: Stereo;

  constructor(stereo: Stereo) {
    this.stereo = stereo;
  }

  execute() {
    this.stereo.adjustVolume();
  }
}

//Invoker (Sender class)
class RemoteControl {
  private command: Commander | null = null;

  setCommand(command: Commander) {
    this.command = command;
  }

  pressButton() {
    if (this.command) {
      this.command.execute();
    }
  }
}

//Client code
function mainCommand1() {
  //Create receivers
  const tv = new TV();
  const stereo = new Stereo();

  //Create command objects
  const turnOnTVCommand = new TurnOnCommand(tv);
  const turnOffTVCommand = new TurnOffCommand(tv);

  const adjustVolumeCommand = new AdjustVolumeCommand(stereo);
  const changeChannelTVCommand = new ChangeChannelCommand(tv);

  //Create invoker
  const remote = new RemoteControl();

  //Set and execute commands
  remote.setCommand(turnOnTVCommand);
  remote.pressButton();

  remote.setCommand(adjustVolumeCommand);
  remote.pressButton();

  remote.setCommand(changeChannelTVCommand);
  remote.pressButton();

  remote.setCommand(turnOffTVCommand);
  remote.pressButton();
}

mainCommand1();
