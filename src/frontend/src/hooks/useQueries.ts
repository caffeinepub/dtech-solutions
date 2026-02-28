import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ServiceRequest } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllServiceRequests() {
  const { actor, isFetching: isActorFetching } = useActor();
  return useQuery<ServiceRequest[]>({
    queryKey: ["serviceRequests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllServiceRequests();
    },
    enabled: !!actor && !isActorFetching,
    refetchInterval: 30000,
    // Expose actor loading state via the query's pending state
  });
}

export function useSubmitServiceRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
      deviceType,
      issueDescription,
    }: {
      name: string;
      email: string;
      phone: string;
      deviceType: string;
      issueDescription: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitServiceRequest(
        name,
        email,
        phone,
        deviceType,
        issueDescription,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceRequests"] });
    },
  });
}

export function useUpdateRequestStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: bigint;
      status: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateRequestStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceRequests"] });
    },
  });
}
