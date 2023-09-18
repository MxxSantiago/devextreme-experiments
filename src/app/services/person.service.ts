import { User } from 'src/app/models/person';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private apiURL = 'https://localhost:7111/Users';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<User[]>(this.apiURL);
  }

  getPerName(name: string) {
    return this.http
      .get<User[]>(this.apiURL)
      .pipe(
        map((persons) =>
          persons.filter((p) =>
            p.name.toLowerCase().trim().includes(name.toLowerCase().trim())
          )
        )
      );
  }

  massUpdate(personModel: User, ids: number[]) {
    const massUpdateData = {
      userModel: personModel,
      userIds: ids,
    };

    return this.http.put(`${this.apiURL}/MassUpdate`, massUpdateData);
  }

  create(user: User) {
    return this.http.post<User>(this.apiURL, user, this.httpOptions);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  update(id: number, person: User) {
    return this.http.put<User>(`${this.apiURL}/${id}`, person);
  }
}
