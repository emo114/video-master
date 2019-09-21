

export const genLoginParams = (deviceCode) => {
  const versionType = '2';
  const version = '1.1.0';
  const fromCode = 'android';
  return {deviceCode,version,versionType,fromCode}
};
