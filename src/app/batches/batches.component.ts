import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-batches',
  standalone: true,
  imports: [NgFor],
  templateUrl: './batches.component.html',
  styleUrl: './batches.component.css'
})
export class BatchesComponent {

  data:any;
  batchdata:any;
  exampleDatabase!: ExampleHttpDatabase;

  constructor(private _httpClient: HttpClient,private router: Router) {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);
  }

  ngOnInit()
  {
    this.exampleDatabase.getbatches().subscribe({
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

  viewbatch(batchNumber:number):void
  {

    this.exampleDatabase.getbatchData(batchNumber).subscribe({
      next: (data: any) => {
        console.log('API Response:', data);

        if (Array.isArray(data)) {
            console.log(data);
            this.batchdata=data;
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

  getbatches() {
    return this._httpClient.get(`${this.baseUrl}/Raffle/batches`);
  }
  getbatchData(batchnumber: number) {
    return this._httpClient.get(`${this.baseUrl}/Raffle/winners/${batchnumber}`);
  }
}