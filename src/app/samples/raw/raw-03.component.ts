// tslint:disable:member-ordering
import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';

///// Producer Class //////
class Producer {

  constructor(private observer: Observer<string>) {}

  // Various "next" behaviors
  hit() {
    this.observer.next('Hit!');
  }

  stay() {
    this.observer.next('Stay');
  }

  // Error behavior
  panic() {
    this.observer.error('Something bad happened');
  }

  // Complete behavior
  done() {
    this.observer.next('Done listening');
    this.observer.complete();
  }
}



//////  Component //////////

@Component({
  selector: 'app-raw-03',
  template: `
    <h4>03 - Subscribe fn params</h4>

    <div style="margin-bottom: 1rem;">
      <button type="button" (click)="producer.hit()"  >Hit me</button>
      <button type="button" (click)="producer.stay()" >Stay</button>
      <button type="button" (click)="producer.panic()">Panic</button>
      <button type="button" (click)="producer.done()" >Done</button>
      <button type="text" (click)="clear()">Clear</button>
    </div>

    <div *ngFor="let message of messages">
      {{message}}
    </div>

    <div *ngIf="errorMessage" style="background-color: red; color: white">
      OMG! We got an error!
      {{errorMessage}}!
      Time to panic!
    </div>
  `
})
export class Raw03Component implements OnInit {

  errorMessage = '';
  messages: string[] = [];

  producer: Producer;

  // Wrap new Producer in an RxJS Observable
  observable = new Observable(
    (o: Observer<string>) => { this.producer = new Producer(o); }
  );

  ngOnInit() {

    // Subscribe also takes zero-to-three fn params: next, error, complete
    // Don't need a Subscriber object to subscribe
    this.observable.subscribe(
      value => this.messages.push(value),
      (err: string) => (this.errorMessage = err),
      () => this.messages.push('Observable completed')
    );

  }

  clear() {
    this.errorMessage = '';
    this.messages = [];
  }
}
