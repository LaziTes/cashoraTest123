interface SystemSettings {
  withdrawalMinLimit: number;
  withdrawalMaxLimit: number;
  sendMinLimit: number;
  sendMaxLimit: number;
  defaultTransactionFee: number;
  isPercentageFee: boolean;
}

let systemSettings: SystemSettings = {
  withdrawalMinLimit: 10,
  withdrawalMaxLimit: 10000,
  sendMinLimit: 1,
  sendMaxLimit: 5000,
  defaultTransactionFee: 2.5,
  isPercentageFee: true,
};

export const getSystemSettings = () => systemSettings;

export const updateSystemSettings = (newSettings: Partial<SystemSettings>) => {
  systemSettings = { ...systemSettings, ...newSettings };
  return systemSettings;
};

export const calculateFee = (amount: number) => {
  const { defaultTransactionFee, isPercentageFee } = systemSettings;
  return isPercentageFee ? (amount * defaultTransactionFee) / 100 : defaultTransactionFee;
};