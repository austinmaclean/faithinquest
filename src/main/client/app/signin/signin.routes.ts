import { AuthGuard }          from '../shared/auth/auth.guard';
import { AccountService }        from '../shared/service/account.service';
import { SignInComponent }     from './signin.component';

export const SignInRoutes = [
    { path: 'login', component: SignInComponent }
];

export const AUTH_PROVIDERS = [AuthGuard, AccountService];