import * as migration_20260206_173000 from './20260206_173000';
import * as migration_20260225_140516 from './20260225_140516';

export const migrations = [
  {
    up: migration_20260206_173000.up,
    down: migration_20260206_173000.down,
    name: '20260206_173000',
  },
  {
    up: migration_20260225_140516.up,
    down: migration_20260225_140516.down,
    name: '20260225_140516'
  },
];
