import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/common/dto/create-user.dto';
import { Users } from 'src/database/schema/users';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepo: Repository<Users>,
    ) {}
    async createUser(body: CreateUserDTO) {
        try {
            const user = this.userRepo.create({
                email: body.email,
                password: body.password,
                name: body.name,
                role: body.role,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            return await this.userRepo.save(user);
        } catch (error) {
            if (error.code === '23505') {
                throw new HttpException(
                    { message: 'Email already exists' },
                    HttpStatus.BAD_REQUEST,
                );
            }
            throw new HttpException(
                { message: 'Error creating user' },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    async getUserByEmailId(email: string) {
        try {
            return await this.userRepo.findOne({
                where: { email: email },
            });
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                { message: 'Error fetching user' },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getUserById(userId: string) {
        try {
            return await this.userRepo.findOneBy({ id: userId });
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                { message: 'Error fetching user' },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
