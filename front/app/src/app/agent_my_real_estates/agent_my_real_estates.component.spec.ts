import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentMyRealEstatesComponent } from './agent_my_real_estates.component';

describe('AgentMyRealEstatesComponent', () => {
  let component: AgentMyRealEstatesComponent;
  let fixture: ComponentFixture<AgentMyRealEstatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentMyRealEstatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentMyRealEstatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
