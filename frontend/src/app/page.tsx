import Link from "next/link"
import { LockKeyhole, Shield, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl mx-auto backdrop-blur-md bg-white/10 rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
        <div className="relative">
          {/* Textured overlay */}
          <div
            className="absolute inset-0 opacity-10 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23purple' fillOpacity='0.2' fillRule='evenodd'/%3E%3C/svg%3E")`,
            }}
          ></div>

          <div className="p-8 md:p-12 relative z-10">
            <div className="flex items-center justify-center mb-8">
              <Shield className="h-12 w-12 text-purple-300 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-purple-400">
                SecureChat
              </h1>
            </div>

            <div className="text-center mb-12">
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
                The Safest Chat App for Your Inner Circle
              </h2>
              <p className="text-purple-200 max-w-2xl mx-auto">
                End-to-end encrypted messaging in an exclusive, invite-only environment. No data mining, no ads, just
                secure conversations with the people you trust.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Link href="/login" className="w-full md:w-auto">
                <Button className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white font-medium py-6 px-8 rounded-xl shadow-lg hover:shadow-purple-500/20 transition-all duration-300 flex items-center justify-center">
                  <LockKeyhole className="mr-2 h-5 w-5" />
                  Login
                </Button>
              </Link>

              <Link href="/signup" className="w-full md:w-auto">
                <Button
                  variant="outline"
                  className="w-full md:w-auto border-purple-400 text-purple-200 hover:bg-purple-800/30 font-medium py-6 px-8 rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300 flex items-center justify-center"
                >
                  <UserPlus className="mr-2 h-5 w-5" />
                  Sign Up with Invite
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-center">
              <div className="flex items-center space-x-2 text-purple-300 text-sm">
                <LockKeyhole className="h-4 w-4" />
                <span>Invite-only access • End-to-end encrypted • Zero data collection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
