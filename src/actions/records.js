export const RECEIVE_RECORDS= "RECEIVE_RECORDS";

export function receiveRecords(records){
  return {
    type: RECEIVE_RECORDS,
    records,
  };
}