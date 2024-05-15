import { Injectable } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../config/api.config';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

export class AuthUser {
  constructor(public id = 0, public email = ''){}
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #userSubject = new BehaviorSubject<AuthUser | null>(null);
  user$ = this.#userSubject.asObservable();
  // Todo : Define loggedIn$ and loggedOut$
  loggedIn$: Observable<boolean> = this.user$.pipe(map((user) => !!user));
  loggedOut$: Observable<boolean> = this.user$.pipe(map((user) => !user));
  constructor(private http: HttpClient) {
    // Todo : vérifier est ce que le user existe fel localStorage
    const user = localStorage.getItem('user');
    // si oui je le récupére et je déclenche le beahivourSubject
    // sinon rien
    if (user) {
      this.#userSubject.next(JSON.parse(user));
    }
  }

  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(API.login, credentials).pipe(
      tap((response) => {
        // Todo save user fel localStorage
        // Nkhabi el token
        localStorage.setItem('token', response.id);
        //Nkhabi el user
        const user = new AuthUser(response.userId, credentials.email);
        localStorage.setItem('user', JSON.stringify(user));
        // Déclenchiw elsubject bel user authenticated
        this.#userSubject.next(user);
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    // Todo : Je vide le local storage mel user
    // declanchi null fel behaviour subject
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.#userSubject.next(null);
  }
}
