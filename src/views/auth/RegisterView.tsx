import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query"
import type { UserRegistrationForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { createAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";


export default function RegisterView() {

  const initialValues: UserRegistrationForm = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      reset()
    }
  })

  const password = watch('password');

  const handleRegister = (formData: UserRegistrationForm) => {
    mutate(formData)
  }

  return (
    <>
      <h1 className="text-5xl font-black text-white">Create Account</h1>
      <p className="text-2xl font-light text-white mt-5">
        Fill the form to {''}
        <span className=" text-fuchsia-500 font-bold"> create account</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-8 p-10  bg-white mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
            htmlFor="email"
          >E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="Your e-mail"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "E-mail is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Name</label>
          <input
            type="name"
            placeholder="Your full name"
            className="w-full p-3  border-gray-300 border"
            {...register("name", {
              required: "Name is required.",
            })}
          />
          {errors.name && (
            <ErrorMessage>{errors.name.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Password</label>

          <input
            type="password"
            placeholder="Enter a password"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "Password is required.",
              minLength: {
                value: 8,
                message: 'Password must have at least 8 characters'
              }
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Repeat Password</label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repeat the password"
            className="w-full p-3  border-gray-300 border"
            {...register("password_confirmation", {
              required: "Repeat Password is required",
              validate: value => value === password || 'Passwords are not equals!'
            })}
          />

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Register account'
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link to={'/auth/login'} className="text-center text-gray-300 font-normal">
          Don you have an account? Click here to login.
        </Link>
        <Link to={'/auth/forgot-password'} className="text-center text-gray-300 font-normal">
          Forgot your password? Click here to reset password.
        </Link>
      </nav>

    </>
  )
}