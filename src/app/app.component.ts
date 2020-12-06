import { Component, ViewChild } from '@angular/core';
import { NgxWheelComponent, TextAlignment, TextOrientation } from 'ngx-wheel'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  @ViewChild(NgxWheelComponent) wheel;

  title = 'DailyWheel';
  idToLandOn: any;
  names: string[] = [ 'Mehdy', 'Philippe A.', 'Mathieu', 'Sebastien', 'Aurélien' ];
  items: any[];
  textOrientation: TextOrientation = TextOrientation.HORIZONTAL;
  textAlignment: TextAlignment = TextAlignment.OUTER;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.idToLandOn = this.names.indexOf(this.names[Math.floor(Math.random() * this.names.length)]);
    const colors = ['green', 'yellow', 'orange', 'lightblue', 'pink'];
    this.items = this.names.map((value) => ({
      fillStyle: colors[this.names.indexOf(value) % colors.length],
      text: `${value}`,
      id: this.names.indexOf(value),
      textFillStyle: 'black',
      textFontSize: '16'
    }));

  }

  reset() {
    this.wheel.reset();
  }

  before() {
    alert('Your wheel is about to spin');
    this.playAudio();
  }

  async spin(prize) {
    this.idToLandOn = prize;
    await new Promise(resolve => setTimeout(resolve, 0));
    this.wheel.spin();
    this.playAudio();
  }

  playAudio(){
    const audio = new Audio();
    audio.src = './assets/audio/RaffleWheel.mp3';
    audio.load();
    audio.play();
  }

  after() {
    alert('The winner is ' + this.names[this.idToLandOn]);
  }

}
