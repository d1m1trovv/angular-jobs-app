import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user.interface";
import {map, take} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService{

  url = 'http://localhost:3000/users';

  private isUserLogged$ = new BehaviorSubject<boolean>(false);
  private isUserStandard$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.url);
  }

  getUser(id: number): Observable<User>{
    const url = `${this.url}/${id}`

    return this.http.get<User>(url);
  }

  updateUser(user: User): Observable<any>{
    const url = `${this.url}/${user.id}`

    return this.http.put(url, user);
  }

  login(email: string, password: string): Observable<User|undefined>{
    return this.getUsers().pipe(
      map((stream: User[]) => stream.find(user => user.email === email && user.password === password)),
    );
  }

  register(data: User): Observable<User>{
    return this.http.post<User>(this.url, data);
  }

  setLoggedUser(user: User): void{
    localStorage.setItem('loggedInUser', JSON.stringify(user));

    this.setIsUserLogged();
    this.setIsUserStandard();
    console.log();
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');

    this.setIsUserLogged();
  }

  getLoggedUser(): User{
    return JSON.parse(localStorage.getItem('loggedInUser')!);
  }

  setIsUserLogged(): void {
    let user = this.getLoggedUser();
    this.isUserLogged$.next(!!user);
    console.log(this.isUserLogged$);
  }

  getIsUserLogged(): Observable<boolean> {
    this.setIsUserLogged();
    return this.isUserLogged$.asObservable();
  }

  setIsUserStandard(): void{
    let userType = this.getLoggedUser().type;
    if(userType && userType === 'standard'){
      this.isUserStandard$.next(true)
    }
    this.isUserStandard$.next(false);
  }

  getIsUserStandard(): Observable<boolean>{
    this.setIsUserStandard();
    return this.isUserStandard$.asObservable()
  }

}
