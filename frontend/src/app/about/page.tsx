"use client";

import Image from "next/image";
import { Globe, Users, Map, Compass, MessageCircle, Mail, Star } from "lucide-react";
import { ThemedButton } from "@/components/ui/theme-button";
// import { ThemedInput } from "@/components/ui/themed-input";
import { cardStyle, gradientText, typography } from "@/lib/theme";
import { useState } from "react";

// Dynamic data for the About page
const ABOUT_DATA = {
  hero: {
    title: "About Nomad",
    subtitle: "Redefining travel through technology and community",
    buttons: [
      { text: "Join Our Community", icon: "Users", variant: "primary" },
      { text: "Explore Features", icon: "Map", variant: "secondary" }
    ]
  },
  mission: {
    title: "Our Mission",
    description: [
      "Welcome to <span class='text-emerald-400 font-medium'>Nomad</span>, your go-to platform for exploring the world and connecting with like-minded adventurers. Our mission is to make travel accessible, enjoyable, and meaningful for everyone.",
      "Whether you're a seasoned traveler or just starting your journey, Nomad provides the tools and resources you need to plan your trips, discover new destinations, and share your experiences with a vibrant community."
    ],
    features: [
      {
        title: "AI-Powered Planning",
        description: "Intelligent itineraries customized to your preferences",
        icon: "Compass",
        color: "emerald"
      },
      {
        title: "Global Community",
        description: "Connect with travelers from around the world",
        icon: "Users",
        color: "teal"
      },
      {
        title: "Hidden Gems",
        description: "Discover off-the-beaten-path destinations",
        icon: "Map",
        color: "cyan"
      },
      {
        title: "Local Insights",
        description: "Tips and advice from experienced travelers",
        icon: "MessageCircle",
        color: "blue"
      }
    ]
  },
  vision: {
    title: "Our Vision",
    description: "At Nomad, we believe that travel has the power to bring people together, foster understanding, and create unforgettable memories. We're here to inspire and empower you to explore the world, one adventure at a time.",
    pillars: [
      {
        title: "Sustainable Travel",
        description: "Promoting eco-friendly tourism practices and responsible exploration",
        color: "emerald"
      },
      {
        title: "Cultural Exchange",
        description: "Fostering understanding and appreciation of diverse cultures worldwide",
        color: "teal"
      },
      {
        title: "Accessible Adventures",
        description: "Making travel planning easier and more accessible for everyone",
        color: "cyan"
      }
    ]
  },
  team: {
    title: "Meet Our Team",
    members: [
    {
        initials: "HY",
        name: "Hamza Yoshida",
        role: "President",
        bio: "Guiding Nomad’s global direction with experience in leadership, community building, and global outreach.",
        color: "cyan"
    },
    {
        initials: "HI",
        name: "Hassan Imran",
        role: "CTO",
        bio: "Leading the technological backbone of Nomad with a vision for innovation and scalable infrastructure.",
        color: "emerald"
    },
    {
        initials: "AH",
        name: "Ahmed Hassan",
        role: "CEO",
        bio: "Visionary founder focused on driving strategy, growth, and redefining travel through leadership.",
        color: "teal"
    },
    {
        initials: "MU",
        name: "Mishaal Usman",
        role: "Marketing Lead",
        bio: "Crafting compelling campaigns and brand stories to connect Nomad with audiences worldwide.",
        color: "blue"
    },
    {
        initials: "RT",
        name: "Ryef Taimur",
        role: "CFO",
        bio: "Ensuring financial growth and sustainability with a strong grasp on strategic investment and budgeting.",
        color: "purple"
    }
    ]
  },
  contact: {
    title: "Contact Us",
    description: "Have questions or feedback? We'd love to hear from you! Our team is always ready to assist with any inquiries.",
    methods: [
      {
        type: "Email",
        value: "support@nomad.com",
        icon: "Mail",
        color: "emerald"
      },
      {
        type: "Live Chat",
        value: "Available 24/7 on our platform",
        icon: "MessageCircle",
        color: "teal"
      }
    ],
    formFields: [
      { label: "Name", type: "text", placeholder: "Your name" },
      { label: "Email", type: "email", placeholder: "Your email" },
      { label: "Message", type: "textarea", placeholder: "Your message", rows: 4 }
    ]
  }
};

