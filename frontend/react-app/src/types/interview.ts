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

export type OtherSymptomType = {
  id: number;
  painDegree: number;
  concrete: string;
  interviewId: number;
};

export type UserType = {
  id: number;
  name: string;
};
