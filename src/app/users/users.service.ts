import { Injectable } from '@angular/core';
import { Observable, of, Subject, tap } from 'rxjs';
import { Iusers } from './users';
import LOCALHOST from '../localhost';
import { HttpWrapperService } from '../http-wrapper.service';


@Injectable()

export class UsersService {
  private usersUrl=LOCALHOST+'/users'; 
  private users:Iusers[]=[];

  private updateUserSuccessSource=new Subject <boolean>();
  updateUserSuccessChange$=this.updateUserSuccessSource.asObservable();

  private updateDeleteUserSource=new Subject <boolean>();
  updateDeleteUserChange$=this.updateDeleteUserSource.asObservable();

  constructor(private wrappedHttp:HttpWrapperService) { }

  changeUpdateUserSuccess(value:boolean){
    this.updateUserSuccessSource.next(value);
  }
  changeUpdateDeleteUser(value:boolean){
    this.updateDeleteUserSource.next(value);
  }
  
  getUsers():Observable<Iusers[]>{
    return this.wrappedHttp.get<Iusers[]>(this.usersUrl)
    .pipe(tap(data=>this.users=data))
  }

  getId(id:number):Observable<Iusers>{
    if(this.users){
      const foundUser=this.users.find(user=>user.id===id);
      if(foundUser){
        return of(foundUser);
      }
    }
    const userUrl=`${this.usersUrl}/${id}`;
    return this.wrappedHttp.get<Iusers>(userUrl);
  }

  updateUser(id:number,updatedUser:Iusers):Observable<Iusers>{
    const userUrl=`${this.usersUrl}/${id}`;
    return this.wrappedHttp.put<Iusers>(userUrl,updatedUser)
  }

  deleteUser(id:number):Observable<Iusers>{
    const userUrl=`${this.usersUrl}/${id}`;
    return this.wrappedHttp.delete<Iusers>(userUrl)
  }

}
