import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInWithEmailVerifyComponent } from './sign-in-with-email-verify.component';

describe('SignInWithEmailVerifyComponent', () => {
  let component: SignInWithEmailVerifyComponent;
  let fixture: ComponentFixture<SignInWithEmailVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInWithEmailVerifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInWithEmailVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
