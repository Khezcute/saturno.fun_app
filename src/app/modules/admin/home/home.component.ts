import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../../modules/admin/admin.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper/stepper';
import { User } from '../../../interfaces/user.interface';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	providers: [{
		provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
	}]
})
export class HomeComponent implements OnInit {
	@ViewChild('stepper') stepper: MatStepper;
	publicURL: string;
	showIntro: boolean = true;
	config: any = {};
	userSuscription: Subscription;
	user: User;
	userAvailable = false;	
	activateTableExplanation = false;
	activateWaiterExplanation = false;

	constructor(
		private loginService: LoginService,
		public adminService: AdminService, 
		public sharedService: SharedService,
		private router: Router
		) { }
	ngOnInit() {
		if (this.loginService.user) { this.user = this.loginService.user; }

		this.userSuscription = this.loginService.user$.subscribe(data => {
			if (data) {
				this.user = data;
			}
		});

		if (localStorage.getItem('config')) {
			this.config = JSON.parse(localStorage.getItem('config'));
			this.showIntro = this.config.intro;
		}

	}

	toggleIntro() {
		this.config.intro = !this.showIntro;
		localStorage.setItem('config', JSON.stringify(this.config));
	}

	endWizard() {
		this.config.intro = false;
		this.showIntro = false;
		localStorage.setItem('config', JSON.stringify(this.config));
		this.router.navigate(['/waiter/home']);
	}

	ngOnDestroy(): void {
		if(this.userSuscription){this.userSuscription.unsubscribe();}
	}


	scrollTop() {
		document.body.scrollTop = 0; // Safari
		document.documentElement.scrollTop = 0; // Other
  }
  
	stepperGoBack(stepper: MatStepper) {
		stepper.previous();
	}

	stepperGoNext(stepper: MatStepper) {
		if(this.adminService.companies?.length > 0 && this.loginService.user?.id_company?._id){
			this.scrollTop();
			stepper.next();
		} else {
			this.sharedService.snackShow('Use el formulario para crear un Bar / Resto!', 5000);
		}
	}
	
}
