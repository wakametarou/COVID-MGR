export type InterviewType = {
  id: number;
  temperature: number;
  oxygenSaturation: number;
  instrumentationTime: Date;
  status: number;
  other: boolean;
  userId: number;
  createdAt: Date;
};

export type InterviewNewType = {
  temperature: number;
  oxygenSaturation: number;
  instrumentationTime: Date;
  status: number;
  other: boolean;
};

export type OtherSymptomType = {
  id: number;
  painDegree: number;
  concrete: string;
  interviewId: number;
};

export type OtherSymptomTypeNew = {
  painDegree: number;
  concrete: string;
};

export type UserType = {
  id: number;
  name: string;
};

export type AnswerType = {
  id: number
  answer: boolean
  interviewId: number
  questionId: number
}
export type QuestionType = {
  id: number
  name: string
  content: string
}
