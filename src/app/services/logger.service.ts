import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {

  constructor(private http: HttpClient) {}
  logger(something: any) {
    console.log('From Logger Service :');
    console.log(something);
  }
}
