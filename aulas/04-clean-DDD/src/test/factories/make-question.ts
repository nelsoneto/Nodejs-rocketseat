import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps, // This is already exported in question.ts, no need to re-export here.
} from '@/domain/forum/enterprise/entities/question'

export function makeQuestion(
  // deixa as propriedades opcionais para sobrescrever
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityID,
) {
  const question = Question.create(
    {
      authorId: new UniqueEntityID('author-1'),
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      bestAnswerId: undefined,
      ...override, // sobrescreve as propriedades se fornecidas
    },
    id,
  )

  return question
}
