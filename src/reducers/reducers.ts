import { ActionTypes, CourseActionProps } from './actions'

export interface Course {
  id?: number
  nome: string
  pessoaInstrutora: string
  perfilGithub: string
  preco: number
}

interface CourseState {
  courses: Course[]
}

export function coursesReducer(
  state: CourseState,
  action: CourseActionProps,
): CourseState {
  switch (action.type) {
    case ActionTypes.CREATE_NEW_COURSE: {
      const newCourse = action.payload.newCourse
      const newState = [...state.courses, newCourse]
      return {
        courses: newState,
      }
    }

    case ActionTypes.LIST_COURSES: {
      const courses = action.payload.courses

      return {
        courses,
      }
    }

    case ActionTypes.UPDATE_COURSE: {
      const updatedCourse = action.payload.updatedCourse
      const updatedState = state.courses.map((course) => {
        if (course.id === updatedCourse.id) {
          return updatedCourse
        }
        return course
      })
      return {
        courses: updatedState,
      }
    }

    case ActionTypes.DELETE_COURSE: {
      const courseId = action.payload.courseId
      const filteredState = state.courses.filter(
        (course) => course.id !== courseId,
      )
      return {
        courses: filteredState,
      }
    }

    default:
      return state
  }
}
