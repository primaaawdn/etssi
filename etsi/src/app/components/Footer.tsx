import React from 'react';

const Footer = () => {
  return (
    <footer className="sticky bottom-0 w-full bg-base-200 py-5 px-7">
      <div className="flex justify-between items-center">
        <div className="space-x-4">
          <span>Indonesia</span>
          <span>English (US)</span>
          <span>Rp (IDR)</span>
        </div>
        <div className="text-center text-sm">
          <div className="space-x-4 mt-2">
          <a>© 2024 Etsy, Inc.</a>
            <a href="#" className="link link-hover">Terms of Use</a>
            <a href="#" className="link link-hover">Privacy</a>
            <a href="#" className="link link-hover">Interest-based ads</a>
            <a href="#" className="link link-hover">Local Shops</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
