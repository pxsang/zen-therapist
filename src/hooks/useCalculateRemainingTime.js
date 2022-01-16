import {useCallback} from 'react';

function useCalculateRemainingTime() {
  const getRemainingTime = useCallback(sessionDetail => {
    const delta = new Date().getTime() - sessionDetail?.started_at;
    const remaining =
      sessionDetail?.request_services[0].duration - delta / 60000;

    return remaining <= 0 ? 0 : Math.ceil(remaining);
  }, []);

  return {getRemainingTime};
}

export default useCalculateRemainingTime;
