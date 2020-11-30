import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../auth/models/user.interface";
import {AuthenticationService} from "../../../auth/services/authentication.service";
import {map, take, takeUntil} from "rxjs/operators";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Router} from "@angular/router";
import {JobsService} from "../jobs/services/jobs.service";
import {Job} from "../jobs/models/job.interface";
import {Application} from "../jobs/models/application.interface";
import {Like} from "../jobs/models/like.interface";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: User;
  isUserStandard: boolean = false;

  destroy$ = new Subject<boolean>();
  isUserStandard$ = new BehaviorSubject<boolean>(false);

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private jobsService: JobsService) {
    this.user = {
      displayName: '',
      username: '',
      email: '',
      password: '',
      type: ''
    }
  }

  ngOnInit(): void {
    this.getUser(this.authenticationService.getLoggedUser().id!);

    this.authenticationService.getIsUserStandard().pipe(
      takeUntil(this.destroy$)
    ).subscribe(isStandard => this.isUserStandard = isStandard);
  }

  ngOnDestroy(): void{
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getUser(id: number): void{
    this.authenticationService.getUser(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe((response) => {
      debugger;
      this.user = response;
      debugger;
    })
  }

  deleteUser(): void{
    this.authenticationService.deleteUser(this.user.id!).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.authenticationService.logout();
      this.router.navigate(['auth/sign-up']);
    })
  }

  deleteOrganization(): void{
    this.jobsService.getAllJobs().pipe(
      map((stream: Job[]) => stream.filter(job => job.organization === this.user.displayName)),
      takeUntil(this.destroy$)
    ).subscribe((response) => {
      if(response){
        console.log(response);
        debugger;
        for(let tempJob of response){
          debugger;
          this.deleteJob(tempJob);
          debugger;
          this.deleteJobApps(tempJob);
          debugger;
          this.deleteJobLikes(tempJob);
          debugger;
        }
      }
    }, (error) => {
      console.log(error);
    })

    this.deleteUser();
  }

  deleteJob(job: Job): void{
    this.jobsService.deleteJob(job.id!).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      console.log("Deleted")
    }, (error) => {
      console.log(error);
    })
  }

  deleteJobApps(job: Job): void{
    this.jobsService.getApplications().pipe(
      map((stream: Application[]) => stream.filter(tempApp => tempApp.job_id === job.id)),
      takeUntil(this.destroy$)
    ).subscribe((response) => {
      if(response){
        for(let app of response){
          this.deleteApp(app);
        }
      }
    })
  }

  deleteJobLikes(job: Job): void{
    this.jobsService.getLikes().pipe(
      map((stream: Like[]) => stream.filter(tempLike => tempLike.job_id === job.id)),
      takeUntil(this.destroy$)
    ).subscribe((response) => {
      if(response){
        for(let like of response){
          this.deleteLike(like);
        }
      }
    }, (error) => {
      console.log(error);
    })
  }

  deleteApp(app: Application): void{
    this.jobsService.deleteApplication(app.id!).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      console.log("App deleted");
    }, (error) => {
      console.log(error);
    })
  }

  deleteLike(like: Like): void{
    this.jobsService.deleteLike(like.id!).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      console.log("Likes deleted");
    }, (error) => {
      console.log(error);
    })
  }

  setIsUserStandard(): void{
    if(this.authenticationService.getLoggedUser().type === "Standard"){
      this.isUserStandard$.next(true);
    }
    if(this.authenticationService.getLoggedUser().type === "Organization"){
      this.isUserStandard$.next(false);
    }
  }

  getIsUserStandard(): Observable<boolean>{
    this.setIsUserStandard();

    return this.isUserStandard$.asObservable();
  }

}
