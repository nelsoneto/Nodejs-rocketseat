import { expect, test, vi } from 'vitest'
import { CreateQuestionUseCase } from './create-question'
import { QuestionsRepository } from '../repositories/questions-repository'

test('create a question', async () => {
  const fakeQuestionsRepository: QuestionsRepository = {
    create: vi.fn(),
  }
  const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)

  const { question } = await createQuestion.execute({
    authorId: '1',
    title: 'Nova pergunta',
    content: 'Conteúdo da pergunta',
  })

  expect(question.id).toEqual(expect.any(Object))
  expect(fakeQuestionsRepository.create).toHaveBeenCalledWith(question)
})
