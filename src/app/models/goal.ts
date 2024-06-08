import { DailyGoalInput } from "./daily-goal-input";

export class Goal {

    id: number = 0;
    name?: string;
    type?: string;
    description?: string;
    goalToReach?: number;
    userProgress?: number;
    dateCreated?: string;
    dailyGoalInput: DailyGoalInput[] = [];

    constructor(name?:string,type?:string,description?:string,
                goalToReach?:number,userProgress?:number,dateCreated?:string)
    {
        this.name = name;
        this.type = type;
        this.description = description;
        this.goalToReach = goalToReach;
        this.userProgress = userProgress;
        this.dateCreated = dateCreated;
    }

}
