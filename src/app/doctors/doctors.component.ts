import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor} from '../doctor';
import { Patient } from '../patient';
import { DoctorService } from '../doctor.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
    selector: 'app-doctors',
    templateUrl: './doctors.component.html',
    styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

    form;
    nestedForm;
    fullForm;
    singleForm;
    doctors: Doctor[];
    doctorId: String;
    singleDoctor: Doctor;
    buttonStatus: boolean;
    doctor: Doctor;
    Message: String;

    constructor(private router: Router, private doctorService: DoctorService) {

    }

    /*
    addDoctor(){
        this.doctorService.addDoctor(this.newDoctorId,this.newDoctorName,this.newDoctorIsAvailable,this.newDoctorSpecialty,this.newDoctorAddress,this.newDoctorPhone, this.newDoctorEmail)  .then(doctors => this.ngOnInit());
    }
    */


    addAndUpdateDoctor(doctor){

        console.log(doctor);
        console.log(this.form.doctorId);
        this.doctorService.addAndUpdateDoctor(doctor) .then(doctors => this.ngOnInit());
        //this.doctorService.updateDoctor(this.newDoctorId,this.newDoctorName,this.newDoctorIsAvailable,this.newDoctorSpecialty,this.newDoctorAddress,this.newDoctorPhone, this.newDoctorEmail)  .then(doctors => this.ngOnInit());
    }

    getDoctor(doctor){

        if(doctor)

            this.doctorService.getDoctor(doctor).then(singleDoctor => this.singleDoctor = singleDoctor);

    }


    deleteDoctor(doctor){

        if(doctor)
            this.doctorService.deleteDoctor(doctor).then(doctors => this.ngOnInit());
    }

    getDoctors(){

        

        this.fullForm   = new FormGroup({

            doctorId            : new FormArray([]),
            doctorName          : new FormArray([]),
            doctorIsAvailable   : new FormArray([]),
            doctorSpecialty     : new FormArray([]),
            doctorAddress       : new FormArray([]),
            doctorPhone         : new FormArray([]),
            doctorEmail         : new FormArray([]),
            //doctors             : new FormArray([]])

        }) 
        
       // (this.fullForm.get('doctors.id') as FormArray).push(new FormControl(this.doctors[0].id) );
        
        //console.log(this.fullForm.get('doctors.id'));
        
        if( this.doctors )
            {
            
                for( var i = 0 ; i < this.doctors.length; i++ )
                {
                    (this.fullForm.get('doctorId') as FormArray).push(new FormControl(this.doctors[i].id) );
                    (this.fullForm.get('doctorName') as FormArray).push(new FormControl(this.doctors[i].name) );
                    (this.fullForm.get('doctorIsAvailable') as FormArray).push(new FormControl(this.doctors[i].isAvailable) );
                    (this.fullForm.get('doctorSpecialty') as FormArray).push(new FormControl(this.doctors[i].specialty) );
                    (this.fullForm.get('doctorAddress') as FormArray).push(new FormControl(this.doctors[i].address) );
                    (this.fullForm.get('doctorPhone') as FormArray).push(new FormControl(this.doctors[i].phone) );
                    (this.fullForm.get('doctorEmail') as FormArray).push(new FormControl(this.doctors[i].email) ); 

                }
            }
        
    }

    saveAllDoctors(){


        for(var i = 0; i < this.doctors.length; i++)
        {

            this.doctor = new Doctor(this.fullForm.value.doctorId[i], this.fullForm.value.doctorName[i], 
                                     this.fullForm.value.doctorIsAvailable[i], this.fullForm.value.doctorSpecialty[i], this.fullForm.value.doctorAddress[i], 
                                     this.fullForm.value.doctorPhone[i], this.fullForm.value.doctorEmail[i]);

            //console.log(this.doctor);
            this.doctorService.addAndUpdateDoctor(this.doctor) .then(doctors => this.ngOnInit());
            
            this.Message = "Updated Succesfully!!!";
            
            //this.doctor = null;
        }
    }

    ngOnInit() {

        this.form   = new FormGroup({

            id            : new FormControl(""),
            name          : new FormControl(""),
            isAvailable   : new FormControl(""),
            specialty     : new FormControl(""),
            address       : new FormControl(""),
            phone         : new FormControl(""),
            email         : new FormControl("")
        });

        //        this.fullForm = new FormGroup({
        //
        //            doctorId            : new FormControl(""),
        //            doctorName          : new FormControl(""),
        //            doctorIsAvailable   : new FormControl(""),
        //            doctorSpecialty     : new FormControl(""),
        //            doctorAddress       : new FormControl(""),
        //            doctorPhone         : new FormControl(""),
        //            doctorEmail         : new FormControl("")
        //        });

        this.singleForm   = new FormGroup({

            singleId            : new FormControl("")
        });

        this.nestedForm = new FormGroup({
            cities: new FormArray([
                new FormControl('SF'),
                new FormControl('NY'),
            ]),
            cities2: new FormArray([
                new FormControl('SsF'),
                new FormControl('NaY'),
            ])
        });

        this.fullForm   = new FormGroup({

            doctorId            : new FormArray([]),
            doctorName          : new FormArray([]),
            doctorIsAvailable   : new FormArray([]),
            doctorSpecialty     : new FormArray([]),
            doctorAddress       : new FormArray([]),
            doctorPhone         : new FormArray([]),
            doctorEmail         : new FormArray([]),
            //doctors             : new FormArray([])


        }) 


        //console.log(this.nestedForm.get('cities2'));



        this.singleDoctor = null;
        this.doctorService.getDoctors().then(doctors => this.doctors = doctors);
        //console.log(this.fullForm.get('doctorId'));

    }

}