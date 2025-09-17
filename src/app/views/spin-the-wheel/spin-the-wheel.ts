import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgIf} from '@angular/common';
// Declare winwheel for TypeScript
declare var Winwheel: any;

@Component({
  selector: 'app-spin-the-wheel',
  imports: [
    NgIf

  ],
  templateUrl: './spin-the-wheel.html',
  styleUrl: './spin-the-wheel.scss',
  standalone: true,
})
export class SpinTheWheel {
  @ViewChild('wheelCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  wheel: any;
  isSpinning = false;
  lastResult: any = null;

  // Wheel segments/prizes
  // wheelSegments = [
  //   { fillStyle: '#ff6b6b', text: '$100', textFillStyle: 'white' },
  //   { fillStyle: '#4ecdc4', text: 'Free Spin', textFillStyle: 'white' },
  //   { fillStyle: '#ffe66d', text: '$50', textFillStyle: 'black' },
  //   { fillStyle: '#ff8b94', text: 'Try Again', textFillStyle: 'white' },
  //   { fillStyle: '#95e1d3', text: '$200', textFillStyle: 'black' },
  //   { fillStyle: '#a8e6cf', text: 'Jackpot!', textFillStyle: 'black' },
  //   { fillStyle: '#ffaaa5', text: '$25', textFillStyle: 'white' },
  //   { fillStyle: '#c7ceea', text: 'Bonus Round', textFillStyle: 'black' }
  // ];
  wheelSegments = [
    { fillStyle: '#ff6b6b', text: '$100', textFillStyle: 'white', size: 60 }, // Larger segment
    { fillStyle: '#4ecdc4', text: 'Free Spin', textFillStyle: 'white', size: 30 }, // Smaller
    { fillStyle: '#ffe66d', text: '$50', textFillStyle: 'black', size: 45 },
    { fillStyle: '#ff8b94', text: 'Try Again', textFillStyle: 'white', size: 90 }, // Largest
    { fillStyle: '#95e1d3', text: '$200', textFillStyle: 'black', size: 20 }, // Smallest
    { fillStyle: '#a8e6cf', text: 'Jackpot!', textFillStyle: 'black', size: 25 },
    { fillStyle: '#ffaaa5', text: '$25', textFillStyle: 'white', size: 50 },
    { fillStyle: '#c7ceea', text: 'Bonus Round', textFillStyle: 'black', size: 40 }
  ];

  ngOnInit() {
    this.initializeWheel();
  }

  initializeWheel() {
    this.wheel = new Winwheel({
      canvasId: 'canvas',
      numSegments: this.wheelSegments.length,
      segments: this.wheelSegments,
      textFontSize: 12,
      textOrientation: 'horizontal',
      textAlignment: 'center',
      textMargin: null,
      textFontFamily: 'Arial',
      textStrokeStyle: null,
      textLineWidth: 1,
      outerRadius: 140,
      innerRadius: 0,
      strokeStyle: '#fff',
      lineWidth: 2,
      // Pin/pointer configuration
      // pins: {
      //   number: this.wheelSegments.length,
      //   fillStyle: '#fff',
      //   outerRadius: 6,
      // },
      // Animation settings
      animation: {
        type: 'spinToStop',
        duration: 4, // seconds
        spins: 15, // number of spins
        callbackFinished: this.onSpinFinished.bind(this),
      }
    });

    // Draw the wheel
    this.wheel.draw();
  }

  startSpin() {
    if (this.isSpinning) return;

    this.isSpinning = true;
    this.lastResult = null;

    // Start the spin animation
    this.wheel.startAnimation();
  }

  onSpinFinished(indicatedSegment: any) {
    this.isSpinning = false;
    this.lastResult = indicatedSegment;

    // You can add more logic here:
    // - Save result to database
    // - Update user points
    // - Show special animations
    console.log('Spin result:', indicatedSegment);
    console.log(this.isSpinning)
  }

  resetWheel() {
    this.wheel.stopAnimation(false);
    this.wheel.rotationAngle = 0;
    this.wheel.draw();
    this.isSpinning = false;
    this.lastResult = null;
  }


  // Optional: Add programmatic spin to specific segment
  spinToSegment(segmentNumber: number) {
    if (this.isSpinning) return;

    this.isSpinning = true;
    this.lastResult = null;
    this.wheel.animation.stopAngle = this.wheel.getRandomForSegment(segmentNumber);
    this.wheel.startAnimation();
  }
}
