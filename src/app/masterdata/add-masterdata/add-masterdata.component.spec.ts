import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMasterdataComponent } from './add-masterdata.component';

describe('AddMasterdataComponent', () => {
  let component: AddMasterdataComponent;
  let fixture: ComponentFixture<AddMasterdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMasterdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMasterdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
