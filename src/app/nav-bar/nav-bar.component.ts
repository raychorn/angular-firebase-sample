import {Component, OnInit, ApplicationRef} from '@angular/core';

import {Router} from '@angular/router';

import {AuthService} from '../providers/auth.service';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css', '../shared/bootstrap-material-design.min.css']
})
export class NavBarComponent implements OnInit {
    private isLoggedIn: boolean;

    constructor(public authService: AuthService, private router: Router, private apRef: ApplicationRef) {
        this.authService.afAuth.auth.onAuthStateChanged((auth) => {
            this.isLoggedIn = auth != null;
            this.apRef.tick(); // For updating UI
        });
    }

    ngOnInit() {
        // console.log(this.router.url);
    }

    logout() {
        this.authService.logout();
    }

    navigateTo(route) {
        this.router.navigate([route]);
        // console.log(this.router.url);
    }
}