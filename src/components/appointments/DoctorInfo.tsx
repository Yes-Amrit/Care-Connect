import { useAvailableDoctors } from "@/app/hooks/use-doctors";
import Image from "next/image";

const maleImages = [
  "/male-img1.jpg",
  "/male-img2.jpg",
  "/male-img3.jpg",
  "/male-img4.jpg",
  "/male-img5.jpg",
  "/male-img6.jpg",
];

const femaleImages = [
  "/female-img1.jpg",
  "/female-img2.jpg",
  "/female-img3.jpg",
  "/female-img4.jpg",
  "/female-img5.jpg",
  "/female-img6.jpg",
  "/female-img7.jpg",
];

const getImageById = (gender: string | null | undefined, id: string) => {
  const images = gender === "MALE" ? maleImages : femaleImages;

  let hash = 0;
  for (const char of id) {
    hash += char.charCodeAt(0);
  }

  return images[hash % images.length];
};

function DoctorInfo({ doctorId }: { doctorId: string }) {
  const { data: doctors = [] } = useAvailableDoctors();

  const doctor = doctors.find((d) => d.id === doctorId);

  if (!doctor) return null;

  const avatar = getImageById(doctor.gender, doctor.id);

  return (
    <div className="flex items-center gap-4">
      <Image
        src={avatar}
        alt={doctor.name}
        width={48}
        height={48}
        className="rounded-full object-cover"
      />

      <div>
        <h3 className="font-medium">{doctor.name}</h3>
        <p className="text-sm text-muted-foreground">
          {doctor.speciality || "General Dentistry"}
        </p>
      </div>
    </div>
  );
}

export default DoctorInfo;