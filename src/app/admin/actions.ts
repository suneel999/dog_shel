'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import {
  deleteDog,
  deleteUpdate,
  saveDog,
  saveSiteSettings,
  saveUpdate,
  type DogStatus,
  type UpdateCategory,
} from '@/lib/cms/db';
import {
  clearAdminSession,
  createAdminSession,
  requireAdmin,
  verifyAdminPassword,
} from '@/lib/cms/auth';
import { saveUploadedFile } from '@/lib/cms/uploads';

function requiredString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

function optionalString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

function checkboxValue(formData: FormData, key: string) {
  return formData.get(key) === 'on';
}

function numberValue(formData: FormData, key: string, fallback = 0) {
  const value = Number(optionalString(formData, key));
  return Number.isFinite(value) ? value : fallback;
}

function dogStatusValue(value: string): DogStatus {
  if (value === 'Injured' || value === 'Recovered' || value === 'Under Treatment') {
    return value;
  }

  return 'Under Treatment';
}

function updateCategoryValue(value: string): UpdateCategory {
  const allowed: UpdateCategory[] = [
    'rescue',
    'shelter-update',
    'donor',
    'visitor',
    'announcement',
    'transformation',
  ];

  if (allowed.includes(value as UpdateCategory)) {
    return value as UpdateCategory;
  }

  return 'shelter-update';
}

export async function loginAction(formData: FormData) {
  const password = requiredString(formData, 'password');

  if (!verifyAdminPassword(password)) {
    redirect('/admin/login?error=invalid-password');
  }

  createAdminSession();
  redirect('/admin');
}

export async function logoutAction() {
  clearAdminSession();
  redirect('/admin/login');
}

export async function saveSettingsAction(formData: FormData) {
  requireAdmin();

  const phone = requiredString(formData, 'phone');
  const whatsapp = requiredString(formData, 'whatsapp');
  const email = requiredString(formData, 'email');

  if (!phone || !whatsapp || !email) {
    redirect('/admin/settings?error=missing-required-fields');
  }

  saveSiteSettings({
    shelterName: requiredString(formData, 'shelterName') || 'Second Chance Tails',
    heroTitle: requiredString(formData, 'heroTitle') || 'Every rescued animal deserves a second chance.',
    heroText:
      requiredString(formData, 'heroText') ||
      'We rescue, treat, and shelter animals in need across Hyderabad.',
    missionText:
      requiredString(formData, 'missionText') ||
      'To rescue, protect, and rehabilitate animals with medical care, safe shelter, and love.',
    phone,
    whatsapp,
    email,
    address: requiredString(formData, 'address') || 'Bowrampet, Hyderabad, Telangana',
    mapLat: numberValue(formData, 'mapLat', 17.5227),
    mapLng: numberValue(formData, 'mapLng', 78.4053),
    dogsRescued: numberValue(formData, 'dogsRescued'),
    dogsTreated: numberValue(formData, 'dogsTreated'),
    dogsAdopted: numberValue(formData, 'dogsAdopted'),
    activeCases: numberValue(formData, 'activeCases'),
  });

  revalidatePath('/');
  revalidatePath('/contact');
  revalidatePath('/emergency');
  revalidatePath('/donate');
  revalidatePath('/about');
  revalidatePath('/admin/settings');
  redirect('/admin/settings?saved=1');
}

