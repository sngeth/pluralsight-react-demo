import expect from 'expect';
import * as courseActions from './courseActions';
import * as types from './actionTypes';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

describe('Course Actions', () => {
  describe('createCourseSuccess', () => {
    it('should create a CREATE_COURSE_SUCCESS action', () => {
      const course = {id: 'clean-code', title: 'Clean Code'};
      const expectedAction = {
        type: types.CREATE_COURSE_SUCCESS,
        course: course
      };

      const action = courseActions.createCourseSuccess(course);

      expect(action).toEqual(expectedAction);
    });
  });

  describe('deleteCourseSuccess', () => {
    it('should create a DELETE_COURSE_SUCCESS action', () => {
      const course = {id: 'clean-code', title: 'Clean Code'};

      const expectedAction = {
        type: types.DELETE_COURSE_SUCCESS,
        course: course
      };

      const action = courseActions.deleteCourseSuccess(course);

      expect(action).toEqual(expectedAction);
    });
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should create BEGIN_AJAX_CALL and LOAD_COURSES_SUCCESS', (done) => {
    // nock('http://example.com')
    //   .get('/courses')
    //   .reply(200, {body:{course:[{id:1, firstName: 'Cory', lastName: 'House'}]}})

    const expectedActions = [
      {type: types.BEGIN_AJAX_CALL},
      {type: types.LOAD_COURSES_SUCCESS, body: {courses: [{id: 'clean-code',
        title: 'Clean Code'}]}}
    ];

    const store = mockStore({courses: []}, expectedActions);
    store.dispatch(courseActions.loadCourses()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);
      done();
    });
  });

  it('should create DELETE_COURSE_SUCCESS', (done) => {
    const course = {'id:': '1', title: 'A'};

    const expectedActions = [
      {type: types.BEGIN_AJAX_CALL},
      {type: types.DELETE_COURSE_SUCCESS }
    ];

    const store = mockStore({courses: []}, expectedActions);
    store.dispatch(courseActions.deleteCourse(course)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actions[1].type).toEqual(types.DELETE_COURSE_SUCCESS);
      done();
    });
  });
});
