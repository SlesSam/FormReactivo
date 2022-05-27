import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Users } from "../interface/user.interface";


@Injectable({
    providedIn: 'root'
})

export class CrudUsua{

    constructor(private htpClient:HttpClient){}

    get usersAll():Observable<Users[]>{
        return this.htpClient.get<Users[]>('http://localhost:3000/users');

    }

    getUsur(usuario:Users):Observable<Users>{
        return this.htpClient.get<Users>(`http://localhost:3000/users/${usuario.id}`);
    }

    crearteUser(u:Users){  
        return this.htpClient.post<Users[]>(`http://localhost:3000/users/`, u)
    }


    deleteUsers(u:Users):Observable<Users[]>{
        return this.htpClient.delete<Users[]>(`http://localhost:3000/users/${u.id}`);
    }
    
    updateUsers(u:Users):Observable<Users[]>{
        return this.htpClient.put<Users[]>(`http://localhost:3000/users/${u.id}`, u);
    }



}
