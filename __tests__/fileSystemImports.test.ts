// On SDK 54 and later the old file calls (getInfoAsync, deleteAsync,
// createDownloadResumable, ...) still exist on 'expo-file-system' but throw
// every time; they work only from 'expo-file-system/legacy'. The Quran
// recitation store imported them from the main module, so for months no verse
// was ever kept offline and nothing said so. This keeps it from coming back.
import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '..');
const OLD_CALLS =
  /\b(getInfoAsync|readAsStringAsync|writeAsStringAsync|deleteAsync|moveAsync|copyAsync|makeDirectoryAsync|readDirectoryAsync|downloadAsync|uploadAsync|createDownloadResumable|getFreeDiskStorageAsync|getTotalDiskCapacityAsync|documentDirectory|cacheDirectory)\b/;

describe('expo-file-system imports', () => {
  const files = execSync("git ls-files 'app/*.ts' 'app/*.tsx' 'src/*.ts' 'src/*.tsx'", { cwd: ROOT, encoding: 'utf8' })
    .trim()
    .split('\n');

  it('takes the old file calls only from expo-file-system/legacy', () => {
    const offenders: string[] = [];
    for (const f of files) {
      const src = readFileSync(join(ROOT, f), 'utf8');
      // A namespace import of the main module, used for an old call.
      const ns = src.match(/import \* as (\w+) from 'expo-file-system';/);
      if (ns && new RegExp(`\\b${ns[1]}\\.${OLD_CALLS.source.slice(2, -2)}\\b`).test(src)) offenders.push(f);
      // A named import of an old call from the main module.
      for (const m of src.matchAll(/import \{([^}]*)\} from 'expo-file-system';/g)) {
        if (OLD_CALLS.test(m[1])) offenders.push(f);
      }
    }
    expect(offenders).toEqual([]);
  });
});
