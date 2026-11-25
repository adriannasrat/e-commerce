import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { useAuth } from "../auth/AuthContext";
import type { Order } from "./orderDetails";

// The signed-in visitor's orders, newest first. The bag and the account page
// read the same query, so a change in one shows in the other.
export function useOrders() {
  const { user } = useAuth() as { user: { id: number } | null | undefined };
  return useQuery({
    queryKey: ["orders", user?.id],
    queryFn: () => api<Order[]>("GET", "/orders"),
    enabled: Boolean(user),
  });
}
