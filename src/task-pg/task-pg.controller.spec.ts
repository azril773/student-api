import { Test, TestingModule } from '@nestjs/testing';
import { TaskPgController } from './task-pg.controller';
import { TaskPgService } from './task-pg.service';

describe('TaskPgController', () => {
  let controller: TaskPgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskPgController],
      providers: [TaskPgService],
    }).compile();

    controller = module.get<TaskPgController>(TaskPgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
