import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as Base from "./config.js";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient  ) { }
}
