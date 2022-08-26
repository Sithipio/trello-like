import {Injectable} from '@angular/core';
import {IBoards} from "@shared/interfaces/boards.interface";
import {v4 as getUniqueID} from 'uuid';
import {IBoard} from "@shared/interfaces/board.interface";
import {ITask} from "@shared/interfaces/task.interface";
import {ITag} from "@shared/interfaces/tag.interface";
import {BoardBackground} from '@shared/enums/board-background';


@Injectable({
  providedIn: 'root'
})

export class BoardsService {

  private boards: IBoards[] = [
    {
      id: "1",
      name: "Work",
      background: BoardBackground.GREY,
      isFavorite: false,
      boardColumn: [
        {
          columnId: "101",
          columnName: "To do",
          columnTask: [
            {
              taskId: "1001",
              taskName: "Contact with Mike",
              taskDesc: "Tell him about my new project",
              taskTag: [],
              taskDate: "unknown",
              taskBackground: "#172B4D",
              taskUser: [],
            },
          ],
        },
        {
          columnId: "102",
          columnName: "Not started",
          columnTask: [],
        },
        {
          columnId: "103",
          columnName: "Finished",
          columnTask: [],
        },
      ]
    },
    {
      id: "2",
      name: "Home",
      background: BoardBackground.GREY,
      isFavorite: true,
      boardColumn: [
        {
          columnId: "104",
          columnName: "Routine",
          columnTask: [],
        },
        {
          columnId: "105",
          columnName: "Planned",
          columnTask: [
            {
              taskId: "1002",
              taskName: "Travel in Monaco",
              taskDesc: "Planned travel for me and my wife when I can take a vacation",
              taskTag: [],
              taskDate: "unknown",
              taskBackground: "#FF8ED4",
              taskUser: [],
            },
          ],
        },
        {
          columnId: "106",
          columnName: "Need to buy",
          columnTask: [],
        },
      ],
    },
    {
      id: "3",
      name: "Family",
      background: BoardBackground.GREY,
      isFavorite: false,
      boardColumn: [
        {
          columnId: "107",
          columnName: "Common",
          columnTask: [],
        },
        {
          columnId: "108",
          columnName: "John",
          columnTask: [
            {
              taskId: "1003",
              taskName: "Clean my car",
              taskDesc: "I want to clean my car inside",
              taskTag: [],
              taskDate: "unknown",
              taskBackground: "#29CCE5",
              taskUser: [],
            },
          ],
        },
        {
          columnId: "109",
          columnName: "Elizabet",
          columnTask: [
            {
              taskId: "1004",
              taskName: "Buy a new dress",
              taskDesc: "I want to buy a new dress in a new shop what opened nearby our home",
              taskTag: [],
              taskDate: "unknown",
              taskBackground: "",
              taskUser: [],
            },
            {
              taskId: " 1005",
              taskName: "Go to hospital",
              taskDesc: "My headache is growing, need to go to hospital",
              taskTag: [],
              taskDate: "unknown",
              taskBackground: "",
              taskUser: [],
            },
            {
              taskId: "1006",
              taskName: "1006Buy a new dress",
              taskDesc: "I want to buy a new dress in a new shop what opened nearby our home",
              taskTag: [
                {
                  tagBackground: "#EB5A46",
                  tagId: "3",
                  tagName: "Important",
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
                  tagId: "1",
                  tagName: "",
                  tagBackground: "#F2D600",
                },
                {
                  tagId: "2",
                  tagName: "",
                  tagBackground: "#B3BAC5",
                },
              ],
              taskDate: "unknown",
              taskBackground: "#5BA4CF",
              taskUser: [],
            },
            {
              taskId: "1007",
              taskName: "1007Go to hospital",
              taskDesc: "My headache is growing, need to go to hospital",
              taskTag: [],
              taskDate: "unknown",
              taskBackground: "",
              taskUser: [],
            },
            {
              taskId: "1008",
              taskName: "1008Buy a new dress",
              taskDesc: "I want to buy a new dress in a new shop what opened nearby our home",
              taskTag: [],
              taskDate: "unknown",
              taskBackground: "",
              taskUser: [],
            },
            {
              taskId: "1009",
              taskName: "1009Go to hospital",
              taskDesc: "My headache is growing, need to go to hospital",
              taskTag: [],
              taskDate: "unknown",
              taskBackground: "",
              taskUser: [],
            },
            {
              taskId: "1010",
              taskName: "B1010uy a new dress",
              taskDesc: "I want to buy a new dress in a new shop what opened nearby our home",
              taskTag: [],
              taskDate: "unknown",
              taskBackground: "#CD8DE5",
              taskUser: [],
            },
            {
              taskId: "1011",
              taskName: "1011Go to hospital",
              taskDesc: "My headache is growing, need to go to hospital",
              taskTag: [],
              taskDate: "unknown",
              taskBackground: "#EF7564",
              taskUser: [],
            },
            {
              taskId: "1012",
              taskName: "1012Go to hospital",
              taskDesc: "My headache is growing, need to go to hospital",
              taskTag: [],
              taskDate: "unknown",
              taskBackground: "",
              taskUser: [],
            },
            {
              taskId: "1013",
              taskName: "1013Buy a new dress",
              taskDesc: "I want to buy a new dress in a new shop what opened nearby our home",
              taskTag: [],
              taskDate: "unknown",
              taskBackground: "#EF7564",
              taskUser: [],
            },
            {
              taskId: "1014",
              taskName: "1014Go to hospital",
              taskDesc: "My headache is growing, need to go to hospital",
              taskTag: [],
              taskDate: "unknown",
              taskBackground: "#172B4D",
              taskUser: [],
            },
            {
              taskId: "1015",
              taskName: "1015 to hospital",
              taskDesc: "My headache is growing, need to go to hospital",
              taskTag: [],
              taskDate: "unknown",
              taskBackground: "#FFAF3F",
              taskUser: [],
            },
            {
              taskId: "1016",
              taskName: "1016 a new dress",
              taskDesc: "I want to buy a new dress in a new shop what opened nearby our home",
              taskTag: [],
              taskDate: "unknown",
              taskBackground: "#F5DD29",
              taskUser: [],
            },
            {
              taskId: "1017",
              taskName: "1017 Go to hospital",
              taskDesc: "My headache is growing, need to go to hospital",
              taskTag: [],
              taskDate: "unknown",
              taskBackground: "#7BC86C",
              taskUser: [],
            },
          ],
        },
      ],
    },
  ];

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

