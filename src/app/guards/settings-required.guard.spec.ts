import { TestBed } from '@angular/core/testing'

import { SettingsRequiredGuard } from './settings-required.guard'

describe('SettingsRequiredGuard', () => {
  let guard: SettingsRequiredGuard

  beforeEach(() => {
    TestBed.configureTestingModule({})
    guard = TestBed.inject(SettingsRequiredGuard)
  })

  it('should be created', () => {
    expect(guard).toBeTruthy()
  })
})
