import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { RaffledrawComponent } from './raffledraw/raffledraw.component';

export const routes: Routes = [
    { path: 'registration', component: RegistrationComponent },
    { path: 'raffledraw', component: RaffledrawComponent },
];
