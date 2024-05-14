import { Component, Input } from '@angular/core';
import { Observable, map, startWith, timer } from 'rxjs';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent {
  @Input() timer = 1500;
  @Input() imagePaths = [
    'as.jpg',
    'cv.png',
    'rotating_card_profile.png',
    'rotating_card_profile2.png',
    'rotating_card_profile3.png',
  ];

  paths$: Observable<string> = timer(0, 1000)
    // 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18
    .pipe(
      map((index) => this.imagePaths[index % this.imagePaths.length]),
      startWith(this.imagePaths[this.imagePaths.length-1])
      //'as.jpg','cv.png',....'rotating_card_profile3.png','as.jpg',
    );
}
    ;

