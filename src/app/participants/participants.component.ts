import { NgClass, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-participants',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './participants.component.html',
  styleUrl: './participants.component.css',
})
export class ParticipantsComponent {
  data: any;
  exampleDatabase!: ExampleHttpDatabase;

  constructor(
    private _httpClient: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);
  }

  ngOnInit() {
    this.loadparticipants();
  }

  loadparticipants() {
    this.exampleDatabase.getparticipants().subscribe({
      next: (data: any) => {
        console.log('API Response:', data);

        if (Array.isArray(data)) {
          // console.log(data);
          this.data = data;
          this.cdr.detectChanges();
          // console.log(this.data);
        } else {
          console.error('API did not return an array:', data);
        }
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  backtoregistation(): void {
    this.router.navigate(['/registration']);
  }
  activate(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to activate this participant?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Activate!',
      cancelButtonText: 'No, Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.exampleDatabase.activate(id).subscribe({
          next: () => {
            Swal.fire(
              'Activated!',
              'Participant has been activated.',
              'success'
            );
            // Refresh or update data logic here
            this.loadparticipants();
          },
          error: (error) => {
            Swal.fire(
              'Error!',
              'There was an issue activating the participant.',
              'error'
            );
            console.error('Activation error:', error);
          },
        });
      }
    });
  }

  deactivate(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to deactivate this participant?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Deactivate!',
      cancelButtonText: 'No, Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.exampleDatabase.deactivate(id).subscribe({
          next: () => {
            Swal.fire(
              'Deactivated!',
              'Participant has been deactivated.',
              'success'
            );
            // Refresh or update data logic here
            this.loadparticipants();
          },
          error: (error) => {
            Swal.fire(
              'Error!',
              'There was an issue deactivating the participant.',
              'error'
            );
            console.error('Deactivation error:', error);
          },
        });
      }
    });
  }
}

export class ExampleHttpDatabase {
  private baseUrl = `${environment.apiUrl}`;
  constructor(private _httpClient: HttpClient) {}

  getparticipants() {
    return this._httpClient.get(
      `http://davnorsystems.gov.ph:7339/RAFFLEAPI/api/Raffle/participants`
    );
  }
  activate(id: number) {
    return this._httpClient.put(`${this.baseUrl}/Raffle/activate/${id}`, {});
  }
  deactivate(id: number) {
    return this._httpClient.put(`${this.baseUrl}/Raffle/deactivate/${id}`, {});
  }
}
