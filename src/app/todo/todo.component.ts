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
  private filterSelectedValue:any;

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
     if(formValue.todoName!='' && formValue.todoName!=null){   
      this.obj.push({
        'id':Date.now(),
        'name':formValue.todoName,
        'priority':formValue.todoPriority,
        'completed':0
     });
      this.projectservice.save(this.id,JSON.stringify(this.obj)); 
    this.showtodoList();
    form.resetForm();    
  }else{
    alert("Please enter a value!");
  }      
  }

  showtodoList(){
    this.todolist=JSON.parse(this.projectservice.fetchProject(this.id));
    this.todolist.forEach((element, index) => {
      if(element.priority === '1') {element.priority  = 'Low'; }
      if(element.priority === '2') {element.priority  = 'Medium'; }
      if(element.priority === '3') {element.priority  = 'High'; }
      });
    }

  updateCompleteStatus(id:any){
    //console.log(this.obj[t].completed);
    this.obj = JSON.parse(this.projectservice.fetchProject(this.id)); 
    var t = this.obj.findIndex(function(item, i){
      return item.id === id
    }); 
    if(this.obj[t].completed==1){
      this.obj[t].completed=0;
    }else{
      this.obj[t].completed=1;
    }
    this.projectservice.save(this.id,JSON.stringify(this.obj));
    this.updateTodolist(this.filterSelectedValue);
  }

  deleteTodo(id:any){
    //console.log(this.obj[t].completed);
    this.obj = JSON.parse(this.projectservice.fetchProject(this.id)); 
    var i = this.obj.findIndex(function(item, i){
      return item.id === id
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
    this.filterSelectedValue=event;
    
  }

  updatetodo(){
    if(this.todoNamenew=='' || this.todoNamenew==null){
        alert('Please fill up!')
    }else{
      this.obj[this.editToDoIndex].name=this.todoNamenew;
      this.obj[this.editToDoIndex].priority=this.todoPrioritynew;  
      this.projectservice.save(this.id,JSON.stringify(this.obj));
    }   
    this.showtodoList();   
  }
  
  updatetodoModal(id:any){
    this.obj = JSON.parse(this.projectservice.fetchProject(this.id)); 
    var t = this.obj.findIndex(function(item, i){
      return item.id === id
    }); 
    this.editToDoIndex=t;
    this.todoNamenew=this.obj[t].name;
    this.todoPrioritynew = this.obj[t].priority;
  }

}
