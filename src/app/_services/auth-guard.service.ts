import { Injectable } from '@angular/core';
import { Router,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {      
    if (this.isLoggedIn()) {      
    return true;      
    }      
    // navigate to login page as user is not authenticated   
 window.alert('You are not loggged in')   
 this.router.navigate(['/']);      
return false;      
}

public isLoggedIn(): boolean {      
  let status = false;
  const token = window.sessionStorage.getItem('TOKEN')       
  if (!token) {      
     status = false;      
  }
    else {      
     status = true;      
     }      
  return status;      
  } 
}
