'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createAdoptionRequest, createVolunteerRequest } from '@/lib/cms/db';

function requiredString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

function optionalString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

export async function submitAdoptionFormAction(formData: FormData) {
  const name = requiredString(formData, 'name');
  const phone = requiredString(formData, 'phone');
  const email = requiredString(formData, 'email');
  const address = requiredString(formData, 'address');
  const experience = requiredString(formData, 'experience');
  const timeAvailability = requiredString(formData, 'timeAvailability');
  const householdSize = requiredString(formData, 'householdSize');
  const message = requiredString(formData, 'message');

  if (!name || !phone || !email || !address || !experience || !timeAvailability || !householdSize || !message) {
    redirect('/adoption?error=missing-fields');
  }

  createAdoptionRequest({
    name,
    phone,
    email,
    address,
    experience,
    previousDogs: optionalString(formData, 'previousDogs'),
    timeAvailability,
    householdSize,
    preferredDog: optionalString(formData, 'preferredDog'),
    message,
  });

  revalidatePath('/admin/forms');
  redirect('/adoption?submitted=1');
}

export async function submitVolunteerFormAction(formData: FormData) {
  const name = requiredString(formData, 'name');
  const phone = requiredString(formData, 'phone');
  const email = requiredString(formData, 'email');
  const city = requiredString(formData, 'city');
  const availability = requiredString(formData, 'availability');
  const message = requiredString(formData, 'message');
  const interests = formData.getAll('interests').filter((item): item is string => typeof item === 'string' && item.trim().length > 0);

  if (!name || !phone || !email || !city || !availability || !message || interests.length === 0) {
    redirect('/volunteer?error=missing-fields');
  }

  createVolunteerRequest({
    name,
    phone,
    email,
    city,
    availability,
    interests,
    experience: optionalString(formData, 'experience'),
    message,
  });

  revalidatePath('/admin/forms');
  redirect('/volunteer?submitted=1');
}
