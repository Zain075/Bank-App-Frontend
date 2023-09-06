import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAccnoComponent } from './delete-accno.component';

describe('DeleteAccnoComponent', () => {
  let component: DeleteAccnoComponent;
  let fixture: ComponentFixture<DeleteAccnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteAccnoComponent]
    });
    fixture = TestBed.createComponent(DeleteAccnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
