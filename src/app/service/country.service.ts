import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Country } from "../interface/country.interface";

@Injectable({
    providedIn:'root'
})

export class countryService{
    constructor(private htp:HttpClient){}

    count:Country[]=[]


    // get country():Observable<Country[]>{
    //     return this.htp.get<Country[]>(`https://restcountries.com/v2/all`)
    // }

get c(){
    fetch('https://restcountries.com/v2/all')
    .then((response) => response.json())
    .then((json)=> this.count.push(...json));

    return this.count;

    console.log(this.count, ' hola soy paises')

}
   
}

