import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './core/shared/ui-pages/home-page/home-page.component';
import { AboutPageComponent } from './core/shared/ui-pages/about-page/about-page.component';
import { ContactPageComponent } from './core/shared/ui-pages/contact-page/contact-page.component';

const routes: Routes = [
    // {
    //     path: '', //home
    //     component: HomePageComponent
    // },
    {
        path: 'about',
        component: AboutPageComponent
    },
    {
        path: 'contact',
        component: ContactPageComponent
    },
    {
        path: 'countries',
        loadChildren: () => import('./core/countries/countries.module').then(m => m.CountriesModule)
    },
    {
        path: '**',
        redirectTo: 'countries' //home
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}
