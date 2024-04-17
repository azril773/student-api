import { Test, TestingModule } from '@nestjs/testing';
import { AnswerEssayController } from './answer-essay.controller';
import { AnswerEssayService } from './answer-essay.service';

describe('AnswerEssayController', () => {
  let controller: AnswerEssayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswerEssayController],
      providers: [AnswerEssayService],
    }).compile();

    controller = module.get<AnswerEssayController>(AnswerEssayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
