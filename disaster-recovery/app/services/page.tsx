import Services from "@/components/Services";

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8">
          <span className="gradient-text">Our Professional</span>
          <span className="text-white"> Services</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto text-center mb-12">
          We provide comprehensive disaster recovery solutions with 24/7 emergency response
        </p>
      </div>
      <Services />
    </div>
  );
}