import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionList } from './position-list';

describe('PositionList', () => {
  let component: PositionList;
  let fixture: ComponentFixture<PositionList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
