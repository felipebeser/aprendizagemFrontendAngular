import { Comentario } from './../models/Comentario';
import { NovoCursoComponent } from './../components/Curso/novo-curso/novo-curso.component';
import { Injectable } from '@angular/core';
import { ChapterAssuntoComentario } from 'src/app/models/ChapterAssuntoComentario';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type' : 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TokenUsuarioLogado')}`
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  url = environment.apiServer + 'api/ChapterAssuntoComentario';
  javaUrl = "http://localhost:8080/chapter-assunto-comentario"
  constructor(private https: HttpClient) { }

  obterTodos(): Observable<ChapterAssuntoComentario[]>{
    const apiUrl = `${this.url}`;
    let teste = this.https.get<ChapterAssuntoComentario[]>(apiUrl)
    return teste;
  }

  filtrarComentariosFilhosByPaiId(id: number): Observable<ChapterAssuntoComentario[]>{
    const apiUrl = `${this.javaUrl}/${id}/filhos`;
    return this.https.get<ChapterAssuntoComentario[]>(apiUrl);

  }

  obterChapterAssuntoComentariosPorChapterAssuntoIdJava(id: number): Observable<ChapterAssuntoComentario[]>{
    const apiUrl = `${this.javaUrl}/comentarios-by-chapter-assunto-id/${id}`;
    return this.https.get<ChapterAssuntoComentario[]>(apiUrl);
  }

  filtrarChapterAssuntoComentarioPorId (id: number) : Observable<ChapterAssuntoComentario[]>
  {
    const apiUrl = `${this.url}/filterByChapterAssuntoId/${id}`;
    let teste = this.https.get<ChapterAssuntoComentario[]>(apiUrl)
    return teste;
  }

  novoChapterAssuntoComentario (comentario: ChapterAssuntoComentario): Observable<ChapterAssuntoComentario>
  {
    return this.https.post<ChapterAssuntoComentario>(this.url, comentario, httpOptions);
  }

  novoChapterAssuntoComentarioJava (comentario: ChapterAssuntoComentario): Observable<ChapterAssuntoComentario>
  {
    const apiUrl = `${this.javaUrl}`;
    return this.https.post<ChapterAssuntoComentario>(apiUrl, comentario);
  }

  editarChapterAssuntoComentario (id: number, comentario: ChapterAssuntoComentario): Observable<ChapterAssuntoComentario>
  {
    const apiUrl = `${this.url}/${id}`;
    return this.https.put<ChapterAssuntoComentario>(apiUrl, comentario, httpOptions);
  }

  editarChapterAssuntoComentarioJava (id: number, resposta: string): Observable<ChapterAssuntoComentario>
  {
    const apiUrl = `${this.javaUrl}/editar/${id}`;
    return this.https.put<ChapterAssuntoComentario>(apiUrl, resposta);
  }

  deletarChapterAssuntoComentario (id: number): Observable<ChapterAssuntoComentario>
  {
    const apiUrl = `${this.url}/${id}`;
    return this.https.delete<ChapterAssuntoComentario>(apiUrl, httpOptions);
  }
}
