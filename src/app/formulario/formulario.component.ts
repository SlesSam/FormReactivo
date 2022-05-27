import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Country } from '../interface/country.interface';
import { Users } from '../interface/user.interface';
import { countryService } from '../service/country.service';
import { CrudUsua } from '../service/crud-usua.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  usersArray:Users[]=[];
  user!:Users
  countr:Country[]=[]


  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public myForm!: FormGroup;
  
  constructor(
    private countries: countryService,
    private people: CrudUsua,) { }

  ngOnInit(): void {

    this.myForm= new  FormGroup ({
      'id' :new FormControl(''),
      'name': new FormControl('',Validators.required),
      'password': new FormControl('',[Validators.required,Validators.min(3)]),
      'passwordConfirme':  new FormControl('',[Validators.required,Validators.min(3)]),
      'email':  new FormControl('',[Validators.required,Validators.pattern(this.emailPattern)]),
      'oferta': new FormControl(false),
      'pais': new FormControl('',Validators.required),
    });


    //traemos a los usuario
    this.people.usersAll
      .subscribe(u=>{
        this.usersArray=u;
        console.log('hola estoy en formulario', u)
      });

    // this.usersArray=this.people.allUsers();
    console.log(this.usersArray, 'estoy en formulario')
    

      //aqui se trae la informacion 
      this.countr =  this.countries.c;
      console.log(this.countr, 'soy paises de formulario')
      
  }

//aqui se edita el usuario cuando se trae el id
  editar(u:Users){
    this.myForm.patchValue(u);
  }

//esta funcion se añade y a la vez se edita 
  addOrEdit(){
    const id = this.myForm.get('id')?.value;

    if(!id){
      this.user = this.myForm.value;
      this.people.crearteUser(this.user)
        .subscribe( (resp) => {
          
          console.log(resp,' estoy dentro de Bntaddedit')
          this.ngOnInit();
        })
        this.myForm.reset();
    } else{
      this.user = this.myForm!.value;
      this.people.updateUsers(this.user)
        .subscribe( (resp) => {
          this.usersArray = resp;
          
          console.log(resp, ' se va actualizar ')
          
          this.ngOnInit();
        })
        this.myForm.reset();
      
    }

  }


  coincide(){

    const password1  = this.myForm.get('password')?.value;
    const password2 = this.myForm.get('passwordConfirme')?.value;

    if(password1!==password2){
      return false
      console.log('no coinciden')
    }else{
      return true;
      
    }
  }


  



  



}
