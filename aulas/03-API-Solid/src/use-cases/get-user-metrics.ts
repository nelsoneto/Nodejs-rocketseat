import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface GetUserMetricUserCaseRequest {
  userId: string
}

interface GetUserMetricUserCaseResponse {
  CheckInsCount: number
}

export class GetUserMetricUserCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricUserCaseRequest): Promise<GetUserMetricUserCaseResponse> {
    const CheckInsCount = await this.checkInsRepository.countByUserId(userId)

    return {
      CheckInsCount,
    }
  }
}
