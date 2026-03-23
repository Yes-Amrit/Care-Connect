"use client";

import Navbar from "@/components/Navbar";
import { useUser } from "@clerk/nextjs";
import { SettingsIcon } from "lucide-react";
import { useGetDoctors } from "../hooks/use-doctors";
import { useGetAppointments } from "../hooks/use-appointments";
import AdminStats from "@/components/admin/AdminStats";
import DoctorsManagement from "@/components/admin/DoctorsManagement";
import RecentAppointments from "@/components/admin/RecentAppointments";

function AdminDashboardClient() {
  const { user } = useUser();
  const { data:doctors=[], isLoading: doctorsLoading  } = useGetDoctors();
  const { data:appointments=[], isLoading: appointmentLoading  } = useGetAppointments();

  //calculate stats from real Data
  const stats = {
    totalDoctors: doctors.length,
    activeDoctors: doctors.filter((doc) => doc.isActive).length,
    totalAppointments: appointments.length,
    completedAppointments: appointments.filter((app) => app.status === "COMPLETED").length
  }

  if(doctorsLoading || appointmentLoading) return <LoadingUi />

  console.log(doctors, appointments);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        {/* ADMIN WELCOME SECTION */}
        <div className="mb-12 flex items-center justify-between bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-8 border border-primary/20">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">Admin Dashboard</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, {user?.firstName || "Admin"}!
              </h1>
              <p className="text-muted-foreground">
                Manage doctors, oversee appointments, and monitor your dental practice performance.
              </p>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
              <SettingsIcon className="w-16 h-16 text-primary" />
            </div>
          </div>
        </div>

        <AdminStats
          totalDoctors={stats.totalDoctors}
          activeDoctors={stats.activeDoctors}
          totalAppointments={stats.totalAppointments}
          completedAppointments={stats.completedAppointments}
        />
        <DoctorsManagement />
        <RecentAppointments />
      </div>
    </div>
  );
}

export default AdminDashboardClient;

function LoadingUI() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingUi() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
  <div className="space-y-8 animate-pulse">
    {/* Header Skeleton */}
    <div className="flex justify-between items-end">
      <div className="space-y-3">
        <div className="h-8 w-48 bg-muted rounded-md" />
        <div className="h-4 w-64 bg-muted/60 rounded-md" />
      </div>
      <div className="h-10 w-32 bg-primary/20 rounded-lg" />
    </div>

    {/* Grid Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-32 bg-muted/40 rounded-xl border border-border" />
      ))}
    </div>
    
    {/* Large Content Area */}
    <div className="h-96 bg-muted/20 rounded-2xl border border-dashed border-border flex items-center justify-center">
       <p className="text-sm text-muted-foreground italic">Assembling your insights...</p>
    </div>
  </div>
</div>
  );
}