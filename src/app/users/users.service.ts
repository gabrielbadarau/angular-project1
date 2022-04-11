import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Iusers } from './users';
import localhost from '../localhost';


@Injectable()

export class UsersService {
  private usersUrl=localhost+'/users'; 
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

  getId(id:number):Observable<Iusers>{

    if(this.users){
      const foundUser=this.users.find(user=>user.id===id);
      if(foundUser){
        return of(foundUser);
      }
    }
    const userUrl=`${this.usersUrl}/${id}`;
    return this.http.get<Iusers>(userUrl)
    .pipe(
      tap(data=>{
        console.log(data)
      })
    )
  }


}
