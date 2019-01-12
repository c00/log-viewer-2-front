export const levels: Level[] = [
  {
    "name": "Extra Debug",
    "level": 5,
    "selected": false,
    "bgColor": "rgb(60, 224, 175)",
    "border": "rgb(38, 220, 166)",
    "class": "extra-debug"
  },
  {
    "name": "Debug",
    "level": 4,
    "selected": false,
    "bgColor": "rgb(32, 201, 151)",
    "border": "rgb(28, 179, 134)",
    "class": "debug"
  },
  {
    "name": "Info",
    "level": 3,
    "selected": false,
    "bgColor": "rgb(23, 162, 184)",
    "border": "rgb(20, 142, 161)",
    "class": "info"
  },
  {
    "name": "Warning",
    "level": 2,
    "selected": false,
    "bgColor": "rgb(255, 193, 7)",
    "border": "rgb(237, 177, 0)",
    "class": "warning"
  },
  {
    "name": "Error",
    "level": 1,
    "selected": false,
    "bgColor": "rgb(220, 53, 69)",
    "border": "rgb(211, 37, 53)",
    "class": "error"
  }
];

export interface Level {
  name: string,
  level: number,
  selected: boolean,
  bgColor: string,
  border: string,
  class: string
}

export class LevelHelper {
  public static getLevel(level: number) {
    return levels.find(l => l.level === level);
  }
}
