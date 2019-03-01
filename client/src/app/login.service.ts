import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private _http: HttpClient) { }

  register(reg) {
    return this._http.post("/register", reg);
  }

  login(log) {
    return this._http.post("/login", log);
  }
}
