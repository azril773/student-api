import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity({name:"answers_pg"})
export class AnswerPg {
    @PrimaryGeneratedColumn({type:"bigint"})
    id:number

    @Column({type:"enum",enum:["pg"],nullable:false})
    type:string

    @Column({type:"varchar",length:180,nullable:false})
    taskIdId:string

    @Column({type:"int",nullable:false})
    userIdId:number

    @Column({type:"varchar",length:255})
    answer:string

    @Column({type:"int"})
    score:number
    
    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date
    
    @DeleteDateColumn()
    deleted_at:Date
}