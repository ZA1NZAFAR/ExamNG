import { CodeAttachment } from "@/types/attachment"
import { Exam, Module } from "@/types/module"
import { MCQuestion, Question } from "@/types/question"

export const mockModules: Module[] = [
  {
    code: 'ALIF73',
    name: 'Cryptographie',
  },
  {
    code: 'ALTN74',
    name: 'Systèmes temps réel',
  }
]

const question1: MCQuestion = {
  id: '1',
  statement: 'This is a MCQ',
  attachments: [],
  coefficient: 1,
  options: [
    {
      statement: 'Option 1',
      correctOption: true
    },
    {
      statement: 'Option 2',
      correctOption: false
    },
    {
      statement: 'Option 3',
      correctOption: false
    },
    {
      statement: 'Option 4',
      correctOption: false
    }
  ]
}

const question2: MCQuestion = {
  id: '2',
  statement: 'This is a MCQ',
  attachments: [],
  coefficient: 1,
  options: [
    {
      statement: 'Option 1',
      correctOption: true
    },
    {
      statement: 'Option 2',
      correctOption: true
    },
    {
      statement: 'Option 3',
      correctOption: false
    },
    {
      statement: 'Option 4',
      correctOption: false
    }
  ]
}

const attachment1: CodeAttachment = {
  language: 'javascript',
  code: 'console.log("Hello World")'
}

const question3: Question = {
  id: '3',
  statement: 'This is a text question',
  attachments: [attachment1],
  coefficient: 1
}

export const mockExams: { [key: string]: Exam[]} = {
  'ALIF73': [
    {
      id: '1',
      name: 'Exam 1',
      duration: 60,
      startDate: new Date(),
      endDate: new Date(),
      questions: [ question1, question2, question3 ]
    }
  ],
  'ALTN74': [
    {
      id: '2',
      name: 'Exam 2',
      duration: 60,
      startDate: new Date(),
      endDate: new Date(),
      questions: [ question1, question2, question3 ]
    }
  ]
}