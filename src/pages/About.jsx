import React from "react";
import { Helmet } from "react-helmet";
import HeadingText from "../components/UI/HeadingText";
import Container from "../components/UI/Container";
import { motion } from "framer-motion";
import { FaGraduationCap, FaUsers, FaGlobe, FaLightbulb } from "react-icons/fa";

const About = () => {
  const stats = [
    { icon: <FaGraduationCap />, label: "Students", value: "50K+" },
    { icon: <FaUsers />, label: "Instructors", value: "1.2K+" },
    { icon: <FaGlobe />, label: "Countries", value: "80+" },
    { icon: <FaLightbulb />, label: "Courses", value: "5K+" },
  ];

  const values = [
    {
      title: "Our Mission",
      description: "To democratize education by providing high-quality, accessible, and affordable learning opportunities to everyone, everywhere.",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Our Vision",
      description: "Building a world where anyone can master any skill they desire, bridging the gap between ambition and achievement.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
    },
  ];

  return (
    <div className="pb-20">
      <Helmet>
        <title>Skill Spark | About Us</title>
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-[400px] rounded-[3rem] overflow-hidden mb-20 shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1600" 
          alt="About Skill Spark" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center p-12 md:p-24">
          <div className="max-w-2xl space-y-6">
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-7xl font-bold text-white heading-font leading-tight"
            >
              Igniting the <span className="text-secondary">Spark</span> of Learning
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-200 text-lg md:text-xl leading-relaxed"
            >
              Skill Spark is more than just a platform; it's a global community of curious minds and expert mentors dedicated to the pursuit of excellence.
            </motion.p>
          </div>
        </div>
      </div>

      <Container>
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="glass-effect p-8 rounded-3xl text-center border border-base-300/50 shadow-sm"
            >
              <div className="text-3xl text-primary mb-4 flex justify-center">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold heading-font mb-1">{stat.value}</h3>
              <p className="text-gray-500 font-medium uppercase text-xs tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="space-y-24">
          {values.map((item, i) => (
            <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>
              <div className="flex-1 space-y-6">
                <h2 className="text-4xl font-bold heading-font gradient-text">{item.title}</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.description}
                </p>
                <div className="h-1 w-20 bg-primary rounded-full"></div>
              </div>
              <div className="flex-1 w-full h-[400px] rounded-[2.5rem] overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-32 glass-effect p-12 md:p-20 rounded-[3rem] text-center border border-primary/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold heading-font">Ready to start your journey?</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              Join thousands of students already learning and growing with Skill Spark.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="btn gradient-primary px-10 py-4 rounded-2xl text-white border-none shadow-xl hover:shadow-primary/30 transform hover:scale-105 transition-all">
                Explore Courses
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default About;
