import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatSession } from './sessions';

@Entity()
export class ChatMessage {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ChatSession, (session) => session.messages, {
        onDelete: 'CASCADE',
    })
    session: ChatSession;

    @Column()
    sender: 'user' | 'assistant';

    @Column('text')
    content: string;

    @Column('jsonb', { nullable: true })
    context: any;

    @CreateDateColumn()
    createdAt: Date;
}
