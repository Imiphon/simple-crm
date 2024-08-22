import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditHeadComponent } from './dialog-edit-head.component';

describe('DialogEditHeadComponent', () => {
  let component: DialogEditHeadComponent;
  let fixture: ComponentFixture<DialogEditHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditHeadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
