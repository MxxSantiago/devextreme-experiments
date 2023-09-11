import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Task, status } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiURL = 'http://localhost:3000/tasks';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiURL);
  }

  findTasksByPersonId(personId: number) {
    return this.http
      .get<Task[]>(this.apiURL)
      .pipe(map((tasks) => tasks.filter((task) => task.personId === personId)));
  }

  createTask(content: string, status: status, personId: number) {
    const newTask: Task = Task.Create(content, status, personId);
    return this.http.post<Task>(this.apiURL, newTask, this.httpOptions);
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  updateTask(id: number, task: Task) {
    return this.http.put<Task>(`${this.apiURL}/${id}`, task);
  }
}
