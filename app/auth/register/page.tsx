'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, TrendingUp, User, Phone, Building2, CheckSquare, Square, Facebook, MessageCircle } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import type { UserType } from '@/types';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { createClient } from '@/lib/supabase/client';

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  const [userType, setUserType] = useState<UserType | null>((searchParams.get('type') as UserType) || null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    zalo: '',
    facebook: '',
    businessName: '', // 광고주용
    agreeTerms: false,
    agreePrivacy: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Password strength calculator
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '' };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return { strength: 1, label: t.auth.register.weak, color: 'bg-error' };
    if (strength === 3) return { strength: 2, label: t.auth.register.medium, color: 'bg-warning' };
    if (strength === 4) return { strength: 3, label: t.auth.register.strong, color: 'bg-success' };
    return { strength: 4, label: t.auth.register.veryStrong, color: 'bg-primary' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = t.auth.register.errors.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.auth.register.errors.emailInvalid;
    }

    if (!formData.password) {
      newErrors.password = t.auth.register.errors.passwordRequired;
    } else if (formData.password.length < 8) {
      newErrors.password = t.auth.register.errors.passwordMinLength;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t.auth.register.errors.passwordMismatch;
    }

    if (!formData.name) {
      newErrors.name = t.auth.register.errors.nameRequired;
    }

    if (!formData.phone) {
      newErrors.phone = t.auth.register.errors.phoneRequired;
    }

    if (!formData.zalo) {
      newErrors.zalo = t.auth.register.errors.zaloRequired;
    }

    if (userType === 'advertiser' && !formData.businessName) {
      newErrors.businessName = t.auth.register.errors.companyRequired;
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = t.auth.register.errors.termsRequired;
    }

    if (!formData.agreePrivacy) {
      newErrors.agreePrivacy = t.auth.register.errors.privacyRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      // Supabase Auth 회원가입
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            user_type: userType,
            phone: formData.phone,
            zalo: formData.zalo,
            facebook: formData.facebook,
            business_name: formData.businessName,
          },
        },
      });

      if (signUpError) {
        setErrors({ ...errors, submit: signUpError.message });
        setLoading(false);
        return;
      }

      if (data.user) {
        // 회원가입 성공 - 로그인 페이지로 리다이렉트
        router.push('/auth/login?registered=true');
      }
    } catch (err: any) {
      setErrors({ ...errors, submit: err.message || 'Registration failed' });
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-dark-700">
      <div className="container-mobile min-h-screen flex flex-col">
        {/* Header */}
        <div className="pt-safe-top px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-white" />
            </div>
            <span className="font-bold text-lg">Exfluencer VN</span>
          </Link>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col px-4 py-6 pb-safe-bottom overflow-y-auto">
          <div className="space-y-6 animate-fade-in">
            {!userType ? (
              /* Role Selection */
              <>
                <div className="text-center space-y-2">
                  <h1 className="text-3xl font-bold text-white">{t.auth.register.title}</h1>
                  <p className="text-gray-400">{t.auth.register.selectRole}</p>
                </div>

                <div className="space-y-4 mt-8">
                  {/* Influencer Card */}
                  <button
                    onClick={() => setUserType('influencer')}
                    className="card-hover w-full p-6 transition-all border-2 border-transparent hover:border-primary"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center flex-shrink-0">
                        <User size={28} className="text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-xl font-bold text-white">{t.homepage.influencerRole}</h3>
                        <p className="text-sm text-gray-400 mt-2">
                          {t.homepage.influencerDesc}
                        </p>
                        <div className="flex gap-2 mt-3 flex-wrap">
                          <span className="badge badge-primary text-xs">{t.homepage.avgMonthlyEarning}</span>
                          <span className="badge badge-secondary text-xs">{t.homepage.free}</span>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Advertiser Card */}
                  <button
                    onClick={() => setUserType('advertiser')}
                    className="card-hover w-full p-6 transition-all border-2 border-transparent hover:border-secondary"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-secondary to-secondary-dark rounded-xl flex items-center justify-center flex-shrink-0">
                        <Building2 size={28} className="text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-xl font-bold text-white">{t.homepage.advertiserRole}</h3>
                        <p className="text-sm text-gray-400 mt-2">
                          {t.homepage.advertiserDesc}
                        </p>
                        <div className="flex gap-2 mt-3 flex-wrap">
                          <span className="badge badge-secondary text-xs">{t.homepage.avgROI}</span>
                          <span className="badge badge-success text-xs">{t.homepage.verifiedKOL}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Login Link */}
                <div className="text-center pt-4">
                  <span className="text-gray-400">{t.auth.register.alreadyHaveAccount} </span>
                  <Link href="/auth/login" className="text-primary font-semibold hover:text-primary-light">
                    {t.auth.register.loginNow}
                  </Link>
                </div>
              </>
            ) : (
              /* Registration Form */
              <>
                {/* Title */}
                <div className="text-center space-y-2">
                  <h1 className="text-3xl font-bold text-white">
                    {userType === 'influencer' ? t.auth.register.influencerTitle : t.auth.register.brandTitle}
                  </h1>
                  <p className="text-gray-400">
                    {userType === 'influencer'
                      ? t.auth.register.influencerSubtitle
                      : t.auth.register.brandSubtitle}
                  </p>
                  <button
                    onClick={() => setUserType(null)}
                    className="text-sm text-primary hover:text-primary-light"
                  >
                    ← {t.common.back}
                  </button>
                </div>

            {/* Social Login */}
            <div className="space-y-3">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-dark-500"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-dark-700 px-2 text-gray-400">{t.auth.register.quickSignup}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => alert('Tính năng đăng nhập Facebook sẽ sớm ra mắt.')}
                  className="btn btn-ghost border-blue-500/30 hover:bg-blue-500/10 text-sm py-3"
                >
                  <Facebook size={18} className="text-blue-500" />
                  <span>Facebook</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert('Tính năng đăng nhập Google sẽ sớm ra mắt.')}
                  className="btn btn-ghost border-red-500/30 hover:bg-red-500/10 text-sm py-3"
                >
                  <FaGoogle size={18} className="text-red-500" />
                  <span>Google</span>
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-dark-500"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-dark-700 px-2 text-gray-400">{t.auth.register.orEmail}</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">{t.auth.register.email} *</label>
                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      setErrors({ ...errors, email: '' });
                    }}
                    placeholder={t.auth.register.emailPlaceholder}
                    className={`input pl-12 ${errors.email ? 'border-error' : ''}`}
                  />
                </div>
                {errors.email && <p className="text-xs text-error">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">{t.auth.register.password} *</label>
                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                      setErrors({ ...errors, password: '' });
                    }}
                    placeholder={t.auth.register.passwordPlaceholder}
                    className={`input pl-12 pr-12 ${errors.password ? 'border-error' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-all ${
                            level <= passwordStrength.strength
                              ? passwordStrength.color
                              : 'bg-dark-600'
                          }`}
                        />
                      ))}
                    </div>
                    <p className={`text-xs ${passwordStrength.strength <= 2 ? 'text-error' : 'text-success'}`}>
                      {passwordStrength.label}
                    </p>
                  </div>
                )}
                {errors.password && <p className="text-xs text-error">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">{t.auth.register.confirmPassword} *</label>
                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => {
                      setFormData({ ...formData, confirmPassword: e.target.value });
                      setErrors({ ...errors, confirmPassword: '' });
                    }}
                    placeholder={t.auth.register.confirmPasswordPlaceholder}
                    className={`input pl-12 pr-12 ${errors.confirmPassword ? 'border-error' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-error">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">{t.auth.register.name} *</label>
                <div className="relative">
                  <User
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      setErrors({ ...errors, name: '' });
                    }}
                    placeholder={t.auth.register.namePlaceholder}
                    className={`input pl-12 ${errors.name ? 'border-error' : ''}`}
                  />
                </div>
                {errors.name && <p className="text-xs text-error">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">{t.auth.register.phone} *</label>
                <div className="relative">
                  <Phone
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      setErrors({ ...errors, phone: '' });
                    }}
                    placeholder={t.auth.register.phonePlaceholder}
                    className={`input pl-12 ${errors.phone ? 'border-error' : ''}`}
                  />
                </div>
                {errors.phone && <p className="text-xs text-error">{errors.phone}</p>}
              </div>

              {/* Zalo */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  {t.auth.register.zaloLabel}
                </label>
                <div className="relative">
                  <MessageCircle
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400"
                  />
                  <input
                    type="tel"
                    required
                    value={formData.zalo}
                    onChange={(e) => {
                      setFormData({ ...formData, zalo: e.target.value });
                      setErrors({ ...errors, zalo: '' });
                    }}
                    placeholder={t.auth.register.zaloPlaceholder}
                    className={`input pl-12 ${errors.zalo ? 'border-error' : ''}`}
                  />
                </div>
                {errors.zalo && <p className="text-xs text-error">{errors.zalo}</p>}
                <p className="text-xs text-gray-500">
                  {t.auth.register.zaloHint}
                </p>
              </div>

              {/* Facebook */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Facebook</label>
                <div className="relative">
                  <Facebook
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400"
                  />
                  <input
                    type="text"
                    value={formData.facebook}
                    onChange={(e) => {
                      setFormData({ ...formData, facebook: e.target.value });
                      setErrors({ ...errors, facebook: '' });
                    }}
                    placeholder={t.auth.register.facebookPlaceholder}
                    className={`input pl-12 ${errors.facebook ? 'border-error' : ''}`}
                  />
                </div>
              </div>

              {/* Business Name (Advertiser only) */}
              {userType === 'advertiser' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">{t.auth.register.company} *</label>
                  <div className="relative">
                    <Building2
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={(e) => {
                        setFormData({ ...formData, businessName: e.target.value });
                        setErrors({ ...errors, businessName: '' });
                      }}
                      placeholder={t.auth.register.companyPlaceholder}
                      className={`input pl-12 ${errors.businessName ? 'border-error' : ''}`}
                    />
                  </div>
                  {errors.businessName && (
                    <p className="text-xs text-error">{errors.businessName}</p>
                  )}
                </div>
              )}

              {/* Terms Agreement */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-dark-600 transition-colors">
                  <div
                    onClick={() => {
                      setFormData({ ...formData, agreeTerms: !formData.agreeTerms });
                      setErrors({ ...errors, agreeTerms: '' });
                    }}
                    className="cursor-pointer"
                  >
                    {formData.agreeTerms ? (
                      <CheckSquare size={24} className="text-primary flex-shrink-0" />
                    ) : (
                      <Square size={24} className="text-gray-400 flex-shrink-0" />
                    )}
                  </div>
                  <span className="text-sm text-gray-300 flex-1">
                    <Link href="/terms" target="_blank" className="text-primary underline hover:text-primary-light">
                      {t.auth.register.termsOfService}
                    </Link>
                    {' '}{t.auth.register.agreeToTerms} *
                  </span>
                </div>
                {errors.agreeTerms && <p className="text-xs text-error ml-8">{errors.agreeTerms}</p>}

                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-dark-600 transition-colors">
                  <div
                    onClick={() => {
                      setFormData({ ...formData, agreePrivacy: !formData.agreePrivacy });
                      setErrors({ ...errors, agreePrivacy: '' });
                    }}
                    className="cursor-pointer"
                  >
                    {formData.agreePrivacy ? (
                      <CheckSquare size={24} className="text-primary flex-shrink-0" />
                    ) : (
                      <Square size={24} className="text-gray-400 flex-shrink-0" />
                    )}
                  </div>
                  <span className="text-sm text-gray-300 flex-1">
                    <Link href="/privacy" target="_blank" className="text-primary underline hover:text-primary-light">
                      {t.auth.register.privacyPolicy}
                    </Link>
                    {' '}{t.auth.register.agreeToTerms} *
                  </span>
                </div>
                {errors.agreePrivacy && (
                  <p className="text-xs text-error ml-8">{errors.agreePrivacy}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full text-base mt-6"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="spinner" />
                    {t.auth.register.signingUp}
                  </div>
                ) : (
                  t.auth.register.signupButton
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="text-center pt-4">
              <span className="text-gray-400">{t.auth.register.alreadyHaveAccount} </span>
              <Link href="/auth/login" className="text-primary font-semibold hover:text-primary-light">
                {t.auth.register.loginNow}
              </Link>
            </div>
            </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
