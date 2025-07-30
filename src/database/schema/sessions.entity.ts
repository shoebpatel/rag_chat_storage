import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Message } from './messages.entity';
import { Users } from './users.entity';

@Entity()
export class Session {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column()
    title: string;

    @Column({ default: false })
    isFavorite: boolean;

    @ManyToOne(() => Users, (user) => user.id, {
        onDelete: 'CASCADE',
    })
    user: Users;

    @OneToMany(() => Message, (message) => message.session, {
        cascade: true,
    })
    messages: Message[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
