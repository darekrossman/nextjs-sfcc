import { Grid, GridItem } from '@/styled-system/jsx'

/** @todo: implement */

export default function Loading() {
  return (
    <>
      <div className="mb-4 h-6" />
      <Grid className="grid-cols-2 lg:grid-cols-3">
        {Array(12)
          .fill(0)
          .map((_, index) => {
            return <GridItem key={index} />
          })}
      </Grid>
    </>
  )
}
