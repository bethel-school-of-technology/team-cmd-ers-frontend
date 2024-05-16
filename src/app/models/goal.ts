export class Goal {

    goalId?: number = 0;
    name?: string = "";
    type?: string = "";
    description?: string = "";
    goalToReach?: number = 0;
    userProgress?: number = 0;
    dateCreated?: string = "";

    constructor(goalId?:number,name?:string,type?:string,description?:string,
                goalToReach?:number,userProgress?:number,dateCreated?:string)
    {
        this.goalId = goalId;
        this.name = name;
        this.type = type;
        this.description = description;
        this.goalToReach = goalToReach;
        this.userProgress = userProgress;
        this.dateCreated = dateCreated;

    }

}
