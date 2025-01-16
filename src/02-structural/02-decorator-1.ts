/*
The Decorator Design Pattern is a structural design pattern that allows behavior to be
added to individual objects dynamically, without affecting the behavior of other objects
from the same class. It involves creating a set of decorator classes that are used to wrap
concrete components. This doesn't have anything to do with TypeScript decorators.

This is also called: Wrapper
*/

//Component
interface Notifications {
  send(message: string): void;
}

//Concrete Component
class BasicNotification implements Notifications {
  send(message: string): void {
    console.log(`Sending Basic Notification: ${message}`);
  }
}

//Base Decorator class
abstract class NotificationDecorator implements Notifications {
  protected notification: Notifications;

  constructor(notification: Notifications) {
    this.notification = notification;
  }

  send(message: string): void {
    this.notification.send(message);
  }
}

//Concrete Decorators
class EmailDecorator extends NotificationDecorator {
  private sendEmail(message: string): void {
    console.log(`Sending Email: ${message}`);
  }

  override send(message: string): void {
    super.send(message);
    this.sendEmail(message);
  }
}

class SMSDecorator extends NotificationDecorator {
  private sendSMS(message: string): void {
    console.log(`Sending SMS: ${message}`);
  }

  override send(message: string): void {
    super.send(message);
    this.sendSMS(message);
  }
}

//Client
function mainDecorator1() {
  //because we want to treat it as a the base notification
  //not using decorator here
  let notification: Notifications = new BasicNotification();

  //This is the decorator magic
  notification = new EmailDecorator(notification);
  notification = new SMSDecorator(notification);

  //Another way to do it
  //notification = new SMSDecorator(new EmailDecorator(new BasicNotification()));

  notification.send("System alert...");
}

mainDecorator1();
