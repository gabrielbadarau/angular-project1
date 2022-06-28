import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class HttpWrapperService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  get<T>(url: string) {
    return this.http.get<T>(url).pipe(catchError(this.handleError));
  }

  put<T>(url: string, body: T) {
    return this.http.put<T>(url, body, { headers: this.headers }).pipe(catchError(this.handleError));
  }

  post<T>(url: string, body: T) {
    return this.http.post<T>(url, body, { headers: this.headers }).pipe(catchError(this.handleError));
  }

  delete<T>(url) {
    return this.http.delete<T>(url, { headers: this.headers }).pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }
}
