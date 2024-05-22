export class Goal {

    id?: number = 0;
    name?: string = "";
    type?: string = "";
    description?: string = "";
    goalToReach?: number = 0;
    userProgress?: number = 0;
    dateCreated?: string = "";

    constructor(id?:number,name?:string,type?:string,description?:string,
                goalToReach?:number,userProgress?:number,dateCreated?:string)
    {
        this.id = id;
        this.name = name;
        this.type = type;
        this.description = description;
        this.goalToReach = goalToReach;
        this.userProgress = userProgress;
        this.dateCreated = dateCreated;

    }

}
