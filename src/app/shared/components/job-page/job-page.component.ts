import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map, take, takeUntil} from "rxjs/operators";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {JobsService} from "../jobs/services/jobs.service";
import {Job} from "../jobs/models/job.interface";
import {Application} from "../jobs/models/application.interface";
import {AuthenticationService} from "../../../auth/services/authentication.service";

@Component({
  selector: 'app-job-page',
  templateUrl: './job-page.component.html',
  styleUrls: ['./job-page.component.scss']
})
export class JobPageComponent implements OnInit, OnDestroy {

  job: Job;
  currentUserId: number = 0;
  hasUserApplied: boolean = false;
  hasUserLiked: boolean = false;
  isUserStandard: boolean = false;

  hasUserApplied$ = new BehaviorSubject<boolean>(false);
  hasUserLiked$ = new BehaviorSubject<boolean>(false);
  destroy$ = new Subject<boolean>();

  constructor(private activatedRoute: ActivatedRoute,
              private jobsService: JobsService,
              private authenticationService: AuthenticationService,
              private router: Router) {
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
    this.currentUserId = this.authenticationService.getLoggedUser().id!;

    this.authenticationService.getIsUserStandard().pipe(
      takeUntil(this.destroy$)
    ).subscribe(isStandard => this.isUserStandard = isStandard);

    this.activatedRoute.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params) => {
      const id = params.id;

      if(id){
        this.getJob(id);
      }
    })

    this.getHasUserApplied().pipe(
      takeUntil(this.destroy$)
    ).subscribe(hasApplied => this.hasUserApplied = hasApplied);

    this.getHasUserLiked().pipe(
      takeUntil(this.destroy$)
    ).subscribe(hasLiked => this.hasUserLiked = hasLiked);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getJob(id: number): void{
    this.jobsService.getJobById(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe((response) => {
      this.job = response;
    })
  }

  onApply(): void {
    const app: Application = {
      user_id: this.currentUserId,
      job_id: this.job.id
    }
    if (app) {
      this.jobsService.postApplications({...app}).pipe(
        take(1)
      ).subscribe(() => {
          this.router.navigate(['main/applications']);
        },
        (error => {
          console.log(error);
        })
      )
    }
  }

  onLike(): void{

    const job: Job = {
      ...this.job,
      likes: this.job.likes + 1
    }

    this.jobsService.updateJob(job).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() =>{
      this.setHasUserLiked(true);
    },
      (error => {
        console.log(error);
      })
      )
  }

  onUnLike(): void{

    const job: Job = {
      ...this.job,
      likes: this.job.likes - 1
    }

    this.jobsService.updateJob(job).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() =>{
        this.setHasUserLiked(false);
      },
      (error => {
        console.log(error);
      })
    )
  }

  checkIfUserApplied(): void{
    this.setHasUserApplied(false);
    this.jobsService.getApplications().pipe(
      map((stream) => stream.find(app =>
        app.user_id === this.currentUserId &&
        app.job_id === this.job.id)),
      take(1)).subscribe((response) =>{
        if(response){
          this.setHasUserApplied(true);
        }
    })
  }

  setHasUserApplied(hasApplied: boolean){
    this.hasUserApplied$.next(hasApplied);
  }

  getHasUserApplied(): Observable<boolean>{
    this.checkIfUserApplied();
    return this.hasUserApplied$.asObservable();
  }

  setHasUserLiked(hasApplied: boolean){
    this.hasUserLiked$.next(hasApplied);
  }

  getHasUserLiked(): Observable<boolean>{
    return this.hasUserLiked$.asObservable();
  }

  onRedirect(path: string): void{
    this.router.navigate([path]);
  }

  onDelete(id: number): void{
    this.jobsService.deleteJob(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.router.navigate(['organization/my-jobs'])
    }, (error) => {
      console.log(error);
    });
  }

}
