
export type Chapter = 'home' | 'prologue' | 'ascent' | 'recovery' | 'bridge' | 'end';

export interface StoryState {
  currentChapter: Chapter;
  progress: number; // 0 to 1 within a chapter
}
