import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface GetUserMetricUserCaseRequest {
  userId: string
}

interface GetUserMetricUserCaseResponse {
  checkInsCount: number
}

export class GetUserMetricUserCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricUserCaseRequest): Promise<GetUserMetricUserCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}
