import { createReactQueryHooks } from '@trpc/react';

// eslint-disable-next-line
import type { AppRouter } from '~pages/api/trpc/[trpc]';

export const trpc = createReactQueryHooks<AppRouter>();
// => { useQuery: ..., useMutation: ...}