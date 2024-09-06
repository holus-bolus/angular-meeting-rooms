export interface SubmittedOvertime {
  type: string;
  subtype: string;
  category: string;
  project: string;
  date: string;
  sum: string;
  jiraLink: string;
  status: string;
}

export const submittedOvertimes: SubmittedOvertime[] = [
  {
    type: 'Presales',
    subtype: 'Technical task completion',
    category: 'Over',
    project: 'Andersen Portal',
    date: '19 Oct. 2021',
    sum: '4900.99 USD',
    jiraLink: 'https:/jira.andersenlab/browseradghgzuyrueshdsfgsdgsdgdsgdsgsdgsdgsdgsdgdsgsdgsdgsgsdgsdgsdg',
    status: 'Not collected',
  },
  {
    type: 'KPI',
    subtype: 'KPI лидогенерация',
    category: 'Over',
    project: 'Andersen Portal',
    date: '11 Oct. 2021',
    sum: '100 USD',
    jiraLink: 'https:/jira.andersenlab/browseradghgzuyrueshdsfgsdgsdgdsgdsgsdgsdgsdgsdgdsgsdgsdgsgsdgsdgsdg',
    status: 'Collected',
  },
  {
    type: 'Business trip',
    subtype: 'Administration',
    category: 'Compensation',
    project: 'Andersen Portal',
    date: '18 Oct. 2021',
    sum: '500 USD',
    jiraLink: 'https:/jira.andersenlab/browseradghgzuyrueshdsfgsdgsdgdsgdsgsdgsdgsdgsdgdsgsdgsdgsgsdgsdgsdg',
    status: 'Active',
  },
  {
    type: 'Apatment rent',
    subtype: '',
    category: 'Compensation',
    project: 'Andersen Portal',
    date: '21 Oct. 2021',
    sum: '400 USD',
    jiraLink: 'https:/jira.andersenlab/browseradghgzuyrueshdsfgsdgsdgdsgdsgsdgsdgsdgsdgdsgsdgsdgsgsdgsdgsdg',
    status: 'Active',
  },
];
