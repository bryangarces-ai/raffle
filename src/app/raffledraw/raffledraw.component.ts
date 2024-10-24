import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
export interface winners {
  firstname: string;
  lastname: string;
}

@Component({
  selector: 'app-raffledraw',
  standalone: true,
  imports: [NgIf,FormsModule,NgFor],
  templateUrl: './raffledraw.component.html',
  styleUrl: './raffledraw.component.css'
})
export class RaffledrawComponent {


  title = 'raffle';
  exampleDatabase!: ExampleHttpDatabase;
  dataSource: winners[] = [];
  showTable: boolean = false;
  data:any;
  
  countdown: number = 10;
  hasDrawn: boolean = false;

  prizeTypeValue: number = 0;
  numberOfWinners: number   = 0;

  constructor(private _httpClient: HttpClient) {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);
  }

  ngOnInit()
  {
    if (!this.hasDrawn) {
      this.countdown = 0;
      this.showTable = false;
    }
  }

  draw(): void {
   
    this.hasDrawn = true;

    const param = {
      prizeTypeValue: this.prizeTypeValue,
      numberOfWinners: this.numberOfWinners
    };

    console.log(param);
    this.exampleDatabase.getwinners(param).subscribe({
      next: (data: any) => {
        console.log('API Response:', data);

        if (Array.isArray(data.winners)) {
          console.log(data.winners);
            this.dataSource = data.winners as winners[];
            this.data=data.winners;
            console.log(this.data);
        } else {
          console.error('API did not return an array:', data);
        }
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });

    this.showTable = false;
    this.countdown = 10;
    const countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(countdownInterval);
        this.hasDrawn = false;
        this.showTable = true;
      }
    }, 1000);
    
  }

}

export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  getwinners(data: object) {
    return this._httpClient.post('https://172.16.0.37/api/Raffle/conduct',data);
  }

  reset() {
    return this._httpClient.get('https://172.16.0.37/api/Raffle/reset');
  }
}