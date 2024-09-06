import { IFeedbackSkill } from '@interfaces/feedback.interface';
import { LABEL_TYPES } from '@constants/labelTypes';
import { IFeedbackType } from './feedback.interface';

export const MOBILE_SCREEN_WIDTH = 544;
export const HIGH_RATING_MARK = 4.5;
export const COLLAPSED_FEEDBACK_MAX_HEIGHT = 78;
export const FEEDBACK_MODAL_WINDOW_WIDTH = '761px';
export const FEEDBACK_NOTICE_MODAL_WINDOW_WIDTH = '476px';
export const FEEDBACK_NOTICE_MODAL_WINDOW_HEIGHT = '326px';
export const FEEDBACK_COMMENT_MIN_LENGTH = 235;
export const FEEDBACK_COMMENT_MAX_LENGTH = Infinity;
export const COEFFICIENT_CONVERSION_POINTS_TO_PERCENT = 20;
export const FEEDBACK_ASK_MODAL_WIDTH = '525px';
export const FEEDBACK_CONFIRM_MODAL_WIDTH = '496px';
export const FEEDBACK_REQUESTED_EMPLOYEES_MAX_LENGTH = 9;
export const FEEDBACK_ROCK_STAR_MODAL_WIDTH = '721px';
export const FEEDBACK_INSIDE_OUTSIDE_TYPE = {
  inside: 'Inside the company',
  outside: 'Outside the company',
};

export const EXTERNAL_FEEDBACK_BUTTON_NAME = {
  link: 'Generate link',
  copy: 'Copy link',
  cancel: 'Cancel',
  finish: 'Finish',
};

export const FEEDBACK_SKILLS_SRM: IFeedbackSkill[] = [
  {
    skill: 'question1',
    name: 'Quality of one-to-one',
    description: `How you assess the value and effectiveness of work in 1-2-1 process (regularity of 1-2-1, quality of 1-2-1)`,
    skillGroup: [
      {
        title: `Complete frustration`,
      },
      {
        title: 'Performance can disappoint sometimes',
      },
      {
        title: 'Ok. Right on target',
      },
      {
        title: 'Good performance and quality',
      },
      {
        title: 'Completely satisfied',
      },
    ],
  },
  {
    skill: 'question4',
    name: 'ROL management',
    description: `How you assess the value and effectiveness of work in ROL processing
     (ROL prevention, processing, offering solutions, retention`,
    skillGroup: [
      {
        title: `Complete frustration`,
      },
      {
        title: 'Performance can disappoint sometimes',
      },
      {
        title: 'Ok. Right on target',
      },
      {
        title: 'Good performance and quality',
      },
      {
        title: 'Completely satisfied',
      },
    ],
  },
  {
    skill: 'question2',
    name: 'People management',
    description: `Professional growth of the pool, identification of leaders, experts, managers, passing RM trainings`,
    skillGroup: [
      {
        title: `Complete frustration`,
      },
      {
        title: 'Performance can disappoint sometimes',
      },
      {
        title: 'Ok. Right on target',
      },
      {
        title: 'Good performance and quality',
      },
      {
        title: 'Completely satisfied',
      },
    ],
  },
  {
    skill: 'question6',
    name: 'Loyalty and promotion',
    description: `How you assess general loyalty of person, promoting the interests of the company`,
    skillGroup: [
      {
        title: `Complete frustration`,
      },
      {
        title: 'Low level',
      },
      {
        title: 'Ok',
      },
      {
        title: 'High level',
      },
      {
        title: 'Completely satisfied',
      },
    ],
  },
  {
    skill: 'question3',
    name: 'Quality of Assessments',
    description: `How you assess the value and effectiveness of work in assessment process
    (conducting an assessment, creating of PDP, Salary Growth Plan)`,
    blockDesccription: 'Please tick a check-box if the parameters below are not your subordinate RM\'s responsibilities.',
    hasDisableCheckbox: true,
    disableCheckboxText: 'Not his/her responsibility',
    skillGroup: [
      {
        title: `Complete frustration`,
      },
      {
        title: 'Performance can disappoint sometimes',
      },
      {
        title: 'Ok. Right on target',
      },
      {
        title: 'Good performance and quality',
      },
      {
        title: 'Completely satisfied',
      },
    ],
  },
  {
    skill: 'question5',
    name: 'Staffing and Recruitment',
    description: `How you assess the value and effectiveness of work in staffing and recruitment process
    (communication, participation in staffing, save positions, support of an employee in project change, communication with candidates)`,
    hasDisableCheckbox: true,
    disableCheckboxText: 'Not his/her responsibility',
    skillGroup: [
      {
        title: `Complete frustration`,
      },
      {
        title: 'Performance can disappoint sometimes',
      },
      {
        title: 'Ok. Right on target',
      },
      {
        title: 'Good performance and quality',
      },
      {
        title: 'Completely satisfied',
      },
    ],
  },
];

