import { Test, TestingModule } from '@nestjs/testing';
import { TaskPgService } from './task-pg.service';

describe('TaskPgService', () => {
  let service: TaskPgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskPgService],
    }).compile();

    service = module.get<TaskPgService>(TaskPgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
