import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject, tap } from 'rxjs';
import { Iusers } from './users';
import LOCALHOST from '../localhost';


@Injectable()

export class UsersService {
  private usersUrl=LOCALHOST+'/users'; 
  private users:Iusers[]=[];

  private updateUserSuccessSource=new Subject <boolean>();
  updateUserSuccessChange$=this.updateUserSuccessSource.asObservable();

  private updateDeleteUserSource=new Subject <boolean>();
  updateDeleteUserChange$=this.updateDeleteUserSource.asObservable();

  constructor(private http:HttpClient) { }

  changeUpdateUserSuccess(value:boolean){
    this.updateUserSuccessSource.next(value);
  }

  changeUpdateDeleteUser(value:boolean){
    this.updateDeleteUserSource.next(value);
  }
  
  getUsers():Observable<Iusers[]>{

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
    return this.http.get<Iusers>(userUrl);
  }

  updateUser(user:Iusers):Observable<Iusers>{
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    const userUrl=`${this.usersUrl}/${user.id}`;
    return this.http.put<Iusers>(userUrl,user,{headers:headers})
  }

  deleteUser(id:number):Observable<Iusers>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const userUrl=`${this.usersUrl}/${id}`;
    return this.http.delete<Iusers>(userUrl,{headers:headers})
  }

}
