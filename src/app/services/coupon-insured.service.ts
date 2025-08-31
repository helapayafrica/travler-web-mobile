import {Injectable, signal, computed} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CouponInsuredService {

  // Original signals
  insuredSeats = signal<any[]>(this.getStored());
  isCancellationProtection = signal<boolean>(this.getCancellationProtection());

  // New signals for base total and passenger data
  baseTotal = signal<number>(0);
  passengerCount = signal<number>(0);

  // Store unique passenger data to avoid double counting
  passengerData = signal<any[]>([]);

  // Computed signals for costs - fixed passenger counting
  insuranceCost = computed(() => {
    // Get unique passengers who have insurance (avoid double counting for round trips)
    const insuredSeats = this.insuredSeats();
    const passengers = this.passengerData();

    // Create a set of unique passenger identifiers who are insured
    const insuredPassengerIds = new Set<string>();

    passengers.forEach(passenger => {
      // Check if this passenger has any insured seats
      const hasInsuredSeat = insuredSeats.some(seat =>
        seat.seat_name === passenger.onwardSeat ||
        seat.seat_name === passenger.returnSeat
      );

      if (hasInsuredSeat) {
        insuredPassengerIds.add(passenger.id || passenger.name || passenger.onwardSeat);
      }
    });

    return insuredPassengerIds.size * 100;
  });

  cancellationCost = computed(() =>
    this.isCancellationProtection() ? this.passengerCount() * 100 : 0
  );

  // Main computed total
  total = computed(() =>
    this.baseTotal() + this.insuranceCost() + this.cancellationCost()
  );

  // Fixed computed helper signals
  protectedPassengersCount = computed(() => {
    const insuredSeats = this.insuredSeats();
    const passengers = this.passengerData();

    // Count unique passengers who have at least one insured seat
    const insuredPassengerIds = new Set<string>();

    passengers.forEach(passenger => {
      const hasInsuredSeat = insuredSeats.some(seat =>
        seat.seat_name === passenger.onwardSeat ||
        seat.seat_name === passenger.returnSeat
      );

      if (hasInsuredSeat) {
        insuredPassengerIds.add(passenger.id || passenger.name || passenger.onwardSeat);
      }
    });

    return insuredPassengerIds.size;
  });

  protectionPercentage = computed(() => {
    const total = this.passengerCount();
    return total > 0 ? (this.protectedPassengersCount() / total) * 100 : 0;
  });

  totalProtectionCost = computed(() =>
    this.insuranceCost() + this.cancellationCost()
  );

  // Initialize booking data - enhanced to track passengers properly
  initializeBooking(bookingData: any) {
    const total = bookingData.ticketDetail.onwardticket?.total ||
      bookingData.ticketDetail.returnticket?.total || 0;

    // Build passenger data structure to avoid double counting
    const passengers: any[] = [];
    const onwardPassengers = bookingData.ticketDetail.onwardticket?.passenger || [];
    const returnPassengers = bookingData.ticketDetail.returnticket?.passenger || [];

    // Create unique passenger records
    onwardPassengers.forEach((onwardP: any, index: number) => {
      const returnP = returnPassengers[index];

      passengers.push({
        id: `passenger_${index}`,
        name: onwardP.name,
        onwardSeat: onwardP.seat_name,
        returnSeat: returnP?.seat_name || null,
        index: index
      });
    });

    this.baseTotal.set(total);
    this.passengerCount.set(passengers.length);
    this.passengerData.set(passengers);

    console.log('Initialized passengers:', passengers);
  }

  // Original methods remain unchanged
  updateInsuredSeats(seat_name: string, selected: boolean) {
    let seats = [...this.insuredSeats()]; // Create a new array
    if (selected) {
      if (!seats.some(s => s.seat_name === seat_name)) seats.push({ seat_name });
    } else {
      seats = seats.filter(s => s.seat_name !== seat_name);
    }
    localStorage.setItem('insuredSeats', JSON.stringify(seats));
    this.insuredSeats.set(seats);
    this.insuredSeats.set([...seats]);
  }

  isSeatInsured(seat_name: string) {
    return this.insuredSeats().some(s => s.seat_name === seat_name);
  }

  // New method to check if a passenger is insured
  isPassengerInsured(passengerIndex: number): boolean {
    const passengers = this.passengerData();
    const passenger = passengers[passengerIndex];
    if (!passenger) return false;

    const insuredSeats = this.insuredSeats();
    return insuredSeats.some(seat =>
      seat.seat_name === passenger.onwardSeat ||
      seat.seat_name === passenger.returnSeat
    );
  }

  // New method to get insured passenger details
  getInsuredPassengerDetails() {
    const passengers = this.passengerData();
    const insuredSeats = this.insuredSeats();

    return passengers.filter(passenger =>
      insuredSeats.some(seat =>
        seat.seat_name === passenger.onwardSeat ||
        seat.seat_name === passenger.returnSeat
      )
    );
  }

  private getStored(){
    return JSON.parse(localStorage.getItem('insuredSeats') || '[]');
  }

  update(seats: any[]){
    this.insuredSeats.set(seats);
    localStorage.setItem('insuredSeats', JSON.stringify(seats));
  }

  load() {
    const saved = JSON.parse(localStorage.getItem('insuredSeats') || '[]');
    this.insuredSeats.set(saved);
  }

  private getCancellationProtection(): boolean {
    const raw = localStorage.getItem('cancellationProtection');
    return raw ? JSON.parse(raw) : false;
  }

  updateCancellationProtection(value: boolean) {
    this.isCancellationProtection.set(value);
    console.log('value changed to: ', value, '');
    localStorage.setItem('cancellationProtection', JSON.stringify(value));
  }

  loadCancellationProtection() {
    const saved = this.getCancellationProtection();
    this.isCancellationProtection.set(saved);
  }

  clearCancellationProtectionAndInsuredSeats(){
    localStorage.setItem('insuredSeats', JSON.stringify([]));
    localStorage.setItem('cancellationProtection', JSON.stringify(false));
    this.insuredSeats.set([]);
    this.isCancellationProtection.set(false);
  }

  // Enhanced bulk operations
  protectAllSeats(seatNames: string[]) {
    const seats = seatNames.map(seat_name => ({ seat_name }));
    this.insuredSeats.set(seats);
    localStorage.setItem('insuredSeats', JSON.stringify(seats));
  }

  // New method to protect all passengers (both onward and return seats)
  protectAllPassengers() {
    const passengers = this.passengerData();
    const allSeats: string[] = [];

    passengers.forEach(passenger => {
      if (passenger.onwardSeat) allSeats.push(passenger.onwardSeat);
      if (passenger.returnSeat) allSeats.push(passenger.returnSeat);
    });

    this.protectAllSeats(allSeats);
  }

  removeAllProtection() {
    this.insuredSeats.set([]);
    localStorage.setItem('insuredSeats', JSON.stringify([]));
  }
}
