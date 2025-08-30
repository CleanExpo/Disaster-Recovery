export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-centre mb-12">Customer Testimonials</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mb-4">"Excellent service during our flood emergency."</p>
            <p className="font-semibold">- John D., Sydney</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mb-4">"Professional and efficient restoration team."</p>
            <p className="font-semibold">- Sarah M., Melbourne</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mb-4">"Insurance process was seamless with their help."</p>
            <p className="font-semibold">- Mike R., Brisbane</p>
          </div>
        </div>
      </div>
    </section>
  );
}