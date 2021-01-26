import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { PublicService } from 'src/app/services/public.service';

@Injectable({
  providedIn: 'root'
})
export class PlanBasicGuard implements CanLoad {
  constructor(
    private loginService: LoginService,
    private publicService: PublicService,
    private router: Router
    ) {}
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      if(this.loginService.user.cd_pricing > 0){
        return true;
      } else {
        this.publicService.snack('Su plan no incluye esta sección.', 2000)
        this.router.navigate(['/pricing']); 
        return false;
      }
  }
}
