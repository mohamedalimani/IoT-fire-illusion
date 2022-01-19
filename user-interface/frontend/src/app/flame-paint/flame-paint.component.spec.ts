import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlamePaintComponent } from './flame-paint.component';

describe('FlamePaintComponent', () => {
  let component: FlamePaintComponent;
  let fixture: ComponentFixture<FlamePaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlamePaintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlamePaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
