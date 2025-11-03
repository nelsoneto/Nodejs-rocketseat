import question = require('@/domain/forum/enterprise/entities/question')

export interface QuestionsRepository {
  create(question: question.Question): Promise<void>
  findBySlug(slug: string): Promise<question.Question | null>
}
