import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing'
import {EmployeesEditComponent} from './employees-edit.component'

describe('EmployeesEditComponent', () => {
  let component: EmployeesEditComponent
  let fixture: ComponentFixture<EmployeesEditComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeesEditComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
