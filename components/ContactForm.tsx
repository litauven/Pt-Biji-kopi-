"use client";

import React, { useState } from "react";
import { Input } from "./ui/Input";
import { PhoneInput } from "./ui/PhoneInput";
import { Textarea } from "./ui/Textarea";
import { Button } from "./ui/Button";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", "beea70b4-527c-4be9-89a1-9c3d0eb24661");
    
    // Combine country code and local phone number
    const countryCode = formData.get("countryCode");
    const phoneLocal = formData.get("phone_local");
    if (countryCode && phoneLocal) {
      formData.set("phone", `${countryCode} ${phoneLocal}`);
      formData.delete("countryCode");
      formData.delete("phone_local");
    }

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });

      const data = await response.json();

      if (response.status === 200 || data.success) {
        setIsSuccess(true);
        form.reset();
        setTimeout(() => setIsSuccess(false), 8000);
      } else {
        console.error("Web3Forms Error:", data);
        alert("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Failed to send message. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 text-green-700 p-8 rounded-xl border border-green-200 text-center flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2">Message Sent Successfully!</h3>
        <p className="text-sm">Thank you for contacting us. Our team will get back to you shortly to marketing@acemello.com.</p>
        <Button className="mt-6" variant="outline" onClick={() => setIsSuccess(false)}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="hidden" name="from_name" value="Acewin Website Contact" />
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name *</label>
          <Input id="name" name="name" required placeholder="John Doe" />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="company" className="text-sm font-medium text-gray-700">Company *</label>
          <Input id="company" name="company" required placeholder="Company Name" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address *</label>
          <Input id="email" name="email" type="email" required placeholder="john@example.com" />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number *</label>
          <PhoneInput 
            id="phone" 
            name="phone_local" 
            required
            pattern="^[0-9\s\-]{6,20}$"
            title="Phone number must only contain numbers."
            placeholder="812 3456 7890" 
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</label>
        <Input id="subject" name="subject" placeholder="How can we help?" />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="text-sm font-medium text-gray-700">Message *</label>
        <Textarea id="message" name="message" required placeholder="Please provide details about your inquiry..." className="h-32" />
      </div>

      <Button type="submit" size="lg" className="w-full mt-2" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