export const FEEDBACK_SKILLS_RM: IFeedbackSkill[] = [
  {
    skill: 'question1',
    name: 'Management skills',
    description: `How you assess this person's management skills including community ambassador, leadership skills.
      It includes interaction with his/her team.`,
    skillGroup: [
      {
        title: `Complete frustration`,
      },
      {
        title: 'Low level, need to study',
      },
      {
        title: 'Ok. Right on target',
      },
      {
        title: 'Good RM',
      },
      {
        title: 'Leader',
      },
    ],
  },
  {
    skill: 'question4',
    name: 'Communication skills',
    description: `How you assess this person's communication skills including listening, speaking,
     observing and empathizing. It includes interaction with team members (coordinates)`,
    skillGroup: [
      {
        title: `Communication is weak point`,
      },
      {
        title: 'Low level',
      },
      {
        title: 'Ok',
      },
      {
        title: 'High level',
      },
      {
        title: 'Communication is a strength',
      },
    ],
  },
  {
    skill: 'question2',
    name: 'Availability / support',
    description: `How you assess availability of this person if you need to get help and support.`,
    skillGroup: [
      {
        title: `I almost don't know my RM, no support`,
      },
      {
        title: 'Gaps in communication, only during the assessment',
      },
      {
        title: 'Good communication and support',
      },
      {
        title: 'Always online, a lot of communication',
      },
      {
        title: 'Best support from RM',
      },
    ],
  },
  {
    skill: 'question6',
    name: 'PDP',
    description: `How you assess the value and effectiveness of work in creating of Personal Development Plan
     (selection with you, coordination and setting objectives, assistance with realization, control and support)`,
    skillGroup: [
      {
        title: `Didn't agreed PDP with me`,
      },
      {
        title: 'Objectives are set directive, didn\'t meet my interests',
      },
      {
        title: 'Objectives were agreed with me',
      },
      {
        title: 'Objectives are set and an realization plan is discussed',
      },
      {
        title: 'Transparent plan, I have all resources, and support',
      },
    ],
  },
  {
    skill: 'question3',
    name: 'Problem solving skills',
    description: `How effectively the person is defining a problem, determining the cause of the problem,
     identifying, prioritizing, and selecting alternatives for a solution. Also, escalation skills for solving problem.`,
    skillGroup: [
      {
        title: `Doesn't solve problems`,
      },
      {
        title: 'Gaps in problem-solving, need to ping a few times',
      },
      {
        title: 'Report a problem - problem solving',
      },
      {
        title: 'Solve problems fast and decisively',
      },
      {
        title: 'Problem prevention and best solving',
      },
    ],
  },
  {
    skill: 'question7',
    name: 'Salary Growth Plan',
    description: `How you assess the value and effectiveness of work in creating of Salary Growth Plan
     (discuss with you, agreed with stakeholders, setting up milestones)`,
    skillGroup: [
      {
        title: `I don’t have a salary growth plan`,
      },
      {
        title: 'I have a plan for the next 6 month',
      },
      {
        title: 'I have a plan for the next year',
      },
      {
        title: 'I know what salary will be at the next level and how to achieve it',
      },
      {
        title: 'I have a salary growth plan for 1+ year and know how to achieve it',
      },
    ],
  },
  {
    skill: 'question5',
    name: 'Assessments',
    description: `How you assess the value and effectiveness of work in assessment process
     (conducting an assessment, reporting the results)`,
    blockDesccription: 'Please tick a check-box if the parameters below are not your subordinate RM\'s responsibilities.',
    hasDisableCheckbox: true,
    disableCheckboxText: 'Did not have assessment yet',
    skillGroup: [
      {
        title: `Doesn't report the results of the assessment`,
      },
      {
        title: 'May forget to agree with me some points or report late',
      },
      {
        title: 'Ok',
      },
      {
        title: 'We discuss all things in advance, and also after an Assessment',
      },
      {
        title: 'Completely satisfied',
      },
    ],
  },
];

