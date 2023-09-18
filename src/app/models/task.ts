export type status = 'COMPLETED' | 'PENDING';

export class Task {
  id: number;
  content: string;
  status: status;
  userId: number;

  private constructor(
    id: number,
    content: string,
    status: status,
    personId: number
  ) {
    this.id = id;
    this.content = content;
    this.status = status;
    this.userId = personId;
  }

  public static Create(
    content: string,
    status: status,
    personId: number
  ): Task {
    if (content.trim().length <= 0) throw new Error('Invalid content');
    return new Task(Date.now(), content, status, personId);
  }
}
