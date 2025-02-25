import { Component, OnInit } from '@angular/core';

import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { AuthService } from '../auth.service';
import { RouterModule, Routes,Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: false,
  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  token:any
  constructor(private usuarioService: UsuarioService
    ,private authService: AuthService,public router: Router
    ,private route: ActivatedRoute
  ) { }
  //token:string|undefined
  ngOnInit(): void {
    
  
    this.token=this.authService.getToken();
  }

  
  logout():void {
    
    this.authService.logout();
    console.log("Salir");
    this.router.navigateByUrl("auth/login");
    
  }
}