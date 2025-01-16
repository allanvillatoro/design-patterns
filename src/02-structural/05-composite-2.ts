// Interface
interface FileSystemComponent {
  getName(): string;
  getSize(): number; //KB
}

//Leaf (basic component)
class Filed implements FileSystemComponent {
  private name: string;
  private size: number; //KB

  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }

  getName(): string {
    return this.name;
  }

  getSize(): number {
    return this.size;
  }
}

//Container (collection of components)
class Folder implements FileSystemComponent {
  private name: string;
  private components: FileSystemComponent[] = []; // Files and other folders

  constructor(name: string) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  getSize(): number {
    return this.components.reduce(
      (total, component) => total + component.getSize(),
      0
    );
  }

  add(component: FileSystemComponent): void {
    this.components.push(component);
  }

  remove(component: FileSystemComponent): void {
    this.components = this.components.filter((c) => c !== component);
  }

  listContents(): void {
    console.log(`Contents of folder "${this.name}":`);
    this.components.forEach((component) => {
      console.log(`- ${component.getName()} (${component.getSize()} KB)`);
    });
  }
}

//Client example
function mainComposite2() {
  const file1 = new Filed("file1.txt", 10);
  const file2 = new Filed("file2.txt", 20);
  const file3 = new Filed("file3.txt", 30);

  const subFolder = new Folder("SubFolder");
  subFolder.add(file2);
  subFolder.add(file3);

  const mainFolder = new Folder("MainFolder");
  mainFolder.add(file1);
  mainFolder.add(subFolder);

  // Display main folder content
  mainFolder.listContents();
  console.log(
    `Total size of "${mainFolder.getName()}": ${mainFolder.getSize()} KB`
  );

  // Display sub folder content
  subFolder.listContents();
}

mainComposite2();
