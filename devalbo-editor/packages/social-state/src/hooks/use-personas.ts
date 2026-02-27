import { useMemo } from 'react';
import type { PersonaId, PersonaRow } from '@devalbo-cli/shared';
import { listPersonas } from '../accessors/personas';
import { PERSONAS_TABLE } from '../schemas/social';
import { useStore, useTable } from '@devalbo-cli/state';

export const usePersonas = (): Array<{ id: PersonaId; row: PersonaRow }> => {
  const store = useStore();
  const table = useTable(PERSONAS_TABLE);
  return useMemo(() => listPersonas(store), [store, table]);
};
