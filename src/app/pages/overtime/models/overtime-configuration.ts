import { IOvertimeConfiguration, IOvertimeConfigurationResponse } from './../../../interfaces/overtime.interface';

export class OvertimeConfiguration implements IOvertimeConfiguration {
  values = null;
  required = null;

  constructor(configuration: IOvertimeConfigurationResponse) {
    this.values = {
      ratio: configuration.ratioDefault,
      overType: { name: configuration.name, id: configuration.id }
    };
    this.required = {
      overTypeId: true,
      projectId: true,
      additionalApproverId: true,
      attachment: true,
      ratio: configuration.ratioRequired,
      hours: configuration.hoursRequired,
      sum: configuration.sumRequired,
      currency: configuration.sumRequired,
      wardEmployeeId: configuration.wardEmployeeRequired,
      position: configuration.positionRequired,
      level: configuration.levelRequired,
      comment: configuration.commentRequired,
      projectAndersen: configuration.projectAndersen,
      projectsOther: configuration.projectsOther,
      hintLink: configuration.hintLink,
      additionalApproverRequired: configuration.additionalApproverRequired,
      currencyRestrictions: configuration.currencyRestrictions,
      locationSelectRequired: configuration.locationSelectRequired,
      location: configuration.location,
      jiraLink: configuration.jiraLink
    };
  }
}
