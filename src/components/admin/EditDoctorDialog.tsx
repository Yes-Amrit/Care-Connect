import { Doctor } from "@prisma/client";
import { useState } from "react";

interface EditDoctorDialogProps{
    isOpen: boolean;
    onClose: () => void,
    doctor: Doctor | null;
}

function EditDoctorDialog({doctor, isOpen, onClose }: EditDoctorDialogProps) {
    const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(doctor);

    console.log(editingDoctor);

  return (
    <div>EditDoctorDialog</div>
  )
}

export default EditDoctorDialog