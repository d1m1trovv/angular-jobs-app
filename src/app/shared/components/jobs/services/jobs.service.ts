import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {forkJoin, Observable} from "rxjs";
import {Job} from "../models/job.interface";
import {Type} from "../models/type.interface";
import {Category} from "../models/category.interface";
import {Application} from "../models/application.interface";
import {Like} from "../models/like.interface";

@Injectable({
  providedIn: 'root'
})
export class JobsService{

  url = 'http://localhost:3000/jobs';
  appsUrl = 'http://localhost:3000/user_applications';
  typesUrl = 'http://localhost:3000/types';
  categoriesUrl = 'http://localhost:3000/categories';
  likesUrl = 'http://localhost:3000/job_likes';

  constructor(private http: HttpClient) {}

  getJobs(): Observable<any[]>{
    let jobs = this.http.get<Job[]>(this.url);
    let types = this.http.get<Type[]>(this.typesUrl);
    let categories = this.http.get<Category[]>(this.categoriesUrl);

    return forkJoin([jobs, types, categories]);
  }

  getApplications(): Observable<Application[]>{
    return this.http.get<Application[]>(this.appsUrl);
  }

  createApplication(app: Application): Observable<any>{
    return this.http.post(this.appsUrl, app);
  }

  deleteApplication(id: number): Observable<any>{
    const url = `${this.appsUrl}/${id}`;

    return this.http.delete(url);
  }

  getJobById(id: number): Observable<Job>{
    const url = `${this.url}/${id}`;

    return this.http.get<Job>(url);
  }

  updateJob(job: Job): Observable<any>{
    const url = `${this.url}/${job.id}`;

    return this.http.put(url, job);
  }

  deleteJob(id: number): Observable<any> {
    const url = `${this.url}/${id}`;

    return this.http.delete(url);
  }

  createJob(job: Job): Observable<any>{
    return this.http.post(this.url, job);
  }

  createLike(like: Like): Observable<any>{
    return this.http.post(this.likesUrl, like);
  }

  getLikes(): Observable<Like[]>{
    return this.http.get<Like[]>(this.likesUrl);
  }

  deleteLike(id: number): Observable<any>{
    const url = `${this.likesUrl}/${id}`;

    return this.http.delete(url);
  }

}
