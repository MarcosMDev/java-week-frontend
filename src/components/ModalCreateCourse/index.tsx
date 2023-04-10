import { useState, useContext } from 'react'

import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CourseContext } from '../../contexts/CoursesContext'

const cursoFormValidationSchema = zod.object({
  id: zod.number().optional(),
  pessoaInstrutora: zod.string().min(1, 'Campo requirido!'),
  perfilGithub: zod.string().min(1, 'Campo requirido'),
  nome: zod.string().min(1, 'Campo requirido'),
  preco: zod.string().min(1, 'Campo requirido'),
})

export type CursoFormData = zod.infer<typeof cursoFormValidationSchema>

export function CreateCourseForm() {
  const { createNewCourse } = useContext(CourseContext)
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false)

  const cursoFormData = useForm<CursoFormData>({
    resolver: zodResolver(cursoFormValidationSchema),
  })

  const { handleSubmit, register, reset, formState } = cursoFormData

  function handleCreateCourse(data: CursoFormData) {
    createNewCourse(data)
    setIsOpenModalCreate(false)
    reset()
  }

  return (
    <>
      <input
        type="checkbox"
        checked={isOpenModalCreate}
        id="modal-create"
        className="modal-toggle"
        onChange={() => setIsOpenModalCreate(!isOpenModalCreate)}
      />
      <div className="modal">
        <div className="modal-box w-11/12 h-5/6 max-w-5xl">
          <label
            htmlFor="modal-create"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="flex flex-col">
            <h3 className="font-bold text-3xl mb-10">
              Adicionar um novo curso
            </h3>
            <form
              className="flex flex-col gap-5 justify-self-center"
              onSubmit={handleSubmit(handleCreateCourse)}
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
                Criar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
