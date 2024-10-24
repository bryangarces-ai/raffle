import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [NgIf,FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  exampleDatabase!: ExampleHttpDatabase;
  firstName: string = '';
  lastName: string   = '';
  registrationSuccess: boolean = false;
  constructor(private _httpClient: HttpClient) {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);
  }

  
  register():void{
    const participantData = {
      firstName: this.firstName,
      lastName: this.lastName
    };

    console.log(participantData);
    this.exampleDatabase.register(participantData).subscribe({
      next: (data: any) => {
        console.log('API Response:', data);
        this.registrationSuccess = true;
        this.clearFields();
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  clearFields(): void {
    this.firstName = '';
    this.lastName = '';
  }

}

export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  register(data: object) {
    return this._httpClient.post('https://172.16.0.37/api/Raffle/participant',data);
  }

  
}