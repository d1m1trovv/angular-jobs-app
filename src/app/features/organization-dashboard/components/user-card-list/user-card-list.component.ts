import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../../auth/models/user.interface";
import {AuthenticationService} from "../../../../auth/services/authentication.service";
import {Job} from "../../../../shared/components/jobs/models/job.interface";
import {ActivatedRoute} from "@angular/router";
import {JobsService} from "../../../../shared/components/jobs/services/jobs.service";
import {map, take, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {Application} from "../../../../shared/components/jobs/models/application.interface";

@Component({
  selector: 'app-user-card-list',
  templateUrl: './user-card-list.component.html',
  styleUrls: ['./user-card-list.component.scss']
})
export class UserCardListComponent implements OnInit, OnDestroy {

  users: User[];
  job: Job;

  destroy$ = new Subject<boolean>();

  constructor(private authenticationService: AuthenticationService,
              private activatedRoute: ActivatedRoute,
              private jobsService: JobsService) {
    this.users = [];

    this.job = {
      title: '',
      description: '',
      organization: '',
      likes: 0,
      type: '',
      category: ''
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params) => {
      const id = params.id;

      if(id){
        this.getJob(id);
        this.getJobApplications();
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getJob(id: number){
    this.jobsService.getJobById(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe((response) => {
      this.job = response;
    })
  }

  private getJobApplications(): void{
    this.jobsService.getApplications().pipe(
      map((stream: Application[]) => stream.filter(tempApp => tempApp.job_id === this.job.id)),
      takeUntil(this.destroy$)
    ).subscribe((response) => {
      if(response){
        for(let app of response){
          this.getAppliedUsers(app.user_id!);
        }
      }
    }, (error) => {
      console.log(error);
    })
  }

  private getAppliedUsers(id: number): void{
    this.authenticationService.getUser(id).pipe(
      take(1)
    ).subscribe((response) => {
      this.users.push(response);
    }, (error) => {
      console.log(error);
    })
  }
}
