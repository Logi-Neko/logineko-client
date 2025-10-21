/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Crown, LogOut } from "lucide-react";
import { AuthContext } from "@/contexts/AuthContext";
import SubscriptionModal from "./subscription-modal";
import logo from "../assets/LOGO.jpg";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, profile, reset } = useContext(AuthContext);

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

  const handleLogout = () => {
    reset();
    setUserMenuOpen(false);
    setIsOpen(false);
  };

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
              TRANG CHỦ
            </Link>
            <Link
              href="/shop"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              CỬA HÀNG
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div>
              {isAuthenticated && profile ? (
                <div className="flex items-center space-x-3" ref={userMenuRef}>
                  <Button
                    onClick={() => setOpen(true)}
                    className="relative flex items-center cursor-pointer justify-center gap-2 px-6 py-5 rounded-xl font-semibold 
             text-white bg-gradient-to-r from-purple-700 via-fuchsia-500 to-pink-500
             shadow-[0_0_20px_rgba(236,72,153,0.5)]
             transition-all duration-500 
             hover:shadow-[0_0_30px_rgba(236,72,153,0.8)]
             hover:scale-[1.07] active:scale-[0.96]
             "
                  >
                    <Crown className="w-4 h-4 " />
                    <span>Nâng cấp Premium</span>
                  </Button>

                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl 
             border border-purple-300 
             bg-gradient-to-r from-purple-100 to-pink-50
             transition-all duration-300 cursor-pointer 
             hover:from-purple-200 hover:to-pink-100 
             hover:border-purple-500 
             hover:shadow-md hover:scale-[1.03] active:scale-[0.98]"
                    >
                      {profile.avatarUrl ? (
                        <img
                          src={profile.avatarUrl}
                          alt="Avatar"
                          className="w-8 h-8 rounded-full border-2 border-white shadow-sm object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold text-sm border-2 border-white shadow-sm">
                          {profile.fullName?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="text-gray-700 font-medium text-sm hidden sm:inline">
                        {profile.fullName}
                      </span>
                    </button>

                    {userMenuOpen && (
                      <div className="absolute right-0 w-84 rounded-lg bg-white shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-purple-200 via-pink-100 to-pink-100 border-b border-gray-200 shadow-sm">
                          <div className="relative">
                            {profile.avatarUrl ? (
                              <img
                                src={profile.avatarUrl}
                                alt="Avatar"
                                className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-lg border-2 border-white shadow-md">
                                {profile.fullName?.charAt(0).toUpperCase()}
                              </div>
                            )}
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
                          </div>

                          <div className="flex flex-col">
                            <p className="font-semibold text-gray-900 text-base leading-tight">
                              {profile.fullName}
                            </p>
                            <p className="text-sm text-gray-600 mt-1 break-all">
                              {profile.email}
                            </p>
                          </div>
                        </div>

                        <div className="py-2">
                          <Link
                            href="/profile"
                            className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-colors duration-150 cursor-pointer"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <User className="w-4 h-4 text-purple-400" />
                            <span className="font-medium">Xem hồ sơ</span>
                          </Link>

                          {/* <Link
                            href="/settings"
                            className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-colors duration-150 cursor-pointer"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <Settings className="w-4 h-4 text-purple-400" />
                            <span className="font-medium">Cài đặt</span>
                          </Link> */}

                          <div className="border-t border-gray-100 my-2"></div>

                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-6 py-3 text-red-600 hover:bg-red-50 transition-colors duration-150 cursor-pointer"
                          >
                            <LogOut className="w-4 h-4" />
                            <span className="font-medium">Đăng xuất</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <SubscriptionModal open={open} onOpenChange={setOpen} />
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center space-x-2 p-2 text-gray-600 hover:text-pink-600 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">ĐĂNG NHẬP</span>
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
                >
                  TRANG CHỦ
                </Link>
                <Link
                  href="/shop"
                  className="block px-4 py-3 text-gray-800 font-semibold rounded-xl hover:bg-gradient-to-r hover:from-pink-100 hover:to-purple-100 hover:text-primary transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  CỬA HÀNG
                </Link>
              </nav>

              <div className="border-t border-gray-200 my-3"></div>

              <div className="pt-2">
                {isAuthenticated && profile ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-full bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 text-center border border-gray-200">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-lg mx-auto mb-3 border-3 border-white shadow-md overflow-hidden">
                        {profile.avatarUrl ? (
                          <img
                            src={profile.avatarUrl}
                            alt="Avatar"
                            className="w-8 h-8 rounded-full border-2 border-white shadow-sm object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold text-sm border-2 border-white shadow-sm">
                            {profile.fullName?.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <p className="font-semibold text-gray-900">
                        {profile.fullName}
                      </p>
                      <p className="text-xs text-gray-600 mt-1 break-all">
                        {profile.email}
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      className="flex items-center justify-center gap-2 w-full text-gray-700 font-medium hover:text-primary transition-all duration-200 py-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 cursor-pointer border border-transparent hover:border-gray-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      <span>Xem hồ sơ</span>
                    </Link>

                    {/* <Link
                      href="/settings"
                      className="flex items-center justify-center gap-2 w-full text-gray-700 font-medium hover:text-primary transition-all duration-200 py-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 cursor-pointer border border-transparent hover:border-gray-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <Settings className="w-5 h-5" />
                      <span>Cài đặt</span>
                    </Link> */}

                    <Button
                      onClick={() => setOpen(true)}
                      className="flex items-center justify-center w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white rounded-2xl px-6 py-3 font-semibold shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer"
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Nâng cấp Premium
                    </Button>

                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 w-full text-red-600 font-medium py-3 rounded-xl hover:bg-red-50 transition-all duration-200 cursor-pointer border border-transparent hover:border-red-200"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Đăng xuất</span>
                    </button>

                    <SubscriptionModal open={open} onOpenChange={setOpen} />
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="block w-full text-center bg-gradient-to-r from-pink-400 to-purple-400 hover:opacity-90 text-white rounded-2xl px-5 py-3 font-semibold shadow-md transition-all duration-300 hover:shadow-lg cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    ĐĂNG NHẬP
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
