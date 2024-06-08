export class DailyGoalInput {

    inputId?: number;
    goalId?: number;
    date?: Date;
    progressInput?: number;

    constructor( goalid?: number, inputid?: number, date?: Date, progInput?: number) {
        this.inputId = inputid;
        this.goalId = goalid;
        this.date = date;
        this.progressInput = progInput;  
    }
}