export const FEEDBACK_SKILLS_HR: IFeedbackSkill[] = [
  {
    skill: 'question1',
    name: 'Management skills',
    description: `HR translates changes in the company, shows leadership in the office.`,
    skillGroup: [
      {
        title: `Complete frustration`,
      },
      {
        title: 'Can disappoint sometimes',
      },
      {
        title: 'Ok. Right on target',
      },
      {
        title: 'Sometimes pleasantly surprise',
      },
      {
        title: 'Absolute delight.',
      },
    ],
  },
  {
    skill: 'question4',
    name: 'Reliability',
    description: `HR maintains an atmosphere of trust and security for all office staff,
     shows empathy, openness and interest, considers my emotional state, always treats all employees equally.`,
    skillGroup: [
      {
        title: `Complete frustration`,
      },
      {
        title: 'Can disappoint sometimes',
      },
      {
        title: 'Ok. Right on target',
      },
      {
        title: 'Sometimes pleasantly surprise',
      },
      {
        title: 'Absolute delight.',
      },
    ],
  },

  {
    skill: 'question2',
    name: 'Availability / support',
    description: `HR knows how to adapt new employees, provides quick response to questions and needs, always available for communication.`,
    skillGroup: [
      {
        title: `Complete frustration`,
      },
      {
        title: 'Can disappoint sometimes',
      },
      {
        title: 'Ok. Right on target',
      },
      {
        title: 'Sometimes pleasantly surprise',
      },
      {
        title: 'Absolute delight.',
      },
    ],
  },
  {
    skill: 'question5',
    name: 'Communication skills',
    description: `HR knows how to set contact, to conduct a dialogue,
     to resolve conflict situations, encourages culture of feedback and works with them.`,
    skillGroup: [
      {
        title: `Complete frustration`,
      },
      {
        title: 'Can disappoint sometimes',
      },
      {
        title: 'Ok. Right on target',
      },
      {
        title: 'Sometimes pleasantly surprise',
      },
      {
        title: 'Absolute delight.',
      },
    ],
  },
  {
    skill: 'question3',
    name: 'Problem solving skills',
    description: `HR is interested in solving my problem, seeks to help, defends my interests,
     escalates issue if it is not his/her responsibility, but never leaves the problem without a solution.`,
    skillGroup: [
      {
        title: `Complete frustration`,
      },
      {
        title: 'Can disappoint sometimes',
      },
      {
        title: 'Ok. Right on target',
      },
      {
        title: 'Sometimes pleasantly surprise',
      },
      {
        title: 'Absolute delight.',
      },
    ],
  },
  {
    skill: 'question6',
    name: 'Administration function',
    description: `HR takes care of comfort in the office for employees, conducts team-building events.`,
    skillGroup: [
      {
        title: `Complete frustration`,
      },
      {
        title: 'Can disappoint sometimes',
      },
      {
        title: 'Ok. Right on target',
      },
      {
        title: 'Sometimes pleasantly surprise',
      },
      {
        title: 'Absolute delight.',
      },
    ],
  },
];

