import { Component, OnInit } from '@angular/core';
import { ProjectdataService} from '../services/projectdata.service';

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

   projectAddFromSubmit(formValue:any){
     // console.log(formValue.projectName);
     if(formValue.projectName!=''){
      this.projectservice.save(formValue.projectName,JSON.stringify([]));
      this.showProjectList(); 
     }else{
       alert("Please enter a value!");
     }   
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
