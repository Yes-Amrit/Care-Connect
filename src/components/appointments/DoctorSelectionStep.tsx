import { useAvailableDoctors } from "@/app/hooks/use-doctors";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { MapPinIcon, PhoneIcon, StarIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { DoctorCardsLoading } from "./DoctorCardsLoading";

interface DoctorSelectionStepProps {
  selectedDentistId: string | null;
  onSelectDentist: (dentistId: string) => void;
  onContinue: () => void;
}

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

const getImageById = (gender: string, id: string) => {
  const images = gender === "MALE" ? maleImages : femaleImages;

  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash += id.charCodeAt(i);
  }

  const index = hash % images.length;
  return images[index];
};

function DoctorSelectionStep({
  onContinue,
  onSelectDentist,
  selectedDentistId,
}: DoctorSelectionStepProps) {
  const { data: dentists = [], isLoading } = useAvailableDoctors();

  if (isLoading)
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Choose Your Dentist</h2>
        <DoctorCardsLoading />
      </div>
    );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Choose Your Dentist</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dentists.map((dentist) => (
          <Card
            key={dentist.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedDentistId === dentist.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => onSelectDentist(dentist.id)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <Image
                    src={getImageById(dentist.gender, dentist.id)}
                    alt={dentist.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <CardTitle className="text-lg">{dentist.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {dentist.speciality || "General Dentistry"}
                  </CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium">5</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({dentist.appointmentCount} appointments)
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPinIcon className="w-4 h-4" />
                <span>Care Connect</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <PhoneIcon className="w-4 h-4" />
                <span>{dentist.phone}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {dentist.bio || "Experienced dental professional providing quality care."}
              </p>
              <Badge variant="secondary">Licensed Professional</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedDentistId && (
        <div className="flex justify-end">
          <Button onClick={onContinue}>Continue to Time Selection</Button>
        </div>
      )}
    </div>
  );
}
export default DoctorSelectionStep;