import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import * as courseActions from '../actions/courseActions';
import initialState from '../reducers/initialState';

describe('Store', () => {
  it('Should handle creating courses', () => {
    const store = createStore(rootReducer, initialState);
    const course = {
      title: "Clean Code"
    };

    const action = courseActions.createCourseSuccess(course);
    store.dispatch(action);

    const actual = store.getState().courses[0];
    expect(actual).toEqual(course);
  });

  it('Should handle deleting courses', () => {
    const store = createStore(rootReducer, initialState);
    const course = {
      title: "Clean Code"
    };

    const action = courseActions.deleteCourseSuccess(course);
    store.dispatch(action);

    const courseLength = store.getState().courses.length;
    expect(courseLength).toEqual(0);
  });
});
