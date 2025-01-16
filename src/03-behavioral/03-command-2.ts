//Sender: Buttons/Application
//Receiver: Editor
//Command (execute the commands, layer between the sender and the receiver)

//The Receiver
class Editor {
  text: string = "";

  getSelection() {
    return this.text;
  }

  deleteSelection() {
    this.text = "";
  }

  replaceSelection(text: string) {
    this.text = text;
  }
}

// Command interface (this is like a bridge between the sender and the receiver)
abstract class Command {
  protected application: Application; //sender
  protected editor: Editor; //receiver
  protected backup: string = "";

  //connects the command to the application (sender) and the editor (receiver)
  constructor(app: Application, editor: Editor) {
    this.application = app;
    this.editor = editor;
  }

  saveBackup() {
    this.backup = this.editor.text;
  }

  undo() {
    this.editor.text = this.backup;
  }

  //needed for executing the commands
  abstract execute(): boolean;

  print() {
    console.log(this.constructor.name);
  }
}

//Concrete commands
class CopyCommand extends Command {
  execute() {
    console.log("Copying text...");
    this.application.clipboard = this.editor.getSelection();
    return false;
  }
}

class CutCommand extends Command {
  execute() {
    console.log("Cutting text...");
    this.saveBackup();
    this.application.clipboard = this.editor.getSelection();
    this.editor.deleteSelection();
    return true;
  }
}

class PasteCommand extends Command {
  execute() {
    console.log("Pasting text...");
    this.saveBackup();
    this.editor.replaceSelection(this.application.clipboard);
    return true;
  }
}

class UndoCommand extends Command {
  execute() {
    console.log("Undoing text...");
    this.application.undo();
    return false;
  }
}

//This is useful when you want history, logging, or undo/redo functionality.
class CommandHistory {
  private history: Command[] = [];

  push(command: Command) {
    this.history.push(command);
  }

  pop(): Command | undefined {
    return this.history.pop();
  }

  printHistory() {
    console.log("Printing history...");
    this.history.forEach((command, index) => {
      console.log(`${index + 1}: ${command.constructor.name}`);
    });
  }
}

//Sender / Invoker classes (GUI buttons, Invokers)
class Button {
  private command: Command | null = null;

  setCommand(command: Command) {
    this.command = command;
  }

  getCommand(): Command | null {
    return this.command;
  }

  click() {
    if (this.command) {
      return this.command.execute();
    }
    return false;
  }
}

class CopyButton extends Button {
  constructor() {
    super();
  }
}

class CutButton extends Button {
  constructor() {
    super();
  }
}

class PasteButton extends Button {
  constructor() {
    super();
  }
}

class UndoButton extends Button {
  constructor() {
    super();
  }
}

//Sender / Invoker interface
interface IApplication {
  editor: Editor;
  commandHistory: CommandHistory;
  copyButton: CopyButton;
  cutButton: CutButton;
  pasteButton: PasteButton;
  undoButton: UndoButton;
}

//The Sender / Invoker class
class Application {
  clipboard: string = "";

  activeEditor: Editor;
  private history: CommandHistory;
  private copyButton: CopyButton;
  private cutButton: CutButton;
  private pasteButton: PasteButton;
  private undoButton: UndoButton;

  constructor(input: IApplication) {
    this.activeEditor = input.editor;
    this.history = input.commandHistory;
    this.copyButton = input.copyButton;
    this.cutButton = input.cutButton;
    this.pasteButton = input.pasteButton;
    this.undoButton = input.undoButton;
  }

  isClipboardEmpty() {
    return this.clipboard === "";
  }

  undo() {
    const command = this.history.pop();
    if (command) {
      command.undo();
    }
  }

  executeCommand(command: Command) {
    const success = command.execute();
    if (success) {
      this.history.push(command);
    }
  }

  //methods to call actual button commands via Application
  onClickCopy() {
    const command = this.copyButton.getCommand();
    if (command) {
      this.executeCommand(command);
    }
  }

  onClickCut() {
    const command = this.cutButton.getCommand();
    if (command) {
      this.executeCommand(command);
    }
  }

  onClickPaste() {
    const command = this.pasteButton.getCommand();
    if (command) {
      this.executeCommand(command);
    }
  }
}

//The client code
function mainCommand2() {
  //Create receiver
  const editor = new Editor();

  //For Storing Command History
  const history = new CommandHistory();

  //Create sender and its components (GUI, buttons) by using dependency injection
  const copyButton = new CopyButton();
  const cutButton = new CutButton();
  const pasteButton = new PasteButton();
  const undoButton = new UndoButton();
  const application = new Application({
    editor,
    commandHistory: history,
    copyButton,
    cutButton,
    pasteButton,
    undoButton,
  });

  //Create commands
  const copyCommand = new CopyCommand(application, editor);
  const cutCommand = new CutCommand(application, editor);
  const pasteCommand = new PasteCommand(application, editor);
  const undoCommand = new UndoCommand(application, editor);

  //Set commands
  copyButton.setCommand(copyCommand);
  cutButton.setCommand(cutCommand);
  pasteButton.setCommand(pasteCommand);
  undoButton.setCommand(undoCommand);

  //Initialize receiver
  application.activeEditor.text = "Hello World";
  console.log("The edit text is: ", editor.text);
  console.log(`The clipboard is empty: ${application.isClipboardEmpty()}`);

  //Execute commands

  //cut
  cutButton.click();
  console.log("The edit text is: ", editor.text);
  console.log(`The clipboard is empty: ${application.isClipboardEmpty()}`);

  //paste
  pasteButton.click();
  console.log("The edit text is: ", editor.text);
  console.log(`The clipboard is empty: ${application.isClipboardEmpty()}`);

  //copy
  copyButton.click();
  console.log("The edit text is: ", editor.text);
  console.log(`The clipboard is empty: ${application.isClipboardEmpty()}`);

  //undo
  //undoButton.click();
  //console.log(editor.text);

  //another way: this allows to save into the history
  application.onClickCut();
  console.log("The edit text is: ", editor.text);
  application.onClickPaste();
  console.log("The edit text is: ", editor.text);

  //printing the history
  history.printHistory();

  //Trying undo
  console.log("The edit text is: ", editor.text);
  console.log("Undoing the last command...");
  application.undo();
  console.log("The edit text is: ", editor.text);
}

mainCommand2();
