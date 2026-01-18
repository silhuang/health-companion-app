export interface Thought {
  title: string;
  content: string;
  date: string;
  emoji: string;
  response: string;
}

export interface DBThought {
  title: string;
  content: string;
  date: Date;
  emoji: string;
  sentimentLabel: string;
  sentimentScore: number;
  responseSummary: string;
  responseSuggestions: string[];
  responseReframe: string;
}

export interface APIResponse {
  success: boolean;
  data: DBThought[];
}
