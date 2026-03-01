"use client"

import getDoctors, { createDoctor } from "@/lib/actions/doctors"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export function useGetDoctors(){
    const result = useQuery({
        queryKey: ["getDoctors"],
        queryFn: getDoctors,
    })

    return result;
} 

export function useCreateDoctor() {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: createDoctor,
    onSuccess: () => {
      // invalidate related queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ["getDoctors"] });
    },
    onError: (error) => console.log("Error while  creating a doctor"),
  });

  return result;
}
