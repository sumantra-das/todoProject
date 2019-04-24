import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectdataService} from '../services/projectdata.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  private id:any;
  private todolist:any;
  private obj:any;
  private todoNamenew:any;
  private todoPrioritynew:any;

  constructor(private route:ActivatedRoute, private projectservice:ProjectdataService) { 
    this.route.params.subscribe(route => this.id = decodeURI(route.id));
  }

  ngOnInit() {
    //console.log(this.id);
    this.showtodoList(); 
    this.obj = JSON.parse(this.projectservice.fetchProject(this.id));  
  }

  todoAddFromSubmit(formValue:any){
     //console.log(formValue.todoName);
     if(formValue.todoName!=''){
      this.obj = JSON.parse(this.projectservice.fetchProject(this.id));
      this.obj.push({
       'name':formValue.todoName,
       'priority':formValue.todoPriority,
       'completed':0
     });
    this.projectservice.save(this.id,JSON.stringify(this.obj));
    this.showtodoList();
  }else{
    alert("Please enter a value!");
  }      
  }

  showtodoList(){
    this.todolist=JSON.parse(this.projectservice.fetchProject(this.id));
  }

  updateCompleteStatus(t:any){
    //console.log(this.obj[t].completed);
    if(this.obj[t].completed==1){
      this.obj[t].completed=0;
    }else{
      this.obj[t].completed=1;
    }
    this.projectservice.save(this.id,JSON.stringify(this.obj));
  }


  updateTodolist(event:any){
    //console.log(event);
    if(event=='AT'){
      this.showtodoList();
    }
    if(event=='DT'){
      this.showtodoList();
      const result = this.todolist.filter(r => r.completed==1);
      this.todolist=result;
    }
    if(event=='UT'){
      this.showtodoList();
      const result = this.todolist.filter(r => r.completed==0);
      this.todolist=result;
    }
    if(event=='BP'){
      this.showtodoList();
      const result = this.todolist.sort( (p, p2) => {return p2.priority - p.priority; });
      this.todolist=result;
    }
    
  }

  updatetodo(){

  }
  
  updatetodoModal(i:any){
    this.showtodoList();
    this.todoNamenew=this.todolist[i].name;
    this.todoPrioritynew = this.todolist[i].priority;
  }

}
