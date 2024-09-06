import { IOvertimeForEditing, IOvertimeConfiguration, IOvertimeResponse } from '@interfaces/overtime.interface';

export class OvertimeForEditing implements IOvertimeForEditing {
  id = '';
  configuration: IOvertimeConfiguration = null;

  constructor(overtime: IOvertimeResponse) {
    const {
      overType: configuration,
      wardEmployee = { name: null, id: null, position: null, level: null }
    } = overtime;

    this.id = overtime.id;
    this.configuration = {
      values: {
        ratio: configuration.ratioDefault,
        overType: { name: configuration.name, id: configuration.id },
        project: overtime.project,
        additionalApprover: overtime.additionalApprover,
        hours: overtime.hours,
        sum: overtime.sum,
        currency: overtime.currency,
        wardEmployee: {
          id: wardEmployee.id,
          name: wardEmployee.name
        },
        position: overtime.position,
        level: {
          id: wardEmployee.id,
          name: overtime.level
        },
        comment: overtime.comment,
        attachments: overtime.attachments,
        id: overtime.id,
        projectAndersen: overtime.overType.projectAndersen,
        projectsOther: overtime.overType.projectsOther,
        hintLink: overtime.overType.hintLink,
        jiraLink: overtime.jiraLink
      },
      required: {
        overTypeId: true,
        projectId: true,
        additionalApproverId: true,
        ratio: configuration.ratioRequired,
        hours: configuration.hoursRequired,
        sum: configuration.sumRequired,
        currency: configuration.currencyRequired,
        wardEmployeeId: configuration.wardEmployeeRequired,
        position: configuration.positionRequired,
        level: configuration.levelRequired,
        comment: configuration.commentRequired,
        attachment: true,
        projectAndersen: configuration.projectAndersen,
        projectsOther: configuration.projectsOther,
        hintLink: configuration.hintLink,
        additionalApproverRequired: configuration.additionalApproverRequired,
        currencyRestrictions: configuration.currencyRestrictions,
        locationSelectRequired: configuration.locationSelectRequired,
        location: overtime.location,
        jiraLink: overtime.overType.jiraLink
      }
    };
  }
}
