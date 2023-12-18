import { signIn } from 'next-auth/react';
import styles from './Login.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { push, query } = useRouter();

  const callbackUrl: any = query?.callbackUrl || '/';
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    const form = event.target as HTMLFormElement;
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl: callbackUrl,
      });

      if (res?.status === 200) {
        form.reset();
        setIsLoading(false);
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError('Email or password is incorrect');
      }
    } catch (error) {
      setIsLoading(false);
      setError('Email or password is incorrect');
    }
  };

  return (
    <div className={styles.login}>
      <h1 className={styles.login__title}>Login</h1>
      {error && <p className={styles.login__error}>{error}</p>}
      <div className={styles.login__form}>
        <form onSubmit={handleSubmit}>
          <Input label="Email" name="email" type="email" />
          <Input label="Password" name="password" type="password" />
          <Button type="submit" variant="primery">
            {isLoading ? 'Loading...' : 'Masuk'}
          </Button>
        </form>
        <hr className={styles.login__form__devider} />
        <div className={styles.login__form__other}>
          <Button type="button" onClick={() => signIn('google', { callbackUrl, redirect: false })} variant="" className={styles.login__form__other__button}>
            <i className="bx bxl-google" /> Masuk dengan Google
          </Button>
        </div>
      </div>
      <p className={styles.login__link}>
        Belum punya akun? <Link href="/auth/register">Daftar Sekarang</Link>
      </p>
    </div>
  );
};

export default LoginView;
