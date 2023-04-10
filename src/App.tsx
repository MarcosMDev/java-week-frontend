import { useContext } from 'react'

import { createPortal } from 'react-dom'
import { Trash, Pencil, Plus } from 'phosphor-react'

import { CourseContext } from './contexts/CoursesContext'
import { CreateCourseForm } from './components/ModalCreateCourse'
import { UpdatedCourseForm } from './components/ModalUpdateCourse'

function App() {
  const { courses, loading, deleteCourse } = useContext(CourseContext)

  function handledeleteCourse(id: number) {
    deleteCourse(id)
  }

  return (
    <main className="container mx-auto flex flex-col h-screen ">
      {createPortal(<CreateCourseForm />, document.body)}
      <header className="my-20">
        <h1 className="text-5xl font-bold">
          Java<span className="text-green-900">Week</span> Cursos
        </h1>
      </header>
      <div className="overflow-x-auto overflow-y-hidden w-full flex flex-col gap-5">
        <label
          className="btn btn-square btn-success self-end"
          htmlFor="modal-create"
          title="Adicionar"
        >
          <Plus size={24} className="text-white" />
        </label>
        <table className="table w-full">
          <thead>
            <tr>
              <th>Pessoa instrutora</th>
              <th>Curso</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>
          {loading ? (
            <tr className="h-60">
              <td colSpan={4}>
                <div className="flex justify-center items-center h-full">
                  <p className="text-gray-400">Carregando . . .</p>
                </div>
              </td>
            </tr>
          ) : courses.length > 0 ? (
            <tbody className="overflow-y-scroll ">
              {courses.map((course) => (
                <tr key={course.id}>
                  {createPortal(
                    <UpdatedCourseForm course={course} />,
                    document.body,
                  )}
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={course.perfilGithub} alt="" />
                        </div>
                      </div>
                      <div>
                        <span className="font-bold">
                          {course.pessoaInstrutora}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    {course.nome}
                    <br />
                  </td>
                  <td>R${course.preco}</td>
                  <th className="flex gap-5 items-center ">
                    <label
                      title="Editar"
                      htmlFor={`modal-update-${course.id}`}
                      className="btn btn-square btn-info"
                    >
                      <Pencil size={24} className="text-white" />
                    </label>
                    <button
                      title="Excluir"
                      className="btn btn-square btn-error"
                      onClick={() => handledeleteCourse(course.id ?? 0)}
                    >
                      <Trash size={24} className="text-white" />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          ) : (
            <tr className="h-60">
              <td colSpan={4}>
                <div className="flex justify-center items-center h-full">
                  <p className="text-gray-400">Sem Registros</p>
                </div>
              </td>
            </tr>
          )}

          <tfoot>
            <tr>
              <th>Pessoa instrutora</th>
              <th>Curso</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </main>
  )
}

export default App
