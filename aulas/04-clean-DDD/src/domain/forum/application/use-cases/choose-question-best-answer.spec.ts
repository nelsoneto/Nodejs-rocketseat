import { expect } from 'vitest'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-question-repository'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { makeQuestion } from '@/test/factories/make-question'
import { makeAnswer } from '@/test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository,
    )
  })

  it('should be able to choose the question best answer', async () => {
    const question = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    const answer = makeAnswer(
      {
        questionId: question.id,
        authorId: new UniqueEntityID('author-2'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    })

    expect(inMemoryQuestionsRepository.items[0]!.bestAnswerId).toEqual(
      answer.id,
    )
  })

  it('should not be able to choose another user question best answer', async () => {
    const question = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    const answer = makeAnswer(
      {
        questionId: question.id,
        authorId: new UniqueEntityID('author-2'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    expect(() =>
      sut.execute({
        answerId: answer.id.toValue(),
        authorId: 'author-2',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
