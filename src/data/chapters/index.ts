import { Chapter } from '../../types/quiz';
import { chapter01 } from './at01';
import { chapter02 } from './at02';
import { chapter03 } from './at03';
import { chapter04 } from './at04';
import { chapter05 } from './at05';
import { chapter06 } from './at06';
import { chapter07 } from './at07';
import { chapter08 } from './at08';
import { chapter09 } from './at09';
import { chapter11 } from './at11';
import { chapter12 } from './at12';
import { chapter13 } from './at13';
import { chapter14 } from './at14';
import { chapter15 } from './at15';
import { chapterFinale } from './finale';

export const allChapters: Chapter[] = [
  chapter01,
  chapter02,
  chapter03,
  chapter04,
  chapter05,
  chapter06,
  chapter07,
  chapter08,
  chapter09,
  chapter11,
  chapter12,
  chapter13,
  chapter14,
  chapter15,
  chapterFinale,
];

export const chaptersMap: Record<string, Chapter> = {
  [chapter01.id]: chapter01,
  [chapter02.id]: chapter02,
  [chapter03.id]: chapter03,
  [chapter04.id]: chapter04,
  [chapter05.id]: chapter05,
  [chapter06.id]: chapter06,
  [chapter07.id]: chapter07,
  [chapter08.id]: chapter08,
  [chapter09.id]: chapter09,
  [chapter11.id]: chapter11,
  [chapter12.id]: chapter12,
  [chapter13.id]: chapter13,
  [chapter14.id]: chapter14,
  [chapter15.id]: chapter15,
  [chapterFinale.id]: chapterFinale,
};

export function getChapterById(id: string): Chapter | undefined {
  return chaptersMap[id] || allChapters.find((c) => c.code.toLowerCase() === id.toLowerCase() || c.id === id);
}

export {
  chapter01,
  chapter02,
  chapter03,
  chapter04,
  chapter05,
  chapter06,
  chapter07,
  chapter08,
  chapter09,
  chapter11,
  chapter12,
  chapter13,
  chapter14,
  chapter15,
  chapterFinale,
};
