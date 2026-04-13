import * as migration_20260306_170000 from './20260306_170000';
import * as migration_20260412_082812_fix_virtual_tour_reasons from './20260412_082812_fix_virtual_tour_reasons';
import * as migration_20260413_150326_phase_system from './20260413_150326_phase_system';

export const migrations = [
  {
    up: migration_20260306_170000.up,
    down: migration_20260306_170000.down,
    name: '20260306_170000',
  },
  {
    up: migration_20260412_082812_fix_virtual_tour_reasons.up,
    down: migration_20260412_082812_fix_virtual_tour_reasons.down,
    name: '20260412_082812_fix_virtual_tour_reasons',
  },
  {
    up: migration_20260413_150326_phase_system.up,
    down: migration_20260413_150326_phase_system.down,
    name: '20260413_150326_phase_system'
  },
];
