//Subject
interface Image {
  display(): string;
}

//Real Subject
class RealImage implements Image {
  private fileName: string;

  constructor(fileName: string) {
    this.fileName = fileName;
  }

  loadImageFromDisk() {
    console.log("Loading image from disk: " + this.fileName);
  }

  display() {
    this.loadImageFromDisk(); //lazy loading
    return "Mountains in Honduras";
  }
}

//Proxy
class ProxyImage implements Image {
  private realImage: Image;
  private cachedImage: string = "";

  constructor(image: Image) {
    this.realImage = image;
  }

  display() {
    if (!this.cachedImage) {
      this.cachedImage = this.realImage.display();
    } else {
      console.log("Using image from cache...");
    }
    return this.cachedImage;
  }
}

//Client class
//This allows either a real image or a proxy image instance
class ImageManager {
  private image: Image;

  constructor(image: Image) {
    this.image = image;
  }

  display() {
    const toDisplay = this.image.display();
    console.log("Image content: ", toDisplay);
  }
}

//Client code
function mainProxy2() {
  const realImage = new RealImage("example.jpg");
  console.log("Without a Proxy....");
  const imageManager1 = new ImageManager(realImage);
  imageManager1.display();
  imageManager1.display();

  console.log("Using a Proxy....");
  const imageProxy = new ProxyImage(realImage);
  const imageManager2 = new ImageManager(imageProxy);
  //Image will be loaded from disk only when display is called the first time
  imageManager2.display();
  //Image will not be loaded again, as it has been cached in the proxy
  imageManager2.display();
}

mainProxy2();
