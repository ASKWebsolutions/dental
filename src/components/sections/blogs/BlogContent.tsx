'use client';

import React from 'react';
import { extractToc } from '@/lib/blogFormat';

interface BlogContentProps {
  content: string;
}

type ContentBlock =
  | { type: 'h2'; id?: string; text: string }
  | { type: 'h3'; id?: string; text: string }
  | { type: 'lead'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'ordered'; items: string[] }
  | { type: 'quote'; text: string };

/**
 * Parses the plain-text blog format used by the admin editor into render blocks:
 * - `## Heading` / `### Heading` (anchor ids so the sidebar TOC can link to them)
 * - `- ` lines group into a bullet list, `1. ` lines into a numbered list
 * - Blank-line separated blocks render as paragraphs (first one gets a lead treatment)
 * - `> text` renders as a pull quote
 */
function parseBlocks(content: string): ContentBlock[] {
  const rawBlocks = content.replace(/\r\n/g, '\n').split(/\n{2,}/);
  const headings = extractToc(content);
  const blocks: ContentBlock[] = [];
  let headingCursor = 0;
  let firstParagraphSeen = false;

  for (const raw of rawBlocks) {
    const trimmed = raw.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith('### ') || trimmed.startsWith('## ')) {
      const isH3 = trimmed.startsWith('### ');
      const text = (isH3 ? trimmed.slice(4) : trimmed.slice(3)).split('\n')[0].trim();
      if (!text) continue;
      const heading = headings[headingCursor];
      headingCursor++;
      blocks.push(
        isH3
          ? { type: 'h3', id: heading?.id, text }
          : { type: 'h2', id: heading?.id, text }
      );
      continue;
    }

    if (trimmed.startsWith('- ')) {
      const items = trimmed
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.startsWith('- '))
        .map((line) => line.slice(2));
      blocks.push({ type: 'list', items });
      continue;
    }

    if (trimmed.startsWith('> ')) {
      blocks.push({ type: 'quote', text: trimmed.slice(2) });
      continue;
    }

    if (/^1\.\s/.test(trimmed)) {
      const items = trimmed
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => /^\d+\.\s/.test(line))
        .map((line) => line.replace(/^\d+\.\s/, ''));
      blocks.push({ type: 'ordered', items });
      continue;
    }

    if (firstParagraphSeen) {
      blocks.push({ type: 'paragraph', text: trimmed });
    } else {
      blocks.push({ type: 'lead', text: trimmed });
      firstParagraphSeen = true;
    }
  }

  return blocks;
}

/** Renders single-line breaks inside a text block as <br />. */
const withBreaks = (text: string): React.ReactNode =>
  text.split('\n').map((line, i, arr) => (
    <React.Fragment key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </React.Fragment>
  ));

export const BlogContent: React.FC<BlogContentProps> = ({ content }) => {
  const blocks = parseBlocks(content);

  return (
    <div className="font-sans text-body-text">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2
                key={idx}
                id={block.id}
                className="scroll-mt-28 font-serif font-bold text-2xl sm:text-[28px] text-primary mt-12 mb-4 flex items-center gap-3"
              >
                <span
                  aria-hidden="true"
                  className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"
                />
                {block.text}
              </h2>
            );

          case 'h3':
            return (
              <h3
                key={idx}
                id={block.id}
                className="scroll-mt-28 font-serif font-bold text-lg sm:text-xl text-dark mt-10 mb-3 pb-2 border-b border-slate-100"
              >
                {block.text}
              </h3>
            );

          case 'list':
            return (
              <ul key={idx} className="my-5 space-y-3 pl-5 list-disc marker:text-primary">
                {block.items.map((item, i) => (
                  <li
                    key={i}
                    className="text-sm sm:text-base leading-relaxed pl-1 marker:font-bold"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            );

          case 'ordered':
            return (
              <ol
                key={idx}
                className="my-5 space-y-3 pl-5 list-decimal marker:text-primary marker:font-bold"
              >
                {block.items.map((item, i) => (
                  <li key={i} className="text-sm sm:text-base leading-relaxed pl-1">
                    {item}
                  </li>
                ))}
              </ol>
            );

          case 'quote':
            return (
              <blockquote
                key={idx}
                className="my-8 rounded-r-2xl rounded-l-sm border-l-4 border-primary pl-6 pr-5 py-4 font-serif italic text-base sm:text-lg text-dark bg-primary/5"
              >
                {block.text}
              </blockquote>
            );

          case 'lead':
            return (
              <p
                key={idx}
                className="mt-0 mb-6 text-base sm:text-lg text-dark leading-relaxed first-letter:font-serif first-letter:text-[44px] first-letter:leading-none first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-2.5 first-letter:mt-1"
              >
                {withBreaks(block.text)}
              </p>
            );

          case 'paragraph':
          default:
            return (
              <p key={idx} className="my-5 text-sm sm:text-base leading-[1.75]">
                {withBreaks(block.text)}
              </p>
            );
        }
      })}
    </div>
  );
};

export default BlogContent;
