import Headerbox from '@/components/Headerbox';

const InvestmentPage = () => {
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <Headerbox
            type="greeting"
            title="Investment"
            user="Karim"
            subtext="Grow your capital with diversified investment plans"
          />
        </header>

        <section className="recent-transactions">
          <div className="flex w-full flex-wrap gap-4">
            <article className="bank-info w-full max-w-[300px] rounded-xl p-6">
              <div>
                <span className="text-12 font-semibold text-blue-700">Portfolio</span>
                <h3 className="mt-3 text-24 font-semibold text-gray-900">Growth plan</h3>
                <p className="mt-2 text-14 text-gray-600">Available: $8,420</p>
              </div>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-12 font-bold text-blue-700">+4.8%</span>
            </article>

            <article className="bank-info w-full max-w-[300px] rounded-xl p-6">
              <div>
                <span className="text-12 font-semibold text-blue-700">Savings strategy</span>
                <h3 className="mt-3 text-24 font-semibold text-gray-900">Long term</h3>
                <p className="mt-2 text-14 text-gray-600">Diversified basket</p>
              </div>
              <span className="rounded-full bg-green-100 px-3 py-1 text-12 font-bold text-green-700">Plan</span>
            </article>
          </div>
        </section>
      </div>
    </section>
  );
};

export default InvestmentPage;
