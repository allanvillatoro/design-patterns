/*
The Observer Design Pattern is a behavioral design pattern that defines a one-to-many
dependency between objects. When one object (the subject) changes state, all its dependents (observers)
are notified and updated automatically.

It is useful when some objects need to be updated when another object changes its state.

It is not the same as RXJS Observables (this a very enhanced thing).
*/

//Observer interface
interface Observer {
  notify(voidTitle: string): void;
}

//Observer class
class Subscriber implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  notify(videoTitle: string): void {
    console.log(`Notified ${this.name} about new video: ${videoTitle}`);
  }
}

//Subject class
class YouTubeChannel {
  private subscribers: Observer[] = [];
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  subscribe(observer: Observer): void {
    this.subscribers.push(observer);
    console.log(`New subscriber to channel: ${this.name}`);
  }

  unsubscribe(observer: Observer): void {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber !== observer
    );
    console.log(`Subscriber unsubscribed from channel: ${this.name}`);
  }

  notifySubscribers(videoTitle: string): void {
    this.subscribers.forEach((subscriber) => subscriber.notify(videoTitle));
  }

  uploadVideo(videoTitle: string): void {
    console.log(`New video uploaded: ${videoTitle} on channel: ${this.name}`);
    this.notifySubscribers(videoTitle);
  }
}

//Client code
function mainObserver1() {
  const channel = new YouTubeChannel("My travels");

  const alicia = new Subscriber("Alicia");
  const silvia = new Subscriber("Silvia");
  const luis = new Subscriber("Luis");

  channel.subscribe(alicia);
  channel.subscribe(silvia);
  channel.uploadVideo("My trip to Paris");
  channel.subscribe(luis);
  channel.uploadVideo("My trip to Rome");
  channel.unsubscribe(silvia);
  channel.uploadVideo("My trip to London");
  channel.unsubscribe(luis);
  channel.uploadVideo("My trip to Berlin");
}

mainObserver1();
