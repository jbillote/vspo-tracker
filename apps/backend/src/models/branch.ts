import { t } from 'elysia'

const branch = t.Object({
  name: t.String(),
  members: t.Array(
    t.Object({
      name: t.String(),
    }),
  ),
})

type Branch = typeof branch.static

export { type Branch, branch }
