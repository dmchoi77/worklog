export type UserAgent = 'desktop' | 'mobile';

export interface ICommonProps {
  targetDate: string;
  userAgent: UserAgent;
}
