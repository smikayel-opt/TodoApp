import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(() => {
    component = new AppComponent();
  });

  describe('AppComponent', () => {
    it(`should have as title 'todo-list'`, () => {
      expect(component.title).toEqual('todo-list');
    });
  });
});
