'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Textarea } from '../ui';
import { kontaktSchema, type KontaktData } from '@/lib/validations/kontaktSchema';

export const KontaktForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<KontaktData>({ resolver: zodResolver(kontaktSchema) });

  const onSubmit = async (values: KontaktData) => {
    setStatus('submitting');
    setErrorMessage(null);
    try {
      const res = await fetch('/api/kontakt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Niečo sa pokazilo. Skús to prosím znova.');
      }
      setStatus('success');
      reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Neznáma chyba.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-[var(--color-light-gray)] p-8 text-center">
        <h3 className="font-heading text-2xl text-black mb-3">Správa odoslaná</h3>
        <p className="font-body text-[var(--color-text-tertiary)]">
          Ďakujem za správu. Ozvem sa ti čo najskôr — väčšinou do 24 hodín.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-4 font-body text-sm text-[var(--color-primary)] underline"
        >
          Poslať ďalšiu správu
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {status === 'error' && errorMessage && (
        <div className="bg-red-50 border-2 border-red-500 p-4 font-body text-sm text-red-700">
          {errorMessage}
        </div>
      )}
      <Input
        label="Meno a priezvisko"
        type="text"
        autoComplete="name"
        {...register('name')}
        error={errors.name?.message}
      />
      <Input
        label="Email"
        type="email"
        autoComplete="email"
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        label="Telefón (nepovinné)"
        type="tel"
        autoComplete="tel"
        {...register('phone')}
        error={errors.phone?.message}
      />
      <Textarea
        label="Správa"
        rows={6}
        {...register('message')}
        error={errors.message?.message}
      />
      <Button
        type="submit"
        variant="filled"
        size="lg"
        disabled={status === 'submitting'}
        className="w-full sm:w-auto"
      >
        {status === 'submitting' ? 'Odosielam…' : 'Odoslať správu'}
      </Button>
    </form>
  );
};
