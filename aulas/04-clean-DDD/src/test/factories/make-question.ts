import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps, // This is already exported in question.ts, no need to re-export here.
} from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityID,
) {
  const question = Question.create(
    {
      authorId: new UniqueEntityID('author-1'),
      title: 'Sample Question Title',
      content:
        'This is a sample content for the question being created in the factory.',
      slug: Slug.createFromText('Sample Question Title'),
      bestAnswerId: undefined,
      createdAt: new Date(),
      ...override,
    },
    id,
  )

  return question
}
