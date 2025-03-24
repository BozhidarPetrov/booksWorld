import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './core/components/footer/footer.component';
import { LogoComponent } from './shared/components/logo/logo.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { Store } from '@ngrx/store';
import {
  selectIsLoading,
  selectIsSubmitting,
  selectUser,
  selectValidationErrors,
} from './auth/store/reducers';
import { AuthService } from './auth/auth-service.service';
import { combineLatest } from 'rxjs';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FooterComponent,
    LogoComponent,
    NavbarComponent,
    ModalModule,
  ],
  providers: [BsModalService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'booksWorld';

  logoTitle: string = 'Book World';

  data$ = combineLatest({
    user: this.store.select(selectUser),
    isLoading: this.store.select(selectIsLoading),
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  constructor(private store: Store, private authService: AuthService) {}
}
