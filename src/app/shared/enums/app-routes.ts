export enum AppRoutes {

  // ROOT pages
  AUTH = 'auth',
  BOARD = 'board',

  //AUTH pages
  SIGN_IN = 'sign-in',
  SIGN_UP = 'sign-up',

  //COLUMN pages
  COLUMN = 'column',

  //TASK pages
  TASK = 'task',
  TAG = 'tag',
}


export enum AppRoutesParam {

  BOARD_ID = ':boardId',
  TASK_ID = `:taskId`,
}

