export class Goal {

    goalId?: number = 0;
    name?: string = "";
    type?: string = "";
    description?: string = "";
    goalToReach?: number = 0;
    progress?: number = 0;
    dateCreated?: string = "";

    constructor(goalId?:number,name?:string,type?:string,description?:string,
                goalToReach?:number,progress?:number,dateCreated?:string)
    {
        this.goalId = goalId;
        this.name = name;
        this.type = type;
        this.description = description;
        this.goalToReach = goalToReach;
        this.progress = progress;
        this.dateCreated = dateCreated;

    }

}
