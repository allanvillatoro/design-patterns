/*
The Composite Design Pattern is a structural design pattern that lets you compose objects into
tree-like structures to represent part-whole hierarchies. It allows clients to treat individual
objects and compositions of objects uniformly. In other words, whether dealing with a single object
or a group of objects (composite), clients can use them interchangeably.

Using the Composite pattern makes sense only when the core model of your app can be represented as a tree.
*/

//Component
//Represents the common interface for both individual and the collection objects
interface Task {
  getTitle(): string;
  setTitle(title: string): void;
  display(): void;
}

//Leaf
//Represents individual object (Task)
class SimpleTask implements Task {
  private title: string;
  constructor(title: string) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }

  setTitle(title: string) {
    this.title = title;
  }

  display() {
    console.log("Simple Task - ", this.title);
  }
}

//Composite
//Container: Represent a collection of objects (Tasks)
class TaskList implements Task {
  private title: string;
  private tasks: Task[];

  constructor(title: string) {
    this.title = title;
    this.tasks = [];
  }

  getTitle(): string {
    return this.title;
  }

  setTitle(title: string): void {
    this.title = title;
  }

  addTask(task: Task) {
    this.tasks.push(task);
  }

  removeTask(task: Task) {
    this.tasks = this.tasks.filter((tk) => tk !== task);
  }

  display(): void {
    console.log("Task List: ", this.title);
    this.tasks.forEach((task) => {
      task.display();
    });
  }
}

//Client code
function mainComposite1() {
  // Creating simple tasks
  const simpleTask1 = new SimpleTask("Complete Coding");
  const simpleTask2 = new SimpleTask("Write Documentation");

  // Creating a task list
  const projectTasks = new TaskList("Project Task");
  projectTasks.addTask(simpleTask1);
  projectTasks.addTask(simpleTask2);

  // Nested task list
  const phase1Tasks = new TaskList("Phase 1 Tasks");
  phase1Tasks.addTask(new SimpleTask("Design"));
  phase1Tasks.addTask(new SimpleTask("Implementation"));

  //Adding the nested task list
  projectTasks.addTask(phase1Tasks);

  // Displaying tasks
  projectTasks.display();
}

mainComposite1();
