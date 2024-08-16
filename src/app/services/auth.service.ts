import { Observable, of } from 'rxjs';

export class AuthService {

  constructor() {}

  isAuthenticated(): Observable<boolean> {
    const isLoggedIn = !!localStorage.getItem('token');
    return of(isLoggedIn);
  }
  login(username: string, password: string): Observable<boolean> {
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('token', 'your-token');
      return of(true);
    } else {
      return of(false);
    }
  }
  logout(): void {
    localStorage.removeItem('token');
  }
}
