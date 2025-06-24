import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ChatMessage } from './chat-message';
import { Users } from './users';

@Entity()
export class ChatSession {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column()
    title: string;

    @Column({ default: false })
    isFavorite: boolean;

    @ManyToOne(() => Users, (user) => user.Id, {
        onDelete: 'CASCADE',
    })
    user: Users;

    @OneToMany(() => ChatMessage, (message) => message.session, {
        cascade: true,
    })
    messages: ChatMessage[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
