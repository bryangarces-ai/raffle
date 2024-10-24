import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaffledrawComponent } from './raffledraw.component';

describe('RaffledrawComponent', () => {
  let component: RaffledrawComponent;
  let fixture: ComponentFixture<RaffledrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaffledrawComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaffledrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
