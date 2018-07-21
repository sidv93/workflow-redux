import { BoardsComponent } from "./boards/boards.component";
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'board',
        component: BoardsComponent
    }
];

export const router: ModuleWithProviders = RouterModule.forRoot(routes)