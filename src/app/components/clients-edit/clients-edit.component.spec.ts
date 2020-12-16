import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { ClientsEditComponent } from './clients-edit.component'

describe('ClientsEditComponent', () => {
  let component: ClientsEditComponent
  let fixture: ComponentFixture<ClientsEditComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ClientsEditComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
