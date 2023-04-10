import { useState, useContext, useEffect } from 'react'

import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CourseContext } from '../../contexts/CoursesContext'
import { Course } from '../../reducers/reducers'

const cursoFormValidationSchema = zod.object({
  id: zod.number().optional(),
  pessoaInstrutora: zod.string().min(1, 'Campo requirido!'),
  perfilGithub: zod.string().min(1, 'Campo requirido'),
  nome: zod.string().min(1, 'Campo requirido'),
  preco: zod.number().min(1, 'Campo requirido'),
})

export type CursoFormData = zod.infer<typeof cursoFormValidationSchema>

interface UpdatedCourseFormsProps {
  course: Course
}

export function UpdatedCourseForm({ course }: UpdatedCourseFormsProps) {
  const { updateCourse } = useContext(CourseContext)
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false)
  const modalId = `modal-update-${course.id}`

  const cursoFormData = useForm<CursoFormData>({
    resolver: zodResolver(cursoFormValidationSchema),
  })

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = cursoFormData

  async function handleUpdateCourse(data: CursoFormData) {
    data.id = course.id

    updateCourse(data)
    setIsOpenModalUpdate(false)
  }

  useEffect(() => {
    setValue('nome', course.nome)
    setValue('perfilGithub', course.perfilGithub)
    setValue('pessoaInstrutora', course.pessoaInstrutora)
    setValue('preco', course.preco)
  }, [])

  return (
    <>
      <input
        type="checkbox"
        checked={isOpenModalUpdate}
        id={modalId}
        className="modal-toggle"
        onChange={() => setIsOpenModalUpdate(!isOpenModalUpdate)}
      />
      <div className="modal">
        <div className="modal-box w-11/12 h-5/6 max-w-5xl">
          <label
            htmlFor={modalId}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="flex flex-col">
            <h3 className="font-bold text-3xl mb-10">Atualizar curso</h3>
            <form
              className="flex flex-col gap-5 justify-self-center"
              onSubmit={handleSubmit(handleUpdateCourse)}
            >
              <div className="w-full">
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text">Pessoa instrutora</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Nome"
                    className="input input-bordered w-full"
                    {...register('pessoaInstrutora')}
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text">Link Imagem github</span>
                  </label>
                  <input
                    type="text"
                    placeholder="https://github.com/MarcosMDev.png"
                    className="input input-bordered w-full"
                    {...register('perfilGithub')}
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text">Nome do curso</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Nome"
                    className="input input-bordered w-full"
                    {...register('nome')}
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text">Preço do curso</span>
                  </label>
                  <input
                    type="number"
                    placeholder="500"
                    className="input input-bordered w-full"
                    {...register('preco')}
                  />
                </div>
              </div>
              <button className="btn btn-block btn-success " type="submit">
                Atualizar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
