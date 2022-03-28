import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from './Appointment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private BASE_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  getTermine(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.BASE_URL}alltermine`);
  }

  createTermin(
    terminDate: string,
    name: string,
    email: string
  ): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.BASE_URL}termine`, {
      terminDate,
      name,
      email,
    });
  }

  cancelTermin(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}termine/${id}`);
  }
}
