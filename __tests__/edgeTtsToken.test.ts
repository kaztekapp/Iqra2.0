// The Edge read-aloud service only answers requests signed with a v2
// Sec-MS-GEC token; a wrong one is a silent HTTP 403 and every neural voice in
// the app goes quiet. These values come from the reference client
// (edge-tts 7.3.1, drm.generate_sec_ms_gec_v2) for the same instants.
jest.mock('expo-file-system', () => ({ File: jest.fn(), Paths: {} }));
jest.mock('../src/lib/report', () => ({ quietly: jest.fn() }));

import { secMsGec } from '../src/services/edgeTts';

const REFERENCE: [number, string][] = [
  [0, '52BC7A17B50DFEC9-28C4394775C8751CD2F6859C030C06DB1489ACAB3B3A7651831FC26895177ED6'],
  [1700000000, '2CD23A2CA0B2595A-F3C846C370E05F9CC83ACC5F995C5F5D87A4D0F14CE8936A0F902E64099E38A2'],
  [1761100000.5, '2E778F37E52E31A2-F86EDA1150FD7E9DCB3E98635A511180B12A2D2CD6C5F6E4635BC09AD89E87C0'],
  [1792650000, '7A0AF926585BFA3F-F3803B0DBACC1B662927D755346CF39B38ECA3F9F3FD4F950B009C6C22403B33'],
  [2000000123, '498DEBEC091E9FBB-48F566F30D363EA955F305452BB7D7029DA9E2E43FF809AEEF3ACB5964B2A49B'],
];

describe('secMsGec (v2)', () => {
  it.each(REFERENCE)('matches the reference client at unix time %p', (seconds, expected) => {
    expect(secMsGec(seconds * 1000)).toBe(expected);
  });

  it('is the same for every instant in one five-minute window', () => {
    const start = 1792650000 * 1000 - ((1792650000 + 11644473600) % 300) * 1000;
    expect(secMsGec(start)).toBe(secMsGec(start + 299_000));
    expect(secMsGec(start)).not.toBe(secMsGec(start + 300_000));
  });
});