export const FEEDBACK_SKILLS: IFeedbackSkill[] = [
  {
    skill: 'overallPerformance',
    name: 'Overall performance',
    description: `How effectively this person is fulfilling her/his job responsibilities and contributing to the accomplishment of
      organizational goals`,
    skillGroup: [
      {
        title: `Complete frustration`,
        description: `Does not fulfill their duties.
        Doesn’t correct their mistakes or doesn’t admit them at all.
        Inactive and indifferent to the interests of the company.`,
      },
      {
        title: 'Performance can disappoint sometimes',
        description: `Most often, the employee copes with their job duties,
        but sometimes makes mistakes or is not able to finish the job on time.`,
      },
      {
        title: 'Ok. Right on target',
        description: `The employee copes in full with their job duties and within the required time frame.`,
      },
      {
        title: 'Sometimes pleasantly surprises with performance',
        description: `The employee well copes with their duties, sometimes wants to go beyond the required,
        or performs work before the established deadlines.`,
      },
      {
        title: 'Absolute delight. One in a million!',
        description: `The employee always/often fulfills their job duties faster than required and at an exceeding level.`,
      },
    ],
  },
  {
    skill: 'problemSolvingSkills',
    name: 'Problem solving skills',
    description: `How effectively the person is defining a problem, determining the cause of the problem,
    identifying, prioritizing, and selecting alternatives for a solution. It involves looking beyond the obvious
    and digs for deeper answers`,
    skillGroup: [
      {
        title: `Complete frustration`,
        description: `Not initiative, deviating from the original plan leaves the employee at a complete loss.`,
      },
      {
        title: 'Performance can disappoint sometimes',
        description: `Can't always find the root of the problem and ways to solve it, or it takes them too much time.`,
      },
      {
        title: 'Ok. Right on target',
        description: `Can find the cause of the problem and solution to it.`,
      },
      {
        title: 'Sometimes pleasantly surprises with performance',
        description: `The employee knows how to solve nontypical tasks, quickly finds the cause of the problem,
         and offers several solutions at once.`,
      },
      {
        title: 'Absolute delight. One in a million!',
        description: `The employee is fast and efficient, has operational thinking, not only quickly finds
        and solves a problem, but can also foresee and prevent it`,
      },
    ],
  },
  {
    skill: 'professionalSkills',
    name: 'Professional skills',
    description: `How sufficient this person's competencies are, if s/he follows technology trends,
    shows technical expertise in a wide spectrum of technologies and frameworks or tools`,
    skillGroup: [
      {
        title: `Complete frustration`,
        description: `Professional skills and experience are well below their level Has no desire to work
        and is not interested in personal growth`,
      },
      {
        title: 'Performance can disappoint sometimes',
        description: `Professional skills and experience below their level`,
      },
      {
        title: 'Ok. Right on target',
        description: `Professional skills correspond to their level`,
      },
      {
        title: 'Sometimes pleasantly surprises with performance',
        description: `Professional skills slightly outperform their level
        The employee is often interested in how to improve their work and the project in general`,
      },
      {
        title: 'Absolute delight. One in a million!',
        description: `Professional skills above their level. The employee is constantly self-developing
        and has authority on the team and among other colleagues`,
      },
    ],
  },
  {
    skill: 'reliability',
    name: 'Reliability',
    description: `How you see this person's capability to manage the scope of work, understand the
    business need, and how reliable s/he is at work`,
    skillGroup: [
      {
        title: `Complete frustration`,
        description: `An unreliable employee
        Often delays deadlines for their tasks.`,
      },
      {
        title: 'Performance can disappoint sometimes',
        description: `One cannot always rely on the employee, but they are not hopeless.`,
      },
      {
        title: 'Ok. Right on target',
        description: `The employee can be relied on.`,
      },
      {
        title: 'Sometimes pleasantly surprises with performance',
        description: `We can rely on the employee; moreover, they come to the rescue on their own initiative.`,
      },
      {
        title: 'Absolute delight. One in a million!',
        description: `The employee is fully reliable, always ready to help, often comes to the rescue and offers help.
         Helped their colleagues many times.`,
      },
    ],
  },
  {
    skill: 'qualityOfWork',
    name: 'Quality of work',
    description: `How you assess the value of work delivered by this person, if s/he is capable of
    delivering sufficient results even under pressure`,
    skillGroup: [
      {
        title: `Complete frustration`,
        description: `Shows a careless attitude to work or just imitates being busy
        Unable to work under pressure
        Poorly performs in stressful situations.`,
      },
      {
        title: 'Performance can disappoint sometimes',
        description: `The quality of work is below average, not always able to work under pressure.
        Issues with stress resistance may occur, as well.`,
      },
      {
        title: 'Ok. Right on target',
        description: `The employee consistently performs all the tasks assigned.
        The quality of work fully meets expectations and corresponds to their level. Stress-resistant.`,
      },
      {
        title: 'Sometimes pleasantly surprises with performance',
        description: `The quality of the work performed sometimes exceeds expectations.
        The employee performs well in stressful situations.`,
      },
      {
        title: 'Absolute delight. One in a million!',
        description: `The quality of the work performed often exceeds expectations.
        The employee does a lot more than expected and proved to be highly stress-resistant.`,
      },
    ],
  },
  {
    skill: 'communicationSkills',
    name: 'Communication skills',
    description: `How you assess this person's communication skills including language skills, listening, speaking,
      observing and empathizing. It includes interaction with members and customers`,
    skillGroup: [
      {
        title: `Complete frustration`,
        description: `A confrontational person, does not get along well with the team. It is dangerous to admit to the customer.`,
      },
      {
        title: 'Performance can disappoint sometimes',
        description: `There may be issues with team communication, but the employee is not hopeless.`,
      },
      {
        title: 'Ok. Right on target',
        description: `The employee has got good communication skills.`,
      },
      {
        title: 'Sometimes pleasantly surprises with performance',
        description: `Great relationships with colleagues.`,
      },
      {
        title: 'Absolute delight. One in a million!',
        description: `The employee is sociable, and has a positive effect on the climate of the whole team, by smoothing things over.`,
      },
    ],
  },
];

