import React from 'react';
import {
  DailyCheckinQuestionnaire,
  type DailyCheckinQuestionnaireProps,
} from './DailyCheckinQuestionnaire';

export type DailyLogCardProps = DailyCheckinQuestionnaireProps;

export const DailyLogCard: React.FC<DailyLogCardProps> = (props) => {
  return <DailyCheckinQuestionnaire {...props} />;
};
