import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const Contact: React.FC = () => {
  return (
    <section id="contact" className="section-padding relative overflow-hidden w-full">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2">
            <h2 className="heading-2 text-left mb-8">Let's Discuss Your Vision</h2>
            <p className="text-slate-400 text-xl mb-12 leading-relaxed">
              Whether you're looking to build a new product or scale an existing one, our team is ready to deliver excellence.
            </p>

            <div className="space-y-8">
              {[
                { icon: MapPin, title: "Our Location", val: "Pakistan" },
                { icon: Mail, title: "Email Inquiry", val: "aformixtech@gmail.com" },
                { icon: Phone, title: "Direct Line", val: "+92 301 9170936" }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl glass-effect flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-lg">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">{item.title}</h4>
                    <p className="text-white text-lg font-bold">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form>
            <h2>Contact Us</h2>
            <div className="input-box">
              <label>Full Name</label>
              <input type="text" className="field" placeholder="John Doe" required />
            </div>
            <div className="input-box">
              <label>Email Address</label>
              <input type="email" className="field" placeholder="example@gmail.com" required />
            </div>
            <div className="input-box">
              <label>Message</label>
              <textarea className="field mess" placeholder="Write your message..." required></textarea>
            </div>
            <button type="submit" className="btn-primary w-full">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
