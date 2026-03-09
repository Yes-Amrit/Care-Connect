"use client"


import { getDoctors } from "@/lib/actions/doctors"
import { createDoctor, getAvailableDoctors, updateDoctor } from "@/lib/actions/doctors"
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

export function useUpdateDoctor() {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: updateDoctor,
    onSuccess: () => {
      // invalidate related queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ["getDoctors"] });
    },
    onError: (error) => console.log("Error while  updating the doctor"),
  });

  return result;
}

// get available doctors for appointments
export function useAvailableDoctors() {
  const result = useQuery({
    queryKey: ["getAvailableDoctors"],
    queryFn: getAvailableDoctors,
  });

  return result;
}