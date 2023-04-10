import { Course } from './reducers'

export enum ActionTypes {
  CREATE_NEW_COURSE = 'CREATE_NEW_COURSE',
  LIST_COURSES = 'LIST_COURSES',
  UPDATE_COURSE = 'UPDATE_COURSE',
  DELETE_COURSE = 'DELETE_COURSE',
}

interface CreateNewCourseActionProps {
  type: ActionTypes.CREATE_NEW_COURSE
  payload: { newCourse: Course }
}

interface ListCoursesActionProps {
  type: ActionTypes.LIST_COURSES
  payload: { courses: Course[] }
}

interface UpdateCourseActionProps {
  type: ActionTypes.UPDATE_COURSE
  payload: { updatedCourse: Course }
}

interface DeleteCourseActionProps {
  type: ActionTypes.DELETE_COURSE
  payload: { courseId: number }
}

export type CourseActionProps =
  | CreateNewCourseActionProps
  | ListCoursesActionProps
  | UpdateCourseActionProps
  | DeleteCourseActionProps

export function createNewCourseAction(
  newCourse: Course,
): CreateNewCourseActionProps {
  return {
    type: ActionTypes.CREATE_NEW_COURSE,
    payload: {
      newCourse,
    },
  }
}

export function listCoursesAction(courses: Course[]): ListCoursesActionProps {
  return {
    type: ActionTypes.LIST_COURSES,
    payload: {
      courses,
    },
  }
}

export function updateCourseAction(
  updatedCourse: Course,
): UpdateCourseActionProps {
  return {
    type: ActionTypes.UPDATE_COURSE,
    payload: {
      updatedCourse,
    },
  }
}

export function deleteCourseAction(courseId: number): DeleteCourseActionProps {
  return {
    type: ActionTypes.DELETE_COURSE,
    payload: {
      courseId,
    },
  }
}
