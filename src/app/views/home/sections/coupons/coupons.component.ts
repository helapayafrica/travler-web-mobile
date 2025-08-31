import { Component, OnInit, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {BackendService} from '../../../../services/backend';


interface Offer {
  id: string;
  currencyCode: string;
  companyName: string;
  rate: string;
  seatTypes: string[];
  type: string;
  applyOn: string;
  applyAt: string;
  startDate: string;
  endDate: string;
  title: string;
  description: string;
  overAll: boolean;
  routeName: string;
  referenceKey: string;
  scheduleId: string;
}

interface Coupon {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  expiryDate: Date;
  minPurchase?: number;
  routes?: string[];
  isActive: boolean;
}

interface SeasonalPromotion {
  id: string;
  season: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  endDate: Date;
  couponCode?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  referralCode: string;
}

interface FAQ {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-home-coupons',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.scss',
})
export class CouponsComponent implements OnInit {
  offersArray: any[] = [];

  activeCoupons: Coupon[] = [
    {
      id: '1',
      code: 'NEWUSER25',
      title: 'New User Special',
      description: 'Get 25% off on your first booking with us!',
      discountType: 'percentage',
      discountValue: 25,
      expiryDate: new Date('2025-06-30'),
      minPurchase: 500,
      isActive: true,
    },
    {
      id: '2',
      code: 'WEEKEND10',
      title: 'Weekend Getaway',
      description: 'Save 10% on all weekend trips (Fri-Sun)',
      discountType: 'percentage',
      discountValue: 10,
      expiryDate: new Date('2025-05-31'),
      routes: ['Nairobi-Mombasa', 'Nairobi-Kisumu'],
      isActive: true,
    },
    {
      id: '3',
      code: 'FAMILY500',
      title: 'Family Package',
      description: 'Book 4+ tickets and get KES 500 off your total',
      discountType: 'fixed',
      discountValue: 500,
      expiryDate: new Date('2025-07-15'),
      minPurchase: 2000,
      isActive: true,
    },
  ];

  seasonalPromotion: SeasonalPromotion = {
    id: '1',
    season: 'HOLIDAY SEASON',
    title: 'Christmas Travel Special',
    description:
      'Plan your holiday travels early and save big with our exclusive Christmas season offers.',
    features: [
      'Up to 30% off on select routes',
      'Free seat selection',
      'Extra luggage allowance',
      'Priority boarding',
    ],
    image: 'assets/images/christmas-promo.jpg',
    endDate: new Date('2025-12-25'),
    couponCode: 'XMAS2025',
  };

  currentUser: User = {
    id: '123456',
    name: 'John Doe',
    email: 'johndoe@example.com',
    referralCode: 'FRIEND123456',
  };

  couponCode: string = '';
  couponMessage: string = '';
  couponValid: boolean = false;

  constructor(public service: BackendService) {

  }


  ngOnInit(): void {
    this.filterActiveCoupons();
    this.service.getOffers().subscribe((res) => {
      this.offersArray = this.processOffers(res);
    });
  }

  processOffers(response: any): any[] {
    let offersArray: any[] = [];
    if (response?.offers) {
      for (const referenceKey in response.offers) {
        if (response.offers.hasOwnProperty(referenceKey)) {
          for (const scheduleId in response.offers[referenceKey]) {
            if (response.offers[referenceKey].hasOwnProperty(scheduleId)) {
              const offersList = response.offers[referenceKey][scheduleId];
              offersList.forEach((offer: any) => {
                offersArray.push({
                  id: offer.id,
                  currencyCode: offer.currencyCode,
                  companyName: offer.companyName,
                  rate: offer.rate,
                  seatTypes: offer.seatType.split(','),
                  type: offer.type,
                  applyOn: offer.applyOn,
                  applyAt: offer.applyAt,
                  startDate: offer.startDate,
                  endDate: offer.endDate,
                  title: offer.title,
                  description: offer.description,
                  overAll: offer.overAll,
                  routeName: offer.routeName,
                  referenceKey,
                  scheduleId,
                });
              });
            }
          }
        }
      }
    }
    return offersArray;
  }

  filterActiveCoupons(): void {
    const today = new Date();
    this.activeCoupons = this.activeCoupons.filter(
      (coupon) => coupon.isActive && new Date(coupon.expiryDate) > today
    );
  }

  copyCouponCode(code: string): void {
    navigator.clipboard.writeText(code).then(() => {
      alert('Coupon code copied to clipboard!');
    });
  }

  applyCoupon(coupon: Coupon): void {
    this.couponCode = coupon.code;
    this.validateCoupon();
  }

