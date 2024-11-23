import React from "react";

const WebDetail = () => {
  return (
    <section className="bg-orange-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">What is Etssi?</h2>
          <p className="text-lg text-gray-600 mt-4">
            Read our wonderfully weird story. A community doing good.
          </p>
        </div>

        <div className="mb-16">
          <h4 className="text-3xl font-semibold text-gray-800 text-center">
            A Global Marketplace
          </h4>
          <p className="text-lg text-gray-600 mt-4 text-center">
            Etssi is a global online marketplace, where people come together to
            make, sell, buy, and collect unique items. We’re also a community
            pushing for positive change for small businesses, people, and the
            planet. Here are some of the ways we’re making a positive impact,
            together.
          </p>
        </div>

        <div className="mb-16">
          <h4 className="text-3xl font-semibold text-gray-800 text-center">
            Support Independent Creators
          </h4>
          <p className="text-lg text-gray-600 mt-4 text-center">
            There’s no Etssi warehouse – just millions of people selling the
            things they love. We make the whole process easy, helping you
            connect directly with makers to find something extraordinary.
          </p>
        </div>

        <div className="mt-16 text-center">
          <h4 className="text-3xl font-semibold text-gray-800">Peace of Mind</h4>
          <p className="text-lg text-gray-600 mt-4">
            Your privacy is the highest priority of our dedicated team. And if
            you ever need assistance, we are always ready to step in for
            support.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <button className="btn bg-orange-500 text-white border-orange-500 hover:bg-yellow-500 hover:border-yellow-500 focus:bg-yellow-500 focus:border-yellow-500">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default WebDetail;