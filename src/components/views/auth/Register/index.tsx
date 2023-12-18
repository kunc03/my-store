import Input from '@/components/ui/Input';
import styles from './Register.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import Button from '@/components/ui/Button';
import { signIn } from 'next-auth/react';

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { push, query } = useRouter();

  const callbackUrl: any = query?.callbackUrl || '/';
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      password: form.password.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
    };

    const result = await fetch('/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      form.reset();
      setIsLoading(false);
      push('/auth/login');
    } else {
      setIsLoading(false);
      setError('Something went wrong');
    }
  };

  return (
    <div className={styles.register}>
      <h1 className={styles.register__title}>Daftar</h1>
      {error && <p className={styles.register__error}>{error}</p>}
      <div className={styles.register__form}>
        <form onSubmit={handleSubmit}>
          <Input label="Email" name="email" type="email" />
          <Input label="Password" name="password" type="password" />
          <Input label="Fullname" name="fullname" type="text" />
          <Input label="Phone" name="phone" type="text" />

          <Button type="submit" variant="primery">
            {isLoading ? 'Loading...' : 'Daftar'}
          </Button>
        </form>
        <hr className={styles.register__form__devider} />
        <div className={styles.register__form__other}>
          <Button type="button" onClick={() => signIn('google', { callbackUrl, redirect: false })} variant="" className={styles.login__form__other__button}>
            <i className="bx bxl-google" /> Daftar dengan Google
          </Button>
        </div>
      </div>
      <p className={styles.register__link}>
        Sudah punya akun? ayo <Link href="/auth/login">Masuk</Link>
      </p>
    </div>
  );
};

export default RegisterView;
