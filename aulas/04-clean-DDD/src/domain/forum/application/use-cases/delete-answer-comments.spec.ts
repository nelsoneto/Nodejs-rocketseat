import { expect } from 'vitest'
import { DeleteAnswerCommentUseCase } from './delete-answer-comments'
import { InMemoryAnswerCommentsRepository } from '@/test/repositories/in-memory-answer-comments-repository'
import { makeAnswerComment } from '@/test/factories/make-answer-comments'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete Answer Comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to delete a answer comment', async () => {
    const answerComment = makeAnswerComment(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-comment-1'),
    )

    await inMemoryAnswerCommentsRepository.create(answerComment)

    await sut.execute({
      answerCommentId: 'answer-comment-1',
      authorId: 'author-1',
    })

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer comment from another user', async () => {
    const answerComment = makeAnswerComment(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-comment-1'),
    )

    await inMemoryAnswerCommentsRepository.create(answerComment)

    expect(() =>
      sut.execute({
        answerCommentId: 'answer-comment-1',
        authorId: 'author-2',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
