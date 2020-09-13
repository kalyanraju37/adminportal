import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditPositionComponent } from './audit-position.component';

describe('AuditPositionComponent', () => {
  let component: AuditPositionComponent;
  let fixture: ComponentFixture<AuditPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
