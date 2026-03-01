"use client"

import { getAppointments } from "@/lib/actions/appointments";
import { useQuery } from "@tanstack/react-query"

export function useGetAppointment() {
    const results = useQuery({
        queryKey: ["getAppointments"],
        queryFn:  getAppointments,
    })
    return results;
}