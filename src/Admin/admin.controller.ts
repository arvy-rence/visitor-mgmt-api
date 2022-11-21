import {Request, Response} from "express";
import {AdminService} from "./admin.service.js";
import {CreateAdminDTO} from "./admin.model.js";


const adminService: AdminService = new AdminService();

export const getAllAdmin = async (req: Request, res: Response): Promise<any> => {
    res.status(200).json({
        data: await adminService.getAllAdmins()
    });
}

export const createAdmin = async (req: Request<{}, {}, CreateAdminDTO>, res: Response): Promise<any> => {
    const response = await adminService.createAdmin(req.body);
    if (response.error === null) {
        res.status(201).json({
            message: "Admin created",
        })
    } else {
        res.status(401).json({
            message: "Admin not created",
            error: response.error
        })
    }
}

export const getAdminByUsername = async (req: Request, res: Response): Promise<any> => {
    res.status(200).json({
        data: await adminService.getSingleAdmin(req.params.username)
    })
}