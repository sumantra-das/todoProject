import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectdataService} from '../services/projectdata.service';
import { debug } from 'util';

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
  private editToDoIndex:any;

  constructor(private route:ActivatedRoute, private projectservice:ProjectdataService) { 
    this.route.params.subscribe(route => this.id = decodeURI(route.id));
  }

  ngOnInit() {
    //console.log(this.id);
    this.showtodoList(); 
    this.obj = JSON.parse(this.projectservice.fetchProject(this.id));  
  }

  

  todoAddFromSubmit(form:any){
    let formValue:any=form.value;
     //console.log(formValue.todoName);
     if(formValue.todoName!=''){
      this.obj = JSON.parse(this.projectservice.fetchProject(this.id));
      var isDuplicate = this.obj.map(function(item:any){ return item.name }).indexOf(formValue.todoName);
      

      this.obj.push({
       'name':formValue.todoName,
       'priority':formValue.todoPriority,
       'completed':0
     });
     if(isDuplicate==-1){
      this.projectservice.save(this.id,JSON.stringify(this.obj));
     }else{
    alert("Dupliacte value!");
  } 
    
    this.showtodoList();
    form.resetForm();    
  }else{
    alert("Please enter a value!");
  }      
  }

  showtodoList(){
    this.todolist=JSON.parse(this.projectservice.fetchProject(this.id));
  }

  updateCompleteStatus(name:any){
    //console.log(this.obj[t].completed);
    this.obj = JSON.parse(this.projectservice.fetchProject(this.id)); 
    var t = this.obj.findIndex(function(item, i){
      return item.name === name
    }); 
    if(this.obj[t].completed==1){
      this.obj[t].completed=0;
    }else{
      this.obj[t].completed=1;
    }
    this.projectservice.save(this.id,JSON.stringify(this.obj));
  }

  deleteTodo(name:any){
    //console.log(this.obj[t].completed);
    this.obj = JSON.parse(this.projectservice.fetchProject(this.id)); 
    var i = this.obj.findIndex(function(item, i){
      return item.name === name
    }); 
    const filteredItems = this.obj.slice(0, i).concat(this.obj.slice(i + 1, this.obj.length))
    this.projectservice.save(this.id,JSON.stringify(filteredItems));
    this.showtodoList();
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
    // console.log(this.todoPrioritynew)
    // console.log(this.todoNamenew)
    this.todolist[this.editToDoIndex].name=this.todoNamenew;
    this.todolist[this.editToDoIndex].priority=this.todoPrioritynew;    
  }
  
  updatetodoModal(i:any){
    this.showtodoList();
    this.editToDoIndex=i;
    this.todoNamenew=this.todolist[i].name;
    this.todoPrioritynew = this.todolist[i].priority;
  }

}
