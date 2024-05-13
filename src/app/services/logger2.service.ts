import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Logger2Service {

  constructor(private http: HttpClient) {}
  logger(something: any) {
    console.log('From Logger 2 Service :');
    console.log(something);
  }
}
