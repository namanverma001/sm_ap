import { v4 as uuidv4 } from 'uuid';

export const getDeviceId = () => {
  let deviceId = localStorage.getItem('device_id');
  if (!deviceId) {
    const fullUuid = uuidv4(); // e.g., '2f1c68ec-3ef4-4263-9b11-ec60fc8fc7da'
    // const minLength = 9;
    // const maxLength = 20;

    // Trim from start to maintain dash positions
    deviceId = fullUuid.substring(0, 20);
    
    localStorage.setItem('device_id', deviceId);
  }
  return deviceId;
};

export const updateDeviceId = (newDeviceId) => {
  // const newDeviceId = uuidv4().substring(0, 16); // You can adjust length as per your needs
  localStorage.setItem('device_id', newDeviceId);
  return newDeviceId;
};