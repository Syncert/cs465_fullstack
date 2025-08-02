import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';


@Injectable({
  providedIn: 'root'
})

export class TripData {
  
    constructor(private http: HttpClient) { }

    url = 'http://localhost:3000/api/trips/';

    // Get all trips from the API endpoint.
    getTrips(): Observable<Trip[]> {
        //console.log('Inside TripData::getTrips');
      return this.http.get<Trip[]>(this.url)
    }

    //Add Trips
    addTrip(formData: Trip): Observable<Trip> {
      //console.log('Inside TripData::addTrip');
      return this.http.post<Trip>(this.url, formData);
    }

    //Get single trip
    getTrip(tripCode: string) : Observable<Trip[]> {
      //console.log('Inside TripData::getTrips');
      return this.http.get<Trip[]>(this.url + tripCode);
    }

    //Update Trip
    updateTrip(formData: Trip): Observable<Trip> {
      //console.log('Inside TripData::addTrip');
      return this.http.put<Trip>(this.url + formData.code, formData);
    }

  }
