import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EachRepoComponent } from './each-repo.component';

describe('EachRepoComponent', () => {
  let component: EachRepoComponent;
  let fixture: ComponentFixture<EachRepoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EachRepoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EachRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
