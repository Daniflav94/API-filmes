import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FilmeLista } from 'src/app/Interfaces/FilmeLista';
import { Results } from 'src/app/Interfaces/Results';
import { ApiFilmesService } from 'src/app/Services/api-filmes.service';
import { FavoritosService } from 'src/app/Services/favoritos.service';
import { NotificationService } from 'src/app/Services/notificacao.service';

@Component({
  selector: 'app-lista-filmes',
  templateUrl: './lista-filmes.component.html',
  styleUrls: ['./lista-filmes.component.css']
})
export class ListaFilmesComponent implements OnInit {

  constructor(
    private filmesService: ApiFilmesService,
    private favoritosService: FavoritosService,
    private notificacao: NotificationService
  ) { }

  
  listaTopFilmes!: Results
  listaPopulares!: Results

  coracaoVazio: string = "../../../assets/coracaoVazio.png"
  coracaoCheio: string = "../../../assets/coracaoCheio.png"

  inicio = 0 
  final = 6
  inicio2 = 0 
  final2 = 6


  favoritar(filme: FilmeLista): void{
   this.favoritosService.adicionarFavorito(filme).subscribe(
    (resposta) => {
      this.notificacao.showmessage("Filme inserido na lista de favoritos!")
    }
   )
  }

  voltar(){
    if(this.inicio != 0 && this.final != 6){
      this.inicio -= 6
      this.final -= 6
    }
  }

  avancar(){
    this.inicio += 6
    this.final += 6
  }

  voltar2(){
    if(this.inicio2 != 0 && this.final2 != 6){
      this.inicio2 -= 6
      this.final2 -= 6
    }
  }

  avancar2(){
    this.inicio2 += 6
    this.final2 += 6
  }


  ngOnInit(): void {

      this.filmesService.listarMelhoresAvaliados().subscribe(
        (lista) => {
          this.listaTopFilmes = lista
        }
      )
    
      this.filmesService.listarFilmesPopulares().subscribe(
        (lista) => {
          this.listaPopulares = lista
        }
      )
    }

}

