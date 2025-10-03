import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
}

@Component({
  selector: 'app-view-user-profile-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  totalItems: number = 10;
  searchQuery: string = '';

  constructor() { }

  ngOnInit(): void {
    // In a real app, fetch users from a service
    // For demo purposes, we'll create some sample data
    this.users = [
      {
        id: '001',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+254 711222333',
        role: 'Agent',
        status: 'Active'
      },
      {
        id: '002',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+254 722333444',
        role: 'Customer',
        status: 'Active'
      },
      {
        id: '003',
        name: 'Robert Johnson',
        email: 'robert@example.com',
        phone: '+254 733444555',
        role: 'Admin',
        status: 'Inactive'
      }
    ];
  }

  search(): void {
    // Implement search functionality
    // console.log('Searching for:', this.searchQuery);
  }

  viewUser(userId: string): void {
    // console.log('View user:', userId);
  }

  editUser(userId: string): void {
    // console.log('Edit user:', userId);
  }

  deleteUser(userId: string): void {
    // console.log('Delete user:', userId);
  }
}
