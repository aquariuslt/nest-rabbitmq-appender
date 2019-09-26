/**
 * getting information from container environment variables
 * using kubernetes downward api definitions
 **/

const POD_ENVS = {
  NODE_IP: 'NODE_IP',
  POD_IP: 'POD_IP',
  POD_NAMESPACE: 'POD_NAMESPACE',
  POD_UID: 'POD_UID'
};

export const getPodInfo = () => {
  const podInfo = {
    NODE_IP: getEnv(POD_ENVS.NODE_IP),
    POD_IP: getEnv(POD_ENVS.POD_IP),
    POD_NAMESPACE: getEnv(POD_ENVS.POD_NAMESPACE),
    POD_UID: getEnv(POD_ENVS.POD_UID)
  };

  return JSON.parse(JSON.stringify(podInfo));
};

const getEnv = (key: string) => process.env[key] || undefined;
