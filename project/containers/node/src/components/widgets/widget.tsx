import {
  AssetGet,
  AssetType,
  CryptoGet,
  StockGet,
  WidgetDistributionGet,
  WidgetGet,
  WidgetNetworthGet,
  WidgetType,
  WidgetWatchlistGet,
} from "@/lib/services/returnTypes";
import DistributionWidget from "./distributionWidget";
import NetworthWidget from "./networthWidget";
import WatchlistWidget from "./watchlistWidget";

interface WidgetProps {
  objectWidget: WidgetGet;
  id: number;
  // if objectToDeleteId is not null, it should be deleted from the db
  onDeleteRequested: (id: number, objectToDelete?: WidgetGet) => void;
}

export default function Widget({ objectWidget, id, onDeleteRequested }: WidgetProps) {
  const sendDeleteToParent = (deleteFromDb: boolean) => {
    if (deleteFromDb) {
      onDeleteRequested(id, objectWidget);
    } else {
      onDeleteRequested(id);
    }
  };

  return (
    <>
      {objectWidget.widgetType == WidgetType.DISTRIBUTION ? (
        <DistributionWidget
          onDelete={sendDeleteToParent}
          isCreation={false}
          objectWidget={objectWidget as WidgetDistributionGet}
        />
      ) : objectWidget.widgetType == WidgetType.NETWORTH ? (
        <NetworthWidget
          onDelete={sendDeleteToParent}
          isCreation={false}
          objectWidget={objectWidget as WidgetNetworthGet}
        />
      ) : objectWidget.widgetType == WidgetType.WATCHLIST ? (
        <WatchlistWidget
          onDelete={sendDeleteToParent}
          isCreation={false}
          objectWidget={objectWidget as WidgetWatchlistGet}
        />
      ) : (
        <></>
      )}
    </>
  );
}
