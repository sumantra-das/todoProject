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

  /*
  saveArray(key: string, data: any, storageType: any = "not_set"): void {   
  }
  
  fetch(key: string, storageType:any = "not_set"): string {
    let storage_type = storageType==="not_set" ? DEFAULT_STORAGE : storageType;
    let value: string;
    try{
      value = storage_type.getItem(key);
    }
    catch(error){
      value = "";
    }
    return value;
  }

  eraseSpecific(key: string, storageType:any = "not_set"): void {
    let storage_type = storageType==="not_set" ? DEFAULT_STORAGE : storageType;
    storage_type.removeItem(key);
  }
  */

}
