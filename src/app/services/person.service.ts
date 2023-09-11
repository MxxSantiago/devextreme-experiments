import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Person } from '../models/person';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private apiURL = 'http://localhost:3000/people';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<Person[]>(this.apiURL);
  }

  getPerName(name: string) {
    return this.http
      .get<Person[]>(this.apiURL)
      .pipe(
        map((persons) =>
          persons.filter((p) =>
            p.name.toLowerCase().trim().includes(name.toLowerCase().trim())
          )
        )
      );
  }

  create(person: Person) {
    return this.http.post<Person>(this.apiURL, person, this.httpOptions);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  update(id: number, person: Person) {
    return this.http.put<Person>(`${this.apiURL}/${id}`, person);
  }
}
