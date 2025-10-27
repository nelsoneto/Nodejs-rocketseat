import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {},
}

test('create an answer', async () => {
  const answerQUestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const { answer } = await answerQUestion.execute({
    instructorId: 'instructor-1',
    questionId: 'question-1',
    content: 'This is an answer to the question.',
  })

  expect(answer.content).toEqual('This is an answer to the question.')
  // expect(answer.id).toEqual(expect.any(String))
})
