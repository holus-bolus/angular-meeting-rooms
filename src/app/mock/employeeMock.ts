import { IUserInfo } from '@interfaces/userInfo.interface';

export const employeeMock:IUserInfo = {
  externalId: 'f46540ef-6c0a-11ed-85f1-0c9d92c3d39d',
  fullNameRu: 'Ramanovich Anton',
  fullNameEn: 'Ramanovich Anton',
  location: {
    id:'d51d5a36-6163-11ec-85ec-0c9d92c3d39d',
    name:'Remote Poland',
  },
  cityCountryLocation: {
    cityId:'e9cb8edf-a5db-11ec-85ef-0c9d92c3d39d',
    cityTitle:'Gdansk',
    countryId:'b42f2678-01f5-11ec-85ea-0c9d92c3d39d',
    countryTitle:'Poland',
  },
  birthDate: '1989-08-21T00:00:00',
  canEditExpertActivities: false,
  emailCorp: 'a.ramanovich@andersenlab.com',
  email: 'anton.romanovich21@icloud.com',
  expertActivities: [
    {
      id:'c598daeb-daa6-11ec-85f0-0c9d92c3d39d',
      activityName:'Demo Interview',
      isActive:false,
    },
    {
      id:'c598daec-daa6-11ec-85f0-0c9d92c3d39d',
      activityName:'Mentoring',
      isActive:false,
    },
    {
      id:'c598daed-daa6-11ec-85f0-0c9d92c3d39d',
      activityName:'Project Estimation',
      isActive:false,
    },
    {
      id:'c598daee-daa6-11ec-85f0-0c9d92c3d39d',
      activityName:'Service Presentation',
      isActive:false,
    },
    {
      id:'c598daef-daa6-11ec-85f0-0c9d92c3d39d',
      activityName:'Technical Interview',
      isActive:false,
    },
    {
      id:'c598daf0-daa6-11ec-85f0-0c9d92c3d39d',
      activityName:'Technical Task Implementation',
      isActive:false,
    },
  ],
  skype: 'anton.romanovich21',
  mobilePhone: '+375296862777',
  isWork: true,
  nextAssessmentDate: '2023-02-01T00:00:00',
  photo: 'http://team.andersenlab.com/api/employee/photo/f46540ef-6c0a-11ed-85f1-0c9d92c3d39d',
  roles: [],
  level: 'string',
  startDate: '2022-11-24T00:00:00',
  vacations: [],
  dayOff: [],
  position: 'Laboratory',
  department: 'JS',
  technologies: [{ id:'fc8c5d8c-b89d-11e5-9fdb-0050569441cb', name:'Angular', main:true }],
  resourceManagerHierarchy: [
    {
      id:'b44ac154-dd01-11e3-b804-0050569441cb',
      name:'Khomich Alexandr',
      isWork:true,
    },
    {
      id:'192b0cc1-9788-11e4-9367-0050569441cb',
      name:'Grigoryev Alexandr',
      isWork:true,
    },
    {
      id:'34cdd9ec-1ec9-11e8-8bb9-00155d9c500d',
      name:'Krepkina Darya',
      isWork:true,
    },
    {
      id:'a606ec1b-d5c2-11eb-85e9-0c9d92c3d39d',
      name:'Pryiezzhykh Yana',
      isWork:true,
    },
    {
      id:'3157e86a-6bcb-11ed-85f1-0c9d92c3d39d',
      name:'Maslakova Katsiaryna',
      isWork:true,
    },
  ],
  hrManager: { id:'aff26144-4d71-11ea-a83a-00155d9c500d', name:'Bolotynska Oleksandra', isWork:true },
  isHideBirthday: true,
  isHidePhone: true,
  languages: [
    {
      id:'3152ac34-c5c2-11ea-85e3-3497f65c56b3',
      name:'English',
      level:'B1',
    },
  ],
  allocationsCurrent: [{ type:'Trainee', role:'Developer', hours:5, rate:false, startDate:'2023-02-16T00:00:00' }],
  allocationsPrevious: [],
};
