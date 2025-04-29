import { SignUp } from "@clerk/nextjs"
import { Shield } from "lucide-react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center text-purple-300 mb-6 hover:text-purple-200 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl rounded-2xl overflow-hidden">
          {/* Textured overlay */}
          <div
            className="absolute inset-0 opacity-10 mix-blend-overlay rounded-lg pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23purple' fillOpacity='0.2' fillRule='evenodd'/%3E%3C/svg%3E")`,
            }}
          ></div>

          <div className="flex items-center justify-center pt-6 relative z-10">
            <Shield className="h-8 w-8 text-purple-300 mr-2" />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-purple-400">
              Join SecureChat
            </h1>
          </div>

          <div className="p-4 relative z-10">
            <SignUp
              redirectUrl="/chat"
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "bg-transparent shadow-none",
                  header: "hidden",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton: "bg-white/10 hover:bg-white/20 border border-purple-400/30 text-white",
                  socialButtonsBlockButtonText: "text-white font-medium",
                  dividerLine: "bg-purple-400/30",
                  dividerText: "text-purple-200",
                  formFieldLabel: "text-purple-200",
                  formFieldInput:
                    "bg-white/10 border-purple-500/30 text-white placeholder:text-purple-300/50 focus:border-purple-400 focus:ring-purple-400/20",
                  formButtonPrimary:
                    "bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 rounded-lg shadow-lg hover:shadow-purple-500/20 transition-all duration-300",
                  footerActionText: "text-purple-200",
                  footerActionLink: "text-purple-300 hover:text-purple-200",
                  identityPreviewEditButton: "text-purple-300 hover:text-purple-200",
                  formFieldAction: "text-purple-300 hover:text-purple-200",
                  formFieldSuccessText: "text-green-400",
                  formFieldErrorText: "text-red-400",
                  alert: "bg-red-500/20 border border-red-500/30 text-white",
                  alertText: "text-white",
                  userButtonPopoverCard: "bg-purple-900 border border-purple-700",
                  userButtonPopoverActionButton: "text-purple-200 hover:bg-purple-800",
                  userButtonPopoverActionButtonText: "text-purple-200",
                  userButtonPopoverActionButtonIcon: "text-purple-300",
                  userPreviewMainIdentifier: "text-white",
                  userPreviewSecondaryIdentifier: "text-purple-300",
                },
                layout: {
                  socialButtonsPlacement: "bottom",
                },
                variables: {
                  colorPrimary: "#a855f7",
                  colorBackground: "transparent",
                  colorText: "#f3e8ff",
                  colorTextSecondary: "#e9d5ff",
                  colorInputText: "#ffffff",
                  colorInputBackground: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "0.5rem",
                },
              }}
            />
          </div>

          <div className="pb-4 text-center text-purple-200 text-sm relative z-10">
            <p className="flex items-center justify-center space-x-2">
              <Shield className="h-4 w-4 text-purple-400" />
              <span>Invite-only access • End-to-end encrypted • Zero data collection</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
