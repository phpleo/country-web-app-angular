import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomePageComponent } from './ui-pages/home-page/home-page.component';
import { AboutPageComponent } from './ui-pages/about-page/about-page.component';

import { SidebarComponent } from './ui-components/sidebar/sidebar.component';
import { ContactPageComponent } from './ui-pages/contact-page/contact-page.component';
import { SearchBoxComponent } from './ui-components/search-box/search-box.component';


@NgModule({
  declarations: [
    HomePageComponent,
    AboutPageComponent,
    SidebarComponent,
    ContactPageComponent,
    SearchBoxComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HomePageComponent,
    AboutPageComponent,
    SidebarComponent,
    ContactPageComponent,
    SearchBoxComponent
  ]
})
export class SharedModule { }
