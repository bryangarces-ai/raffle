import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { RaffledrawComponent } from './raffledraw/raffledraw.component';
import { ParticipantsComponent } from './participants/participants.component';
import { BatchesComponent } from './batches/batches.component';

export const routes: Routes = [
    { path: 'registration', component: RegistrationComponent },
    { path: 'raffledraw', component: RaffledrawComponent },
    { path: 'participants', component: ParticipantsComponent },
    { path: 'batches', component: BatchesComponent },
];
