import { PAGE_QUERYResult } from '@/sanity/types'
import { Grid, Stack, styled } from '@/styled-system/jsx'

type FeaturesProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>['content']>[number],
  { _type: 'features' }
>

export function Features({ features, title }: FeaturesProps) {
  return (
    <Stack gap="7">
      {title && (
        <styled.h2 fontSize="2xl" fontWeight="semibold">
          {title}
        </styled.h2>
      )}

      {Array.isArray(features) ? (
        <Grid
          gridTemplateColumns={{
            base: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
          gap="8"
        >
          {features.map((feature) => (
            <Stack key={feature._key} gap="4">
              <styled.h3 fontSize="lg" fontWeight="semibold">
                {feature.title}
              </styled.h3>
              <styled.p fontSize="sm">{feature.text}</styled.p>
            </Stack>
          ))}
        </Grid>
      ) : null}
    </Stack>
  )
}
