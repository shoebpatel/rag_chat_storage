import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Session } from './sessions';

@Entity()
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Session, (session) => session.messages, {
        onDelete: 'CASCADE',
    })
    session: Session;

    @Column()
    sender: 'user' | 'assistant';

    @Column('text')
    content: string;

    @Column('jsonb', { nullable: true })
    context: any;

    @CreateDateColumn()
    createdAt: Date;
}
