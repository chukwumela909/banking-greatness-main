import { fetchDetails } from "@/server/actions/createUser";
import { useQuery } from "@tanstack/react-query";

export function useFetchInfo() {
  return useQuery({
    queryFn: async () => fetchDetails(),
    queryKey: ["deets"],
  });
}
