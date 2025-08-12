import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';

type DeleteTripResponse = { message: string; deletedTrip: Trip };

@Injectable({
  providedIn: 'root'
})

export class TripData {
  
    constructor(private http: HttpClient) { }

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
