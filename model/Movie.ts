import {Entity, BaseEntity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity('movie')
export class Movie extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    Title!: string;
  
    @Column()
    Year!: string;
  
    @Column()
    Rated!: string;
  
    @Column()
    Released!: string;
  
    @Column()
    Runtime!: string;
  
    @Column('simple-array')
    Genre!: string[];
  
    @Column()
    Director!: string;
  
    @Column()
    Writer!: string;
  
    @Column()
    Actors!: string;
  
    @Column('text')
    Plot!: string;
  
    @Column()
    Language!: string;
  
    @Column()
    Country!: string;
  
    @Column()
    Awards!: string;
  
    @Column()
    Poster!: string;
  
    @Column()
    Metascore!: string;
  
    @Column()
    imdbRating!: string;
  
    @Column()
    imdbVotes!: string;
  
    @Column()
    imdbID!: string;
  
    @Column()
    Type!: string;
  
    @Column()
    Response!: string;
  
    @Column('simple-array')
    Images!: string[];

    @Column({default:false})
    ComingSoon!: boolean



}