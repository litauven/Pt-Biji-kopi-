"use client"

import React, { useState } from "react"
import { Dialog } from "./ui/Dialog"
import { Input } from "./ui/Input"
import { PhoneInput } from "./ui/PhoneInput"
import { Textarea } from "./ui/Textarea"
import { Button } from "./ui/Button"

interface RequestQuoteModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultProduct?: string
}

export default function RequestQuoteModal({ open, onOpenChange, defaultProduct = "" }: RequestQuoteModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const form = e.currentTarget
    const formData = new FormData(form)
    formData.append("access_key", "beea70b4-527c-4be9-89a1-9c3d0eb24661")
    formData.append("subject", "New Quotation Request from Acewin Website")
    formData.append("from_name", "Acewin Quotation Request")

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
      })

      const data = await response.json()

      if (response.status === 200 || data.success) {
        setIsSuccess(true)
        form.reset()
        setTimeout(() => {
          setIsSuccess(false)
          onOpenChange(false)
        }, 5000)
      } else {
        console.error("Web3Forms Error:", data)
        alert("Failed to send request. Please try again later.")
      }
    } catch (error) {
      console.error("Submission Error:", error)
      alert("Failed to send request. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-zinc-950">Request Quotation</h2>
          <p className="text-sm text-gray-500 mt-1">Fill out the form below and our team will get back to you shortly.</p>
        </div>

        {isSuccess ? (
          <div className="bg-green-50 text-green-700 p-4 rounded-md border border-green-200 text-center py-8">
            <h3 className="text-lg font-medium">Request Sent Successfully!</h3>
            <p className="mt-2 text-sm">We will contact you via email within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-medium">Name *</label>
                <Input id="name" name="name" required placeholder="John Doe" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="company" className="text-sm font-medium">Company *</label>
                <Input id="company" name="company" required placeholder="ABC Corp" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium">Email *</label>
                <Input id="email" name="email" type="email" required placeholder="john@example.com" />
              </div>
              <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
                <label htmlFor="phone" className="text-sm font-medium">Phone *</label>
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

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="country" className="text-sm font-medium">Country *</label>
                <Input id="country" name="country" required placeholder="United States" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="product" className="text-sm font-medium">Product Interest</label>
                <Input id="product" name="product" defaultValue={defaultProduct} placeholder="e.g. Industrial Machinery" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-sm font-medium">Message *</label>
              <Textarea id="message" name="message" required placeholder="Tell us about your requirements, volume, etc." className="min-h-[100px]" />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Submit Request"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </Dialog>
  )
}
