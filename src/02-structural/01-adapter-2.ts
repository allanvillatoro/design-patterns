//Target interface
interface PaymentProcessor {
  processPayment(amount: number): void;
}

//Service classes
//These classes emulates external services
class PayPalService {
  sendPayment(amount: number): void {
    console.log(`Processing payment $${amount} via PayPal`);
  }
}

class StripeService {
  makeCharge(amount: number): void {
    console.log(`Processing payment $${amount} via Stripe`);
  }
}

class MercadoPagoService {
  pay(amount: number): void {
    console.log(`Processing payment $${amount} via MercadoPago`);
  }
}

//Adapter classes
class PayPalAdapter implements PaymentProcessor {
  constructor(private paypalService: PayPalService) {}
  processPayment(amount: number) {
    this.paypalService.sendPayment(amount);
  }
}

class StripeAdapter {
  constructor(private stripeService: StripeService) {}
  processPayment(amount: number) {
    this.stripeService.makeCharge(amount);
  }
}

class MercadoPagoAdapter {
  constructor(private mercadoPagoService: MercadoPagoService) {}
  processPayment(amount: number) {
    this.mercadoPagoService.pay(amount);
  }
}

//Client code
function mainAdapter2() {
  const paymentAmount = 100;

  const paypalProcessor: PaymentProcessor = new PayPalAdapter(
    new PayPalService()
  );
  const stripeProcessor: PaymentProcessor = new StripeAdapter(
    new StripeService()
  );
  const mercadoPagoProcessor: PaymentProcessor = new MercadoPagoAdapter(
    new MercadoPagoService()
  );

  //Process payments with different services
  //The three services work the same using the adapters
  console.log("Using PayPal:");
  paypalProcessor.processPayment(paymentAmount);

  console.log("Using Stripe:");
  stripeProcessor.processPayment(paymentAmount);

  console.log("Using MercadoPago:");
  mercadoPagoProcessor.processPayment(paymentAmount);
}

mainAdapter2();
