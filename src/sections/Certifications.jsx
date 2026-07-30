import React, { useState } from 'react';
import CertificateCard from '../components/CertificateCard';
import ImageModal from '../components/ImageModal';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Certifications = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });
  const [activeCert, setActiveCert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('formal'); // 'formal' | 'event'

  const certificationsData = [
    {
      title: "Introduction to Modern AI",
      issuer: "Cisco",
      date: "Jul 2026",
      type: "formal",
      link: "https://www.credly.com/badges/3ace38a7-70c8-4c45-903a-00e20115abde",
      imageSrc: "/assets/IntroToModernAICert.jpg",
      description: "Covers core artificial intelligence concepts, machine learning algorithms, deep learning neural networks, and their real-world applications in solving complex modern challenges."
    },
    {
      title: "Introduction to Cybersecurity",
      issuer: "Cisco",
      date: "Jul 2026",
      type: "formal",
      link: "https://www.credly.com/badges/3c5eeca2-791a-48b2-a34e-eb0196c88fb2",
      imageSrc: "/assets/IntroToCyberSectCert.jpg",
      description: "Demonstrates a foundational understanding of cybersecurity principles, including common network threats, vulnerabilities, data protection, and key security practices to safeguard digital environments."
    },
    {
      title: "OPSWAT Introduction to Critical Infrastructure Protection (ICIP)",
      issuer: "OPSWAT",
      date: "Jul 2026",
      type: "formal",
      link: "https://learn.opswatacademy.com/certificate/O91A-zdZtA",
      imageSrc: "/assets/introduction_to_cip.png",
      description: "Covers fundamental critical infrastructure protection concepts, methodologies, and cybersecurity frameworks required to secure IT and operational technology (OT) environments."
    },
    {
      title: "LFC108: Cybersecurity Essentials",
      issuer: "The Linux Foundation",
      date: "Jul 2026",
      type: "formal",
      link: "https://www.credly.com/badges/ffe188c3-1818-43ee-9fcf-4604a74b72f5/public_url",
      imageSrc: "/assets/lfc108-cybersecurity-essentials.png",
      description: "Demonstrates understanding of security practices and precautions for online activities to minimize risks and protect personal and professional information from exposure, compromise, or data breaches."
    },
    {
      title: "AWS AI Practitioner Challenge",
      issuer: "Udacity",
      date: "Jun 2026",
      type: "formal",
      link: "https://www.udacity.com/certificate/e/e868b906-2c02-11f1-bc94-5f914c183c12",
      imageSrc: "/assets/AwsAiPractitioner.png",
      description: "Demonstrates core proficiency in artificial intelligence foundations, machine learning models, and cloud-based AI services on the AWS platform."
    },

    {
      title: "Red vs. Blue Attack & Defense Event",
      issuer: "JISSA - TIPQC",
      date: "Nov 2025",
      type: "event",
      imageSrc: "/assets/RedVsBlueEvent.jpg",
      description: "Participated in an active cyber defense simulation workshop. Competed in penetration testing, threat hunting, vulnerability patching, and infrastructure hardening exercises."
    },
    {
      title: "AWS Student re:Invent Event",
      issuer: "Amazon Web Services",
      date: "Dec 2025",
      type: "event",
      imageSrc: "/assets/AWSstudentReInventEvent.jpg",
      description: "Attended the AWS Student re:Invent event to study cloud computing foundations, containerized workflows, serverless architectures, and zero-trust identity policies."
    }
  ];

  const handleViewCredential = (cert) => {
    setActiveCert(cert);
    setIsModalOpen(true);
  };

  const filteredData = certificationsData.filter(item => item.type === filter);

  return (
    <section id="certifications" ref={sectionRef} className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`mb-12 border-b border-gray-800/50 pb-6 space-y-6 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-4">
            <span className="text-accent font-mono text-2xl">04.</span> Certifications & Events
            <div className="h-px bg-gray-800 w-32 hidden md:block"></div>
          </h2>
          
          {/* Centered filter toggle buttons below the heading */}
          <div className="flex justify-center">
            <div className="flex bg-surface p-1 rounded-lg border border-gray-800 w-fit">
              <button
                onClick={() => setFilter('formal')}
                className={`px-6 py-1.5 rounded-md text-sm font-mono transition-all duration-200 ${filter === 'formal' ? 'bg-accent text-background font-bold shadow-glow-sm' : 'text-gray-400 hover:text-white'}`}
              >
                Certificates
              </button>
              <button
                onClick={() => setFilter('event')}
                className={`px-6 py-1.5 rounded-md text-sm font-mono transition-all duration-200 ${filter === 'event' ? 'bg-accent text-background font-bold shadow-glow-sm' : 'text-gray-400 hover:text-white'}`}
              >
                Events
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable list container if items exceed 6 */}
        <div className={`grid grid-cols-2 gap-3 sm:gap-4 md:gap-8 ${filteredData.length > 6 ? 'max-h-[680px] overflow-y-auto pr-3' : ''}`}>
          {certificationsData.map((cert, index) => {
            const isMatch = cert.type === filter;
            // Calculate relative index among filtered items for stagger
            const filterIndex = filteredData.findIndex(item => item.title === cert.title);

            return (
              <div
                key={cert.title}
                className={`transition-all duration-700 ease-out ${isMatch ? 'block h-full' : 'hidden'} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: isMatch ? `${(filterIndex >= 0 ? filterIndex : 0) * 120}ms` : '0ms' }}
              >
                <CertificateCard
                  {...cert}
                  onViewImage={handleViewCredential}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive lightbox detail viewer */}
      <ImageModal
        isOpen={isModalOpen}
        cert={activeCert}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default Certifications;
