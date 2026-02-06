import * as migration_20260206_173000 from './20260206_173000';

export const migrations = [
  {
    up: migration_20260206_173000.up,
    down: migration_20260206_173000.down,
    name: '20260206_173000'
  },
];
