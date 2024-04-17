import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity({name:"answers"})
export class Answer {
    @PrimaryGeneratedColumn({type:"bigint"})
    id:number

    @Column({type:"enum",enum:["pg","essay"],nullable:false})
    type:string

    @Column({type:"int",nullable:false})
    taskIdId:number

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
