import {Request, Response} from "express";
import {UserService} from "./user.service.js";
import {CreateUserDTO} from "./user.model.js";


const userService: UserService = new UserService();

export const getAllUsers = async (req: Request, res: Response): Promise<any> => {
    res.status(200).json({
        data: await userService.getAllUsers()
    });
}

export const createUser = async (req: Request<{}, {}, CreateUserDTO>, res: Response): Promise<any> => {
    const response = await userService.updateUserInfo(req.body);
    if (response.error === null) {
        res.status(201).json({
            message: "User updated",
            data: response
        })
    } else {
        res.status(401).json({
            message: "User not updated",
            error: response.error
        })
    }
}

export const getUserByEmail = async (req: Request, res: Response): Promise<any> => {
    res.status(200).json({
        data: await userService.getSingleUser(req.params.email)
    })
}

export const getUserByInfoString = async (req: Request, res: Response): Promise<any> => {
    res.status(200).json({
        data: await userService.getSingleUserByInfoString(req.params.qr_code)
    })
}

export const signupUser = async (req: Request, res: Response): Promise<any> => {
    const {
        email,
        password
    } = req.body
    res.status(200).json({
        data: await userService.signUpUser(email, password)
    })
}

export const loginUser = async (req: Request, res: Response): Promise<any> => {
    const {
        email,
        password
    } = req.body
    res.status(200).json({
        data: await userService.loginUser(email, password)
    })
}