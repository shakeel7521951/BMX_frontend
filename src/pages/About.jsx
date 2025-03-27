import coins from '../assets/images/coins.webp';

function About() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${coins})` }}
    >
      <div className="w-full min-h-screen bg-[#1f2328d4] p-4 flex items-center justify-center">
        <section className="w-full max-w-3xl  bg-opacity-90 rounded-xl shadow-lg p-6 md:p-10 text-center">
          {/* Title */}
          <h1 className="text-2xl sm:text-5xl font-extrabold text-white mb-4">
            <span className="text-[#b39c2a]">BMX</span> Adventure
          </h1>

          {/* Welcome Section */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#b39c2a] uppercase">Welcome</h2>
            <p className="text-lg text-white uppercase">
              You are lucky! You joined <span className="font-bold">CashBeP</span>
            </p>
            <p className="text-white text-sm md:text-base uppercase">
              Now you are part of our team. It's our responsibility to give you good earnings, but to earn, you need to work as part of us.
            </p>
          </div>

          {/* Opportunity Section */}
          <div className="mt-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#b39c2a] uppercase">Exciting Opportunity!</h2>
            <p className="text-white text-sm md:text-base uppercase mt-2">
              Members who invite <span className="font-bold">50 members</span> in a month will be entered into a draw to win 10 grand prizes, including:
            </p>
            
            {/* Prize List */}
            <ul className="list-disc text-start sm:ml-10 flex-col flex flex-wrap justify-around items-baseline text-white text-lg mt-4 space-y-2">
              <li className="text-[#b39c2a]">Bikes</li>
              <li className="text-[#b39c2a]">Cash Prizes</li>
              <li className="text-[#b39c2a]">Android Phones</li>
              <li className="text-[#b39c2a]">Other Surprises</li>
            </ul>

            <p className="text-white text-sm md:text-base mt-4 sm:mb-10 mb-3 uppercase">
              The draw will be held at the end of every month.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
