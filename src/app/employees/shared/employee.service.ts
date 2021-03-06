import { Injectable } from '@angular/core';
import {Employee} from './employee.model';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class EmployeeService {

  selectedEmployee: Employee;
  employeeList : Employee[];
  constructor(private http: Http) { }

  addEmployee(employee: Employee){    
    var headerOptions = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    var requestOptions = new RequestOptions({method:RequestMethod.Post, headers: headerOptions}); 
    let body = new URLSearchParams();
    // mark all your properties and values below with body.set
    body.set('FirstName', employee.FirstName);
    body.set('LastName', employee.LastName);
    body.set('Position', employee.Position);
    body.set('EmpCode', employee.EmpCode);
    body.set('Office', employee.Office);
    return this.http.post('http://localhost:5008/api/Employee', body.toString() , requestOptions ).map(x => x.json());
  }

  getEmployeeList(){
    this.http.get('http://localhost:5008/api/Employee')
    .map((data : Response) => {
      return data.json() as Employee[];
    }).toPromise().then(x => {
      this.employeeList = x;
    })
  }

  updateEmployee(id, employee){
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method:RequestMethod.Put, headers: headerOptions}); 
    var body = JSON.stringify(employee);
    console.log(body.toString());
    return this.http.put('http://localhost:5008/api/Employee/' + id, body , requestOptions ).map(x => x.json());
  }

  deleteEmployee(id : number){
    return this.http.delete('http://localhost:5008/api/Employee/' + id)
    .map(res => res.json());
  }
}
