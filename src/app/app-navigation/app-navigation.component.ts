import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-navigation',
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './app-navigation.component.html',
    styleUrls: ['./app-navigation.component.css']
})
export class AppNavigationComponent {}
