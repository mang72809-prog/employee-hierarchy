import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PositionTreeComponent } from './position-tree';  // ✅ FIX: import the correct class

describe('PositionTreeComponent', () => {
  let component: PositionTreeComponent;
  let fixture: ComponentFixture<PositionTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionTreeComponent] // ✅ FIX: use correct class here
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionTreeComponent); // ✅ FIX
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
