import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularToDo';
  pageTitle = 'Todo';
  constructor(private authService: AuthService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router) {
    this.matIconRegistry.addSvgIcon(
      'icon-check',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icon-check.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'icon-cross',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icon-cross.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'icon-sun',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icon-sun.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'icon-moon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icon-moon.svg')
    );
  }

  ngOnInit() {
    this.authService.initialise();
  }

  changePageHeader() {
    this.pageTitle = this.router.url === '/login'? 'LOGIN':'TODO';
  }
}
