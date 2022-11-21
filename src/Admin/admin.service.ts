import client from '../client.js';
import {CreateAdminDTO} from './admin.model.js';
export class AdminService {
    async getAllAdmins() {
        const { data: admin, error } = await client
            .from('admin')
            .select('*')
        if (error === null) {
            return admin
        } else {
            return {
                error: error
            }
        }
    }

    async createAdmin(admin: CreateAdminDTO) {
        try {
            return await client
                .from('admin')
                .insert([
                    {username: admin.username, password: admin.password}
                ])
        } catch (e) {
            return {
                error: e
            }
        }
    }

    async getSingleAdmin(username: string) {
        const { data: admin, error } = await client
            .from('admin')
            .select('*')
            .eq('username', username)
        if (error === null) {
            return admin
        } else {
            return {
                error: error
            }
        }
    }
}