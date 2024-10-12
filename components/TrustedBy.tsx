import Image from 'next/image';

const brands = [
  { name: 'Harvard', logo: '/logos/harvard.svg' },
  { name: 'MIT', logo: '/logos/mit.svg' },
  { name: 'Stanford', logo: '/logos/stanford.svg' },
  { name: 'Oxford', logo: '/logos/oxford.svg' },
  { name: 'Cambridge', logo: '/logos/cambridge.svg' },
];

export default function TrustedBy() {
  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <p className="text-center text-gray-600 mb-4">Trusted by:</p>
        <div className="flex justify-center items-center space-x-8">
          {brands.map((brand) => (
            <div key={brand.name} className="w-24 h-12 relative">
              <Image
                src={brand.logo}
                alt={brand.name}
                layout="fill"
                objectFit="contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}