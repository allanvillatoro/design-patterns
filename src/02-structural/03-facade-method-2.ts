// Subsystem 1: Ticket Booking
class TicketBooking {
  bookTicket(movie: string, time: string): string {
    return `Ticket booked for ${movie} at ${time}`;
  }
}

// Subsystem 2: Seat Selection
class SeatSelection {
  selectSeat(seatNumber: string): string {
    return `Seat ${seatNumber} selected`;
  }
}

// Subsystem 3: Food Ordering
class FoodOrdering {
  orderFood(foodItem: string): string {
    return `${foodItem} ordered`;
  }
}

// Facade
class CinemaFacade {
  constructor() {}

  watchMovie(
    movie: string,
    time: string,
    seatNumber: string,
    foodItem: string
  ): string {
    const ticket = new TicketBooking().bookTicket(movie, time);
    const seat = new SeatSelection().selectSeat(seatNumber);
    const food = new FoodOrdering().orderFood(foodItem);
    return `${ticket}\n${seat}\n${food}`;
  }
}

// Client code
function mainFacadeMethod2() {
  const cinemaFacade = new CinemaFacade();

  const result = cinemaFacade.watchMovie(
    "Inception",
    "7:00 PM",
    "A12",
    "Popcorn"
  );
  console.log(result);
}

mainFacadeMethod2();
