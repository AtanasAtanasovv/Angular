import { Component, OnInit } from '@angular/core';
import { User } from '../auth/models/user.interface';
import { AuthenticationService } from '../auth/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser!: User;

  constructor(private authService: AuthenticationService) { }
  ngOnInit(): void {
    this.currentUser = this.authService.getLoggedUser()
  }
}
