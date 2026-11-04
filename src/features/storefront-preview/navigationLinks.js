import { collectionHref } from './collections/collections';

export const navigationLinks = [
  { title: 'The experience', href: '#preview-home', detail: 'Find your frequency' },
  { title: 'The collection', href: '#preview-direction', detail: 'Explore a new perspective' },
  { title: 'Over-ear', href: collectionHref('over-ear'), detail: 'Explore the Form series' },
  { title: 'In-ear', href: collectionHref('in-ear'), detail: 'Discover the Pocket series' },
];
