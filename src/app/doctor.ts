export class Doctor {

    id: String;
    name: String;
    specialty: String;
    isAvailable: String;
    address: String;
    phone: String;
    email: String;

    /*
    constructor(){

    }
    */

    constructor(id: String, name: String, isAvailable: String, specialty: String, address: String, phone: String, email: String){

        this.id                 = id;
        this.name               = name;
        this.isAvailable        = isAvailable;
        this.specialty          = specialty;
        this.address            = address;
        this.phone              = phone;
        this.email              = email;


    }
}