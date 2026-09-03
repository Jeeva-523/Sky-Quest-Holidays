import React from "react";
import { Compass, Award, Shield, Users, Heart } from "lucide-react";
import { COMPANY_INFO } from "@/lib/data";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Collage Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80"
                alt="Munnar Hills"
                className="w-full h-56 object-cover rounded-2xl shadow-md"
              />
              <img
                src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=600&q=80"
                alt="Alleppey Houseboat"
                className="w-full h-40 object-cover rounded-2xl shadow-md"
              />
            </div>
            <div className="space-y-4 pt-8">
              <img
                src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80"
                alt="Ooty Nilgiri"
                className="w-full h-40 object-cover rounded-2xl shadow-md"
              />
              <img
                src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=600&q=80"
                alt="Thailand Beach"
                className="w-full h-56 object-cover rounded-2xl shadow-md"
              />
            </div>
          </div>

          {/* Right Content */}
          <div>
            <div className="inline-block px-4 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-4">
              About Sky Quest Holidays
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
              Passionate Travel Experts Based in Tamil Nadu
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              Founded with the vision to make holidays smooth, exciting, and accessible to everyone, <strong className="text-slate-900">Sky Quest Holidays</strong> has grown into one of South India&apos;s most dependable tour operators.
            </p>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-8">
              Whether you are looking for a romantic honeymoon escape in misty Munnar, an adventurous college industrial visit in Goa, a devotional pilgrimage to Rameshwaram, or an international package to Thailand and Malaysia, our dedicated team handles transport, deluxe accommodations, and on-ground logistics with utmost care.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div>
                <p className="text-2xl font-black text-sky-600">8+ Years</p>
                <p className="text-xs text-slate-500 font-medium">Experience</p>
              </div>
              <div>
                <p className="text-2xl font-black text-amber-500">500+ Trips</p>
                <p className="text-xs text-slate-500 font-medium">Completed</p>
              </div>
              <div>
                <p className="text-2xl font-black text-emerald-600">100%</p>
                <p className="text-xs text-slate-500 font-medium">Delight</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
