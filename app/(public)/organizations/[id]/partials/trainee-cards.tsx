import Image from "next/image";

export type Trainee = {
  id: string;
  fullName: string;
  profilePhoto: string | null;
  email: string | null;
  phoneNumber: string | null;
  address: string | null;
  skills: string[];
};

export type TraineeCardsProps = {
  trainees: Trainee[];
};

export default function TraineeCards({ trainees }: TraineeCardsProps) {
  if (trainees.length === 0) {
    return (
      <section className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">Trainees</h2>
        <p className="text-sm text-muted-foreground">No trainees yet.</p>
      </section>
    );
  }

  return (
    <>
      <div className="relative mx-auto my-10 flex max-w-300 flex-col items-start justify-center gap-10 pb-12">
        <h2 className="text-2xl font-semibold">Trainees</h2>

        {/* Profile Cards */}
        <div className="container grid grid-cols-4 gap-4 w-full drop-shadow-xl">
          {trainees.map((trainee) => (
            <div
              key={trainee.id}
              className="container flex flex-col items-center gap-3 px-6 py-4 bg-background rounded-4xl border"
            >
              {/* Image Container */}
              <div className="relative aspect-square h-60 shrink-0 overflow-hidden">
                {trainee.profilePhoto ? (
                  <Image
                    src={`/api/image-proxy?url=${encodeURIComponent(trainee.profilePhoto)}`}
                    alt={trainee.fullName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300 z-10"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                    unoptimized
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground z-10">
                    No image
                  </div>
                )}
                <div
                  id="profile-bg"
                  className="absolute inset-x-0 bottom-0 h-30 bg-[#C2E2FA] z-0 rounded-t-2xl"
                />
              </div>

              <div className="relative flex flex-col items-start w-full text-center mb-2">
                <h2 className="text-lg font-semibold ">{trainee.fullName}</h2>
                <p className="text-xs font-normal">{trainee.email}</p>
                <p className="text-xs font-normal">{trainee.phoneNumber}</p>
                <p className="text-xs font-normal mt-2 self-end">{trainee.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
