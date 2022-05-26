import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Users } from "../interface/user.interface";


@Injectable({
    providedIn: 'root'
})

export class CrudUsua{

    constructor(private htp:HttpClient){}

    us:Users[]=[]

    // url:string = "http://localhost:3000";

    // allUsers(){
    //     fetch('http://localhost:3000/users')
    //     .then((response) => response.json())
    //     .then((json: any)=> {
    //         this.us =json; 
    //         console.log(this.us);
    //     });

    

    //     return this.us;
    // }

    // functionExample = (json: any) => {  console.log('hola');  console.log('hola'); }

    // function anonymousRegularFunction() {
    //     console.log('fdfd')
    // }

    // anonymousFunction = (x: any) => x solo una expresion

    // anonymousFunction2 = (x: any) => {x} esto es para mas expresiones



    get usersAll():Observable<Users[]>{
        return this.htp.get<Users[]>('http://localhost:3000/users');

    }


    getUsur(usuario:Users):Observable<Users>{
        return this.htp.get<Users>(`http://localhost:3000/users/${usuario.id}`);
      }

    
    
    crearteUser(u:Users){
        
        return this.htp.post<Users[]>(`http://localhost:3000/users/`, u)

    }




    deleteUsers(u:Users):Observable<Users[]>{

        return this.htp.delete<Users[]>(`http://localhost:3000/users/${u.id}`);

    }
    
    updateUsers(u:Users):Observable<Users[]>{

        return this.htp.put<Users[]>(`http://localhost:3000/users/${u.id}`, u);

    }



}
