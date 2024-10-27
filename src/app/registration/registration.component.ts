import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

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
  errormessage:string='';
  hasError:boolean=false;
  registrationSuccess: boolean = false;
  constructor(private _httpClient: HttpClient,private router: Router) {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);
  }

  backtoregistation():void
  {
    this.registrationSuccess = false;
  }

  gotolist():void
  {
    this.router.navigate(['/participants']); 
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
        this.hasError=false;
        this.clearFields();
      },
      error: (error) => {
          // Handle JSON error responses
          if (error.error && typeof error.error === 'object' && error.error.message) {
            this.errormessage = error.error.message;  // Set error message from API
            console.error('Error Response:', error.error.message);
          } else {
            this.errormessage = 'An unexpected error occurred.';
            console.log('Error:', error);
          }
          this.registrationSuccess = false;
          this.hasError=true;
          this.clearFields();
      }
    });
  }

  clearFields(): void {
    this.firstName = '';
    this.lastName = '';
  }

}

export class ExampleHttpDatabase {
  private baseUrl =  `${environment.apiUrl}`;
  constructor(private _httpClient: HttpClient) {}
  register(data: object) {
    return this._httpClient.post(`${this.baseUrl}/Raffle/participant`, data);
  }
 
  
}