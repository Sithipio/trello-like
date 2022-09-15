import { Injectable } from '@angular/core';
import { ITag } from '@shared/interfaces/tag.interface';
import { TagBackground } from '@shared/enums';


@Injectable({
  providedIn: 'root'
})

export class BoardsService {

  public Tags: ITag[] = [
    {
      id: "0",
      name: "Cool",
      background: TagBackground.BLUE,
    },
    {
      id: "1",
      name: "Warning",
      background: TagBackground.BLUE,
    },
    {
      id: "2",
      name: "Need to do",
      background: TagBackground.BLUE,
    },
    {
      id: "3",
      name: "Important",
      background: TagBackground.BLUE,
    },
    {
      id: "4",
      name: "",
      background: TagBackground.BLUE,
    },
    {
      id: "5",
      name: "",
      background: TagBackground.BLUE,
    },
    {
      id: "6",
      name: "",
      background: TagBackground.BLUE,
    },
    {
      id: "7",
      name: "",
      background: TagBackground.BLUE,
    },
    {
      id: "8",
      name: "Pink",
      background: TagBackground.BLUE,
    },
    {
      id: "9",
      name: "Black List",
      background: TagBackground.BLUE,
    },
    {
      id: "10",
      name: "White",
      background: TagBackground.BLUE,
    },
  ];
/*

  public addTask(tasks: ITask, idColumn: string, idBoard: string): void {
    let randomId = getUniqueID();
    let filterBoard = this.boards.filter(column => column.id == idBoard)
    let filterColumn = filterBoard[0].boardColumn.filter(tasks => tasks.id == idColumn)
    filterColumn[0].columnTask.push({
      ...tasks,
      taskId: randomId,
      taskName: tasks.taskName,
      taskDesc: '',
      taskTag: [],
      taskDate: '',
      taskBackground: '',
      taskUser: [],
    })
  }

  public getTaskById(idBoard, idColumn, idTask): ITask {
    return this.boards.filter(item => item.id === idBoard)[0].boardColumn
      .filter(item => item.id === idColumn)[0].columnTask.find(item => item.taskId === idTask);
  }

  public getTag(tagId) {
    return this.Tags.find(tag => tag.tagId === tagId)
  }

  public getTagTask(idTask, idBoard, idColumn) {
    return this.boards.filter(item => item.id === idBoard)[0].boardColumn
      .filter(item => item.id === idColumn)[0].columnTask
      .filter(item => item.taskId === idTask)[0].taskTag;
  }

  public addTag(form) {
    let randomId = getUniqueID();
    this.Tags.push({...form, tagId: randomId});
    // console.log(this.Tags)
  }

  public editTag(form) {
    this.Tags.find(item => item.tagId === form.tagId).tagBackground = form.tagBackground;
    this.Tags.find(item => item.tagId === form.tagId).tagName = form.tagName;
  }

  public deleteTag(id) {
    this.Tags = this.Tags.filter(item => item.tagId !== id)
  }

  public checkTagActive(itemId, idTask, idBoard, idColumn) {
    return this.boards.filter(item => item.id === idBoard)[0].boardColumn
      .filter(item => item.id === idColumn)[0].columnTask
      .filter(item => item.taskId === idTask)[0].taskTag
      .filter(item => item.tagId === itemId)[0];
  }*/
}
