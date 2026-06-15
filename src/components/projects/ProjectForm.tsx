import type { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import type { ProjectFormData } from "types";

type ProjectFormProps = {
  register: UseFormRegister<ProjectFormData>
  errors: FieldErrors<ProjectFormData>
}

export default function ProjectForm({ errors, register }: ProjectFormProps) {
  return (
    <>
      <div className="mb-5 space-y-3">
        <label htmlFor="projectName" className="text-sm uppercase font-bold">
          Project Name
        </label>
        <input
          id="projectName"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Project Name"
          {...register("projectName", {
            required: "Title is mandatory",
          })}
        />

        {errors.projectName && (
          <ErrorMessage>{errors.projectName.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="clientName" className="text-sm uppercase font-bold">
          Client Name / Company
        </label>
        <input
          id="clientName"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Client Name / Company"
          {...register("clientName", {
            required: "Client name is mandatory",
          })}
        />

        {errors.clientName && (
          <ErrorMessage>{errors.clientName.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="description" className="text-sm uppercase font-bold">
          Description
        </label>
        <textarea
          id="description"
          className="w-full p-3  border border-gray-200"
          placeholder="Project description"
          {...register("description", {
            required: "Project description is mandatory"
          })}
        />

        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>
    </>
  )
}