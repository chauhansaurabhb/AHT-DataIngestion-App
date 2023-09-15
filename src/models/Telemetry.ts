import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Telemetry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sensorId: string;
  
  @Column('float')
  temperature: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}