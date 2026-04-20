import bottleImage from "../../assets/aninna-bottle.jpg";
import applicationImage from "../../assets/aninna-application.jpg";
import detailImage from "../../assets/aninna-detail.jpg";

export default function ProductGallerySection() {
  const images = [
    {
      src: bottleImage,
      alt: "ANINNA serum bottle on a clean background",
      title: "Signature Bottle",
    },
    {
      src: applicationImage,
      alt: "Applying ANINNA scalp serum",
      title: "Targeted Application",
    },
    {
      src: detailImage,
      alt: "Close-up detail of ANINNA packaging",
      title: "Luxury Detail",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#d4a83e]">
          Product Gallery
        </p>

        <h3 className="mb-4 text-4xl font-semibold text-[#7b3327]">
          Designed to Feel as Beautiful as It Performs
        </h3>

        <p className="mx-auto max-w-3xl text-lg leading-8 text-[#6f6159]">
          From the bottle design to the scalp ritual itself, ANINNA is created
          to bring intention, elegance, and comfort into your daily routine.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {images.map((image) => (
          <div
            key={image.title}
            className="overflow-hidden rounded-[2rem] bg-white shadow-sm"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition duration-300 hover:scale-105"
              />
            </div>

            <div className="p-6">
              <h4 className="text-xl font-semibold text-[#7b3327]">
                {image.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}