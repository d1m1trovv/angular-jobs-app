import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {forkJoin, Observable} from "rxjs";
import {Job} from "../models/job.interface";
import {Type} from "../models/type.interface";
import {Category} from "../models/category.interface";

@Injectable({
  providedIn: 'root'
})
export class JobsService{

  url = 'http://localhost:3000/jobs';
  typesUrl = 'http://localhost:3000/types';
  categoriesUrl = 'http://localhost:3000/categories'

  constructor(private http: HttpClient) {}

  getJobs(): Observable<any[]>{
    let jobs = this.http.get<Job[]>(this.url);
    let types = this.http.get<Type[]>(this.typesUrl);
    let categories = this.http.get<Category[]>(this.categoriesUrl);

    return forkJoin([jobs, types, categories]);
  }

}
