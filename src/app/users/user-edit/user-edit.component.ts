import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iusers } from '../users';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  
  userForm:FormGroup;
  user:Iusers;
  isUpdating:boolean=false;

  constructor(
    private fb:FormBuilder,
    private route:ActivatedRoute,
    private usersService:UsersService,
    private router:Router,
    ) { }
  

  ngOnInit(): void {

    this.userForm = this.fb.group({
      first_name:['',Validators.required],
      last_name:['',Validators.required],
      id:[null,[Validators.required,Validators.min(1)]],
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
      role:['',Validators.required],
      permissions:['',Validators.required]
    })

    const id=Number(this.route.snapshot.paramMap.get('id'));
    this.usersService.getId(id).subscribe({
      next:user=>this.displayUser(user),
      error:error=>console.log(error)
    })

  }

  displayUser(user:Iusers):void{
    if(this.userForm){
      this.userForm.reset();
    }
    this.user=user;
    this.userForm.setValue({
      first_name:this.user.first_name,
      last_name:this.user.last_name,
      id:this.user.id,
      email:this.user.email,
      password:this.user.password,
      role:this.user.role,
      permissions:this.user.permissions
    })

  }

  save(): void {
    this.isUpdating=true;

    if(this.userForm.dirty){
      this.usersService.updateUser(this.userForm.value).subscribe({
        next:()=>{
          this.usersService.changeUpdateUserSuccess(true);
          this.onSaveComplete();
        },
        error:(error)=>{
          console.log(error)
          this.usersService.changeUpdateUserSuccess(false);
        }
      })
    }
    else{
      this.onSaveComplete();
    }
  }

  cancel():void{
    this.router.navigate(['/users'])
  }

  onSaveComplete():void{
    this.router.navigate(['/users'])
  }

}
