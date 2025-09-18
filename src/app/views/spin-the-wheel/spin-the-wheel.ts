import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
// Declare winwheel for TypeScript
declare var Winwheel: any;

@Component({
  selector: 'app-spin-the-wheel',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './spin-the-wheel.html',
  styleUrl: './spin-the-wheel.scss',
  standalone: true,
})
export class SpinTheWheel implements OnInit{
  constructor(private cdr: ChangeDetectorRef) {}
  @ViewChild('wheelCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  wheel: any;
  isSpinning = false;
  lastResult: any = null;
  targetSegment: number |null = null;
  isControlledSpin = false

  // Wheel segments/prizes
  // wheelSegments = [
  //   { fillStyle: '#4ecdc4', text: '10% Off', textFillStyle: 'white', size: 50 },
  //   { fillStyle: '#ff6b6b', text: 'Try Again', textFillStyle: 'white', size: 120 },
  //   { fillStyle: '#a8e6cf', text: '100sh off next travel', textFillStyle: 'black', size: 25 },
  //   { fillStyle: '#ff8b94', text: 'Try Again', textFillStyle: 'white', size: 120 },
  //   { fillStyle: '#95e1d3', text: '100% Off Next travel', textFillStyle: 'black', size: 10 },
  //   { fillStyle: '#ffaaa5', text: 'Book again to spin', textFillStyle: 'white', size: 40 },
  //   { fillStyle: '#ffe66d', text: '50% Off', textFillStyle: 'black', size: 20 },
  // ];
   shuffle<T>(arr: T[]): T[] {
    return arr
      .map(item => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  }

  weightedSegments = [
    { fillStyle: '#ff6b6b', text: 'Try Again', textFillStyle: 'white', size: 90 },
    { fillStyle: '#ff8b94', text: 'Try Again', textFillStyle: 'white', size: 90 },
    { fillStyle: '#4ecdc4', text: '10% Off', textFillStyle: 'white', size: 50 },
    { fillStyle: '#ffaaa5', text: 'Book again to spin', textFillStyle: 'white', size: 40 },
    { fillStyle: '#a8e6cf', text: '100sh off next travel', textFillStyle: 'black', size: 35 },
    { fillStyle: '#ffe66d', text: '50% Off', textFillStyle: 'black', size: 30 },
    { fillStyle: '#95e1d3', text: '100% Off Next travel', textFillStyle: 'black', size: 30 },
  ];

  wheelSegments = this.shuffle(this.weightedSegments);

  ngOnInit() {
    this.initializeWheel();
  }

  initializeWheel() {
    this.wheel = new Winwheel({
      canvasId: 'canvas',
      numSegments: this.wheelSegments.length,
      // segments: this.wheelSegments,
      segments: this.wheelSegments.map(segment => ({
        fillStyle: segment.fillStyle,
        text: segment.text,
        textFillStyle: segment.textFillStyle,
        size: segment.size
      })),
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
    this.cdr.detectChanges();

    this.wheel.rotationAngle = 0;
    this.isSpinning = true;
    this.lastResult = null;
    this.isControlledSpin = false;
    this.targetSegment = null;
    // Start the spin animation
    this.wheel.startAnimation();
  }

  onSpinFinished(indicatedSegment: any) {
    this.isSpinning = false;
    this.cdr.detectChanges();
    this.lastResult = indicatedSegment;

    // You can add more logic here:
    // - Save result to database
    // - Update user points
    // - Show special animations
    console.log('Spin result:', indicatedSegment);
    console.log(this.isSpinning)
    this.cdr.detectChanges();
  }

  resetWheel() {
    this.wheel.stopAnimation(false);
    this.wheel.rotationAngle = 0;
    this.wheel.draw();
    this.isSpinning = false;
    this.cdr.detectChanges();
    this.lastResult = null;
  }


  // Optional: Add programmatic spin to specific segment
  spinToSegment(segmentNumber: number) {
    if (this.isSpinning) return;

    this.isSpinning = true;
    this.cdr.detectChanges();
    this.lastResult = null;
    this.wheel.animation.stopAngle = this.wheel.getRandomForSegment(segmentNumber);
    this.wheel.startAnimation();
  }

// Method to spin to a specific segment
  spinToSpecificSegment(segmentIndex: number) {
    if (this.isSpinning) return;

    this.targetSegment = segmentIndex;
    this.isControlledSpin = true;
    this.isSpinning = true;
    this.lastResult = null;

    // Calculate the angle for the target segment
    const stopAngle = this.wheel.getRandomForSegment(segmentIndex);
    this.wheel.animation.stopAngle = stopAngle;
    this.wheel.startAnimation();
  }

// Method to get segment probabilities (for display)
  getSegmentProbabilities() {
    const total = this.wheelSegments.reduce((sum, seg) => sum + seg.size, 0);
    return this.wheelSegments.map(seg => ({
      text: seg.text,
      probability: Math.round((seg.size / total) * 100)
    }));
  }
}
