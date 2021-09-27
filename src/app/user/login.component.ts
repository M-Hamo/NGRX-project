import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { filter, map, tap } from "rxjs/operators";

import { AuthService } from "./auth.service";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  pageTitle = "Log In";

  // Declarative abroach
  maskUserName$: Observable<boolean> = this._store.select("users").pipe(
    filter((users) => !!users),
    map((users: any) => users.maskUserName)
  );

  constructor(
    private authService: AuthService,
    private router: Router,
    private _store: Store<any>
  ) {}

  ngOnInit(): void {}

  cancel(): void {
    this.router.navigate(["welcome"]);
  }

  checkChanged(): void {
    this._store.dispatch({
      type: "[User] MaskUserName",
    });
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
