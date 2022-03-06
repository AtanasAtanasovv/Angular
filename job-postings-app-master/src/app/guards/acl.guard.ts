import {Injectable} from '@angular/core';
import {CanActivate, CanLoad, Router} from '@angular/router';
import {AuthenticationService} from '../auth/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AclGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
  }

  canActivate(): boolean {
    const loggedUser = this.authService.getLoggedUser();

    if (loggedUser.role !== 'admin') {
      this.router.navigate(['/']);

      return false;
    }

    return true;
  }
}