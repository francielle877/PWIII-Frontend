import { Component, OnInit } from '@angular/core';
import { AutorAPIService } from '../service/autor-api.service';
import { Editora } from '../editora';

@Component({
  selector: 'has-lista-autor',
  templateUrl: './lista-autor.component.html',
  styleUrls: ['./lista-autor.component.css']
})
export class ListaAutorComponent implements OnInit {
  editoras : Editora[];
  constructor(private service: AutorAPIService) { }

  ngOnInit() {
      this.service
          .getEditoras()
          .subscribe((data: Editora[])=>  this.editoras = data,
                      error => console.log(error));                  
  }

}
