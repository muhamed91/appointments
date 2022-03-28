import { Component, OnInit } from '@angular/core';
import { Appointment } from '../Appointment';
import { AppointmentService } from '../appointment.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-appoitment-list',
  templateUrl: './appoitment-list.component.html',
  styleUrls: ['./appoitment-list.component.scss'],
})
export class AppoitmentListComponent implements OnInit {
  public loading = true;
  public errorMsg: string;
  public successMsg: string;
  public appointments: Appointment[];
  public columns: string[] = ['terminDate', 'name', 'email', 'cancel'];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.appointmentService.getTermine().subscribe(
      (appointments: Appointment[]) => {
        this.appointments = appointments;
        this.loading = false;
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
        this.loading = false;
      }
    );
  }
  cancelAppointment(id: string) {
    this.appointmentService
      .cancelTermin(id)
      .pipe(mergeMap(() => this.appointmentService.getTermine()))
      .subscribe(
        (appointments: Appointment[]) => {
          this.appointments = appointments;
          this.successMsg = 'Ihr Termin wurde erfolgreich abgesagt';
        },
        (error: ErrorEvent) => {
          this.errorMsg = error.error.message;
        }
      );
  }
}
