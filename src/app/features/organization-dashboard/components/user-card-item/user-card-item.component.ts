import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../auth/models/user.interface";
import {Router} from "@angular/router";
import {Job} from "../../../../shared/components/jobs/models/job.interface";
import {Application} from "../../../../shared/components/jobs/models/application.interface";
import {JobsService} from "../../../../shared/components/jobs/services/jobs.service";
import {map, take, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-user-card-item',
  templateUrl: './user-card-item.component.html',
  styleUrls: ['./user-card-item.component.scss']
})
export class UserCardItemComponent implements OnInit {

  @Input() user: User;
  @Input() job: Job;

  app: Application;

  constructor(private router: Router,
              private jobsService: JobsService) {
    this.user = {
      displayName: '',
      username: '',
      email: ''
    }
    this.job = {
      title: '',
      description: '',
      organization: '',
      likes: 0,
      type: '',
      category: ''
    }
    this.app = {};
  }

  ngOnInit(): void {
  }

  onAccept(): void{
    this.jobsService.getApplications().pipe(
      map((stream: Application[]) => stream.find(tempApp => tempApp.user_id === this.user.id
      && tempApp.job_id === this.job.id)),
      take(1)
    ).subscribe((response) => {
      if(response){
        this.app = {
          id: response.id,
          user_id: response.user_id,
          job_id: response.job_id,
          status: 'Accepted'
        }

        this.jobsService.updateApplication(this.app).pipe(
          take(1)
        ).subscribe(() => {
          console.log("success");
        }, (error) => {
          console.log(error);
        })
      }
    }, (error) => {
      console.log(error);
    })
  }

}
