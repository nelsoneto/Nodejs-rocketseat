import question = require('@/domain/forum/enterprise/entities/question')

export interface QuestionsRepository {
  create(question: question.Question): Promise<void>
}
