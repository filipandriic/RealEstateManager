import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentHomeComponent } from './agent_home.component';

describe('AgentHomeComponent', () => {
  let component: AgentHomeComponent;
  let fixture: ComponentFixture<AgentHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
