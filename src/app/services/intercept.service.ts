import { Injectable } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {
  HttpEvent, 
  HttpInterceptor, 
  HttpHandler, 
  HttpRequest,
  HttpResponse
} from '@angular/common/http'
import { Observable } from 'rxjs';
import { catchError,tap} from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()//{providedIn: 'root'}

export class InterceptService  implements HttpInterceptor {

	constructor(
		private authService: AuthService,
		private router: Router,
		) { }

	// intercept request and add token
  	intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

    	// modify request
	    request = request.clone({
				// withCredentials: true, 
				// headers: request.headers
				// 	.set('Content-Type', 'application/json')
				// 	.set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token, content-type')
				// 	.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')                        
				// 	.set("Access-Control-Allow-Origin", "Origin")
				// 	.set("Access-Control-Allow-Headers",  "Origin, X-Requested-With, Content-Type, Accept, Authorization" )
				// 	.set("Access-Control-Allow-Methods",  "GET, POST, PUT, DELETE, OPTIONS" )
				// 	.set("Access-Control-Allow-Credentials",  "true" )
				// ,
	       setHeaders: {
	         Authorization: `Bearer ${localStorage.getItem('mws.token')}`,
	       }
	    });
	   
	   	console.log("----request----");
	 	  console.log(request);
	 	  console.log("--- end of request---");
 
	    return next.handle(request)
	    .pipe(
	        tap(event => {
	          if (event instanceof HttpResponse) {
	             
	            console.log(" all looks good");
	            // http response status code
	            console.log(event.status);
	          }
	        }, error => {

						switch (error.status) {
							case 0:
								this.router.navigate(['serviceunavailable']);
								break;
							// case 401:
							// 	this.router.navigate(['unauthorized']);
							// 	break;
							case 404:
								this.router.navigate(['notfound']);
								break;
							case 500:
								this.router.navigate(['internalservererror']);
								break;
							default:
								break;
						};	

	   			    // http response status code
	          	console.log("----response----");
	          	console.error("status code:");
	          	console.error(error.status);
	          	console.error(error.message);
	          	console.log("--- end of response---");
	        })
	      )

    };
  
 
}
