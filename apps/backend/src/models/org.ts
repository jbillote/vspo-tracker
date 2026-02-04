import { t } from 'elysia'
import { branch } from './branch'

const org = t.Object({
  name: t.String(),
  branches: t.Array(branch),
})

type Org = typeof org.static

export { type Org, org }
