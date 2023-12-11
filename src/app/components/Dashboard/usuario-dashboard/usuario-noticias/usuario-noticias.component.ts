import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-usuario-noticias',
  templateUrl: './usuario-noticias.component.html',
  styleUrls: ['./usuario-noticias.component.css']
})
export class UsuarioNoticiasComponent implements OnInit {

  constructor(private authGuardService: AuthGuardService) { }

  ngOnInit(): void {
  }

  showButton(): boolean {
    return this.authGuardService.VerificarAdministrador() || this.authGuardService.VerificarProfessor();
  }
}
