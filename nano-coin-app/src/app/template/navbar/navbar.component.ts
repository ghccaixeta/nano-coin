import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
    
  ) { }

  ngOnInit(): void {
    
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);

  }

  toggle(){
    
    document.body.classList.toggle('sb-sidenav-toggled');
    
    
  }

}
