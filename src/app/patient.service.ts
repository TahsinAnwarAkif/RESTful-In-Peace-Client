import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Patient } from './patient'


@Injectable()

export class PatientService {

    constructor(private http: Http) {

    }


    private URL = '/patients/';
    private newURL = '';
    private newPatient: Patient;

    getPatients(): Promise<Patient[]> {
        return this.http.get(this.URL)
            .toPromise()
            .then(response => response.json() as Patient[])
            .catch(this.handleError);
    }

    getPatient(patient: any):Promise<Patient>{

        this.newURL = this.URL + patient.singleId;

        //console.log(this.newURL);

        return this.http.get(this.newURL)
            .toPromise()
            .then(response => response.json() as Patient)
            .catch(this.handleError);

    }

    getDoctorsPatients(patient: any):Promise<Patient[]>{

        this.newURL = '/doctors/' + patient.doctorId + '/patients/';

        //console.log(this.newURL);

        return this.http.get(this.newURL)
            .toPromise()
            .then(response => response.json() as Patient[])
            .catch(this.handleError);
    }

    getDoctorsPatient(object : any):Promise<Patient>{

        this.newURL = '/doctors/' + object.doctorId + '/patients/' + object.doctorsPatientId;
        
        console.log(this.newURL);
        
        return this.http.get(this.newURL)
            .toPromise()
            .then(response => response.json() as Patient)
            .catch(this.handleError);

    }

    deletePatient(patient: any):Promise<void>{

        this.newURL = this.URL + patient.singleId;
    
        
        return this.http.delete(this.newURL)
            .toPromise()
            .catch(this.handleError);

    }

    deleteDoctorsPatient(object: any){

        this.newURL = '/doctors/' + object.doctorId + '/patients/' + object.doctorsPatientId;

        return this.http.delete(this.newURL)
            .toPromise()
            .catch(this.handleError);
    }
    
    
    addAndUpdatePatient(patient: any){

        this.newURL     = this.URL + patient.id;
        //console.log(this.newURL);
        this.newPatient = new Patient(patient.id, patient.name, patient.address,
                                      patient.phone, patient.email,patient.patientDoctorId);

        return this.http.put(this.newURL, this.newPatient)
            .toPromise()
            .catch(this.handleError);

    }

    addAndUpdateDoctorsPatient(patient: any){

        this.newURL     = '/doctors/' + patient.patientDoctorId + '/patients/' + patient.id;
        
        this.newPatient = new Patient(patient.id, patient.name, patient.address, 
                                      patient.phone, patient.email, patient.patientDoctorId);

        return this.http.put(this.newURL, this.newPatient)
            .toPromise()
            .catch(this.handleError);

    }
 
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
    
    /*
    addPatient(patientId: String, patientName: String, patientAddress: String, patientPhone: String, patientEmail: String,doctorId: String){

        this.newPatient = new Patient(patientId, patientName, patientAddress, patientPhone, patientEmail,doctorId);

        return this.http.post(this.URL, this.newPatient)
            .toPromise()
            .catch(this.handleError);

    }
    
    
    
    updateDoctorsPatient(patientId: String, patientName: String, patientAddress: String, patientPhone: String, patientEmail: String,doctorId: String){

        this.newURL = '/doctors/' + doctorId + '/patients/' + patientId;
        console.log(this.newURL);
        this.newPatient = new Patient(patientId, patientName, patientAddress, patientPhone, patientEmail,doctorId);

        return this.http.put(this.newURL, this.newPatient)
            .toPromise()
            .catch(this.handleError);

    }
    */
}

