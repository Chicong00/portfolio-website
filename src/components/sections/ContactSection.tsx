import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "vochicong0402@gmail.com",
    href: "mailto:vochicong0402@gmail.com"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+84 347804204",
    href: "tel:+84347804204"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Ho Chi Minh City, Viet Nam",
  }
];

const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/cong-vo-311772159/",
    color: "hover:text-blue-600"
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/Chicong00",
    color: "hover:text-gray-900 dark:hover:text-gray-100"
  }
];

export function ContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Message sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 relative" ref={ref}>
      {/* Organic Background */}
      <div className="absolute inset-0 organic-bg">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flowing-shapes" />
        ))}
        <div 
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 blur-3xl animate-float" 
          style={{ 
            borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
          }}
        ></div>
        <div 
          className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-accent/8 blur-2xl animate-float" 
          style={{ 
            borderRadius: "40% 60% 30% 70% / 60% 30% 70% 40%",
            animationDelay: "-2s" 
          }}
        ></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Ready to transform your data into actionable insights? Let's discuss how 
            we can work together to solve your most challenging data problems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="card-elegant h-fit">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Get in Touch</CardTitle>
                <p className="text-muted-foreground">
                  Feel free to reach out through any of these channels.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    <a
                      href={info.href}
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-smooth group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{info.label}</p>
                        <p className="text-sm text-muted-foreground group-hover:text-primary transition-smooth">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  </motion.div>
                ))}

                <div className="pt-6 border-t border-border">
                  <p className="text-sm font-medium text-foreground mb-4">Follow me</p>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                        className={`w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center ${social.color} transition-smooth hover:scale-110`}
                      >
                        <social.icon className="h-5 w-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="card-elegant">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Send a Message</CardTitle>
                <p className="text-muted-foreground">
                Feel free to contact me to collaborate on data and AI projects.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="transition-smooth focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="transition-smooth focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Data Analysis Project Inquiry"
                      required
                      className="transition-smooth focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your ideas or projects, I will response as soon as possible."
                      rows={6}
                      required
                      className="transition-smooth focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full transition-bounce hover:scale-105"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            Prefer a quick chat? Schedule a 15-minute call to discuss your data needs.
          </p>
          <Button variant="outline" size="lg" className="mt-4 transition-bounce hover:scale-105">
            Schedule a Call
          </Button>
        </motion.div>
      </div>
    </section>
  );
}