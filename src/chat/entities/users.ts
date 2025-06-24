import {
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ChatSession } from './chat-session';

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    Id: string;

    @OneToMany(() => ChatSession, (session) => session.id, {
        cascade: true,
    })
    sessions: ChatSession[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
