import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { InfoComponent } from './info/info.component';

export const routes: Routes = [
    {
        path: '',
        children: [

            { path: 'dashboard', component: DashboardComponent },
            { path: 'user', component: UserComponent },
            { path: 'info', component: InfoComponent },
            { path: '', redirectTo: 'info', pathMatch: 'full' }, // Default route
        ]
    }
];
