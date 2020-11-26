import {NgModule} from "@angular/core";
import {AllJobsCardListComponent} from "../../shared/components/jobs/all-jobs-card-list/all-jobs-card-list.component";
import {ApplicationCardListComponent} from "../user-dashboard/components/application-card-list/application-card-list.component";
import {MainComponent} from "../user-dashboard/components/main/main.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CoreModule} from "../../core/core.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { OrganizationMainComponent } from './components/organization-main/organization-main.component';
import { OrganizationJobsCardListComponent } from './components/organization-jobs-card-list/organization-jobs-card-list.component';
import {OrganizationDashboardRoutingModule} from "./organization-dashboard-routing.module";
import { JobEditComponent } from './components/job-edit/job-edit.component';

@NgModule({
  declarations: [
  OrganizationMainComponent,
  OrganizationJobsCardListComponent,
  JobEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    OrganizationDashboardRoutingModule,
    NgbModule
  ]
})
export class OrganizationDashboardModule{
}
