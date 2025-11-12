import type { ReactNode } from 'react';

export interface PageData {
    id: number;
    type: 'cover' | 'image' | 'text' | 'chapter' | 'blank';
    // FIX: Replaced `string | JSX.Element` with `ReactNode` to avoid using the JSX namespace
    // in a .ts file, which was causing a compilation error. ReactNode is a more idiomatic
    // type for content that can be rendered in React.
    text?: ReactNode;
    prompt?: string;
    imageUrl: string | null;
    chapterInfo?: {
        number: string;
        title: string;
        synopsis?: string;
    };
}
