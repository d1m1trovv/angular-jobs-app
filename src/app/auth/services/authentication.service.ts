import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "./user.interface";
import {map, take} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService{

  url = 'http://localhost:3000/users';

  private isUserLogged$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.url);
  }

  login(email: string, password: string): Observable<User|undefined>{
    return this.getUsers().pipe(
      map((stream: User[]) => stream.find(user => user.email === email && user.password === password)),
    );
  }

  setLoggedUser(user: User): void{
    localStorage.setItem('loggedInUser', JSON.stringify(user));

    this.setIsUserLogged(true)
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');

    this.setIsUserLogged(false);
  }

  getLoggedUser(): User{
    return JSON.parse(localStorage.getItem('loggedInUser')!);
  }

  setIsUserLogged(hasLogged: boolean): void {
    this.isUserLogged$.next(hasLogged);
  }

  getIsUserLogged(): Observable<boolean> {
    return this.isUserLogged$.asObservable();
  }

}
