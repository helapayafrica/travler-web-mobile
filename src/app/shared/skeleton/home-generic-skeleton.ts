
// generic-skeleton.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SkeletonConfig {
  type: 'hero' | 'cards' | 'list' | 'testimonials' | 'blog' | 'partners' | 'faqs' | 'apps';
  showTitle?: boolean;
  showSubtitle?: boolean;
  showReturnDate?: boolean;
  itemsCount?: number;
  height?: 'sm' | 'md' | 'lg' | 'xl';
  columns?: number;
  hasImage?: boolean;
  hasButton?: boolean;
  containerClass?: string;
}

@Component({
  selector: 'app-generic-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="config.containerClass || 'py-5'" [class.bg-light]="config.type === 'testimonials' || config.type === 'faqs'">
      <div class="container">

        <!-- Section Title and Subtitle (for non-hero sections) -->
        <div *ngIf="config.showTitle && config.type !== 'hero'" class="text-center mb-5">
          <div class="skeleton-placeholder rounded mb-3 mx-auto"
               [ngClass]="getTitleClass()"></div>
          <div *ngIf="config.showSubtitle"
               class="skeleton-placeholder rounded mx-auto"
               [ngClass]="getSubtitleClass()"></div>
        </div>

        <!-- Bus Booking Hero Layout -->
        <div *ngIf="config.type === 'hero'" class="hero-booking-skeleton">

          <!-- Progress Steps -->
          <div class="mb-4 text-center">
            <div class="skeleton-placeholder rounded mx-auto" style="height: 2.5rem; width: 100%; max-width: 700px;"></div>
          </div>

          <!-- Booking Form Container -->
          <div class="bg-white rounded-4 shadow-lg p-4 mb-4 mx-auto" style="border-radius: 2rem !important; max-width: 1200px;">

            <!-- Trip Type Toggle -->
            <div class="mb-4">
              <div class="d-flex gap-4">
                <div class="skeleton-placeholder rounded-pill" style="height: 2.5rem; width: 120px;"></div>
                <div class="skeleton-placeholder rounded-pill" style="height: 2.5rem; width: 140px;"></div>
              </div>
            </div>

            <!-- Main Search Form -->
            <div class="row g-0 align-items-stretch">

              <!-- From City -->
              <div [class]="getHeroColumnClass('from')">
                <div class="p-3 border border-2 rounded-start-3 border-end-0 h-100 d-flex flex-column justify-content-center" style="min-height: 80px;">
                  <div class="skeleton-placeholder rounded mb-2" style="height: 0.8rem; width: 60px;"></div>
                  <div class="skeleton-placeholder rounded" style="height: 1.5rem; width: 90%;"></div>
                </div>
              </div>

              <!-- To City -->
              <div [class]="getHeroColumnClass('to')">
                <div class="p-3 border border-2 border-start-0 border-end-0 h-100 d-flex flex-column justify-content-center" style="min-height: 80px;">
                  <div class="skeleton-placeholder rounded mb-2" style="height: 0.8rem; width: 40px;"></div>
                  <div class="skeleton-placeholder rounded" style="height: 1.5rem; width: 85%;"></div>
                </div>
              </div>

              <!-- Date of Journey -->
              <div [class]="getHeroColumnClass('date')">
                <div [class]="getDateContainerClass()" style="min-height: 80px;">
                  <div class="skeleton-placeholder rounded mb-2" style="height: 0.8rem; width: 100px;"></div>
                  <div class="d-flex justify-content-between align-items-center gap-2">
                    <div class="skeleton-placeholder rounded flex-grow-1" style="height: 1.5rem;"></div>
                    <div class="skeleton-placeholder rounded-pill" style="height: 2rem; width: 60px;"></div>
                    <div class="skeleton-placeholder rounded-pill" style="height: 2rem; width: 80px;"></div>
                  </div>
                </div>
              </div>

              <!-- Return Date (if round trip) -->
              <div *ngIf="config.showReturnDate" [class]="getHeroColumnClass('return')">
                <div class="p-3 border border-2 border-start-0 border-end-0 h-100 d-flex flex-column justify-content-center" style="min-height: 80px;">
                  <div class="skeleton-placeholder rounded mb-2" style="height: 0.8rem; width: 90px;"></div>
                  <div class="skeleton-placeholder rounded" style="height: 1.5rem; width: 95%;"></div>
                </div>
              </div>

              <!-- Search Button Container -->
              <div [class]="getSearchButtonColumnClass()">
                <div class="h-100 d-flex align-items-center justify-content-center p-3">
                  <div class="skeleton-placeholder rounded-pill"
                       style="height: 3.5rem; width: 160px; background: linear-gradient(90deg, var(--gray-200) 25%, var(--gray-300) 50%, var(--gray-200) 75%); background-size: 200% 100%;"></div>
                </div>
              </div>
            </div>

            <!-- Mobile Search Button (hidden on desktop) -->
            <div class="d-lg-none mt-3 text-center">
              <div class="skeleton-placeholder rounded-pill mx-auto"
                   style="height: 3.5rem; width: 180px; background: linear-gradient(90deg, var(--gray-200) 25%, var(--gray-300) 50%, var(--gray-200) 75%); background-size: 200% 100%;"></div>
            </div>
          </div>

          <!-- Optional welcome text -->
          <div class="text-center">
            <div class="skeleton-placeholder rounded mx-auto mb-2" style="height: 1.2rem; width: 300px;"></div>
          </div>
        </div>

        <!-- Cards Layout (Coupons, Blog, Partners) -->
        <div *ngIf="config.type === 'cards' || config.type === 'blog' || config.type === 'partners'"
             class="row">
          <div
            *ngFor="let item of getItemsArray()"
            [ngClass]="getColumnClass()"
            class="mb-4">
            <div class="card border-0 shadow-sm h-100">
              <div *ngIf="config.hasImage"
                   class="skeleton-placeholder"
                   [style.height]="getCardImageHeight()"></div>
              <div class="card-body">
                <div class="skeleton-placeholder rounded mb-3" style="height: 1.5rem;"></div>
                <div class="skeleton-placeholder rounded mb-2" style="height: 1rem;"></div>
                <div class="skeleton-placeholder rounded mb-3" style="height: 1rem; width: 80%;"></div>
                <div *ngIf="config.hasButton"
                     class="skeleton-placeholder rounded"
                     style="height: 2.5rem; width: 120px;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- List Layout (How to Book, Apps) -->
        <div *ngIf="config.type === 'list' || config.type === 'apps'" class="row">
          <div class="col-lg-8 mx-auto">
            <div *ngFor="let item of getItemsArray()" class="d-flex align-items-center mb-4 p-3 bg-white rounded shadow-sm">
              <div class="skeleton-placeholder rounded-circle me-3" style="width: 60px; height: 60px;"></div>
              <div class="flex-grow-1">
                <div class="skeleton-placeholder rounded mb-2" style="height: 1.2rem; width: 70%;"></div>
                <div class="skeleton-placeholder rounded" style="height: 1rem;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Testimonials Layout -->
        <div *ngIf="config.type === 'testimonials'" class="row">
          <div *ngFor="let item of getItemsArray()"
               [ngClass]="getColumnClass()"
               class="mb-4">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-body">
                <div class="d-flex align-items-center mb-3">
                  <div class="skeleton-placeholder rounded-circle me-3" style="width: 50px; height: 50px;"></div>
                  <div class="flex-grow-1">
                    <div class="skeleton-placeholder rounded mb-1" style="height: 1rem; width: 60%;"></div>
                    <div class="skeleton-placeholder rounded" style="height: 0.8rem; width: 40%;"></div>
                  </div>
                </div>
                <div class="skeleton-placeholder rounded mb-2" style="height: 0.9rem;"></div>
                <div class="skeleton-placeholder rounded mb-2" style="height: 0.9rem;"></div>
                <div class="skeleton-placeholder rounded" style="height: 0.9rem; width: 75%;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- FAQs Layout -->
        <div *ngIf="config.type === 'faqs'" class="row">
          <div class="col-lg-8 mx-auto">
            <div *ngFor="let item of getItemsArray()" class="card mb-3 border-0 shadow-sm">
              <div class="card-header bg-white">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="skeleton-placeholder rounded flex-grow-1 me-3" style="height: 1.2rem;"></div>
                  <div class="skeleton-placeholder rounded" style="width: 30px; height: 30px;"></div>
                </div>
              </div>
              <div class="card-body">
                <div class="skeleton-placeholder rounded mb-2" style="height: 1rem;"></div>
                <div class="skeleton-placeholder rounded" style="height: 1rem; width: 85%;"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .skeleton-placeholder {
      background: linear-gradient(90deg, #f0f2f5 25%, #e4e6ea 50%, #f0f2f5 75%);
      background-size: 200% 100%;
      animation: shimmer 2s infinite;
    }

    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    .hero-booking-skeleton {
      min-height: 300px;
      padding: 2rem 0;
    }

    .hero-booking-skeleton .border {
      border-color: #dee2e6 !important;
    }

    .hero-booking-skeleton .rounded-start-3 {
      border-top-left-radius: 0.5rem !important;
      border-bottom-left-radius: 0.5rem !important;
    }

    .hero-booking-skeleton .rounded-end-3 {
      border-top-right-radius: 0.5rem !important;
      border-bottom-right-radius: 0.5rem !important;
    }

    /* Pulse animation alternative */
    .skeleton-placeholder.pulse {
      animation: pulse 1.5s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }

    /* Mobile responsive adjustments */
    @media (max-width: 991.98px) {
      .hero-booking-skeleton .border {
        border: 1px solid #dee2e6 !important;
        border-radius: 0.5rem !important;
        margin-bottom: 0.5rem;
      }

      .hero-booking-skeleton .border-start-0,
      .hero-booking-skeleton .border-end-0 {
        border: 1px solid #dee2e6 !important;
      }
    }
  `]
})
export class GenericSkeletonComponent {
  @Input() config: SkeletonConfig = {
    type: 'cards',
    showTitle: true,
    itemsCount: 3,
    height: 'md',
    columns: 3,
    hasImage: true,
    hasButton: true
  };

  getItemsArray(): number[] {
    return Array(this.config.itemsCount || 3).fill(0).map((x, i) => i);
  }

  getColumnClass(): string {
    const columns = this.config.columns || 3;
    switch (columns) {
      case 1: return 'col-12';
      case 2: return 'col-md-6';
      case 3: return 'col-lg-4 col-md-6';
      case 4: return 'col-xl-3 col-lg-4 col-md-6';
      case 6: return 'col-xl-2 col-lg-3 col-md-4 col-sm-6';
      default: return 'col-lg-4 col-md-6';
    }
  }

  getTitleClass(): string {
    const baseClass = 'skeleton-placeholder';
    switch (this.config.height) {
      case 'sm': return `${baseClass} d-inline-block w-25`;
      case 'md': return `${baseClass} d-inline-block w-50`;
      case 'lg': return `${baseClass} d-inline-block w-75`;
      case 'xl': return `${baseClass} w-100`;
      default: return `${baseClass} d-inline-block w-50`;
    }
  }

  getSubtitleClass(): string {
    return 'skeleton-placeholder d-inline-block w-25';
  }

  getImageHeight(): string {
    switch (this.config.height) {
      case 'sm': return '200px';
      case 'md': return '300px';
      case 'lg': return '400px';
      case 'xl': return '500px';
      default: return '300px';
    }
  }

  getCardImageHeight(): string {
    switch (this.config.height) {
      case 'sm': return '150px';
      case 'md': return '200px';
      case 'lg': return '250px';
      case 'xl': return '300px';
      default: return '200px';
    }
  }

  // Hero-specific responsive classes
  getHeroColumnClass(field: string): string {
    if (this.config.showReturnDate) {
      // Round trip layout
      switch (field) {
        case 'from': return 'col-lg-2 col-md-6 col-12 mb-3 mb-lg-0';
        case 'to': return 'col-lg-2 col-md-6 col-12 mb-3 mb-lg-0';
        case 'date': return 'col-lg-4 col-md-6 col-12 mb-3 mb-lg-0';
        case 'return': return 'col-lg-2 col-md-6 col-12 mb-3 mb-lg-0';
        default: return 'col-lg-2 col-md-6 col-12 mb-3 mb-lg-0';
      }
    } else {
      // One way layout
      switch (field) {
        case 'from': return 'col-lg-3 col-md-6 col-12 mb-3 mb-lg-0';
        case 'to': return 'col-lg-3 col-md-6 col-12 mb-3 mb-lg-0';
        case 'date': return 'col-lg-4 col-md-12 col-12 mb-3 mb-lg-0';
        default: return 'col-lg-3 col-md-6 col-12 mb-3 mb-lg-0';
      }
    }
  }

  getDateContainerClass(): string {
    const baseClass = 'p-3 border border-2 border-start-0 h-100 d-flex flex-column justify-content-center';
    if (this.config.showReturnDate) {
      return `${baseClass} border-end-0`;
    } else {
      return `${baseClass} rounded-end-3`;
    }
  }

  getSearchButtonColumnClass(): string {
    if (this.config.showReturnDate) {
      return 'col-lg-2 col-md-12 d-none d-lg-block';
    } else {
      return 'col-lg-2 col-md-12 d-none d-lg-block';
    }
  }
}
