﻿import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from '@app/_models';
import { Order } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
	orders: Order[] = [];

    constructor(
	    private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });		
    }

    ngOnInit() {
        this.loadAllOpenOrder();		
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }
   
	
	goBundle() {        
        this.router.navigate(['/bundle']);
	}
	getNewOrders() {        
        this.router.navigate(['/home']);
    }
	
	//load all open orders from server
	private loadAllOpenOrder(){
		this.orders = [
			new Order(
				5001,
				'02/12/2020',
				'PaknSave Christchurch',
				'Open',				
				['GM', 'GC', 'F1']
			),
			new Order(
				5002,
				'02/12/2020',
				'New World Christchurch',
				'Open',					
				['GM', 'GC']
			),
			new Order(
				5003,
				'02/12/2020',
				'Paknsave Auckland',
				'fulfilled',					
				['GM', 'GC', 'F1']
			),
			new Order(
				5004,
				'02/12/2020',
				'New World Auckland',
				'Open',				
				['GM', 'GC']
			),
			new Order(
				5005,
				'02/12/2020',
				'PaknSave Wellington',
				'fulfilled',					
				['GM', 'F1']
			)
		];
	}
   
}