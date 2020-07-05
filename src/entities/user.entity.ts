import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('enjoy_user')
export class User {
  @PrimaryGeneratedColumn()
  id: string

  @Column({ length: 128, unique: true, nullable: false })
  email: string

  @Column({ length: 128, nullable: false })
  password: string

  @Column('boolean', { nullable: true })
  isAdmin: boolean
}