import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient} from '../patient';
import { PatientService } from '../patient.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
    selector: 'app-patients',
    templateUrl: './patients.component.html',
    styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

    form;
    singleForm;
    singleForm2;
    fullForm;
    
    patients: Patient[];
    patient: Patient;
    doctorsPatients: Patient[];
    
    singlePatient: Patient;
    singlePatient2: Patient;
    
    Message: String;


    constructor(private router: Router, private patientService: PatientService) {

    }

    getPatients(){

        

        this.fullForm   = new FormGroup({

            patientId            : new FormArray([]),
            patientName          : new FormArray([]),
            patientAddress       : new FormArray([]),
            patientPhone         : new FormArray([]),
            patientEmail         : new FormArray([]),
            patientDoctorId      : new FormArray([])
            //doctors             : new FormArray([]])

        })
        
        if( this.patients )
            {
            
                for( var i = 0 ; i < this.patients.length; i++ )
                {
                    console.log(this.patients[i].doctor.id);
                    (this.fullForm.get('patientId') as FormArray).push(new FormControl(this.patients[i].id) );
                    (this.fullForm.get('patientName') as FormArray).push(new FormControl(this.patients[i].name) );
                    (this.fullForm.get('patientAddress') as FormArray).push(new FormControl(this.patients[i].address) );
                    (this.fullForm.get('patientPhone') as FormArray).push(new FormControl(this.patients[i].phone) );
                    (this.fullForm.get('patientEmail') as FormArray).push(new FormControl(this.patients[i].email) ); 
                    (this.fullForm.get('patientDoctorId') as FormArray).push(new FormControl(this.patients[i].doctor.id) ); 
                }
            }
    }
    
    saveAllPatients(){


        for(var i = 0; i < this.patients.length; i++)
        {

            this.patient = new Patient(this.fullForm.value.patientId[i], this.fullForm.value.patientName[i], 
                                        this.fullForm.value.patientAddress[i], 
                                     this.fullForm.value.patientPhone[i], this.fullForm.value.patientEmail[i],
                                       this.fullForm.value.patientDoctorId[i]);

            //console.log(this.doctor);
            this.patientService.addAndUpdatePatient(this.patient) .then(patients => this.ngOnInit());
            
            this.Message = "Updated Succesfully!!!";
            
            //this.doctor = null;
        }
    }
    
    getPatient(patient){

        this.patientService.getPatient(patient).then(singlePatient => this.singlePatient = singlePatient);

    }


    deletePatient(patient){

        if(patient)
            this.patientService.deletePatient(patient).then(patients => this.ngOnInit());
    }



    addAndUpdatePatient(patient){

        this.patientService.addAndUpdatePatient(patient).then(patients => this.ngOnInit());
    }

    addAndUpdateDoctorsPatient(patient){

        this.patientService.addAndUpdateDoctorsPatient(patient)  .then(patients => this.ngOnInit());
    }

    getDoctorsPatients(patient){

        this.patientService.getDoctorsPatients(patient).then(patients => this.doctorsPatients = patients);
    }

    getDoctorsPatient(object){


        this.patientService.getDoctorsPatient( object ).then(patient => this.singlePatient2 = patient);
    }

    deleteDoctorsPatient(object){

        this.patientService.deleteDoctorsPatient(object).then(patients => this.ngOnInit());
    }

    /*
    addDoctorsPatient(){


        this.patientService.addDoctorsPatient(this.newPatientId, this.newPatientName,this.newPatientAddress,this.newPatientPhone,
                                              this.newPatientEmail, this.doctorId)  .then(patients => this.ngOnInit());

    }

    addPatient(){

        this.patientService.addPatient(this.newPatientId, this.newPatientName,this.newPatientAddress,this.newPatientPhone,
                                       this.newPatientEmail, this.newPatientDoctorId)  .then(patients => this.ngOnInit());
    }
    */


    ngOnInit() {

        this.form   = new FormGroup({

            id                   : new FormControl(""),
            name                 : new FormControl(""),
            address              : new FormControl(""),
            phone                : new FormControl(""),
            email                : new FormControl(""),
            patientDoctorId      : new FormControl("")
        });

        this.singleForm   = new FormGroup({

            singleId            : new FormControl("")
        });

        this.singleForm2   = new FormGroup({

            doctorId              : new FormControl(""),
            doctorsPatientId      : new FormControl("")
        });
        
        this.fullForm   = new FormGroup({

            patientId            : new FormArray([]),
            patientName          : new FormArray([]),
            patientAddress       : new FormArray([]),
            patientPhone         : new FormArray([]),
            patientEmail         : new FormArray([]),
            patientDoctorId      : new FormArray([])
            //doctors             : new FormArray([]])

        }) 

        this.singlePatient  = null;
        this.singlePatient2 = null;
        this.patients       = null;
        this.doctorsPatients= null;
        this.patientService.getPatients().then(patients => this.patients = patients);

    }


}