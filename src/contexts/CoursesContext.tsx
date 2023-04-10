import {
  useState,
  ReactNode,
  useEffect,
  useReducer,
  createContext,
} from 'react'
import { Course, coursesReducer } from '../reducers/reducers'
import {
  createNewCourseAction,
  deleteCourseAction,
  listCoursesAction,
  updateCourseAction,
} from '../reducers/actions'
import { api } from '../lib/axios'

interface CourseContextType {
  courses: Course[]
  loading: boolean
  createNewCourse: (course: Course) => void
  deleteCourse: (courseId: number) => void
  updateCourse: (course: Course) => void
  getCourse: (courseId: number) => Promise<Course | undefined>
}

export const CourseContext = createContext({} as CourseContextType)

interface CourseContextProviderProps {
  children: ReactNode
}

export function CourseContextProvider({
  children,
}: CourseContextProviderProps) {
  const [courseState, dispatch] = useReducer(coursesReducer, { courses: [] })

  const [loading, setLoading] = useState(false)

  const { courses } = courseState

  async function getCourse(courseId: number) {
    try {
      setLoading(true)
      const response = await api.get(`/cursos/${courseId}`)

      return response.data as Course
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  async function fetchCourses() {
    try {
      setLoading(true)

      const response = await api.get('/cursos')

      dispatch(listCoursesAction(response.data))
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  async function createNewCourse(course: Course) {
    try {
      setLoading(true)
      const newCourse: Course = course

      await api.post('/cursos', course)

      dispatch(createNewCourseAction(newCourse))
      fetchCourses()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function updateCourse(course: Course) {
    try {
      setLoading(true)
      await api.put(`/cursos/${course.id}`, {
        nome: course.nome,
        pessoaInstrutora: course.pessoaInstrutora,
        preco: course.preco,
        perfilGithub: course.perfilGithub,
      })
      dispatch(updateCourseAction(course))
      fetchCourses()
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  async function deleteCourse(courseId: number) {
    try {
      setLoading(true)

      await api.delete(`/cursos/${courseId}`)

      dispatch(deleteCourseAction(courseId))
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  return (
    <CourseContext.Provider
      value={{
        courses,
        loading,
        getCourse,
        deleteCourse,
        updateCourse,
        createNewCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  )
}
