import {Component, EventEmitter, Output} from '@angular/core';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import {CurrencyPipe, NgForOf} from '@angular/common';
import {Button} from 'primeng/button';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {Drawer} from 'primeng/drawer';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search-refine-filters',
  standalone: true,
  imports: [NgxSliderModule, CurrencyPipe, Button, TabPanel, Drawer, Tabs, TabList, Tab, FormsModule, TabPanels, NgForOf],
  templateUrl: './refine-filters.component.html',
  styleUrl: './refine-filters.component.scss'
})
export class RefineFiltersComponent {
  @Output() filteredBusesChange = new EventEmitter<any[]>();
  minValue: number = 1000;
  maxValue: number = 5000;
  options: any = {
    floor: 1000,
    ceil: 5000,
    step: 25,
    translate: (value: number): string => {
      return `KES ${value}`;
    }
  };
  // Add these new properties
  buses: any[] = [
    {
      "bus_id": "10206",
      "company_name": "DREAMLINE EXPRESS",
      "token": "5D42A68D-8353-4B2E-AB00-2270CBA4D76E",
      "bus_type": "48 Seater",
      "route_id": "1186",
      "amenities": "4,5",
      "delayedDate": 1757710800,
      "departure_time": "08:30 AM",
      "arrival_time": "06:15 PM",
      "available_seat_count": 42,
      "total_journey_time": "07:51",
      "avg_rating": "0.0",
      "rating_count": "0",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "1200.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Direct",
      "trip_code": "NRB-MSA-NYL-BAMBURI-MTW",
      "ticket_amount": "1200.00",
      "sort_time": 1757655000,
      "company_logo": "https://sawaboss.com//uploads/logo/33/1698552128953.jpg",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "15578",
      "company_name": "MASH EAST AFRICA LIMITED",
      "token": "A40980FF-718C-4488-A136-2A712430264C",
      "bus_type": "MASH POLO",
      "route_id": "1562",
      "amenities": "1,2,4,5,6",
      "delayedDate": 1757710800,
      "departure_time": "09:00 AM",
      "arrival_time": "05:30 PM",
      "available_seat_count": 30,
      "total_journey_time": "07:46",
      "avg_rating": "0.0",
      "rating_count": "0",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "2000.00",
          "seatType": "vip"
        },
        {
          "currencyCode": "KES",
          "amount": "1500.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Direct",
      "trip_code": "NBO - MSA",
      "ticket_amount": "2000.00",
      "sort_time": 1757656800,
      "company_logo": "https://sawaboss.com//uploads/logo/126/31e8526bf34c6396314774d373007b721741250077.png",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "14766",
      "company_name": "DREAMLINE EXPRESS",
      "token": "5D42A68D-8353-4B2E-AB00-2270CBA4D76E",
      "bus_type": "48 Seater",
      "route_id": "297",
      "amenities": "4,5",
      "delayedDate": 1757710800,
      "departure_time": "12:30 PM",
      "arrival_time": "09:30 PM",
      "available_seat_count": 48,
      "total_journey_time": "08:16",
      "avg_rating": "0.0",
      "rating_count": "0",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "1200.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Direct",
      "trip_code": "NRB - MSA",
      "ticket_amount": "1200.00",
      "sort_time": 1757669400,
      "company_logo": "https://sawaboss.com//uploads/logo/33/1698552128953.jpg",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "8809",
      "company_name": "DREAMLINE EXPRESS",
      "token": "5D42A68D-8353-4B2E-AB00-2270CBA4D76E",
      "bus_type": "ZHONGTONG",
      "route_id": "314",
      "amenities": "1,2,3,4,5,6",
      "delayedDate": 1757710800,
      "departure_time": "07:30 PM",
      "arrival_time": "05:00 AM",
      "available_seat_count": 35,
      "total_journey_time": "08:06",
      "avg_rating": "3.7",
      "rating_count": "23",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "1600.00",
          "seatType": "vip"
        },
        {
          "currencyCode": "KES",
          "amount": "1300.00",
          "seatType": "bclass"
        },
        {
          "currencyCode": "KES",
          "amount": "1200.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Direct",
      "trip_code": "NRB - MTW",
      "ticket_amount": "1600.00",
      "sort_time": 1757694600,
      "company_logo": "https://sawaboss.com//uploads/logo/33/1698552128953.jpg",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "16549",
      "company_name": "MASH EAST AFRICA LIMITED",
      "token": "A40980FF-718C-4488-A136-2A712430264C",
      "bus_type": "MashpoaVipBusinessNormal",
      "route_id": "1562",
      "amenities": null,
      "delayedDate": 1757710800,
      "departure_time": "08:00 PM",
      "arrival_time": "04:00 AM",
      "available_seat_count": 39,
      "total_journey_time": "07:16",
      "avg_rating": "0.0",
      "rating_count": "0",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "1800.00",
          "seatType": "vip"
        },
        {
          "currencyCode": "KES",
          "amount": "1600.00",
          "seatType": "bclass"
        },
        {
          "currencyCode": "KES",
          "amount": "1300.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Direct",
      "trip_code": "NBO - MSA",
      "ticket_amount": "1800.00",
      "sort_time": 1757696400,
      "company_logo": "https://sawaboss.com//uploads/logo/126/31e8526bf34c6396314774d373007b721741250077.png",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "13178",
      "company_name": "DREAMLINE EXPRESS",
      "token": "5D42A68D-8353-4B2E-AB00-2270CBA4D76E",
      "bus_type": "48 Seater",
      "route_id": "1186",
      "amenities": "4,5",
      "delayedDate": 1757710800,
      "departure_time": "08:30 PM",
      "arrival_time": "06:15 AM",
      "available_seat_count": 48,
      "total_journey_time": "07:51",
      "avg_rating": "4.0",
      "rating_count": "2",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "1200.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Direct",
      "trip_code": "NRB-MSA-NYL-BAMBURI-MTW",
      "ticket_amount": "1200.00",
      "sort_time": 1757698200,
      "company_logo": "https://sawaboss.com//uploads/logo/33/1698552128953.jpg",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "15588",
      "company_name": "MASH EAST AFRICA LIMITED",
      "token": "A40980FF-718C-4488-A136-2A712430264C",
      "bus_type": "MashpoaVipNormalNew",
      "route_id": "1562",
      "amenities": null,
      "delayedDate": 1757710800,
      "departure_time": "08:30 PM",
      "arrival_time": "05:00 AM",
      "available_seat_count": 39,
      "total_journey_time": "07:46",
      "avg_rating": "0.0",
      "rating_count": "0",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "1800.00",
          "seatType": "vip"
        },
        {
          "currencyCode": "KES",
          "amount": "1300.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Direct",
      "trip_code": "NBO - MSA",
      "ticket_amount": "1800.00",
      "sort_time": 1757698200,
      "company_logo": "https://sawaboss.com//uploads/logo/126/31e8526bf34c6396314774d373007b721741250077.png",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "8778",
      "company_name": "DREAMLINE EXPRESS",
      "token": "5D42A68D-8353-4B2E-AB00-2270CBA4D76E",
      "bus_type": "EXECUTIVE MD",
      "route_id": "305",
      "amenities": "2,3,4,5",
      "delayedDate": 1757710800,
      "departure_time": "08:50 PM",
      "arrival_time": "05:40 AM",
      "available_seat_count": 22,
      "total_journey_time": "08:06",
      "avg_rating": "4.2",
      "rating_count": "21",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "1800.00",
          "seatType": "vip"
        },
        {
          "currencyCode": "KES",
          "amount": "1700.00",
          "seatType": "bclass"
        },
        {
          "currencyCode": "KES",
          "amount": "1500.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Highway",
      "trip_code": "KTL - MSA",
      "ticket_amount": "1800.00",
      "sort_time": 1757699400,
      "company_logo": "https://sawaboss.com//uploads/logo/33/1698552128953.jpg",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "13179",
      "company_name": "DREAMLINE EXPRESS",
      "token": "5D42A68D-8353-4B2E-AB00-2270CBA4D76E",
      "bus_type": "New Gemilang",
      "route_id": "314",
      "amenities": null,
      "delayedDate": 1757710800,
      "departure_time": "09:00 PM",
      "arrival_time": "06:20 AM",
      "available_seat_count": 42,
      "total_journey_time": "07:56",
      "avg_rating": "5.0",
      "rating_count": "1",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "1600.00",
          "seatType": "vip"
        },
        {
          "currencyCode": "KES",
          "amount": "1400.00",
          "seatType": "bclass"
        },
        {
          "currencyCode": "KES",
          "amount": "1400.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Direct",
      "trip_code": "NRB - MTW",
      "ticket_amount": "1600.00",
      "sort_time": 1757700000,
      "company_logo": "https://sawaboss.com//uploads/logo/33/1698552128953.jpg",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "14910",
      "company_name": "ROYAL LINER EXPRESS LIMITED",
      "token": "E96229F1-D137-47FE-B9C3-0D30442A4FEC",
      "bus_type": "BUS C",
      "route_id": "1519",
      "amenities": null,
      "delayedDate": 1757710800,
      "departure_time": "09:00 PM",
      "arrival_time": "08:30 AM",
      "available_seat_count": 47,
      "total_journey_time": "07:01",
      "avg_rating": "0.0",
      "rating_count": "0",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "1300.00",
          "seatType": "vip"
        },
        {
          "currencyCode": "KES",
          "amount": "1200.00",
          "seatType": "bclass"
        },
        {
          "currencyCode": "KES",
          "amount": "1200.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Direct",
      "trip_code": "NAIROBI - KITENGELA - MSA - MTWAPA",
      "ticket_amount": "1300.00",
      "sort_time": 1757700000,
      "company_logo": "https://sawaboss.com//uploads/logo/107/Logo.jpeg",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "8785",
      "company_name": "DREAMLINE EXPRESS",
      "token": "5D42A68D-8353-4B2E-AB00-2270CBA4D76E",
      "bus_type": "Futura 43",
      "route_id": "312",
      "amenities": null,
      "delayedDate": 1757710800,
      "departure_time": "09:15 PM",
      "arrival_time": "06:55 AM",
      "available_seat_count": 36,
      "total_journey_time": "08:16",
      "avg_rating": "4.4",
      "rating_count": "32",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "2200.00",
          "seatType": "vip"
        },
        {
          "currencyCode": "KES",
          "amount": "1900.00",
          "seatType": "normal"
        },
        {
          "currencyCode": "KES",
          "amount": "1700.00",
          "seatType": "bclass"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Highway",
      "trip_code": "NKR - MTW",
      "ticket_amount": "2200.00",
      "sort_time": 1757700900,
      "company_logo": "https://sawaboss.com//uploads/logo/33/1698552128953.jpg",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "13229",
      "company_name": "DREAMLINE EXPRESS",
      "token": "5D42A68D-8353-4B2E-AB00-2270CBA4D76E",
      "bus_type": "48 Seater",
      "route_id": "1363",
      "amenities": "4,5",
      "delayedDate": 1757710800,
      "departure_time": "09:15 PM",
      "arrival_time": "06:30 AM",
      "available_seat_count": 48,
      "total_journey_time": "07:36",
      "avg_rating": "0.0",
      "rating_count": "0",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "1500.00",
          "seatType": "vip"
        },
        {
          "currencyCode": "KES",
          "amount": "1300.00",
          "seatType": "bclass"
        },
        {
          "currencyCode": "KES",
          "amount": "1300.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Direct",
      "trip_code": "NRB-MSA-NYL-BAMBURI",
      "ticket_amount": "1500.00",
      "sort_time": 1757700900,
      "company_logo": "https://sawaboss.com//uploads/logo/33/1698552128953.jpg",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "13713",
      "company_name": "DREAMLINE EXPRESS",
      "token": "5D42A68D-8353-4B2E-AB00-2270CBA4D76E",
      "bus_type": "EXECUTIVE MD",
      "route_id": "1266",
      "amenities": "2,3,4,5",
      "delayedDate": 1757710800,
      "departure_time": "09:20 PM",
      "arrival_time": "05:20 AM",
      "available_seat_count": 34,
      "total_journey_time": "07:16",
      "avg_rating": "4.0",
      "rating_count": "1",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "2000.00",
          "seatType": "vip"
        },
        {
          "currencyCode": "KES",
          "amount": "1700.00",
          "seatType": "bclass"
        },
        {
          "currencyCode": "KES",
          "amount": "1700.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Highway",
      "trip_code": "H/BAY-K/BAY-KISII-MSA",
      "ticket_amount": "2000.00",
      "sort_time": 1757701200,
      "company_logo": "https://sawaboss.com//uploads/logo/33/1698552128953.jpg",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "4129",
      "company_name": "BUSCAR",
      "token": "23D233D0-D78A-40C2-A211-19185B0C9E73",
      "bus_type": "45 SEATER",
      "route_id": "426",
      "amenities": "4,5",
      "delayedDate": 1757710800,
      "departure_time": "09:30 PM",
      "arrival_time": "07:10 AM",
      "available_seat_count": 43,
      "total_journey_time": "06:46",
      "avg_rating": "3.3",
      "rating_count": "4",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "2000.00",
          "seatType": "vip"
        },
        {
          "currencyCode": "KES",
          "amount": "1800.00",
          "seatType": "bclass"
        },
        {
          "currencyCode": "KES",
          "amount": "1500.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Direct",
      "trip_code": "NBI-MSA",
      "ticket_amount": "2000.00",
      "sort_time": 1757701800,
      "company_logo": "https://sawaboss.com//uploads/logo/38/Buscar Logo.png",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "11995",
      "company_name": "DREAMLINE EXPRESS",
      "token": "5D42A68D-8353-4B2E-AB00-2270CBA4D76E",
      "bus_type": "EXECUTIVE FD",
      "route_id": "297",
      "amenities": "2,3,4,5",
      "delayedDate": 1757710800,
      "departure_time": "09:30 PM",
      "arrival_time": "06:30 AM",
      "available_seat_count": 44,
      "total_journey_time": "08:16",
      "avg_rating": "2.0",
      "rating_count": "4",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "1600.00",
          "seatType": "vip"
        },
        {
          "currencyCode": "KES",
          "amount": "1300.00",
          "seatType": "bclass"
        },
        {
          "currencyCode": "KES",
          "amount": "1300.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Direct",
      "trip_code": "NRB - MSA",
      "ticket_amount": "1600.00",
      "sort_time": 1757701800,
      "company_logo": "https://sawaboss.com//uploads/logo/33/1698552128953.jpg",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "15589",
      "company_name": "MASH EAST AFRICA LIMITED",
      "token": "A40980FF-718C-4488-A136-2A712430264C",
      "bus_type": "MashpoaVipBusinessNormal",
      "route_id": "1562",
      "amenities": null,
      "delayedDate": 1757710800,
      "departure_time": "09:30 PM",
      "arrival_time": "06:00 AM",
      "available_seat_count": 33,
      "total_journey_time": "07:46",
      "avg_rating": "0.0",
      "rating_count": "0",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "1800.00",
          "seatType": "vip"
        },
        {
          "currencyCode": "KES",
          "amount": "1600.00",
          "seatType": "bclass"
        },
        {
          "currencyCode": "KES",
          "amount": "1300.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Direct",
      "trip_code": "NBO - MSA",
      "ticket_amount": "1800.00",
      "sort_time": 1757701800,
      "company_logo": "https://sawaboss.com//uploads/logo/126/31e8526bf34c6396314774d373007b721741250077.png",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "9030",
      "company_name": "DREAMLINE EXPRESS",
      "token": "5D42A68D-8353-4B2E-AB00-2270CBA4D76E",
      "bus_type": "Futura",
      "route_id": "1042",
      "amenities": "1,2,3,4,5",
      "delayedDate": 1757710800,
      "departure_time": "09:45 PM",
      "arrival_time": "05:30 AM",
      "available_seat_count": 30,
      "total_journey_time": "07:01",
      "avg_rating": "2.7",
      "rating_count": "13",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "2000.00",
          "seatType": "vip"
        },
        {
          "currencyCode": "KES",
          "amount": "1800.00",
          "seatType": "bclass"
        },
        {
          "currencyCode": "KES",
          "amount": "1800.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Highway",
      "trip_code": "PORT-NYA-SIAYA-BONDO-MSA",
      "ticket_amount": "2000.00",
      "sort_time": 1757702700,
      "company_logo": "https://sawaboss.com//uploads/logo/33/1698552128953.jpg",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "8773",
      "company_name": "DREAMLINE EXPRESS",
      "token": "5D42A68D-8353-4B2E-AB00-2270CBA4D76E",
      "bus_type": "Futura",
      "route_id": "303",
      "amenities": "1,2,3,4,5",
      "delayedDate": 1757710800,
      "departure_time": "09:50 PM",
      "arrival_time": "05:40 AM",
      "available_seat_count": 33,
      "total_journey_time": "07:06",
      "avg_rating": "3.5",
      "rating_count": "15",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "1800.00",
          "seatType": "vip"
        },
        {
          "currencyCode": "KES",
          "amount": "1600.00",
          "seatType": "bclass"
        },
        {
          "currencyCode": "KES",
          "amount": "1500.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Highway",
      "trip_code": "BSA - MSA",
      "ticket_amount": "1800.00",
      "sort_time": 1757703000,
      "company_logo": "https://sawaboss.com//uploads/logo/33/1698552128953.jpg",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "908",
      "company_name": "COAST BUS",
      "token": "117FAD8D-D2EE-42DC-8CCE-097FC8DE148A",
      "bus_type": "44 Seater",
      "route_id": "346",
      "amenities": "4,5",
      "delayedDate": 1757710800,
      "departure_time": "10:00 PM",
      "arrival_time": "06:45 AM",
      "available_seat_count": 40,
      "total_journey_time": "08:01",
      "avg_rating": "0.0",
      "rating_count": "0",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "1000.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Direct",
      "trip_code": "NAIROBI TO MOMBASA",
      "ticket_amount": "1000.00",
      "sort_time": 1757703600,
      "company_logo": "https://sawaboss.com//uploads/logo/34/Capture.JPG",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "4344",
      "company_name": "BUSCAR",
      "token": "23D233D0-D78A-40C2-A211-19185B0C9E73",
      "bus_type": "45 SEATER",
      "route_id": "368",
      "amenities": "4,5",
      "delayedDate": 1757710800,
      "departure_time": "10:00 PM",
      "arrival_time": "08:00 AM",
      "available_seat_count": 42,
      "total_journey_time": "07:16",
      "avg_rating": "1.0",
      "rating_count": "1",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "2000.00",
          "seatType": "vip"
        },
        {
          "currencyCode": "KES",
          "amount": "1500.00",
          "seatType": "bclass"
        },
        {
          "currencyCode": "KES",
          "amount": "1500.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Direct",
      "trip_code": "NRB-MSA",
      "ticket_amount": "2000.00",
      "sort_time": 1757703600,
      "company_logo": "https://sawaboss.com//uploads/logo/38/Buscar Logo.png",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "8777",
      "company_name": "DREAMLINE EXPRESS",
      "token": "5D42A68D-8353-4B2E-AB00-2270CBA4D76E",
      "bus_type": "Futura",
      "route_id": "307",
      "amenities": "1,2,3,4,5",
      "delayedDate": 1757710800,
      "departure_time": "10:00 PM",
      "arrival_time": "06:40 AM",
      "available_seat_count": 16,
      "total_journey_time": "07:56",
      "avg_rating": "3.3",
      "rating_count": "12",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "1900.00",
          "seatType": "vip"
        },
        {
          "currencyCode": "KES",
          "amount": "1500.00",
          "seatType": "bclass"
        },
        {
          "currencyCode": "KES",
          "amount": "1500.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Highway",
      "trip_code": "MLB - MSA",
      "ticket_amount": "1900.00",
      "sort_time": 1757703600,
      "company_logo": "https://sawaboss.com//uploads/logo/33/1698552128953.jpg",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "8807",
      "company_name": "DREAMLINE EXPRESS",
      "token": "5D42A68D-8353-4B2E-AB00-2270CBA4D76E",
      "bus_type": "YUTONG AIR",
      "route_id": "297",
      "amenities": "1,2,3,4,5",
      "delayedDate": 1757710800,
      "departure_time": "10:00 PM",
      "arrival_time": "06:40 AM",
      "available_seat_count": 38,
      "total_journey_time": "07:56",
      "avg_rating": "4.1",
      "rating_count": "38",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "2100.00",
          "seatType": "vip"
        },
        {
          "currencyCode": "KES",
          "amount": "1800.00",
          "seatType": "bclass"
        },
        {
          "currencyCode": "KES",
          "amount": "1700.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Direct",
      "trip_code": "NRB - MSA",
      "ticket_amount": "2100.00",
      "sort_time": 1757703600,
      "company_logo": "https://sawaboss.com//uploads/logo/33/1698552128953.jpg",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "15590",
      "company_name": "MASH EAST AFRICA LIMITED",
      "token": "A40980FF-718C-4488-A136-2A712430264C",
      "bus_type": "MashpoaVipBusinessNormal",
      "route_id": "1562",
      "amenities": null,
      "delayedDate": 1757710800,
      "departure_time": "10:00 PM",
      "arrival_time": "06:30 AM",
      "available_seat_count": 31,
      "total_journey_time": "07:46",
      "avg_rating": "0.0",
      "rating_count": "0",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "1800.00",
          "seatType": "vip"
        },
        {
          "currencyCode": "KES",
          "amount": "1600.00",
          "seatType": "bclass"
        },
        {
          "currencyCode": "KES",
          "amount": "1300.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Direct",
      "trip_code": "NBO - MSA",
      "ticket_amount": "1800.00",
      "sort_time": 1757703600,
      "company_logo": "https://sawaboss.com//uploads/logo/126/31e8526bf34c6396314774d373007b721741250077.png",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "8775",
      "company_name": "DREAMLINE EXPRESS",
      "token": "5D42A68D-8353-4B2E-AB00-2270CBA4D76E",
      "bus_type": "EXECUTIVE FD",
      "route_id": "309",
      "amenities": "2,3,4,5",
      "delayedDate": 1757710800,
      "departure_time": "10:10 PM",
      "arrival_time": "06:50 AM",
      "available_seat_count": 41,
      "total_journey_time": "07:56",
      "avg_rating": "3.9",
      "rating_count": "24",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "1500.00",
          "seatType": "vip"
        },
        {
          "currencyCode": "KES",
          "amount": "1300.00",
          "seatType": "bclass"
        },
        {
          "currencyCode": "KES",
          "amount": "1200.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Highway",
      "trip_code": "KSM - MSA",
      "ticket_amount": "1500.00",
      "sort_time": 1757704200,
      "company_logo": "https://sawaboss.com//uploads/logo/33/1698552128953.jpg",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "15591",
      "company_name": "MASH EAST AFRICA LIMITED",
      "token": "A40980FF-718C-4488-A136-2A712430264C",
      "bus_type": "MASH POLO",
      "route_id": "1562",
      "amenities": "1,2,4,5,6",
      "delayedDate": 1757710800,
      "departure_time": "10:15 PM",
      "arrival_time": "06:30 AM",
      "available_seat_count": 34,
      "total_journey_time": "07:31",
      "avg_rating": "0.0",
      "rating_count": "0",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "2300.00",
          "seatType": "vip"
        },
        {
          "currencyCode": "KES",
          "amount": "1800.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Direct",
      "trip_code": "NBO - MSA",
      "ticket_amount": "2300.00",
      "sort_time": 1757704500,
      "company_logo": "https://sawaboss.com//uploads/logo/126/31e8526bf34c6396314774d373007b721741250077.png",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "17034",
      "company_name": "DREAMLINE EXPRESS",
      "token": "5D42A68D-8353-4B2E-AB00-2270CBA4D76E",
      "bus_type": "EXECUTIVE FD",
      "route_id": "1723",
      "amenities": "2,3,4,5",
      "delayedDate": 1757710800,
      "departure_time": "10:15 PM",
      "arrival_time": "06:50 AM",
      "available_seat_count": 44,
      "total_journey_time": "07:51",
      "avg_rating": "0.0",
      "rating_count": "0",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "1900.00",
          "seatType": "vip"
        },
        {
          "currencyCode": "KES",
          "amount": "1600.00",
          "seatType": "bclass"
        },
        {
          "currencyCode": "KES",
          "amount": "1500.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Highway",
      "trip_code": "NKR - MSA",
      "ticket_amount": "1900.00",
      "sort_time": 1757704500,
      "company_logo": "https://sawaboss.com//uploads/logo/33/1698552128953.jpg",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "1729",
      "company_name": "ENA COACH",
      "token": "794F7674-542C-4674-A475-0D0C6AFA617F",
      "bus_type": "LUXURY",
      "route_id": "437",
      "amenities": "3,4,6",
      "delayedDate": 1757710800,
      "departure_time": "10:30 PM",
      "arrival_time": "06:00 AM",
      "available_seat_count": 14,
      "total_journey_time": "06:46",
      "avg_rating": "4.2",
      "rating_count": "163",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "1600.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Highway",
      "trip_code": "KEHANCHA - MIGORI - MOMBASA",
      "ticket_amount": "1600.00",
      "sort_time": 1757705400,
      "company_logo": "https://sawaboss.com//uploads/logo/44/e0af40e6287ad6694a134e5f053660141750325829.png",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "1731",
      "company_name": "ENA COACH",
      "token": "794F7674-542C-4674-A475-0D0C6AFA617F",
      "bus_type": "LUXURY",
      "route_id": "439",
      "amenities": "3,4,6",
      "delayedDate": 1757710800,
      "departure_time": "10:30 PM",
      "arrival_time": "06:45 AM",
      "available_seat_count": 15,
      "total_journey_time": "07:31",
      "avg_rating": "4.2",
      "rating_count": "143",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "1600.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Highway",
      "trip_code": "PORT VICTORIA - SIAYA - MOMBASA",
      "ticket_amount": "1600.00",
      "sort_time": 1757705400,
      "company_logo": "https://sawaboss.com//uploads/logo/44/e0af40e6287ad6694a134e5f053660141750325829.png",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "8454",
      "company_name": "ENA COACH",
      "token": "794F7674-542C-4674-A475-0D0C6AFA617F",
      "bus_type": "LUXURY",
      "route_id": "1029",
      "amenities": "3,4,6",
      "delayedDate": 1757710800,
      "departure_time": "10:30 PM",
      "arrival_time": "06:00 AM",
      "available_seat_count": 17,
      "total_journey_time": "06:46",
      "avg_rating": "4.2",
      "rating_count": "148",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "1600.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Highway",
      "trip_code": "KENDUBAY - KISII - MOMBASA",
      "ticket_amount": "1600.00",
      "sort_time": 1757705400,
      "company_logo": "https://sawaboss.com//uploads/logo/44/e0af40e6287ad6694a134e5f053660141750325829.png",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "10128",
      "company_name": "ENA COACH",
      "token": "794F7674-542C-4674-A475-0D0C6AFA617F",
      "bus_type": "LUXURY",
      "route_id": "1165",
      "amenities": "3,4,6",
      "delayedDate": 1757710800,
      "departure_time": "10:30 PM",
      "arrival_time": "06:15 AM",
      "available_seat_count": 21,
      "total_journey_time": "07:01",
      "avg_rating": "4.2",
      "rating_count": "133",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "2500.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Highway",
      "trip_code": "MBITA - RANGWE - MOMBASA",
      "ticket_amount": "2500.00",
      "sort_time": 1757705400,
      "company_logo": "https://sawaboss.com//uploads/logo/44/e0af40e6287ad6694a134e5f053660141750325829.png",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "10433",
      "company_name": "DREAMLINE EXPRESS",
      "token": "5D42A68D-8353-4B2E-AB00-2270CBA4D76E",
      "bus_type": "Futura 43",
      "route_id": "297",
      "amenities": null,
      "delayedDate": 1757710800,
      "departure_time": "10:30 PM",
      "arrival_time": "07:30 AM",
      "available_seat_count": 41,
      "total_journey_time": "08:16",
      "avg_rating": "3.8",
      "rating_count": "20",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "1700.00",
          "seatType": "vip"
        },
        {
          "currencyCode": "KES",
          "amount": "1400.00",
          "seatType": "bclass"
        },
        {
          "currencyCode": "KES",
          "amount": "1400.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Direct",
      "trip_code": "NRB - MSA",
      "ticket_amount": "1700.00",
      "sort_time": 1757705400,
      "company_logo": "https://sawaboss.com//uploads/logo/33/1698552128953.jpg",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "11765",
      "company_name": "ENA COACH",
      "token": "794F7674-542C-4674-A475-0D0C6AFA617F",
      "bus_type": "LUXURY",
      "route_id": "1287",
      "amenities": "3,4,6",
      "delayedDate": 1757710800,
      "departure_time": "10:30 PM",
      "arrival_time": "05:40 AM",
      "available_seat_count": 24,
      "total_journey_time": "06:26",
      "avg_rating": "3.8",
      "rating_count": "104",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "1600.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Highway",
      "trip_code": "SORI - RONGO - MOMBASA",
      "ticket_amount": "1600.00",
      "sort_time": 1757705400,
      "company_logo": "https://sawaboss.com//uploads/logo/44/e0af40e6287ad6694a134e5f053660141750325829.png",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "11930",
      "company_name": "ROYAL LINER EXPRESS LIMITED",
      "token": "E96229F1-D137-47FE-B9C3-0D30442A4FEC",
      "bus_type": "BUS F",
      "route_id": "1254",
      "amenities": null,
      "delayedDate": 1757710800,
      "departure_time": "10:30 PM",
      "arrival_time": "06:00 AM",
      "available_seat_count": 44,
      "total_journey_time": "06:46",
      "avg_rating": "0.0",
      "rating_count": "0",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "2400.00",
          "seatType": "vip"
        },
        {
          "currencyCode": "KES",
          "amount": "1800.00",
          "seatType": "normal"
        },
        {
          "currencyCode": "KES",
          "amount": "1500.00",
          "seatType": "bclass"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Highway",
      "trip_code": "BUSIA/KSM/NAKURU/MSA",
      "ticket_amount": "2400.00",
      "sort_time": 1757705400,
      "company_logo": "https://sawaboss.com//uploads/logo/107/Logo.jpeg",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "15602",
      "company_name": "MASH EAST AFRICA LIMITED",
      "token": "A40980FF-718C-4488-A136-2A712430264C",
      "bus_type": "MashpoaVipBusinessNormal",
      "route_id": "1566",
      "amenities": null,
      "delayedDate": 1757710800,
      "departure_time": "10:30 PM",
      "arrival_time": "06:30 AM",
      "available_seat_count": 31,
      "total_journey_time": "07:16",
      "avg_rating": "0.0",
      "rating_count": "0",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "2500.00",
          "seatType": "vip"
        },
        {
          "currencyCode": "KES",
          "amount": "2300.00",
          "seatType": "bclass"
        },
        {
          "currencyCode": "KES",
          "amount": "2000.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Highway",
      "trip_code": "MGR - MSA",
      "ticket_amount": "2500.00",
      "sort_time": 1757705400,
      "company_logo": "https://sawaboss.com//uploads/logo/126/31e8526bf34c6396314774d373007b721741250077.png",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "15603",
      "company_name": "MASH EAST AFRICA LIMITED",
      "token": "A40980FF-718C-4488-A136-2A712430264C",
      "bus_type": "MashpoaGemilang",
      "route_id": "1570",
      "amenities": null,
      "delayedDate": 1757710800,
      "departure_time": "10:30 PM",
      "arrival_time": "06:30 AM",
      "available_seat_count": 14,
      "total_journey_time": "07:16",
      "avg_rating": "0.0",
      "rating_count": "0",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "2500.00",
          "seatType": "vip"
        },
        {
          "currencyCode": "KES",
          "amount": "2300.00",
          "seatType": "bclass"
        },
        {
          "currencyCode": "KES",
          "amount": "2000.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Highway",
      "trip_code": "MMS - MSA",
      "ticket_amount": "2500.00",
      "sort_time": 1757705400,
      "company_logo": "https://sawaboss.com//uploads/logo/126/31e8526bf34c6396314774d373007b721741250077.png",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "15604",
      "company_name": "MASH EAST AFRICA LIMITED",
      "token": "A40980FF-718C-4488-A136-2A712430264C",
      "bus_type": "MashExecutive",
      "route_id": "1568",
      "amenities": null,
      "delayedDate": 1757710800,
      "departure_time": "10:30 PM",
      "arrival_time": "07:00 AM",
      "available_seat_count": 24,
      "total_journey_time": "07:46",
      "avg_rating": "0.0",
      "rating_count": "0",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "2500.00",
          "seatType": "vip"
        },
        {
          "currencyCode": "KES",
          "amount": "2000.00",
          "seatType": "bclass"
        },
        {
          "currencyCode": "KES",
          "amount": "2000.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Highway",
      "trip_code": "MLB - MSA",
      "ticket_amount": "2500.00",
      "sort_time": 1757705400,
      "company_logo": "https://sawaboss.com//uploads/logo/126/31e8526bf34c6396314774d373007b721741250077.png",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "15858",
      "company_name": "MASH EAST AFRICA LIMITED",
      "token": "A40980FF-718C-4488-A136-2A712430264C",
      "bus_type": "MashpoaVipBusinessNormal",
      "route_id": "1564",
      "amenities": null,
      "delayedDate": 1757710800,
      "departure_time": "10:30 PM",
      "arrival_time": "07:00 AM",
      "available_seat_count": 26,
      "total_journey_time": "07:46",
      "avg_rating": "0.0",
      "rating_count": "0",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "2500.00",
          "seatType": "vip"
        },
        {
          "currencyCode": "KES",
          "amount": "2300.00",
          "seatType": "bclass"
        },
        {
          "currencyCode": "KES",
          "amount": "2000.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Highway",
      "trip_code": "KSM - MSA",
      "ticket_amount": "2500.00",
      "sort_time": 1757705400,
      "company_logo": "https://sawaboss.com//uploads/logo/126/31e8526bf34c6396314774d373007b721741250077.png",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "15600",
      "company_name": "MASH EAST AFRICA LIMITED",
      "token": "A40980FF-718C-4488-A136-2A712430264C",
      "bus_type": "MashpoaVipBusinessNormal",
      "route_id": "1572",
      "amenities": null,
      "delayedDate": 1757710800,
      "departure_time": "10:40 PM",
      "arrival_time": "06:30 AM",
      "available_seat_count": 30,
      "total_journey_time": "07:06",
      "avg_rating": "0.0",
      "rating_count": "0",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "2500.00",
          "seatType": "vip"
        },
        {
          "currencyCode": "KES",
          "amount": "2300.00",
          "seatType": "bclass"
        },
        {
          "currencyCode": "KES",
          "amount": "2000.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Highway",
      "trip_code": "BSA - MSA",
      "ticket_amount": "2500.00",
      "sort_time": 1757706000,
      "company_logo": "https://sawaboss.com//uploads/logo/126/31e8526bf34c6396314774d373007b721741250077.png",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "15605",
      "company_name": "MASH EAST AFRICA LIMITED",
      "token": "A40980FF-718C-4488-A136-2A712430264C",
      "bus_type": "MashExecutive",
      "route_id": "1574",
      "amenities": null,
      "delayedDate": 1757710800,
      "departure_time": "10:45 PM",
      "arrival_time": "06:35 AM",
      "available_seat_count": 40,
      "total_journey_time": "07:06",
      "avg_rating": "0.0",
      "rating_count": "0",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "2000.00",
          "seatType": "bclass"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Highway",
      "trip_code": "PRT - MSA",
      "ticket_amount": "2000.00",
      "sort_time": 1757706300,
      "company_logo": "https://sawaboss.com//uploads/logo/126/31e8526bf34c6396314774d373007b721741250077.png",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "16916",
      "company_name": "DREAMLINE EXPRESS",
      "token": "5D42A68D-8353-4B2E-AB00-2270CBA4D76E",
      "bus_type": "48 Seater",
      "route_id": "297",
      "amenities": "4,5",
      "delayedDate": 1757710800,
      "departure_time": "10:45 PM",
      "arrival_time": "07:45 AM",
      "available_seat_count": 47,
      "total_journey_time": "08:16",
      "avg_rating": "0.0",
      "rating_count": "0",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "1000.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Direct",
      "trip_code": "NRB - MSA",
      "ticket_amount": "1000.00",
      "sort_time": 1757706300,
      "company_logo": "https://sawaboss.com//uploads/logo/33/1698552128953.jpg",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "10102",
      "company_name": "DREAMLINE EXPRESS",
      "token": "5D42A68D-8353-4B2E-AB00-2270CBA4D76E",
      "bus_type": "EXECUTIVE MD",
      "route_id": "1160",
      "amenities": "2,3,4,5",
      "delayedDate": 1757710800,
      "departure_time": "10:50 PM",
      "arrival_time": "06:45 AM",
      "available_seat_count": 39,
      "total_journey_time": "07:11",
      "avg_rating": "3.7",
      "rating_count": "15",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "2500.00",
          "seatType": "vip"
        },
        {
          "currencyCode": "KES",
          "amount": "1200.00",
          "seatType": "bclass"
        },
        {
          "currencyCode": "KES",
          "amount": "1200.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Highway",
      "trip_code": "BSA-UGUNJA-BTR-SBT-KSM-MSA",
      "ticket_amount": "2500.00",
      "sort_time": 1757706600,
      "company_logo": "https://sawaboss.com//uploads/logo/33/1698552128953.jpg",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "11420",
      "company_name": "DREAMLINE EXPRESS",
      "token": "5D42A68D-8353-4B2E-AB00-2270CBA4D76E",
      "bus_type": "EXECUTIVE MD",
      "route_id": "1262",
      "amenities": "2,3,4,5",
      "delayedDate": 1757710800,
      "departure_time": "10:55 PM",
      "arrival_time": "07:15 AM",
      "available_seat_count": 21,
      "total_journey_time": "07:36",
      "avg_rating": "5.0",
      "rating_count": "3",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "2200.00",
          "seatType": "bclass"
        },
        {
          "currencyCode": "KES",
          "amount": "1800.00",
          "seatType": "vip"
        },
        {
          "currencyCode": "KES",
          "amount": "1500.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Highway",
      "trip_code": "MMS-KKG-CKL-KPSBT-MSA",
      "ticket_amount": "2200.00",
      "sort_time": 1757706900,
      "company_logo": "https://sawaboss.com//uploads/logo/33/1698552128953.jpg",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "16425",
      "company_name": "ROYAL LINER EXPRESS LIMITED",
      "token": "E96229F1-D137-47FE-B9C3-0D30442A4FEC",
      "bus_type": "BUS C",
      "route_id": "1670",
      "amenities": null,
      "delayedDate": 1757710800,
      "departure_time": "11:30 PM",
      "arrival_time": "11:59 PM",
      "available_seat_count": 45,
      "total_journey_time": "11:45",
      "avg_rating": "0.0",
      "rating_count": "0",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "2400.00",
          "seatType": "bclass"
        },
        {
          "currencyCode": "KES",
          "amount": "2400.00",
          "seatType": "vip"
        },
        {
          "currencyCode": "KES",
          "amount": "1300.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Highway",
      "trip_code": "MALABA..ELDORER...MOMBASA",
      "ticket_amount": "2400.00",
      "sort_time": 1757709000,
      "company_logo": "https://sawaboss.com//uploads/logo/107/Logo.jpeg",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    },
    {
      "bus_id": "7293",
      "company_name": "COAST BUS",
      "token": "117FAD8D-D2EE-42DC-8CCE-097FC8DE148A",
      "bus_type": "44 Seater",
      "route_id": "1008",
      "amenities": "4,5",
      "delayedDate": 1757710800,
      "departure_time": "11:35 PM",
      "arrival_time": "07:45 AM",
      "available_seat_count": 25,
      "total_journey_time": "07:26",
      "avg_rating": "0.0",
      "rating_count": "0",
      "multi_seat": false,
      "defaultTripPriceList": [
        {
          "currencyCode": "KES",
          "amount": "2000.00",
          "seatType": "normal"
        }
      ],
      "flatPriceList": [],
      "highWayDirectRoute": "Highway",
      "trip_code": "MALABA TO MOMBASA CBD",
      "ticket_amount": "2000.00",
      "sort_time": 1757709300,
      "company_logo": "https://sawaboss.com//uploads/logo/34/Capture.JPG",
      "message": "",
      "isPromotional": false,
      "seatSelectionLimit": "0",
      "delayedFlag": 0,
      "delayedMsg": ""
    }
  ];
  filteredBuses: any[] = [];
  selectedServices: string[] = [];
  selectedDuration: string = '';
  durations = [
    { label: '3 hours', value: '3h', icon: 'bi bi-clock' },
    { label: '3-5 hours', value: '3-5h', icon: 'bi bi-hourglass-split' },
    { label: '5-7 hours', value: '5-7h', icon: 'bi bi-stopwatch' },
    { label: '7+ hours', value: '7+h', icon: 'bi bi-alarm' }
  ];
  services = [
    { label: 'Wi-Fi', checked: false, icon: 'bi bi-wifi' },
    { label: 'TV', checked: false, icon: 'bi bi-tv' },
    { label: 'Bed', checked: false, icon: 'bi bi-moon' },
    { label: 'Meals', checked: false, icon: 'bi bi-egg-fried' }
  ];