  public addColumn(board: IBoard, id: string): void {
    let randomId = getUniqueID();
    let filterBoard = this.boards.filter(item => item.id == id)
    filterBoard[0].boardColumn.push({...board, columnId: randomId, columnTask: []})
  }

  public editColumn(form, id): void {
    this.boards.filter(item => item.id === id)[0].boardColumn
      .find(item => item.columnId === form.columnId).columnName = form.columnName;
  }

  public deleteColumn(columnId, boardId) {
    this.boards.filter(item => item.id === boardId)[0].boardColumn =
      this.boards.filter(item => item.id === boardId)[0].boardColumn.filter(item => item.columnId !== columnId);
  }

  public addTask(task: ITask, idColumn: string, idBoard: string): void {
    let randomId = getUniqueID();
    let filterBoard = this.boards.filter(column => column.id == idBoard)
    let filterColumn = filterBoard[0].boardColumn.filter(task => task.columnId == idColumn)
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
      .filter(item => item.columnId === idColumn)[0].columnTask.find(item => item.taskId === idTask);
  }

  public getTag(tagId) {
    return this.Tags.find(tag => tag.tagId === tagId)
  }

  public getTagTask(idTask, idBoard, idColumn) {
    return this.boards.filter(item => item.id === idBoard)[0].boardColumn
      .filter(item => item.columnId === idColumn)[0].columnTask
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
      .filter(item => item.columnId === idColumn)[0].columnTask
      .filter(item => item.taskId === idTask)[0].taskTag
      .filter(item => item.tagId === itemId)[0];
  }
}
