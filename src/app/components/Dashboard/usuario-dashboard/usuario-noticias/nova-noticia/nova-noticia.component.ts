import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Chapter } from 'src/app/models/Chapter';
import { ChapterAssunto } from 'src/app/models/ChapterAssunto';
import { Usuario } from 'src/app/models/Usuario';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { ChapterAssuntoService } from 'src/app/services/chapter-assunto.service';
import { ChapterService } from 'src/app/services/chapter.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-nova-noticia',
  templateUrl: './nova-noticia.component.html',
  styleUrls: ['./nova-noticia.component.css']
})
export class NovaNoticiaComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  noticia: ChapterAssunto = new ChapterAssunto();
  text: string = '';
  imagem: string = '';
  descriptions: string[] = [];
  usuarioLogado: Usuario;
  chapterNoticias: Chapter;


  constructor(
    private authGuardService: AuthGuardService,
    private fb: FormBuilder,
    private chapterAssuntoService: ChapterAssuntoService,
    private usuarioService: UsuariosService,
    private chapterService: ChapterService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      titulo: [null, [Validators.required, Validators.minLength(5)]],
      imagem: [null],
      text: [null, [Validators.required, Validators.minLength(5)]],
    });

    this.chapterService.ObterChapterById(7).subscribe((chapter) => {
      this.chapterNoticias = chapter;
    });

    this.usuarioService.ObterUsuarioPorId(this.authGuardService.getIdUsuarioLogado()).subscribe((usuario) => {
      this.usuarioLogado = usuario;
    });
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onFileSelected(event: any): void {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64String = e.target.result.split(',')[1];
        this.form.patchValue({ imagem: base64String });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.noticia.titulo = this.form.value.titulo;
      this.noticia.descricao = this.form.value.text;
      this.noticia.contadorVisualizacao = 0;
      this.noticia.status = 1;
      this.noticia.verificacao = 0;
      this.noticia.chapter = this.chapterNoticias;
      this.noticia.imagem = this.form.get('imagem')!.value;
      this.noticia.usuario = this.usuarioLogado;
      this.chapterAssuntoService.NovoChapterAssuntoJava(this.noticia).subscribe(() => {
        console.log('Notícia enviada');
      });
    }
  }

  limparFormulario() {
    this.form.reset();
    this.descriptions = [];
  }

  verificarCampos(): boolean {
    return this.form.valid;
  }





}
