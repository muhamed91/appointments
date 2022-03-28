import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { Appointment } from '../Appointment';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit {
  public loading = true;
  public errorMsg: string;
  public successMsg: string;
  public terminDate: string;
  public name: string;
  public email: string;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {}

  createAppointment() {
    this.successMsg = '';
    this.errorMsg = '';
    this.appointmentService
      .createTermin(this.terminDate, this.name, this.email)
      .subscribe(
        (creeatedAppointment: Appointment) => {
          this.terminDate = '';
          this.name = '';
          this.email = '';
          const terminDate = new Date(
            creeatedAppointment.terminDate
          ).toDateString();
          this.successMsg = `Ein termin wurde reserviert auf dem ${terminDate}`;
        },
        (error: ErrorEvent) => {
          this.errorMsg = error.error.message;
        }
      );
  }
}
