import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Users } from '../interface/user.interface';
import { CrudUsua } from '../service/crud-usua.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css'],
  
})
export class ResultadoComponent implements OnInit {
    @Input() usurs!:Users[]
    @Output() usuario:EventEmitter<Users>=new EventEmitter()

  constructor(private usua:CrudUsua) { }

  ngOnInit(): void {
//aqui se trae el resultado de users
      this.usua.usersAll
        .subscribe(u=>{
          this.usurs=u;
        console.log(u, ' soy del resultado')
        })

      
  }

  
//tremos el id para poder editar al usuario
  edit(use:Users){
    this.usua.getUsur(use)
      .subscribe(re=>{
        this.usuario.emit(re);
        this.ngOnInit()
        console.log(re, ' vamos a editar eso')
      })

  }

//se elimina el usuario
  delete(use:Users){
    this.usua.deleteUsers(use)
      .subscribe(r=>{
        this.ngOnInit()
        console.log(r, ' ya esta eliminado')
      })
  }

  
}