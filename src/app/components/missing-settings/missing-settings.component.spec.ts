import {ComponentFixture, TestBed} from '@angular/core/testing'
import {MissingSettingsComponent} from './missing-settings.component'

describe('MissingSettingsComponent', () => {
  let component: MissingSettingsComponent
  let fixture: ComponentFixture<MissingSettingsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MissingSettingsComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingSettingsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