  validateCoupon(): void {
    if (!this.couponCode) {
      this.couponMessage = 'Please enter a coupon code.';
      this.couponValid = false;
      return;
    }
    const foundCoupon = this.activeCoupons.find(
      (coupon) => coupon.code.toUpperCase() === this.couponCode.toUpperCase()
    );
    if (foundCoupon) {
      const today = new Date();
      if (new Date(foundCoupon.expiryDate) < today) {
        this.couponMessage = 'This coupon has expired.';
        this.couponValid = false;
      } else {
        this.couponMessage = `Success! Coupon "${foundCoupon.title}" applied. `;
        if (foundCoupon.discountType === 'percentage') {
          this.couponMessage += `You'll get ${foundCoupon.discountValue}% off.`;
        } else {
          this.couponMessage += `You'll get KES ${foundCoupon.discountValue} off.`;
        }
        this.couponValid = true;
      }
    } else if (
      this.couponCode.toUpperCase() ===
      this.seasonalPromotion?.couponCode?.toUpperCase()
    ) {
      this.couponMessage =
        "Seasonal promotion applied! You'll get special holiday benefits.";
      this.couponValid = true;
    } else {
      this.couponMessage = 'Invalid coupon code. Please check and try again.';
      this.couponValid = false;
    }
  }

  exploreSeasonalPromo(): void {
    if (this.seasonalPromotion?.couponCode) {
      this.couponCode = this.seasonalPromotion.couponCode;
      this.validateCoupon();
    }
  }

  shareReferralCode(): void {
    if (navigator.share) {
      navigator
        .share({
          title: 'Use my referral code for Bus Booking App',
          text: `Use my referral code ${this.currentUser.referralCode} and get KES 300 off your first booking!`,
          url: 'https://busbooking.app/referral',
        })
        .catch((err) => console.error('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(this.currentUser.referralCode).then(() => {
        alert(
          'Referral code copied to clipboard! Share it with your friends.'
        );
      });
    }
  }

  whatsNewData = [
    {
      title: 'Free Cash!!',
      description: 'Firt 100 get 50KES for completing your user profile!',
      buttonText: 'Know More',
      cardClass: 'secondary',
      action: 'complete-profile',
      image: 'fire.png',
    },
    {
      title: 'Track Your Package',
      description: 'Live tracking is now available for all deliveries.',
      buttonText: 'Track Now',
      cardClass: 'primary',
      action: 'track-package',
      image: 'target.png',
    },
    {
      title: 'Refer & Earn',
      description: 'Invite your friends and earn up to 100KES per referral!',
      buttonText: 'Refer Now',
      cardClass: 'sky',
      action: 'refer-friend',
      image: 'thumbs.png',
    },
    {
      title: 'New Payment Options',
      description: 'We’ve added M-PESA and Airtel Money for your convenience.',
      buttonText: 'Check It Out',
      cardClass: 'peachy',
      action: 'view-payments',
      image: 'dollar.png',
    },
    {
      title: 'Get Verified',
      description: 'Verify your identity to unlock more features and limits.',
      buttonText: 'Verify Now',
      cardClass: 'amber',
      action: 'verify-identity',
      image: 'star.png',
    },
    {
      title: 'Introducing Express Delivery',
      description: 'Faster delivery options now available for select locations.',
      buttonText: 'Explore',
      cardClass: 'rosy',
      action: 'view-express',
      image: 'bus.png',
    },
    {
      title: 'Limited Time Offer!',
      description: 'Enjoy 10% off your next shipment. Valid this week only!',
      buttonText: 'Claim Offer',
      cardClass: 'primary',
      action: 'apply-discount',
      image: 'mobile.png',
    },
  ];

  offers = [
    {
      type: 'primary',
      badge: 'nrb-mbs',
      title: 'Save KES 300 on all rides above KES 1500.',
      validity: 'Valid until 15 Sep',
      code: 'RIDE300',
      image: '/assets/images/TrvlerBanners-01.png',
    },
    {
      type: 'rosy',
      badge: 'nrb-mbs',
      title: 'Book 2 rides, get 1 free!',
      validity: 'Valid until 10 Sep',
      code: 'FREERIDE',
      image: '/assets/images/TrvlerBanners-04.png',
    },
    {
      type: 'amber',
      badge: 'nrb-mbs',
      title: 'Early bird offer – 20% off for morning rides!',
      validity: 'Valid until 30 Sep',
      code: 'EARLY20',
      image: '/assets/images/TrvlerBanners-03.png',
    },
    {
      type: 'peachy',
      badge: 'nrb-mbs',
      title: 'Get 50% off on your next 3 rides',
      validity: 'Valid until 25 Sep',
      code: 'SAVE50',
      image: '/assets/images/TrvlerBanners-1.png',
    },
    {
      type: 'sky',
      badge: 'nrb-mbs',
      title: 'Weekend special: Flat KES 100 off',
      validity: 'Valid until 28 Sep',
      code: 'WKND100',
      image: '/assets/images/TrvlerBanners-04.png',
    },
  ];



}
