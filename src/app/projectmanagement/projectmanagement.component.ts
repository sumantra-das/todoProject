import { Component, OnInit } from '@angular/core';
import { ProjectdataService} from '../services/projectdata.service';
import { debug } from 'util';

@Component({
  selector: 'app-projectmanagement',
  templateUrl: './projectmanagement.component.html',
  styleUrls: ['./projectmanagement.component.css']
})
export class ProjectmanagementComponent implements OnInit {

  private allProject:any;
  private prName:any;
  private prInfo:any;
  private prNamenew:any;

  constructor( private projectservice:ProjectdataService) { }

  


  ngOnInit() {
    this.showProjectList();    
    //console.log(this.allProject)
  }

   projectAddFromSubmit(form:any){
    let formValue=form.value;
     if(formValue.projectName!='' ||formValue.projectName!=null){
      var isDuplicate = this.allProject.map(function(item:any){ return item }).indexOf(formValue.projectName);      
      if(isDuplicate==-1){
        this.projectservice.save(formValue.projectName,JSON.stringify([]));
        this.showProjectList();
      }else{
        alert('Dupliacte Entry!');
      }       
     }else{
       alert("Please enter a value!");
     }  
     form.resetForm();    
  }

  showProjectList(){
    this.allProject = this.projectservice.allLocalStorage();
  }

  removeProject(key:any){
    this.projectservice.removeProject(key);
    this.showProjectList();  
  }

  updateProjectModal(i:any){
    //console.log(i);
    this.prName=i;
    this.prInfo=this.projectservice.fetchProject(i);
    this.prNamenew=i;
  }

  updateProjectName(){
      if(this.prName!=''){
        this.projectservice.removeProject(this.prName);
        this.projectservice.save(this.prNamenew,this.prInfo);
        this.showProjectList();  
      }else{
        alert("Enter a value");
      }
      console.log(this.prName)
  }

}
