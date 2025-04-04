import coins from '../assets/images/coins.webp';

function About() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center mb-10"
      style={{ backgroundImage: `url(${coins})` }}
    >
      <div className="w-full min-h-screen bg-[#1f2328d4] p-4 flex items-center justify-center">
        <section className="w-full max-w-3xl bg-opacity-90 rounded-xl shadow-lg p-2 md:p-10 text-center">
          {/* Title */}
          <h1 className="text-2xl sm:text-5xl font-extrabold text-white mb-4">
            <span className="text-[#b39c2a]">BMX</span> Adventure
          </h1>

          {/* Introduction Section */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#b39c2a] ">Global Employment Opportunities</h2>
            <p className="text-lg text-white ">
              Connecting people worldwide, providing equal employment opportunities across continents, benefiting individuals in South Asia, Europe, and the Gulf countries.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="mt-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#b39c2a] ">Exciting Benefits Await!</h2>
            <p className="text-white text-sm md:text-base  mt-2">
              Members enjoy luxurious vehicles and international trips, enhancing their experience and expanding their horizons.
            </p>
          </div>

          {/* Rewards Section */}
          <div className="mt-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#b39c2a] ">Expensive Rewards</h2>
            <p className="text-white text-sm md:text-base  mt-2">
              Members who invite <span className="font-bold">50 members</span> in a month will be entered into a draw to win 10 grand prizes, including:
            </p>
            <ul className="list-disc text-start px-4 sm:ml-10 flex-col flex flex-wrap justify-around items-baseline text-white text-lg mt-4 space-y-2">
              <li className="text-[#b39c2a]">Bikes</li>
              <li className="text-[#b39c2a]">Cash Prizes</li>
              <li className="text-[#b39c2a]">Android Phones</li>
              <li className="text-[#b39c2a]">Luxury Vehicles</li>
              <li className="text-[#b39c2a]">International Trips</li>
            </ul>
            <p className="text-white text-sm md:text-base mt-4 sm:mb-10 mb-3 ">
              The draw will be held at the end of every month.
            </p>
          </div>

          {/* Join Now Section */}
          <div className="mt-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#b39c2a] ">Join Now!</h2>
            <p className="text-white text-sm md:text-base mt-2">
              Become part of a thriving global community today and unlock thousands of dollars in earnings while connecting with a diverse international network.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
