import { Admin } from "../../entity/admin";

export interface AdminRepositoryInterface {
    getAllAdmin(): Promise<Admin[]>;
    getAdminById(id: number): Promise<Admin|null>;
    getAdminByEmail(email: string): Promise<Admin|null>;
    createAdmin(admin: Admin): Promise<Admin>;
    updateAdmin(admin: Admin): Promise<Admin>;
    updateAdminWithoutPassword(admin: Admin): Promise<Admin>;
    deleteAdmin(id: number): Promise<Admin>;
}