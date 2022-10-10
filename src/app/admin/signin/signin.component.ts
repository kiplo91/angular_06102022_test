import { Component, OnInit } from '@angular/core';
import { Signin } from 'src/app/signin.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  newUsername!: string;
  newValue!: string;
  isLoggedIn=false;
  isLoginFailed=false;
  errorMessage = '';
  //isSuccessful=false;

  form: any = {
    username: null,
    password: null
  };

  constructor(
    private authService:AuthService,
    private tokenStorage:TokenStorageService,
    private router:Router
  ) { 
   
    
  }

  ngOnInit(): void {
    if(this.tokenStorage.getToken()){
      this.isLoggedIn=true;
    }
  }
 
  onSubmit():void{
    const {username,password} = this.form;

    this.authService.signin(username,password).subscribe(
      data => {
        this.tokenStorage.saveToken(data);
        this.isLoggedIn=true;
        this,this.isLoginFailed=false;
        this.router.navigate(['/','dashboard'])
      },
      err=>{
        this.errorMessage=err.statusText;
        this.isLoginFailed=true;
      }
    )
  }
  reloadPage(){
    window.location.reload()
  }

}
