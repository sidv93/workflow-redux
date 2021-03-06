import { BoardsComponent } from "./boards/boards.component";
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'board/:boardId/:boardName',
        component: BoardsComponent
    }
];

export const router: ModuleWithProviders = RouterModule.forRoot(routes)