export async function saveDogAction(formData: FormData) {
  requireAdmin();

  const imageUpload = formData.get('imageUpload');
  const beforeUpload = formData.get('beforeImageUpload');
  const afterUpload = formData.get('afterImageUpload');

  const uploadedImage =
    imageUpload instanceof File ? await saveUploadedFile(imageUpload, 'uploads') : '';
  const uploadedBefore =
    beforeUpload instanceof File ? await saveUploadedFile(beforeUpload, 'uploads') : '';
  const uploadedAfter =
    afterUpload instanceof File ? await saveUploadedFile(afterUpload, 'uploads') : '';

  const idValue = optionalString(formData, 'id');
  const publicId = optionalString(formData, 'publicId');
  const name = requiredString(formData, 'name');

  if (!name) {
    redirect('/admin/dogs?error=dog-name-required');
  }

  saveDog({
    id: idValue ? Number(idValue) : undefined,
    publicId,
    name,
    age: requiredString(formData, 'age') || 'Unknown',
    gender: optionalString(formData, 'gender') === 'Female' ? 'Female' : 'Male',
    status: dogStatusValue(optionalString(formData, 'status')),
    image: uploadedImage || optionalString(formData, 'image'),
    beforeImage: uploadedBefore || optionalString(formData, 'beforeImage'),
    afterImage: uploadedAfter || optionalString(formData, 'afterImage'),
    shortDescription: requiredString(formData, 'shortDescription') || 'Rescue profile pending update.',
    fullDescription:
      requiredString(formData, 'fullDescription') ||
      'This rescue profile is being updated by the shelter team.',
    rescueStory:
      requiredString(formData, 'rescueStory') ||
      'Detailed rescue story will be added by the shelter team.',
    healthStatus:
      requiredString(formData, 'healthStatus') ||
      'Health status will be updated by the shelter team.',
    adoptionEligible: checkboxValue(formData, 'adoptionEligible'),
    specialNeeds: optionalString(formData, 'specialNeeds'),
    featured: checkboxValue(formData, 'featured'),
    published: checkboxValue(formData, 'published'),
  });

  revalidatePath('/');
  revalidatePath('/dogs');
  revalidatePath('/transformations');
  if (publicId) {
    revalidatePath(`/dogs/${publicId}`);
  }
  revalidatePath('/admin/dogs');
  redirect('/admin/dogs?saved=1');
}

export async function deleteDogAction(formData: FormData) {
  requireAdmin();

  const id = Number(requiredString(formData, 'id'));
  if (!Number.isFinite(id)) {
    redirect('/admin/dogs?error=dog-delete-failed');
  }

  deleteDog(id);
  revalidatePath('/');
  revalidatePath('/dogs');
  revalidatePath('/transformations');
  revalidatePath('/admin/dogs');
  redirect('/admin/dogs?deleted=1');
}

export async function saveUpdateAction(formData: FormData) {
  requireAdmin();

  const imageUpload = formData.get('imageUpload');
  const uploadedImage =
    imageUpload instanceof File ? await saveUploadedFile(imageUpload, 'uploads') : '';

  const idValue = optionalString(formData, 'id');
  const title = requiredString(formData, 'title');

  if (!title) {
    redirect('/admin/updates?error=update-title-required');
  }

  const slug = saveUpdate({
    id: idValue ? Number(idValue) : undefined,
    slug: optionalString(formData, 'slug'),
    title,
    excerpt: requiredString(formData, 'excerpt') || 'Shelter update',
    body: requiredString(formData, 'body') || 'Shelter update details will appear here.',
    category: updateCategoryValue(optionalString(formData, 'category')),
    image: uploadedImage || optionalString(formData, 'image'),
    featured: checkboxValue(formData, 'featured'),
    published: checkboxValue(formData, 'published'),
    occurredAt: requiredString(formData, 'occurredAt') || new Date().toISOString(),
  });

  revalidatePath('/');
  revalidatePath('/updates');
  revalidatePath('/admin/updates');
  revalidatePath(`/updates/${slug}`);
  redirect('/admin/updates?saved=1');
}

export async function deleteUpdateAction(formData: FormData) {
  requireAdmin();

  const id = Number(requiredString(formData, 'id'));
  if (!Number.isFinite(id)) {
    redirect('/admin/updates?error=update-delete-failed');
  }

  deleteUpdate(id);
  revalidatePath('/');
  revalidatePath('/updates');
  revalidatePath('/admin/updates');
  redirect('/admin/updates?deleted=1');
}