  serviceMap = {
    'wifi': '1',
    'tv': '2',
    'bed': '3',
    'meals': '4'
  };

  onPriceChange() {
    this.applyAllFilters();
  }
  onDurationChange(event: any) {
    this.selectedDuration = event.target.value;
    this.applyAllFilters();
  }

  onServiceChange(serviceName: string, event: any) {
    // const serviceCode = this.serviceMap[serviceName];
    const serviceCode = (this.serviceMap as any)[serviceName];

    if (event.target.checked) {
      if (!this.selectedServices.includes(serviceCode)) {
        this.selectedServices.push(serviceCode);
      }
    } else {
      this.selectedServices = this.selectedServices.filter(s => s !== serviceCode);
    }

    this.applyAllFilters();
  }

  applyAllFilters(){
    let result = [... this.buses]

    result = this.sortByPrice(result, this.minValue, this.maxValue)
    // apply price filters
    if(this.selectedServices.length > 0){
      result = this.sortByAmenities(result, this.selectedServices)
    }
    // apply duration filters
    if(this.selectedDuration){
      result = this.sortByDuration(result)
    }
    this.filteredBuses = result
    console.log('[Filtered buses]', this.filteredBuses)

    this.filteredBusesChange.emit(this.filteredBuses)
  }

  filterByDurationRange(buses: any[], durationType: string) {
    return buses.filter(bus => {
      const duration = this.minutesBetween(bus.departure_time, bus.arrival_time);
      const hours = duration / 60;

      switch (durationType) {
        case 'option1': return hours <= 3;
        case 'option2': return hours > 3 && hours <= 5;
        case 'option3': return hours > 5 && hours <= 7;
        case 'option4': return hours > 7;
        default: return true;
      }
    });
  }

