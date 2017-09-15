import { Doctor} from './doctor';
export class Patient {

    id: String;
    name: String;
    address: String;
    phone: String;
    email: String;
    doctor: Doctor;

    /*
    constructor(){

    }
    */

    constructor(id: String, name: String, address: String, phone: String, email: String, d_id: String){

        this.id                 = id;
        this.name               = name;
        this.address            = address;
        this.phone              = phone;
        this.email              = email;
        this.doctor             = new Doctor(d_id,'','','','','','');
    }
}