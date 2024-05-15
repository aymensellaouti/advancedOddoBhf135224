import { Injectable } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../config/api.config';
import { BehaviorSubject, Observable } from 'rxjs';

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
  loggedIn$!: Observable<boolean>;
  loggedOut$!: Observable<boolean>;
  constructor(private http: HttpClient) {
    // Todo : vérifier est ce que le user existe fel localStorage
    // si oui je le récupére et je déclenche le beahivourSubject
    // sinon rien
  }

  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    // Todo save user fel localStorage
    // Déclenchiw elsubject bel user authenticated
    return this.http.post<LoginResponseDto>(API.login, credentials);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    // Todo : Je vide le local storage mel user
    // declanchi null fel behaviour subject
    localStorage.removeItem('token');
  }
}
