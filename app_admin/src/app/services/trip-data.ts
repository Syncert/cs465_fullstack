import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user'; 
import { AuthResponse } from '../models/auth-response'; 
import { BROWSER_STORAGE } from '../storage'; 

import { Trip } from '../models/trip';

type DeleteTripResponse = { message: string; deletedTrip: Trip };

@Injectable({
  providedIn: 'root'
})

export class TripData {
  
    constructor( 
    private http: HttpClient, 
    @Inject(BROWSER_STORAGE) private storage: Storage 
    ) {}

    //AUTH API Calls//
    baseUrl = 'http://localhost:3000/api'; 

    // Call to our /login endpoint, returns JWT 
    login(user: User, passwd: string) : Observable<AuthResponse> { 
    // console.log('Inside TripDataService::login'); 
    return this.handleAuthAPICall('login', user, passwd); 
    } 

    // Call to our /register endpoint, creates user and returns JWT 
    register(user: User, passwd: string) : Observable<AuthResponse> { 
    // console.log('Inside TripDataService::register'); 
    return this.handleAuthAPICall('register', user, passwd); 
    } 

    // helper method to process both login and register methods 
    handleAuthAPICall(endpoint: string, user: User, passwd: string) : 
    Observable<AuthResponse> { 
    // console.log('Inside TripDataService::handleAuthAPICall'); 
    let formData = { 
    name: user.name, 
    email: user.email, 
    password: passwd 
    }; 

    return this.http.post<AuthResponse>(this.baseUrl + '/' + endpoint, 
    formData); 
    } 


    //TRIP DATA API Calls//
    url = 'http://localhost:3000/api/trips/';

    // GET /trips -> Trip[]
    getTrips(): Observable<Trip[]> {
        //console.log('Inside TripData::getTrips');
      return this.http.get<Trip[]>(this.url)
    }

    // POST /trips -> Trip
    addTrip(formData: Trip): Observable<Trip> {
      //console.log('Inside TripData::addTrip');
      return this.http.post<Trip>(this.url, formData);
    }

    // GET /trips/:code -> Trip   (use findOne on the server)
    getTrip(tripCode: string) : Observable<Trip> {
      //console.log('Inside TripData::getTrip');
      return this.http.get<Trip>(this.url + tripCode);
    }

    // PUT /trips/:code -> Trip
    updateTrip(formData: Trip): Observable<Trip> {
      //console.log('Inside TripData::addTrip');
      return this.http.put<Trip>(this.url + formData.code, formData);
    }

    // DELETE /trips/:code -> { message, deletedTrip }
    deleteTrip(tripCode: string): Observable<DeleteTripResponse> {
      //console.log('Inside TripData::deleteTrip');
      return this.http.delete<DeleteTripResponse>(this.url + tripCode)
    }

  }
