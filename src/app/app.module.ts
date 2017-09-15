import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { AppComponent } from './app.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorService } from './doctor.service';
import { PatientsComponent } from './patients/patients.component';
import { PatientService } from './patient.service';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
    { path: 'doctors', component: DoctorsComponent },
    { path: 'patients', component: PatientsComponent },
    { path: ' ', component: HomeComponent },
];


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        AppComponent,
        DoctorsComponent,
        PatientsComponent,
        HomeComponent
    ],
    bootstrap: [AppComponent],
    providers: [DoctorService,PatientService],
})
export class AppModule { }