  clearAllFilters() {
    this.minValue = 0;
    this.maxValue = 10000;
    this.selectedServices = [];
    this.selectedDuration = '';
    this.filteredBuses = [...this.buses];
    // Emit the cleared results
    this.filteredBusesChange.emit(this.filteredBuses);
  }




  sortByPrice(buses: any[], min: number, max: number) {
    return buses.filter(b => {
      // extract numeric prices from defaultTripPriceList
      const prices = (b.defaultTripPriceList || [])
        .map((p: { amount: string; }) => parseFloat(p.amount));
      if (!prices.length) return false;         // no price info
      const lowest = Math.min(...prices);
      return lowest >= min && lowest <= max;
    });
  }



  sortByAmenities(buses: any[], wanted: string[]) {
    return buses.filter(b => {
      if (!b.amenities) return false;
      const amArr = b.amenities.split(',');     // e.g. "1,2,4"
      return wanted.every(a => amArr.includes(a));
    });
  }

//   DURATION ++++++++
  filterVisible: boolean = false;
  sortByDuration(buses: any[]) {
    return buses.slice().sort((a, b) =>
      this.minutesBetween(a.departure_time, a.arrival_time) -
      this.minutesBetween(b.departure_time, b.arrival_time)
    );
  }

  minutesBetween(start: string, end: string) {
    const s = this.toMinutes(start);
    const e = this.toMinutes(end);
    return e >= s ? e - s : 24*60 - s + e; // handle next-day
  }

  toMinutes(time: string) {
    // 12-hour string -> minutes since midnight
    const [_, h, m, mer] = time.match(/(\d+):(\d+)\s*(AM|PM)/i) || [];
    let hour = parseInt(h,10) % 12;
    if (/PM/i.test(mer)) hour += 12;
    return hour * 60 + parseInt(m,10);
  }
}
