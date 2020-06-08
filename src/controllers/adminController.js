import { AdminService } from '../services/admin.service';
import { insuranceValidator } from '../validator/admin.validator';
import Insurance from '../models/insuranceCompany';

export class AdminController {
  // register insurance company
  static async registerInsurance(req, res, next) {
    try {
      const input = req.body;
      const cleanInput = await insuranceValidator.validate(input, { abortEarly: false });
      const result = await AdminService.addInsuranceCompany(cleanInput);

      if (!result) return res.status(400).send({ success: false, message: 'Company with email already exists' });
      return res.status(200).send({
        status: true,
        message: 'Insurance company added successfully'
      });
    } catch (err) {
      if (err.errors) {
        return res.status(422).json({ error: err.errors });
      }
      return next(err);
    }
  }

  // get all insurance companies
  static async getAllInsuranceCompanies(req, res, next) {
    try {
      const companies = await Insurance.find({});
      return res.status(200).json({
        status: 'success',
        message: 'Companies returned successfully',
        data: companies
      });
    } catch (error) {
      return next(error);
    }
  }

  // view a single company
  static async getSingleCompany(req, res) {
    let company;
    try {
      company = await Insurance.findById(req.params.id);
    } catch (e) {
      return res.status(404).json({
        status: false,
        Message: 'Wrong id passed, No company found'
      });
    }

    if (!company) {
      return res.status(404).json({
        status: false,
        Message: 'Company with this id not found'
      });
    }

    return res.status(200).json({
      status: 'success',
      Message: 'Company retrieved successfully',
      company
    });
  }

  // delete insurance company
  static async deleteCompany(req, res, next) {
    try {
      const company = await Insurance.findByIdAndDelete(req.params.id);
      if (!company) {
        return res.status(404).json({
          status: false,
          Message: 'Company with this id not found'
        });
      }
      await company.remove();

      return res.status(204).json({
        status: true,
        Message: 'Company deleted successfully'
      });
    } catch (e) {
      return next(e);
    }
  }
}
