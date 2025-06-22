"use client"
import { useRef, useState } from "react"
import emailjs from "emailjs-com"
import { Button } from "@/components/ui/button"

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError(null)
    setSent(false)
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      setSent(true)
      formRef.current?.reset()
    } catch (err) {
      setError("Failed to send message.")
    }
    setSending(false)
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="from_name"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Name
        </label>
        <input
          type="text"
          id="from_name"
          name="name"
          required
          className="w-full px-4 py-2 bg-[#0f172a] border border-cyan-500/30 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
          placeholder="Your Name"
        />
      </div>

      <div>
        <label
          htmlFor="reply_to"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Email
        </label>
        <input
          type="email"
          id="reply_to"
          name="email"
          required
          className="w-full px-4 py-2 bg-[#0f172a] border border-cyan-500/30 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
          placeholder="Your Email"
        />
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          className="w-full px-4 py-2 bg-[#0f172a] border border-cyan-500/30 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
          placeholder="Subject"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full px-4 py-2 bg-[#0f172a] border border-cyan-500/30 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
          placeholder="Your Message"
        ></textarea>
      </div>

      <Button
        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
        disabled={sending}
      >
        {sending ? "Sending..." : "Send"}
      </Button>
      {sent && <p className="text-green-400">Message sent!</p>}
      {error && <p className="text-red-400">{error}</p>}
    </form>
  )
}