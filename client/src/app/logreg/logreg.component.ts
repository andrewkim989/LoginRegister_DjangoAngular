import { Component, OnInit } from '@angular/core';
import { LoginService } from "../login.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-logreg',
  templateUrl: './logreg.component.html',
  styleUrls: ['./logreg.component.css']
})
export class LogregComponent implements OnInit {
  register: any;
  regError: boolean = false;
  regData: any;
  strength: string;
  login: any;
  logError: boolean = false;
  logData: any;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.register = {name: "", email: "", password: "", password_confirm: ""};
    this.login = {email: "", password: ""};
    this.strength = "none";
  }

  registerUser() {
    let r = this.loginService.register({name: this.register.name, email: this.register.email,
      password: this.register.password, password_confirm: this.register.password_confirm});
    r.subscribe(data => {
      this.regData = data;
      if (this.regData.error) {
        this.regError = true;
      }
      else {
        this.regError = false;
        localStorage.setItem("data", JSON.stringify(data));
        this.register = {name: "", email: "", password: "", password_confirm: ""};
        this.router.navigate(["/home"]);
      }
    });
  }

  passStrength(p) {
    let strongRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{5,})|" +
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{5,})");
    let goodRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.{5,})|(?=.*[a-z])(?=.*[0-9])(?=.{5,})|" +
      "(?=.*[0-9])(?=.*[A-Z])(?=.{5,})|(?=.*[a-z])(?=.*[!@#\$%\^&\*])(?=.{5,})|" + 
      "(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{5,})|(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{5,})");
    let fairRegex = new RegExp("^(?=.*[a-z])(?=.{5,})|(?=.*[A-Z])(?=.{5,})|(?=.*[0-9])(?=.{5,})|" +
      "(?=.*[!@#\$%\^&\*])(?=.{5,})");
    if (strongRegex.test(p)) {
      this.strength = "strong";
    }
    else if (goodRegex.test(p)) {
      this.strength = "good";
    }
    else if (fairRegex.test(p)) {
      this.strength = "fair";
    }
    else if (p != "") {
      this.strength = "weak";
    }
    else {
      this.strength = "none";
    }
  }

  loginUser() {
    let l = this.loginService.login({email: this.login.email, password: this.login.password});
    l.subscribe(data => {
      this.logData = data;
      if (this.logData.error) {
        this.logError = true;
      }
      else {
        this.logError = false;
        localStorage.setItem("data", JSON.stringify(data));
        this.login = {email: "", password: ""};
        this.router.navigate(["/home"]);
      }
    })
  }
}