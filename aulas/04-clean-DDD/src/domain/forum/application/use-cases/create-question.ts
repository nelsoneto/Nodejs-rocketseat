import { Either, right } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question
  }
>

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
      bestAnswerId: undefined,
      questionId: new UniqueEntityID(),
    })

    await this.questionsRepository.create(question)

    return right({
      question,
    })
  }
}
