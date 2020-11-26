import {Route, RouterModule} from "@angular/router";
import {MainComponent} from "./components/main/main.component";
import {NgModule} from "@angular/core";
import {ProfileComponent} from "../../shared/components/profile/profile.component";
import {ApplicationCardListComponent} from "./components/application-card-list/application-card-list.component";
import {AllJobsCardListComponent} from "../../shared/components/jobs/all-jobs-card-list/all-jobs-card-list.component";
import {JobPageComponent} from "../../shared/components/job-page/job-page.component";
import {ProfileEditComponent} from "../../shared/components/profile-edit/profile-edit.component";
import {JobTypesCardListComponent} from "../../shared/components/jobs/job-types-card-list/job-types-card-list.component";

const routes: Route[] = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'jobs',
        component: AllJobsCardListComponent
      },
      {
        path: '',
        component: JobTypesCardListComponent
      },
      {
        path: 'applications',
        component: ApplicationCardListComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'jobs/:id',
        component: JobPageComponent
      },
      {
        path: 'profile/edit/:id',
        component: ProfileEditComponent
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDashboardRoutingModule{
}
