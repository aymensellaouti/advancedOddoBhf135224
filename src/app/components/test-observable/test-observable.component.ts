import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, filter, map, take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-test-observable',
  templateUrl: './test-observable.component.html',
  styleUrls: ['./test-observable.component.css'],
})
export class TestObservableComponent implements OnDestroy {
  firstObservable$: Observable<number>;
  subscriptions: Subscription[] = [];
  constructor(private toaster: ToastrService) {
    this.firstObservable$ =
    new Observable((observer) => {
      let i = 5;
      setInterval(() => {
        if (!i) {
          observer.complete();
        }
        observer.next(i--);
      }, 1000);
    });
    //this.subscriptions.push(
      this.firstObservable$.subscribe((val) => {
      console.log(val);
    })
    //);
    setTimeout(
      () => {
      //    this.subscriptions.push(
              this.firstObservable$
              .pipe(
               // 5 4 3 2 1
              map((val) => val *3),
               // 15 12 9 6 3,
              filter((val) => !(val % 2)),
                // 12 6,
              take(1)
              )
              .subscribe({
                    next: (value) => this.toaster.info('' + value),
                    complete: () => this.toaster.success('Fin du Game :)'),
                    error: (err) => this.toaster.error('erreur')
                  }
              )
            //);
        }, 0);
  }
  ngOnDestroy(): void {
    // this.subscriptions.forEach(
    //   (subscription: Subscription) => subscription.unsubscribe()
    // )
  }
}
