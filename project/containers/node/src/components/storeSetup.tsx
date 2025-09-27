import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeStore } from "@/lib/managers/storeManager";

const StoreSetup: React.FC = () => {
  const { isInitialised } = useSelector((state: any) => state.isInitialised);
  const dispatch = useDispatch();
  let isInitializeCalled = false;
  useEffect(() => {
    if (!isInitialised && !isInitializeCalled) {
      initializeStore(dispatch);
      isInitializeCalled = true;
    }
  }, []);

  return <></>;
};

export default StoreSetup;
