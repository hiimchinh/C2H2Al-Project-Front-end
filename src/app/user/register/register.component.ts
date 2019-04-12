import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BlogService} from '../../services/blog.service';
import {ErrorInterface} from '../../error-interface';
import {TokenService} from '../../services/token.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    error: [''] = [''];

    constructor(private fb: FormBuilder,
                private blogService: BlogService,
                private token: TokenService,
                private router: Router,
                private auth: AuthService) {
    }

    ngOnInit() {
        this.registerForm = this.fb.group({
            email: ['', [Validators.email, Validators.required]],
            name: ['', [Validators.required, Validators.minLength(6)]],
            password: ['', Validators.required],
            password_confirmation: ['', Validators.required]
        });
    }

    register() {
        const {value} = this.registerForm;
        this.blogService.register(value).subscribe(
            data => this.handleResponse(data),
            error => console.log(this.handleError(error))
        );
    }

    handleError(error) {
        this.error = error.error.errors;
    }
    handleResponse(data) {
        console.log(data);
        this.token.handle(data.access_token);
        this.auth.changeAuthStatus(true);
        this.router.navigateByUrl('/home');
    }
}
