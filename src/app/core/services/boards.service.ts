import {Injectable} from '@angular/core';
import {ITag} from "@shared/interfaces/tag.interface";


@Injectable({
  providedIn: 'root'
})

export class BoardsService {

  public Tags: ITag[] = [
    {
      id: "0",
      name: "Cool",
      background: "#61BD4F",
    },
    {
      id: "1",
      name: "Warning",
      background: "#F2D600",
    },
    {
      id: "2",
      name: "Need to do",
      background: "#FF9F1A",
    },
    {
      id: "3",
      name: "Important",
      background: "#EB5A46",
    },
    {
      id: "4",
      name: "",
      background: "#C377E0",
    },
    {
      id: "5",
      name: "",
      background: "#0079BF",
    },
    {
      id: "6",
      name: "",
      background: "#00C2E0",
    },
    {
      id: "7",
      name: "",
      background: "#51E898",
    },
    {
      id: "8",
      name: "Pink",
      background: "#FF78CB",
    },
    {
      id: "9",
      name: "Black List",
      background: "#344563",
    },
    {
      id: "10",
      name: "White",
      background: "",
    },
  ];
/*

  public addTask(task: ITask, idColumn: string, idBoard: string): void {
    let randomId = getUniqueID();
    let filterBoard = this.boards.filter(column => column.id == idBoard)
    let filterColumn = filterBoard[0].boardColumn.filter(task => task.id == idColumn)
    filterColumn[0].columnTask.push({
      ...task,
      taskId: randomId,
      taskName: task.taskName,
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
