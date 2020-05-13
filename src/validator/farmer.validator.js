import { object, string } from 'yup';

export const FarmerValidator = object().shape({
  firstname: string().required().trim(),
  lastname: string().required().trim(),
  email: string().required().email(),
  password: string().required().min(5),
  phone: string().trim(),
  alternatePhone: string().trim()
});
