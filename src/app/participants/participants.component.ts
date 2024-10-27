import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-participants',
  standalone: true,
  imports: [NgFor],
  templateUrl: './participants.component.html',
  styleUrl: './participants.component.css'
})
export class ParticipantsComponent {
  data:any;
  exampleDatabase!: ExampleHttpDatabase;

  constructor(private _httpClient: HttpClient,private router: Router) {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);
  }

  ngOnInit()
  {
    this.exampleDatabase.getparticipants().subscribe({
      next: (data: any) => {
        console.log('API Response:', data);

        if (Array.isArray(data)) {
            console.log(data);
            this.data=data;
            console.log(this.data);
        } else {
          console.error('API did not return an array:', data);
        }
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  backtoregistation():void
  {
    this.router.navigate(['/registration']); 
  }


}

export class ExampleHttpDatabase {
  private baseUrl =  `${environment.apiUrl}`;
  constructor(private _httpClient: HttpClient) {}

  getparticipants() {
    return this._httpClient.get(`${this.baseUrl}/Raffle/participants`);
  }
}