export default function AboutPage() {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      message: ""
    });
    
    const [formSubmitted, setFormSubmitted] = useState(false);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
    
    const handleSubmit = () => {
      // In a real app, this would submit to an API
      console.log('Form submitted:', formData);
      setFormSubmitted(true);
      
      // Reset form after success message is shown
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: "", email: "", message: "" });
      }, 3000);
    };
    
    // Helper function to render the appropriate icon
    const renderIcon = (iconName: string, size = 24, className = "") => {
      switch (iconName) {
        case "Globe": return <Globe size={size} className={className} />;
        case "Users": return <Users size={size} className={className} />;
        case "Map": return <Map size={size} className={className} />;
        case "Compass": return <Compass size={size} className={className} />;
        case "MessageCircle": return <MessageCircle size={size} className={className} />;
        case "Mail": return <Mail size={size} className={className} />;
        case "Star": return <Star size={size} className={className} />;
        default: return <Globe size={size} className={className} />;
      }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden pt-32 pb-20">
                {/* Background glow effects */}
                <div className="absolute top-40 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>
                
                <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
                    <div className={cardStyle("inline-block p-3 mb-8", true)}>
                        <Image src="/nomad.svg" alt="Nomad Logo" width={120} height={120} />
                    </div>
                    
                    <h1 className={`text-5xl ${typography.fontFamily.heading} font-bold mb-6 ${gradientText()}`}>
                        {ABOUT_DATA.hero.title}
                    </h1>
                    
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                        {ABOUT_DATA.hero.subtitle}
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        {ABOUT_DATA.hero.buttons.map((button, index) => (
                            <ThemedButton 
                                key={index}
                                themeVariant={button.variant as "primary" | "secondary" | "outline"}
                                className="flex items-center gap-2"
                            >
                                {renderIcon(button.icon, 20)}
                                <span>{button.text}</span>
                            </ThemedButton>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Mission Section */}
            <div className="py-16 bg-gray-950/80">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-block mb-6 p-3 bg-emerald-900/30 rounded-full">
                                <Globe className="h-8 w-8 text-emerald-400" />
                            </div>
                            <h2 className={`text-3xl ${typography.fontFamily.heading} font-bold mb-6`}>{ABOUT_DATA.mission.title}</h2>
                            
                            {ABOUT_DATA.mission.description.map((paragraph, index) => (
                                <p key={index} className="text-gray-300 mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: paragraph }}></p>
                            ))}
                        </div>
                        
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 to-teal-900/10 rounded-3xl"></div>
                            <div className={cardStyle("p-8 rounded-3xl", true)}>
                                <div className="grid grid-cols-2 gap-6">
                                    {ABOUT_DATA.mission.features.map((feature, index) => (
                                        <div key={index} className="bg-gray-800/50 p-6 rounded-xl">
                                            <div className={`w-12 h-12 bg-${feature.color}-900/30 rounded-full flex items-center justify-center mb-4`}>
                                                {renderIcon(feature.icon, 24, `text-${feature.color}-400`)}
                                            </div>
                                            <h3 className={`${typography.fontFamily.heading} font-bold mb-2`}>{feature.title}</h3>
                                            <p className="text-gray-400 text-sm">{feature.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Vision Section */}
            <div className="py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <div className={cardStyle("p-12 rounded-3xl relative overflow-hidden", true)}>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
                        
                        <div className="text-center max-w-3xl mx-auto relative z-10">
                            <h2 className={`text-3xl ${typography.fontFamily.heading} font-bold mb-8 ${gradientText()}`}>
                                {ABOUT_DATA.vision.title}
                            </h2>
                            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                                {ABOUT_DATA.vision.description}
                            </p>
                            
                            <div className="flex justify-center mt-8">
                                <div className="inline-block p-3 bg-teal-900/30 rounded-full">
                                    <Globe className="h-8 w-8 text-teal-400" />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                                {ABOUT_DATA.vision.pillars.map((pillar, index) => (
                                    <div key={index} className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl border border-gray-800/50">
                                        <h3 className={`${typography.fontFamily.heading} font-bold text-${pillar.color}-400 mb-2`}>{pillar.title}</h3>
                                        <p className="text-gray-400">{pillar.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Team Section */}
            <div className="py-16 bg-gray-950/80">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className={`text-3xl ${typography.fontFamily.heading} font-bold mb-12`}>
                        {ABOUT_DATA.team.title}
                    </h2>
                    
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {ABOUT_DATA.team.members.slice(0, 3).map((member, index) => (
                            <div key={index} className={cardStyle("p-6 rounded-2xl", true)}>
                            <div className={`w-24 h-24 bg-${member.color}-900/30 rounded-full flex items-center justify-center mx-auto mb-4`}>
                                <span className={`text-2xl ${typography.fontFamily.heading} font-bold text-${member.color}-400`}>{member.initials}</span>
                            </div>
                            <h3 className={`text-xl ${typography.fontFamily.heading} font-bold mb-2`}>{member.name}</h3>
                            <p className={`text-${member.color}-400 mb-4`}>{member.role}</p>
                            <p className="text-gray-400 text-sm">{member.bio}</p>
                            </div>
                        ))}
                        </div>

                        <div className="flex flex-col md:flex-row justify-center gap-8 mt-8">
                        {ABOUT_DATA.team.members.slice(3).map((member, index) => (
                            <div key={index} className={`${cardStyle("p-6 rounded-2xl", true)} w-full md:w-1/3`}>
                            <div className={`w-24 h-24 bg-${member.color}-900/30 rounded-full flex items-center justify-center mx-auto mb-4`}>
                                <span className={`text-2xl ${typography.fontFamily.heading} font-bold text-${member.color}-400`}>{member.initials}</span>
                            </div>
                            <h3 className={`text-xl ${typography.fontFamily.heading} font-bold mb-2`}>{member.name}</h3>
                            <p className={`text-${member.color}-400 mb-4`}>{member.role}</p>
                            <p className="text-gray-400 text-sm">{member.bio}</p>
                            </div>
                        ))}
                        </div>
                </div>
            </div>
            
            {/* Contact Section */}
            <div className="py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <div className={cardStyle("p-10 rounded-3xl", true)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h2 className={`text-3xl ${typography.fontFamily.heading} font-bold mb-6`}>
                                    {ABOUT_DATA.contact.title}
                                </h2>
                                <p className="text-gray-300 mb-8">
                                    {ABOUT_DATA.contact.description}
                                </p>
                                
                                <div className="space-y-6">
                                    {ABOUT_DATA.contact.methods.map((method, index) => (
                                        <div key={index} className="flex items-center">
                                            <div className={`w-10 h-10 bg-${method.color}-900/30 rounded-full flex items-center justify-center mr-4`}>
                                                {renderIcon(method.icon, 20, `text-${method.color}-400`)}
                                            </div>
                                            <div>
                                                <p className={`${typography.fontFamily.heading} font-medium`}>{method.type}</p>
                                                {method.type === 'Email' ? (
                                                    <a href={`mailto:${method.value}`} className={`text-${method.color}-400 hover:text-${method.color}-300 transition-colors`}>
                                                        {method.value}
                                                    </a>
                                                ) : (
                                                    <p className="text-gray-400">{method.value}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-800/50">
                                <h3 className={`text-xl ${typography.fontFamily.heading} font-bold mb-4`}>Send Us a Message</h3>
                                
                                {formSubmitted ? (
                                    <div className="bg-emerald-900/30 border border-emerald-900/50 rounded-lg p-4 text-center">
                                        <p className="text-emerald-400 font-medium">Thank you for your message!</p>
                                        <p className="text-gray-300 mt-2">We&#39;ll get back to you as soon as possible.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {ABOUT_DATA.contact.formFields.map((field, index) => (
                                            <div key={index}>
                                                <label className={`block text-sm ${typography.fontFamily.heading} font-medium text-gray-400 mb-1`}>
                                                    {field.label}
                                                </label>
                                                {field.type === 'textarea' ? (
                                                    <textarea 
                                                        name="message"
                                                        value={formData.message}
                                                        onChange={handleInputChange}
                                                        className="w-full p-3 bg-gray-900/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800/50"
                                                        placeholder={field.placeholder}
                                                        rows={field.rows}
                                                    />
                                                ) : (
                                                    <input 
                                                        type={field.type}
                                                        name={field.label.toLowerCase()}
                                                        value={field.label.toLowerCase() === 'name' ? formData.name : formData.email}
                                                        onChange={handleInputChange}
                                                        className="w-full p-3 bg-gray-900/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800/50"
                                                        placeholder={field.placeholder}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                        
                                        <ThemedButton 
                                            themeVariant="primary"
                                            fullWidth
                                            onClick={handleSubmit}
                                        >
                                            Send Message
                                        </ThemedButton>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Footer */}
            <div className="py-8 border-t border-gray-800">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <p className="text-gray-500">© 2025 Nomad. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}