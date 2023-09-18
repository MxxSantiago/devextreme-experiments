export type nationalities = 'USA' | 'MX' | 'BLG';

export class User {
  id: number;
  name: string;
  phoneNumber: string;
  age: number;
  nationality: nationalities;

  private constructor(
    id: number,
    name: string,
    age: number,
    nationality: nationalities,
    phoneNumber: string
  ) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.nationality = nationality;
    this.phoneNumber = phoneNumber;
  }

  public static create(
    name: string,
    age: number,
    nationality: nationalities,
    phoneNumber: string
  ): User {
    const randomInt = Math.round(Math.random() * 1000);
    return new User(randomInt, name, age, nationality, phoneNumber);
  }

  public static default() {
    return this.create('Kevin', 30, 'BLG', '111-666-7777');
  }
}
