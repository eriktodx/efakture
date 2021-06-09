import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing'
import {NotesSelectComponent} from './notes-select.component'

describe('NotesSelectComponent', () => {
  let component: NotesSelectComponent
  let fixture: ComponentFixture<NotesSelectComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NotesSelectComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesSelectComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
