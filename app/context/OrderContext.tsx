import React, { createContext, useState, useContext } from "react";

interface Order {
  orderId: string;
  items: any[];
  total: number;
  type: string;
}

interface OrderContextType {
  tableOrders: { [key: string]: Order | null };
  assignOrderToTable: (tableId: string, order: Order) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [tableOrders, setTableOrders] = useState<{
    [key: string]: Order | null;
  }>({
    T1: null,
    T2: null,
    T3: null,
    T4: null,
    T5: null,
    T6: null,
  });

  const assignOrderToTable = (tableId: string, order: Order) => {
    setTableOrders((prev) => ({ ...prev, [tableId]: order }));
  };

  return (
    <OrderContext.Provider value={{ tableOrders, assignOrderToTable }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within OrderProvider");
  return context;
};
