import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClicLocationPage } from './clic-location.page';

describe('ClicLocationPage', () => {
  let component: ClicLocationPage;
  let fixture: ComponentFixture<ClicLocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClicLocationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClicLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
