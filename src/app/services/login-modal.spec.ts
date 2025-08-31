import { TestBed } from '@angular/core/testing';

import { LoginModal } from './login-modal';

describe('LoginModal', () => {
  let service: LoginModal;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginModal);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
