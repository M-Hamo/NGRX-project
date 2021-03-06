import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { AuthService } from "./auth.service";
import { getMaskUserName, State } from "./satate-manager/user.reducer";
import * as UserAction from "./satate-manager/user.action";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  pageTitle = "Log In";

  // Declarative abroach
  maskUserName$: Observable<boolean> = this._store.select(getMaskUserName);

  constructor(
    private authService: AuthService,
    private router: Router,
    private _store: Store<State>
  ) {}

  ngOnInit(): void {}

  cancel(): void {
    this.router.navigate(["welcome"]);
  }

  checkChanged(): void {
    this._store.dispatch(UserAction.maskUserName());
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(["/products"]);
      }
    }
  }
}
