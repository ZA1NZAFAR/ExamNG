'use client'

import { MCQuestion } from '@/types/question';
import React from 'react';
import { hasSingleCorrectOption } from '../question.util';
import { RadioGroup, Radio } from '@nextui-org/radio';
import { CheckboxGroup, Checkbox } from '@nextui-org/checkbox';
import AttachmentComponent from '../attachment/attachment';
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from '@nextui-org/divider';

/**
 * Represents the properties of a multiple-choice question component.
 * @property {MCQuestion} question The MC question object containing its content.
 * @property {boolean} canAnswer Whether the answer can be submitted.
 */
type MCQAnswerProps = {
	/**
	 * The MC question object containing its content.
	 */
  question: MCQuestion;
  /**
   * Whether the answer can be submitted.
   * @default false
   */
  canAnswer: boolean;
}

const MCQAnswerComponent: React.FC<MCQAnswerProps> = ({
    question,
    canAnswer = false,
  }) => {
  if (hasSingleCorrectOption(question)) {
    return (
      <RadioGroup isDisabled={canAnswer}>
        {question.options.map((option, index) => (
          <Radio key={index} value={option.statement}>
            {option.statement}
          </Radio>
        ))}
      </RadioGroup>
    );
  }
  return (
    <CheckboxGroup isDisabled={canAnswer}>
      {question.options.map((option, index) => (
        <Checkbox key={index} value={option.statement}>
          {option.statement}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}

export default MCQAnswerComponent;