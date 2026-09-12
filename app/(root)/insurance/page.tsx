import Headerbox from '@/components/Headerbox';

const InsurancePage = () => {
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <Headerbox
            type="greeting"
            title="Insurance"
            user="Karim"
            subtext="Protect your daily life, your family and your assets"
          />
        </header>

        <section className="recent-transactions">
          <div className="flex w-full flex-wrap gap-4">
            <article className="bank-info w-full max-w-[300px] rounded-xl p-6">
              <div>
                <span className="text-12 font-semibold text-blue-700">Life coverage</span>
                <h3 className="mt-3 text-24 font-semibold text-gray-900">Health + family</h3>
                <p className="mt-2 text-14 text-gray-600">Active contract</p>
              </div>
              <span className="rounded-full bg-green-100 px-3 py-1 text-12 font-bold text-green-700">2026</span>
            </article>

            <article className="bank-info w-full max-w-[300px] rounded-xl p-6">
              <div>
                <span className="text-12 font-semibold text-blue-700">Property</span>
                <h3 className="mt-3 text-24 font-semibold text-gray-900">Home protection</h3>
                <p className="mt-2 text-14 text-gray-600">Premium security</p>
              </div>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-12 font-bold text-blue-700">Policy</span>
            </article>
          </div>
        </section>
      </div>
    </section>
  );
};

export default InsurancePage;
