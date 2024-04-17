import { Test, TestingModule } from '@nestjs/testing';
import { AnswerEssayService } from './answer-essay.service';

describe('AnswerEssayService', () => {
  let service: AnswerEssayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerEssayService],
    }).compile();

    service = module.get<AnswerEssayService>(AnswerEssayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
