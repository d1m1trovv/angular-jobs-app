import {Route, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {OrganizationMainComponent} from "./components/organization-main/organization-main.component";
import {AllJobsCardListComponent} from "../../shared/components/jobs/all-jobs-card-list/all-jobs-card-list.component";
import {OrganizationJobsCardListComponent} from "./components/organization-jobs-card-list/organization-jobs-card-list.component";
import {ProfileComponent} from "../../shared/components/profile/profile.component";
import {JobEditComponent} from "./components/job-edit/job-edit.component";
import {JobPageComponent} from "../../shared/components/job-page/job-page.component";

const routes: Route[] = [
  {
    path: '',
    component: OrganizationMainComponent,
    children: [
      {
        path: 'jobs',
        component: AllJobsCardListComponent
      },
      {
        path: 'my-jobs',
        component: OrganizationJobsCardListComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'my-jobs/edit/:id',
        component: JobEditComponent
      },
      {
        path: 'my-jobs/create',
        component: JobEditComponent
      },
      {
        path: 'jobs/:id',
        component: JobPageComponent
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationDashboardRoutingModule {
}
