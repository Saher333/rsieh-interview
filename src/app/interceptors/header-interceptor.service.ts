import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const clonedRequest = req.clone({
      headers: req.headers
      .append(
        'Ocp-Apim-Subscription-Key', 'c20a1ef5f2044e7ba1f400046b913e4d'
      )
      .append(
        'Content-Type', 'application/json' 
      )
    });
  
    return next.handle(clonedRequest);
  }
}
