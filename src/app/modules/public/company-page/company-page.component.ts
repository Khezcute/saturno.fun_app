import { Component, OnInit } from '@angular/core';
import { PublicService } from '../public.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

interface sliderImage {
	image: string;
	thumbImage: string;
	alt: string;
	title: string;
  }
  

@Component({
	selector: 'app-company-page',
	templateUrl: './company-page.component.html',
	styleUrls: ['./company-page.component.css']
})
export class CompanyPageComponent implements OnInit {
	images: sliderImage[] = [];
	// width 528: saturno-page-container 600px - 2x20px padding - mat-card padding 2x16 
	// [imageSize]="imageSize"
	imageSize = {width: 528, height: 200, space: 0};
	constructor(
		public publicService: PublicService,
		private router: Router
		) { }
	ngOnInit(): void {

		if(!this.publicService.company){
			this.router.navigate(['/home']);
			return;
		}
		let idCompany = this.publicService.company._id;
		let url = environment.api + '/image/' + idCompany + '/tx_company_banners/';

		this.publicService.company.tx_company_banners.forEach(img => {
		  this.images.push({
			image: url + img,
			thumbImage: url + img,
			alt: '',
			title: ''
		  })
		})
	 }

}

