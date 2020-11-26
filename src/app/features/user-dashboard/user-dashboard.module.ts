import {NgModule} from "@angular/core";
import {FilterButtonsSectionComponent} from "../../shared/components/jobs/filter-buttons-section/filter-buttons-section.component";
import {JobsCardListComponent} from "../../shared/components/jobs/jobs-card-list/jobs-card-list.component";
import {JobCardItemComponent} from "../../shared/components/jobs/job-card-item/job-card-item.component";
import {JobsCardListViewComponent} from "../../shared/components/jobs/jobs-card-list-view/jobs-card-list-view.component";
import {MainComponent} from "./components/main/main.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CoreModule} from "../../core/core.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ProfileComponent} from "../../shared/components/profile/profile.component";
import {UserDashboardRoutingModule} from "./user-dashboard-routing.module";
import { AllJobsCardListComponent } from '../../shared/components/jobs/all-jobs-card-list/all-jobs-card-list.component';
import {SharedModule} from "../../shared/shared.module";
import {ApplicationCardListComponent} from "./components/application-card-list/application-card-list.component";

@NgModule({
  declarations: [
    AllJobsCardListComponent,
    ApplicationCardListComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    UserDashboardRoutingModule,
    NgbModule
  ]
})
export class UserDashboardModule{
}
