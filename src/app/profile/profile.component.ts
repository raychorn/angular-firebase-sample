import {Component, OnInit, OnDestroy} from '@angular/core';

import {AngularFireDatabase} from 'angularfire2/database';

import {AuthService} from '../providers/auth.service';
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'app-settings',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

    private userProfileSubscription: Subscription;

    public userEmail: string;
    public userDisplayName: string;
    public userPhotoURL: string;

    constructor(public authService: AuthService, private db: AngularFireDatabase) {
    }

    ngOnInit() {
        this.authService.afAuth.auth.onAuthStateChanged((auth) => {
            if (auth != null) {
                this.userProfileSubscription = this.db.object('/user-profiles/' + auth.uid).subscribe((data) => {
                    this.userEmail = data['email'];
                    this.userDisplayName = data['display-name'];
                    this.userPhotoURL = data['photo-url'];
                });
            }
        });
    }

    ngOnDestroy() {
        this.userProfileSubscription.unsubscribe();
    }
}
