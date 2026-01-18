export interface MoodAnalysis {
  sentimentLabel: string;
  sentimentScore: number; // -10 to 10
  summary: string;
  suggestions: string;
  reframe: string;
}
