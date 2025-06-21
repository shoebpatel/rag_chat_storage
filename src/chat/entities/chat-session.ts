import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ChatMessage } from './chat-message';

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

    @OneToMany(() => ChatMessage, (message) => message.session, {
        cascade: true,
    })
    messages: ChatMessage[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
