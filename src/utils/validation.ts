import { z } from "zod";

const passwordValidation = new RegExp(
  /^(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

export const FormLoginValidation = z.object({
  email : z.string({message: "Email is required"}).email(),
  password : z.string({message: "Password is required"}),
});

export const FormRegisterValidation = z.object({
  name : z.string({message: "Name is required"}),
  email : z.string({message: "Email is required"}).email(),
  password : z.string({message: "Password is required"}).min(8)
    .regex(passwordValidation, {message: 'Password must have number and special character'}),
  confirmationPassword : z.string({message: "Confirmation Password is required"}).min(8),
}).refine((data) => data.password === data.confirmationPassword, {
  message: "Passwords don't match",
  path: ["confirmationPassword"],
});