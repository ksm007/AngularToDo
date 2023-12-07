import { Component, OnInit, Renderer2,Input } from '@angular/core';
import { ThemeService, Theme } from '../services/theme.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentTheme: Theme = Theme.DARK;
  currentIcon = 'icon-moon';
  user: User|null = null;


  @Input()
  pageTitle:string = '';

  constructor(private renderer: Renderer2,
    private themeService: ThemeService,
    private auth: AuthService,private router:Router) { }

  ngOnInit(): void {
    this.initialzeTheme();
    this.auth.user$.subscribe((user) =>{
      this.user = user;
    })
  }

  initialzeTheme(){
    this.currentTheme = this.themeService.getCurrentTheme();
    if (this.currentTheme === Theme.LIGHT){
      this.currentIcon = 'icon-moon';
    }
    if(this.currentTheme === Theme.DARK){
      this.currentIcon = 'icon-sun';
      this.renderer.addClass(document.body, 'dark-theme');
    }

  }
  changeTheme() {
    if (this.currentTheme === Theme.LIGHT) {
      this.themeService.setThemeToStorage(Theme.DARK);
      this.currentTheme = Theme.DARK;
      this.currentIcon = 'icon-sun';
      this.renderer.addClass(document.body, 'dark-theme');
    } else {
      this.themeService.setThemeToStorage(Theme.LIGHT);
      this.currentTheme = Theme.LIGHT;
      this.currentIcon = 'icon-moon';
      this.renderer.removeClass(document.body, 'dark-theme');
    }
  }
  logOut(){
    this.auth.signOut();
  }
  navigateToLogin(){
    this.router.navigate(['/login']);
  }
}
