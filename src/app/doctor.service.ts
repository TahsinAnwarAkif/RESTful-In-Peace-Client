import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Doctor } from './doctor';
import { Patient } from './patient';


@Injectable()

export class DoctorService {

    constructor(private http: Http) {

    }


    private URL = '/doctors/';
    private newURL = '';
    private newDoctor: Doctor;


    getDoctors(): Promise<Doctor[]> {
        return this.http.get(this.URL)
            .toPromise()
            .then(response => response.json() as Doctor[])
            .catch(this.handleError);
    }

    getDoctor(doctor: any):Promise<Doctor>{

        this.newURL = this.URL + doctor.singleId;

        //console.log(this.newURL);

        return this.http.get(this.newURL)
            .toPromise()
            .then(response => response.json() as Doctor)
            .catch(this.handleError);

    }

    deleteDoctor(doctor: any):Promise<void>{

        this.newURL = this.URL + doctor.singleId;

        return this.http.delete(this.newURL)
            .toPromise()
            .catch(this.handleError);

    }

    addAndUpdateDoctor(doctor: any){

        this.newURL    = this.URL + doctor.id;
        console.log(this.newURL);
        this.newDoctor = new Doctor(doctor.id, doctor.name, doctor.isAvailable, doctor.specialty, doctor.address, 
                                    doctor.phone, doctor.email);

        return this.http.put(this.newURL, this.newDoctor)
            .toPromise()
            .catch(this.handleError);

    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
    
    /*
    addDoctor(doctorId: String, doctorName: String,doctorIsAvailable: String,doctorSpecialty: String,doctorAddress: String,doctorPhone: String,doctorEmail: String){

        this.newDoctor = new Doctor(doctorId, doctorName, doctorIsAvailable, doctorSpecialty, doctorAddress, doctorPhone, doctorEmail);

        return this.http.post(this.URL, this.newDoctor)
            .toPromise()
            .catch(this.handleError);

    }
    */


}

