export interface IMerchProduct {
  id: string;
  status?: string;
  name: string;
  description: string;
  price: number;
  isActive: boolean;
  url: string;
  parameters: IMerchProductParameter[];
  selectedParameterValuesId: MerchSelectedParameterValue[];

  itemId?: string;
  countItems?: number;
  createDate?: string;
  updateDate?: string;
}

export interface IMerchProductParameter {
  id: string;
  name: string;
  description: string;
  isHaveHelpPhoto: boolean;
  url: string;
  isColorCode: boolean;
  parameterValues: MerchParameterValue[];
}

export interface MerchSelectedParameterValue {
  id: string;
  parameterValueId: string;
}

export interface MerchParameterValue {
  id: string;
  url: string;
  value: string;
  isActive: boolean;
}
