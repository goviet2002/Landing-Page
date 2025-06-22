"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/context/language-context"

const navItems = [
	{ key: "about", href: "#about" },
	{ key: "myjourney", href: "#timeline" },
	{ key: "skills", href: "#skills" },
	{ key: "projects", href: "#projects" },
	{ key: "testimonial", href: "#testimonials" },
	{ key: "certifications", href: "#certifications" },
	{ key: "contact", href: "#contact" },
]

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false)
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	const { t } = useLanguage()

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10)
		}
		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				isScrolled ? "bg-[#0f172a]/90 backdrop-blur-sm py-2 shadow-md" : "bg-transparent py-4"
			}`}
		>
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between">
					<Link href="/" className="text-xl font-bold text-cyan-400">
						Anh Việt Ngô
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-2">
						{navItems.map((item) => (
							<Button
								key={item.key}
								variant="ghost"
								size="sm"
								className="text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10"
								asChild
							>
								<Link href={item.href}>{t(`navbar.${item.key}`)}</Link>
							</Button>
						))}
					</nav>

					{/* Mobile Menu Button */}
					<Button
						variant="ghost"
						size="icon"
						className="md:hidden text-cyan-400"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					>
						{mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
					</Button>
				</div>

				{/* Mobile Navigation */}
				{mobileMenuOpen && (
					<nav className="md:hidden pt-4 pb-2 flex flex-col space-y-2">
						{navItems.map((item) => (
							<Link
								key={item.key}
								href={item.href}
								className="text-gray-300 hover:text-cyan-400 py-2 px-4 rounded-md hover:bg-cyan-500/10"
								onClick={() => setMobileMenuOpen(false)}
							>
								{t(`navbar.${item.key}`)}
							</Link>
						))}
					</nav>
				)}
			</div>
		</header>
	)
}
