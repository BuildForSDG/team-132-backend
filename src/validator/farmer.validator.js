import { object, string } from 'yup';

export const FarmerValidator = object().shape({
  firstname: string().required().trim(),
  lastname: string().required().trim(),
  email: string().required().email(),
  password: string().required().min(5),
  phone: string().trim(),
  idNumber: string().trim(),
  alternatePhone: string().trim(),
  role: string()
    .transform((value) => {
      const res = this && this.isType(value) && value !== null ? value.toLowerCase() : value;
      return res;
    })
    .oneOf(['farmer', 'insurance-company', 'agro-chemical-company', 'go-organic-company', 'buyer'])
    .default('farmer')
});
