export class TestDetailsForm {

    public _id?: string;
    public testType?: string;
    public sensorCount?: number;
    public dlNo?: string;
    public candidateName?: string;
    public dateOfTest?: string;
    public instructorName?: string;
    public vehicleNumber?: string;
    public startDate?: Date;
    public endDate?: Date;
    public duration?: Number = 0;
    public status?: string;
    public vehicleType?: string;
    public vehicleSubType?: string;
    public attempt?: number;

    constructor() { }

}