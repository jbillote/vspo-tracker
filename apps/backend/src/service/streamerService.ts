import { type Logger } from 'pino'
import { type Branch } from '../models/branch'
import { type Org } from '../models/org'

class StreamerService {
  private logger: Logger

  public constructor(logger: Logger) {
    this.logger = logger.child({ component: 'streamerService' })
  }

  public async getStreamerNames(): Promise<Org[]> {
    this.logger.info('Fetching streamers from JSON configuration')
    const streamerConfig = await Bun.file('./channels.json').json()

    const orgs: Org[] = []
    streamerConfig.forEach((org: any) => {
      const branches: Branch[] = []
      org.branches.forEach((branch: any) => {
        const members: { name: string }[] = []
        branch.members.forEach((member: any) => {
          members.push({
            name: member.name,
          })
        })

        branches.push({
          name: branch.name,
          members: members,
        })
      })

      orgs.push({
        name: org.name,
        branches: branches,
      })
    })

    return orgs
  }
}

export { StreamerService }
