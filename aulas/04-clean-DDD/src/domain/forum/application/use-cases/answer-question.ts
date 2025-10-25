import { Answer } from "@/domain/forum/enterprise/entities/answer"
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

interface AnswerQuestionUseCaseResponse {
  answer: Answer
}

export class AnswerQuestionUseCase { 
  constructor(
    private answersRepository: AnswersRepository,
  ) {}

  async execute({ 
    instructorId, 
    questionId, 
    content 
  }: AnswerQuestionUseCaseRequest  ): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      questionId: new UniqueEntityID(questionId), // convertendo string para UniqueEntityID
      authorId: new UniqueEntityID(instructorId),
    })
    await this.answersRepository.create(answer);

    return { answer }
  }
}
