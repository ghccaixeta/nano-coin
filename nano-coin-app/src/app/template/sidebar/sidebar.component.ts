import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  username?: String;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.username = this.authService.getUser();
  }

}
