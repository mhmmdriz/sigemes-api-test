import { PrismaClient } from '@prisma/client';
import { RenterRepositoryInterface } from '../../domain/interface/repository/renter';
import { Renter } from '../../domain/entity/renter';

export class RenterRepository implements RenterRepositoryInterface {
    constructor(private prisma: PrismaClient) { }

    public async getRenterById(id: number): Promise<Renter|null> {
        const renter: Renter|null = await this.prisma.renter.findUnique({
            where: { id }
        }) as Renter;

        return renter;
    }

    public async getRenterByEmail(email: string): Promise<Renter|null> {
        const renter:Renter|null = await this.prisma.renter.findUnique({
            where: { email }
        }) as Renter;

        return renter;
    }

    public async createRenter(renter: Renter): Promise<Renter> {
        const newRenter: Renter = await this.prisma.renter.create({
            data: {
                email: renter.email,
                password: renter.password,
                fullname: renter.fullname,
                phoneNumber: renter.phoneNumber,
                gender: renter.gender
            }
        }) as Renter;

        return newRenter;
    }

    public async updateOTP(id: number, otp: string, otpExpiry: Date): Promise<void> {
        await this.prisma.renter.update({
            where: { id },
            data: {
                otp,
                otpExpiry
            }
        });
    }

    public async getRenterOTPByEmail(email: string): Promise<Renter|null> {
        const renter: Renter | null = await this.prisma.renter.findUnique({
            where: { email },
            select: {
                id: true,
                otp: true,
                otpExpiry: true
            },
        }) as Renter;
        
        return renter;
    }

    public async updateEmailVerified(id: number): Promise<void> {
        await this.prisma.renter.update({
            where: { id },
            data: {
                emailVerified: true,
                otp: null,
                otpExpiry: null
            }
        });
    }

    public async updateForgotPasswordVerified(id: number): Promise<void> {
        await this.prisma.renter.update({
            where: { id },
            data: {
                forgotPasswordVerified: true,
                otp: null,
                otpExpiry: null
            }
        });
    }

    public async updatePassword(id: number, password: string): Promise<void> {
        await this.prisma.renter.update({
            where: { id },
            data: {
                password
            }
        });
    }
    
    public async updatePasswordForgotPassword(id: number, password: string): Promise<void> {
        await this.prisma.renter.update({
            where: { id },
            data: {
                password,
                forgotPasswordVerified: false
            }
        });
    }

    public async updateProfile(id: number, renter: Renter): Promise<Renter> {
        const updatedRenter: Renter = await this.prisma.renter.update({
            where: { id },
            data: {
                fullname: renter.fullname,
                phoneNumber: renter.phoneNumber,
                gender: renter.gender,
                profilePicture: renter.profilePicture
            }
        });

        return updatedRenter;
    }
}
