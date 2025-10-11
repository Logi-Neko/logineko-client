/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Download, ShoppingCart, User, Crown } from "lucide-react";
import { AuthContext } from "@/contexts/AuthContext";
import SubscriptionModal from "./subscription-modal";
import logo from "../assets/LOGO.jpg";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, profile } = useContext(AuthContext);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-pink-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <img
                src={logo.src}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-2xl font-bold text-gradient">LogiNeko</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Trang chủ
            </Link>
            <Link
              href="/features"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Tính năng
            </Link>
            <Link
              href="/shop"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Cửa hàng
            </Link>
            <Link
              href="/feedback"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Đánh giá
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div>
              {isAuthenticated && profile ? (
                <div className="flex items-center space-x-2 p-2">
                  <Link
                    href="/profile"
                    className="flex items-center space-x-2 p-2 text-gray-600 hover:text-pink-600 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span>{profile.fullName}</span>
                  </Link>
                  <Button
                    onClick={() => setOpen(true)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white rounded-xl px-6 py-3 cursor-pointer font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Nâng cấp Premium
                  </Button>

                  <SubscriptionModal open={open} onOpenChange={setOpen} />
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center space-x-2 p-2 text-gray-600 hover:text-pink-600 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">Đăng nhập</span>
                </Link>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="absolute left-0 right-0 z-50 px-4 py-4 mt-2 bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl mx-2 border border-gray-100 animate-fadeIn">
              <nav className="space-y-2">
                <Link
                  href="/"
                  className="block px-4 py-3 text-gray-800 font-semibold rounded-xl hover:bg-gradient-to-r hover:from-pink-100 hover:to-purple-100 hover:text-primary transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Trang chủ
                </Link>
                <Link
                  href="/features"
                  className="block px-4 py-3 text-gray-800 font-semibold rounded-xl hover:bg-gradient-to-r hover:from-pink-100 hover:to-purple-100 hover:text-primary transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Tính năng
                </Link>
                <Link
                  href="/shop"
                  className="block px-4 py-3 text-gray-800 font-semibold rounded-xl hover:bg-gradient-to-r hover:from-pink-100 hover:to-purple-100 hover:text-primary transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Cửa hàng
                </Link>
                <Link
                  href="/feedback"
                  className="block px-4 py-3 text-gray-800 font-semibold rounded-xl hover:bg-gradient-to-r hover:from-pink-100 hover:to-purple-100 hover:text-primary transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Đánh giá
                </Link>
              </nav>

              <div className="border-t border-gray-200 my-3"></div>

              <div className="pt-2">
                {isAuthenticated && profile ? (
                  <div className="flex flex-col items-center gap-3">
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 text-gray-700 font-medium hover:text-pink-600 transition-all duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="w-5 h-5 text-gray-500" />
                      <span>{profile.fullName}</span>
                    </Link>

                    <Button
                      onClick={() => setOpen(true)}
                      className="flex items-center justify-center w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white rounded-2xl px-6 py-3 font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Nâng cấp Premium
                    </Button>

                    <SubscriptionModal open={open} onOpenChange={setOpen} />
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="block w-full text-center bg-gradient-to-r from-pink-400 to-purple-400 hover:opacity-90 text-white rounded-2xl px-5 py-3 font-semibold shadow-md transition-all duration-300 hover:shadow-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Đăng nhập
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
