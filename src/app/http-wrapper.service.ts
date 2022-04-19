import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpWrapperService {

  headers=new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http:HttpClient) { }

  get<T>(url:string){
    return this.http.get<T>(url);
  }

  put<T>(url:string,body:T){
    return this.http.put<T>(url,body,{headers:this.headers})
  }

  post<T>(url:string,body:T){
    return this.http.post<T>(url,body,{headers:this.headers})
  }

  delete<T>(url){
    return this.http.delete<T>(url,{headers:this.headers})
  }
}
