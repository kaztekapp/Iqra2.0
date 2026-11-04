// The phonemes for long wasl chains must say what the user approved by ear.
import { recitationIpa, soundOfAllah } from '../src/services/speech/recitationIpa';

const seated = (s: string) => s.replace(/([ً-ِ])ّ/g, 'ّ$1');

describe('recitation phonemes', () => {
  it('reproduces the approved Bismillah (Al-Fatihah 1, take 3)', () => {
    expect(recitationIpa(seated('بِسْمِلَّهِرَّحْمَانِرَّحِيمْ'))).toBe('bismillaːhirraħmaːnirraħiːm');
  });
  it('reproduces the approved An-Nas 4 (take 5)', () => {
    expect(recitationIpa(seated('شَرِّلْوَسْوَاسِلْخَنَّاسْ'))).toBe('ʃarrilwaswaːsilxannaːs');
  });
  it('reproduces the approved walad-daaaalliin (Al-Fatihah 7, take 6)', () => {
    expect(recitationIpa(seated('وَلَضَّالِّينْ'))).toBe('waladˤdˤaːaːaːlliːn');
  });
  it('says lillāhi with the long ā the mushaf does not write', () => {
    expect(recitationIpa(seated('لِلَّهِ'))).toBe('lillaːhi');
  });
  it('holds the ā of Allāh, heavy l after a or u, light after i (take F)', () => {
    expect(soundOfAllah('fataʕaːlallaːhu')).toBe('fataʕaːlalˤlˤaːaːhu');
    expect(soundOfAllah('waqaːluttaxaðallaːhu')).toBe('waqaːluttaxaðalˤlˤaːaːhu');
    expect(soundOfAllah('bismillaːhi')).toBe('bismillaːaːhi');
    expect(soundOfAllah('ʕalallaːhi')).toBe('ʕalalˤlˤaːaːhi');
  });
});
