import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ChatSession } from './sessions';

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    role: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => ChatSession, (session) => session.id, {
        cascade: true,
    })
    sessions: ChatSession[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
