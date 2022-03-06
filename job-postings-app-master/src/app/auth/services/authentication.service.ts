import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../models/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  readonly url = 'http://localhost:3000/users';
  readonly loggedUserStorageKey = 'loggedUser';

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiURL}/users`);
  }

  login(mail: string, password: string): Observable<User | null> {    
    return this.getUsers().pipe(
      map((response: User[]) => {
        const user = response.find(u => u.mail === mail && u.password === password);

        if (user) {
          return user;
        }

        return null;
      })
    );
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  logout(): void {
    localStorage.removeItem(this.loggedUserStorageKey);
  }

  storeUserData(user: User): void {
    localStorage.setItem(this.loggedUserStorageKey, JSON.stringify(user));
  }

  getLoggedUser(): User {
    return JSON.parse(localStorage.getItem(this.loggedUserStorageKey) as string);
  }
}