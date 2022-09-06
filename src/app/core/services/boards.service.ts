import {Injectable} from '@angular/core';
import {ITag} from "@shared/interfaces/tag.interface";


@Injectable({
  providedIn: 'root'
})

export class BoardsService {

  //have enum already
  public bgColorTask = [
    {taskBackground: "#7BC86C"},
    {taskBackground: "#F5DD29"},
    {taskBackground: "#FFAF3F"},
    {taskBackground: "#EF7564"},
    {taskBackground: "#CD8DE5"},
    {taskBackground: "#5BA4CF"},
    {taskBackground: "#29CCE5"},
    {taskBackground: "#6DECA9"},
    {taskBackground: "#FF8ED4"},
    {taskBackground: "#172B4D"},
    {taskBackground: ""}
  ];
//already have enum
  public bgColorTag = [
    {tagBackground: "#61BD4F"},
    {tagBackground: "#F2D600"},
    {tagBackground: "#FF9F1A"},
    {tagBackground: "#EB5A46"},
    {tagBackground: "#C377E0"},
    {tagBackground: "#0079BF"},
    {tagBackground: "#00C2E0"},
    {tagBackground: "#51E898"},
    {tagBackground: "#FF78CB"},
    {tagBackground: "#344563"},
    {tagBackground: ""}
  ];

  public Tags: ITag[] = [
    {
      tagId: "0",
      tagName: "Cool",
      tagBackground: "#61BD4F",
    },
    {
      tagId: "1",
      tagName: "Warning",
      tagBackground: "#F2D600",
    },
    {
      tagId: "2",
      tagName: "Need to do",
      tagBackground: "#FF9F1A",
    },
    {
      tagId: "3",
      tagName: "Important",
      tagBackground: "#EB5A46",
    },
    {
      tagId: "4",
      tagName: "",
      tagBackground: "#C377E0",
    },
    {
      tagId: "5",
      tagName: "",
      tagBackground: "#0079BF",
    },
    {
      tagId: "6",
      tagName: "",
      tagBackground: "#00C2E0",
    },
    {
      tagId: "7",
      tagName: "",
      tagBackground: "#51E898",
    },
    {
      tagId: "8",
      tagName: "Pink",
      tagBackground: "#FF78CB",
    },
    {
      tagId: "9",
      tagName: "Black List",
      tagBackground: "#344563",
    },
    {
      tagId: "10",
      tagName: "White",
      tagBackground: "",
    },
  ];
/*
  public addColumn(board: IColumn, id: string): void {
    let randomId = getUniqueID();
    let filterBoard = this.boards.filter(item => item.id == id)
    filterBoard[0].boardColumn.push({...board, id: randomId, columnTask: []})
  }

  public editColumn(form, id): void {
    this.boards.filter(item => item.id === id)[0].boardColumn
      .find(item => item.id === form.columnId).name = form.columnName;
  }

  public deleteColumn(columnId, boardId) {
    this.boards.filter(item => item.id === boardId)[0].boardColumn =
      this.boards.filter(item => item.id === boardId)[0].boardColumn.filter(item => item.id !== columnId);
  }

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
