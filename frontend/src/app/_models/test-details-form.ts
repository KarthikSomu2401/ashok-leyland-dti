export class TestDetailsForm {

    public _id?: string;
    public testType?: string;
    public sensorCount?: number;
    public dlNo?: string;
    public candidateName?: string;
    public dateOfTest?: string;
    public trainerName?: string;
    public vehicleNumber?: string;
    public duration?: Number = 0;
    public status?: string;
    public vehicleType?: string;
    public vehicleSubType?: string;
    public attempt?: number;
    public remarks?: string;
    public startTime?: string;
    public endTime?: string;
    public isCompleted?: boolean;

    constructor() { }

}