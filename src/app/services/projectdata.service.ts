import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProjectdataService {

  constructor() { }

  save(key: string,value :any): void {
    localStorage.setItem(key,value);
  }

  allLocalStorage(){
      var archive = [];
      for (var i = 0; i<localStorage.length; i++) {
          archive[i] = localStorage.key(i);
      } 
      return archive; 
  }

  removeProject(key){
    localStorage.removeItem(key);
  }

  fetchProject(key:any) {    
      return localStorage.getItem(key);   
  }

 

}
