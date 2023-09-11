import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-person-tasks',
  templateUrl: './person-tasks.component.html',
  styleUrls: ['./person-tasks.component.scss'],
})
export class PersonTasksComponent implements OnChanges {
  @Input() personId: number | null = null;

  tasks: Task[] = [];

  constructor(private readonly taskService: TaskService) {
    this.getPersonTasks();
  }

  getPersonTasks() {
    if (!this.personId) return;
    this.taskService.findTasksByPersonId(this.personId).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.personId = changes['personId'].currentValue;
    this.getPersonTasks();
  }
}
