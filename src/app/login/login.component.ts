import { Component, OnInit, Inject } from '@angular/core';
import { UsuarioService } from "../usuario.service";
import { Usuario } from "../usuario";
import { LoginModel } from "../login";
import { RouterModule, Routes,Router,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  usuario: Usuario | undefined;
  user: LoginModel | undefined;
  constructor(public userService: UsuarioService, public router: Router, private route: ActivatedRoute,
      @Inject(AuthService) private authService: AuthService) {}
  email: string|any;
  password: string|any;
  login() {
    const user = { email: this.email, password: this.password };
    this.authService.login(user.email,user.password).subscribe((data: any) => {
     this.router.navigateByUrl("admin/usuarios");

    });
  }

  ngOnInit() {}
}


