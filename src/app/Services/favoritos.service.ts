import { Injectable } from '@angular/core';
import { from, Observable, EMPTY } from 'rxjs';
import { FilmeLista } from '../Interfaces/FilmeLista';
import { Results } from '../Interfaces/Results';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { NotificationService } from './notificacao.service';
import { catchError, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  constructor(
    private firestore: AngularFirestore,
    private notificacao: NotificationService
  ) { }


  public adicionarFavorito(filme: FilmeLista): Observable<any>{
    const promise = this.firestore.collection("filmesFavoritos").add(filme)
    return from(promise)
  }

  public listarFavoritos(): Observable<any>{
    const promise = this.firestore.collection("filmesFavoritos").get()
    return from(promise).pipe(
      map(resposta => {
        return resposta.docs.map(doc => {
          const filme: FilmeLista = doc.data() as FilmeLista
          filme.idBanco = doc.id
          return filme
          
        })
      })
    )
  }

  public deletarFilmeFavorito(id: string){
    const promise = this.firestore.collection("filmesFavoritos").doc(id).delete()
    return from(promise).pipe(
      catchError(error => {
        this.notificacao.showmessage("Erro ao excluir")
        console.error(error)
        return EMPTY
      })
    )
  }
}
