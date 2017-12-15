import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { PersonProvider } from '../../providers/person/person';
import { PerformanceDataProvider } from '../../providers/performance-data/performance-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: any = {};
  constructor(
    public navCtrl: NavController,
    public person: PersonProvider,
    public performanceData: PerformanceDataProvider,
    public modelCtrl: ModalController
  ) {
    this.user = { distance: 1000, age: 20, gender: 'female' };
  }

  calculate(user) {
    this.person.age = this.user.age;
    this.person.gender = this.user.gender;

    this.person.doAssessment(this.user.distance);
    this.performanceData
      .saveData({ performance_data: { data: { message: this.person.assessmentMessage } } })
      .subscribe(data => console.log(data));
  }

  showResults() {
    this.modalCtrl.create(ResultsPage).present();
  }
}
