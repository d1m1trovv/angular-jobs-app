import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {FilterButtonsSectionComponent} from "./components/jobs/filter-buttons-section/filter-buttons-section.component";
import {JobCardItemComponent} from "./components/jobs/job-card-item/job-card-item.component";
import {JobsCardListComponent} from "./components/jobs/jobs-card-list/jobs-card-list.component";
import {JobsCardListViewComponent} from "./components/jobs/jobs-card-list-view/jobs-card-list-view.component";
import {JobTypesCardListComponent} from "./components/jobs/job-types-card-list/job-types-card-list.component";
import {MainComponent} from "../features/user-dashboard/components/main/main.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {UserDashboardRoutingModule} from "../features/user-dashboard/user-dashboard-routing.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { JobPageComponent } from './components/job-page/job-page.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    FilterButtonsSectionComponent,
    JobCardItemComponent,
    JobsCardListComponent,
    JobsCardListViewComponent,
    JobTypesCardListComponent,
    ProfileComponent,
    JobPageComponent,
    ProfileEditComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    FilterButtonsSectionComponent,
    JobCardItemComponent,
    JobsCardListComponent,
    JobsCardListViewComponent,
    JobTypesCardListComponent,
    ProfileComponent,
    JobPageComponent,
    ProfileEditComponent
  ]
})
export class SharedModule {
}
