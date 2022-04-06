import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Iusers } from './users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl='http://localhost:3004/users'; 
  private users:Iusers[]=[];

  constructor(private http:HttpClient) { }
  
  getUsers():Observable<Iusers[]>{

    if(this.users.length){
      return of(this.users)
    }

    return this.http.get<Iusers[]>(this.usersUrl)
    .pipe(
      tap(data=>{
        console.log(data);
        this.users=data;
      })
    )
  }
}
