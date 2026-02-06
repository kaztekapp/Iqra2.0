import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { signUpWithEmail, signInWithEmail, resetPassword } from '../src/services/authService';

export default function AuthScreen() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const isSignUp = mode === 'signUp';

  const validate = () => {
    if (isSignUp && !fullName.trim()) {
      Alert.alert(t('common.error'), t('auth.fullNameRequired'));
      return false;
    }
    if (!email.trim()) {
      Alert.alert(t('common.error'), t('auth.emailRequired'));
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert(t('common.error'), t('auth.invalidEmail'));
      return false;
    }
    if (!password) {
      Alert.alert(t('common.error'), t('auth.passwordRequired'));
      return false;
    }
    if (password.length < 6) {
      Alert.alert(t('common.error'), t('auth.passwordMinLength'));
      return false;
    }
    if (isSignUp && password !== confirmPassword) {
      Alert.alert(t('common.error'), t('auth.passwordsDoNotMatch'));
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
        Alert.alert('', t('auth.signUpSuccess'));
      } else {
        await signInWithEmail(email, password);
        router.replace('/(tabs)');
      }
    } catch (err: any) {
      Alert.alert(t('common.error'), err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!resetEmail.trim()) {
      Alert.alert(t('common.error'), t('auth.emailRequired'));
      return;
    }
    setLoading(true);
    try {
      await resetPassword(resetEmail);
      Alert.alert('', t('auth.resetSent'));
      setShowResetModal(false);
      setResetEmail('');
    } catch (err: any) {
      Alert.alert(t('common.error'), err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(isSignUp ? 'signIn' : 'signUp');
    setFullName('');
    setConfirmPassword('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoArabic}>اقْرَأ</Text>
            </View>
            <Text style={styles.headerTitle}>
              {isSignUp ? t('auth.createAccount') : t('auth.welcomeBack')}
            </Text>
            <Text style={styles.headerSubtitle}>
              {isSignUp ? t('auth.signUpSubtitle') : t('auth.signInSubtitle')}
            </Text>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            {/* Toggle */}
            <View style={styles.toggleRow}>
              <TouchableOpacity
                style={[styles.toggleButton, !isSignUp && styles.toggleActive]}
                activeOpacity={0.7}
                onPress={() => !loading && setMode('signIn')}
              >
                <Text style={[styles.toggleText, !isSignUp && styles.toggleTextActive]}>
                  {t('auth.signIn')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleButton, isSignUp && styles.toggleActive]}
                activeOpacity={0.7}
                onPress={() => !loading && setMode('signUp')}
              >
                <Text style={[styles.toggleText, isSignUp && styles.toggleTextActive]}>
                  {t('auth.signUp')}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Full Name (signup only) */}
            {isSignUp && (
              <View style={styles.inputBox}>
                <Ionicons name="person-outline" size={20} color="#64748b" />
                <TextInput
                  style={styles.input}
                  placeholder={t('auth.fullName')}
                  placeholderTextColor="#475569"
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                  autoComplete="name"
                />
              </View>
            )}

            {/* Email */}
            <View style={styles.inputBox}>
              <Ionicons name="mail-outline" size={20} color="#64748b" />
              <TextInput
                style={styles.input}
                placeholder={t('auth.email')}
                placeholderTextColor="#475569"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            {/* Password */}
            <View style={styles.inputBox}>
              <Ionicons name="lock-closed-outline" size={20} color="#64748b" />
              <TextInput
                style={styles.input}
                placeholder={t('auth.password')}
                placeholderTextColor="#475569"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} activeOpacity={0.6}>
                <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#64748b" />
              </TouchableOpacity>
            </View>

            {/* Confirm Password (signup only) */}
            {isSignUp && (
              <View style={styles.inputBox}>
                <Ionicons name="shield-checkmark-outline" size={20} color="#64748b" />
                <TextInput
                  style={styles.input}
                  placeholder={t('auth.confirmPassword')}
                  placeholderTextColor="#475569"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} activeOpacity={0.6}>
                  <Ionicons name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#64748b" />
                </TouchableOpacity>
              </View>
            )}

            {/* Forgot password */}
            {!isSignUp && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => { setResetEmail(email); setShowResetModal(true); }}
              >
                <Text style={styles.forgotText}>{t('auth.forgotPassword')}</Text>
              </TouchableOpacity>
            )}

            {/* Submit */}
            <TouchableOpacity
              style={[styles.submitButton, loading && { opacity: 0.7 }]}
              activeOpacity={0.8}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <>
                  <Text style={styles.submitText}>
                    {isSignUp ? t('auth.signUp') : t('auth.signIn')}
                  </Text>
                  <View style={styles.submitIcon}>
                    <Ionicons name="arrow-forward" size={18} color="#10b981" />
                  </View>
                </>
              )}
            </TouchableOpacity>

            {/* Switch mode */}
            <View style={styles.switchRow}>
              <Text style={styles.switchText}>
                {isSignUp ? t('auth.haveAccount') : t('auth.noAccount')}
              </Text>
              <TouchableOpacity activeOpacity={0.7} onPress={switchMode}>
                <Text style={styles.switchLink}>
                  {isSignUp ? t('auth.signIn') : t('auth.signUp')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>{t('common.or')}</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social */}
          <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
            <Ionicons name="logo-google" size={20} color="#ffffff" />
            <Text style={styles.socialText}>{t('auth.continueWithGoogle')}</Text>
          </TouchableOpacity>

          {Platform.OS === 'ios' && (
            <TouchableOpacity style={styles.appleButton} activeOpacity={0.7}>
              <Ionicons name="logo-apple" size={22} color="#ffffff" />
              <Text style={styles.socialText}>{t('auth.continueWithApple')}</Text>
            </TouchableOpacity>
          )}

          {/* Skip */}
          <TouchableOpacity style={styles.skipButton} activeOpacity={0.7} onPress={() => router.replace('/(tabs)')}>
            <Text style={styles.skipText}>{t('common.skip')}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Reset Password Modal */}
      {showResetModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Ionicons name="mail-outline" size={32} color="#818cf8" />
              <Text style={styles.modalTitle}>{t('auth.resetPassword')}</Text>
              <Text style={styles.modalDesc}>{t('auth.resetPasswordDesc')}</Text>
            </View>
            <View style={styles.inputBox}>
              <Ionicons name="mail-outline" size={20} color="#64748b" />
              <TextInput
                style={styles.input}
                placeholder={t('auth.email')}
                placeholderTextColor="#475569"
                value={resetEmail}
                onChangeText={setResetEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <TouchableOpacity
              style={[styles.submitButton, loading && { opacity: 0.7 }]}
              activeOpacity={0.8}
              onPress={handleResetPassword}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.submitText}>{t('auth.sendResetLink')}</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={() => setShowResetModal(false)}>
              <Text style={styles.cancelText}>{t('common.cancel')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  // Header
  header: {
    alignItems: 'center',
    paddingTop: 32,
    marginBottom: 28,
  },
  logoBadge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoArabic: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  headerSubtitle: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
  },

  // Form card
  formCard: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },

  // Toggle
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  toggleActive: {
    backgroundColor: '#334155',
  },
  toggleText: {
    color: '#64748b',
    fontSize: 15,
    fontWeight: '600',
  },
  toggleTextActive: {
    color: '#ffffff',
  },

  // Inputs
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 14,
    marginBottom: 14,
    gap: 10,
  },
  input: {
    flex: 1,
    color: '#ffffff',
    fontSize: 15,
    paddingVertical: 14,
  },

  // Forgot
  forgotText: {
    color: '#818cf8',
    fontSize: 13,
    textAlign: 'right',
    marginBottom: 18,
    marginTop: -4,
  },

  // Submit
  submitButton: {
    backgroundColor: '#10b981',
    paddingVertical: 16,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    marginTop: 4,
  },
  submitText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 10,
  },
  submitIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Switch mode
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  switchText: {
    color: '#94a3b8',
    fontSize: 14,
  },
  switchLink: {
    color: '#818cf8',
    fontSize: 14,
    fontWeight: '600',
  },

  // Divider
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#334155',
  },
  dividerText: {
    color: '#64748b',
    fontSize: 13,
    marginHorizontal: 14,
  },

  // Social
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e293b',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 10,
    marginBottom: 12,
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#333333',
    gap: 10,
    marginBottom: 12,
  },
  socialText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },

  // Skip
  skipButton: {
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 4,
  },
  skipText: {
    color: '#64748b',
    fontSize: 14,
    fontWeight: '500',
  },

  // Modal
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalCard: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 24,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 6,
  },
  modalDesc: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
  },
  cancelText: {
    color: '#94a3b8',
    fontSize: 15,
    textAlign: 'center',
    paddingVertical: 8,
  },
});