export const PROJECT_FEEDBACK_SKILLS: IFeedbackSkill[] = [
  {
    skill: 'question1',
    name: '	Overall satisfaction',
    description: `Do you like the domain area of the project? Is there an opportunity to develop your skills?`,
    skillGroup: [
      {
        title: `Complete frustration`,
      },
      {
        title: 'Performance can disappoint sometimes',
      },
      {
        title: 'Ok. Right on target',
      },
      {
        title: 'Sometimes pleasantly surprises with performance',
      },
      {
        title: 'Absolute delight. One in a million!',
      },
    ],
  },
  {
    skill: 'question4',
    name: 'Codebase',
    description: `Presence of legacy code.
      Code quality.
      Compliance of your technology stack with the one used on the project.`,
    skillGroup: [
      {
        title: `Complete frustration`,
      },
      {
        title: 'Performance can disappoint sometimes',
      },
      {
        title: 'Ok. Right on target',
      },
      {
        title: 'Sometimes pleasantly surprises with performance',
      },
      {
        title: 'Absolute delight. One in a million!',
      },
    ],
  },
  {
    skill: 'question2',
    name: 'Process quality',
    description: `Project work schedule.
    Workload, pushing from the customer.
    Availability of the necessary specialists in the team.
    Are there always tasks to do?
    How often do tasks' priority change? Is estimation realistic for performing the tasks?
    Do you have to switch to other tasks or fix urgent bugs often?`,
    skillGroup: [
      {
        title: `Complete frustration`,
      },
      {
        title: 'Performance can disappoint sometimes',
      },
      {
        title: 'Ok. Right on target',
      },
      {
        title: 'Sometimes pleasantly surprises with performance',
      },
      {
        title: 'Absolute delight. One in a million!',
      },
    ],
  },
  {
    skill: 'question5',
    name: 'Interaction with client',
    description: `Adequacy of communication from the customer's side.
      Pushing by the customer.
      Availability (speed of response to questions).
      Customer's involvement into the project.
      Low quality of the work among the customer's team.
      Adequacy of the customer's team.`,
    skillGroup: [
      {
        title: `Complete frustration`,
      },
      {
        title: 'Performance can disappoint sometimes',
      },
      {
        title: 'Ok. Right on target',
      },
      {
        title: 'Sometimes pleasantly surprises with performance',
      },
      {
        title: 'Absolute delight. One in a million!',
      },
    ],
  },
  {
    skill: 'question3',
    name: 'Documentation',
    description: `Are the requirements properly documented? How often do you need to clarify the requirements?
      Quality of the task and bug descriptions. Relevance of documentation.`,
    skillGroup: [
      {
        title: `Complete frustration`,
      },
      {
        title: 'Performance can disappoint sometimes',
      },
      {
        title: 'Ok. Right on target',
      },
      {
        title: 'Sometimes pleasantly surprises with performance',
      },
      {
        title: 'Absolute delight. One in a million!',
      },
    ],
  },
  {
    skill: 'question6',
    name: 'Project management',
    description: `Quality of PC/PM work (Andersen side).
      Regularity and quality of communication.
      Solving current problems on the project (within their competence).`,
    skillGroup: [
      {
        title: `Complete frustration`,
      },
      {
        title: 'Performance can disappoint sometimes',
      },
      {
        title: 'Ok. Right on target',
      },
      {
        title: 'Sometimes pleasantly surprises with performance',
      },
      {
        title: 'Absolute delight. One in a million!',
      },
    ],
  },
];

export const FEEDBACK_CONFIRM_MODAL_DATA = {
  titleText: 'Cancel asking for feedback?',
  subtitleText: 'Your colleagues will not receive a request',
  cancelBtnText: 'No',
  confirmBtnText: 'Yes',
};

export const FEEDBACK_RADIO_OPTIONS = [
  {
    name: 'Standard feedback',
    description: `The person will see your feedback, your avatar, name and position`,
    id: '1',
  },
  {
    name: 'Anonymous feedback',
    description: `The person will see your feedback, but your personality will remain incognito.
     Only some roles will be able to see your identity`,
    id: '2',
  },
  {
    name: 'Secret feedback',
    description: `The person won't see your feedback, but their managers will.
     Use such feedback if you want to complain about colleagues without hurting them`,
    id: '3',
  },
];

