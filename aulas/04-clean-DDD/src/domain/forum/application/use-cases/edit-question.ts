import { QuestionsRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'

interface EditQuestionUseCaseRequest {
  questionId: string
  authorId: string
  title: string
  content: string
}

interface EditQuestionUseCaseResponse {
  question: Question
}

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('You are not allowed to edit this question.')
    }

    question.title = title
    question.content = content

    await this.questionsRepository.save(question)

    return { question }
  }
}
