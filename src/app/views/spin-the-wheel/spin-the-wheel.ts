import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, NgZone} from '@angular/core';
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
  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) {}
  @ViewChild('wheelCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  wheel: any;
  isSpinning = false;
  lastResult: any = null;
  targetSegment: number |null = null;
  isControlledSpin = false

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
      pins: {
        number: this.wheelSegments.length,
        fillStyle: '#fff',
        outerRadius: 6,
      },
      animation: {
        type: 'spinToStop',
        duration: 4,
        spins: 15,
        callbackAfter: (indicatedSegment: any) => {
          this.ngZone.run(() => {
            this.isSpinning = false;
            this.lastResult = indicatedSegment;
            this.cdr.detectChanges();
            console.log('Spin finished:', indicatedSegment);
          });
        }
      }
    });
    this.wheel.draw();
  }

  // startSpin() {
  //   if (this.isSpinning) return;
  //   this.wheel.rotationAngle = 0;
  //   this.isSpinning = true;
  //   this.lastResult = null;
  //   this.isControlledSpin = false;
  //   this.targetSegment = null;
  //   this.wheel.startAnimation();
  //   console.log('Animation Called')
  // }
  startSpin() {
    if (this.isSpinning) return;

    console.log('startSpin called');
    console.log('wheel object:', this.wheel);

    this.wheel.rotationAngle = 0;
    this.isSpinning = true;
    this.lastResult = null;
    this.isControlledSpin = false;
    this.targetSegment = null;

    try {
      this.wheel.startAnimation();
      console.log('Animation started successfully');
      // this.isSpinning = false; // Reset state if animation fails
      console.log(this.isSpinning)
    } catch (error) {
      console.error('Animation start failed:', error);
      this.isSpinning = false; // Reset state if animation fails
      console.log(this.isSpinning)
    }
  }

  resetWheel() {
    this.wheel.stopAnimation(false);
    this.wheel.rotationAngle = 0;
    this.wheel.draw();
    this.isSpinning = false;
    this.lastResult = null;
  }

  spinToSegment(segmentNumber: number) {
    if (this.isSpinning) return;

    this.isSpinning = true;
    this.lastResult = null;
    this.wheel.animation.stopAngle = this.wheel.getRandomForSegment(segmentNumber);
    this.wheel.startAnimation();
  }

  spinToSpecificSegment(segmentIndex: number) {
    if (this.isSpinning) return;

    this.targetSegment = segmentIndex;
    this.isControlledSpin = true;
    this.isSpinning = true;
    this.lastResult = null;

    const stopAngle = this.wheel.getRandomForSegment(segmentIndex);
    this.wheel.animation.stopAngle = stopAngle;
    this.wheel.startAnimation();
  }

  getSegmentProbabilities() {
    const total = this.wheelSegments.reduce((sum, seg) => sum + seg.size, 0);
    return this.wheelSegments.map(seg => ({
      text: seg.text,
      probability: Math.round((seg.size / total) * 100)
    }));
  }
}