export const FEEDBACK_OPTIONS = [
  {
    name: 'Standard feedback',
    description: `The person will see your feedback, your avatar, name and position`,
    id: '1',
  },
  {
    name: 'Anonymous feedback',
    description: `The person will see your feedback, but your personality will remain incognito.
    Only some roles will be able to see your identity`,
    id: '2',
  },
  {
    name: 'Secret feedback',
    description: `The person won't see your feedback, but their managers will.
    Use such feedback if you want to complain about colleagues without hurting them`,
    id: '3',
  },
];

export const EXTERNAL_FEEDBACK_OPTIONS = [
  {
    name: 'Standard feedback',
    description: `The person will see your feedback and name`,
    id: '1',
  },
  {
    name: 'Anonymous feedback',
    description: `The person will see your feedback, but you will remain incognito. Only some roles will be authorized to see
     your identity`,
    id: '2',
  },
  {
    name: 'Secret feedback',
    description: `The person won’t see that you have left a feedback, but their PM, HR, RM and other authorized roles will.
     Use such type of feedback if you want to leave a complaint about an employee without hurting their feelings`,
    id: '3',
  },
];

export const FEEDBACK_AVAILABILITY_TYPE_DEFAULT = {
  id: 'Default',
  name: 'Default',
};

export const FEEDBACK_AVAILABILITY_TYPE_ANONYMOUS = {
  id: 'Anonymous',
  name: 'Anonymous',
  labelClass: LABEL_TYPES.LABEL_DEFAULT,
};

export const FEEDBACK_AVAILABILITY_TYPE_SECRET = {
  id: 'Hidden',
  name: 'Secret',
  labelClass: LABEL_TYPES.LABEL_YELLOW,
};

export const FEEDBACK_AVAILABILITY_TYPES = {
  [FEEDBACK_AVAILABILITY_TYPE_DEFAULT.id]: FEEDBACK_AVAILABILITY_TYPE_DEFAULT,
  [FEEDBACK_AVAILABILITY_TYPE_ANONYMOUS.id]: FEEDBACK_AVAILABILITY_TYPE_ANONYMOUS,
  [FEEDBACK_AVAILABILITY_TYPE_SECRET.id]: FEEDBACK_AVAILABILITY_TYPE_SECRET,
};

export const enum SKILL_CHUNK_SIZES {
  'Default' = 2,
  'Mobile' = 3
}

export const enum FEEDBACK_AVAILABILITY_TYPE {
  'Default' = 1,
  'Anonymous',
  'Secret'
}

export enum POSITION_TYPE
{
  'General' = 1,
  'Management',
  'ResourсeManagement',
  'TechSupport',
  'TechRuns',
  'Trainee',
  'HumanResources',
  'RMsCoordinates'
}

export const FEEDBACK_TYPES: IFeedbackType[] = [
  {
    id: 1,
    name: 'General',
    value: 'General',
    description: `Can be left for any employee of the company regardless of their role`,
  },
  {
    id: 2,
    name: 'Management',
    value: 'Management',
    description: `Can be left for PM, DM, SDM, DD. The user, creating the feedback,
    must be allocated on the same project as PM, DM, DD, SDM, DD`,
  },
  {
    id: 3,
    name: 'Resourсe management',
    value: 'ResourсeManagement',
    description: `Can be left for RD, SRM, RM, ARM. The user who creates the feedback
    must be assigned to this RD, SRM, RM, ARM.`,
  },
  {
    id: 4,
    name: 'Tech support',
    value: 'TechSupport',
    description: `Can be left for:
    An employee with “Shadow” allocation on the project by their Proxy
    An employee with "Proxy" allocation on the project by their Shadow
    PM, PC, DM, SDM, DD can leave feedback for both Proxy and Shadow`,
  },
  {
    id: 5,
    name: 'Tech runs',
    value: 'TechRuns',
    description: `...`,
  },
  {
    id: 6,
    name: 'Trainee',
    value: 'Trainee',
    isSecret: true,
    description: `Can be left for:
    An employee who works on training project with position "Trainee" or "Laboratory"
    by Project Manager or Project Coordinator of this project`,
  },
  {
    id: 7,
    name: 'Human Resources',
    value: 'HumanResources',
    description: `Can be left by an employee to their HR`,
  },
  {
    id: 8,
    name: `Resourсe management`,
    value: `RMsCoordinates`,
    description: 'Can be left by RD to their SRMs, by SRM to their RMs, by RM to their ARMs.',
  },
];
