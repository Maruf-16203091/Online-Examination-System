import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserService } from '../../../services/user.service';  // Import the UserService
import { User } from '../../../models/user.model';  // Import the User model

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['no', 'name', 'email', 'status', 'role', 'action'];
  users: User[] = [];
  dataSource = new MatTableDataSource<User>(this.users);

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  // Load users from the API
  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        this.dataSource = new MatTableDataSource(this.users);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  // Toggle block/unblock user
  toggleBlockUser(user: User): void {
    user.blocked = !user.blocked;
    user.status = user.blocked ? 'Blocked' : 'Active';
    const action = user.blocked ? 'blocked' : 'unblocked';
    alert(`${user.name} has been ${action}.`);
    this.dataSource = new MatTableDataSource(this.users);  // Refresh table
  }

  // Send Email
  sendEmail(user: User): void {
    alert(`Sending email to: ${user.email}`);
  }

  // Download Table as PDF
  downloadTable() {
    const doc = new jsPDF();
    doc.text('User List', 14, 16);

    const columns = ['No.', 'Name', 'Email', 'Status', 'Role'];
    const rows = this.users.map((user, index) => [
      (index + 1).toString(),
      user.name,
      user.email,
      user.status,
      user.role
    ]);

    (doc as any).autoTable({
      head: [columns],
      body: rows,
      startY: 20,
      theme: 'grid',
      headStyles: { fillColor: '#FF6F61' },
    });

    doc.save('user_list.pdf');
  }

  // Print Table
  printTable() {
    const printContent = document.querySelector('table')?.outerHTML || '';
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow?.document.write('<html><head><title>Print User List</title></head><body>');
    printWindow?.document.write('<h2>User List</h2>');
    printWindow?.document.write(printContent);
    printWindow?.document.write('</body></html>');
    printWindow?.close();
    printWindow?.print();
  }

  // Convert to CSV format
  convertToCSV(data: User[]): string {
    const csvRows: string[] = [];
    const headers = ['No.', 'Name', 'Email', 'Status', 'Role'];
    csvRows.push(headers.join(',')); // Add headers

    data.forEach((user, index) => {
      const csvRow = [
        (index + 1).toString(),
        user.name,
        user.email,
        user.status,
        user.role
      ];
      csvRows.push(csvRow.join(','));
    });

    return csvRows.join('\n');
  }

  // Download CSV
  downloadCSV() {
    const csvContent = this.convertToCSV(this.users);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'user_list.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
