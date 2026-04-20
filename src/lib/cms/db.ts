import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { unstable_noStore as noStore } from 'next/cache';
import { contactInfo, dogsData, shelterStats } from '@/data/shelter-data';

export type DogStatus = 'Injured' | 'Recovered' | 'Under Treatment';
export type UpdateCategory =
  | 'rescue'
  | 'shelter-update'
  | 'donor'
  | 'visitor'
  | 'announcement'
  | 'transformation';

export interface SiteSettings {
  shelterName: string;
  heroTitle: string;
  heroText: string;
  missionText: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  mapLat: number;
  mapLng: number;
  dogsRescued: number;
  dogsTreated: number;
  dogsAdopted: number;
  activeCases: number;
  updatedAt: string;
}

export interface DogRecord {
  id: number;
  publicId: string;
  name: string;
  age: string;
  gender: 'Male' | 'Female';
  status: DogStatus;
  image: string;
  beforeImage: string;
  afterImage: string;
  shortDescription: string;
  fullDescription: string;
  rescueStory: string;
  healthStatus: string;
  adoptionEligible: boolean;
  specialNeeds: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateRecord {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: UpdateCategory;
  image: string;
  featured: boolean;
  published: boolean;
  occurredAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdoptionRequestRecord {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  experience: string;
  previousDogs: string;
  timeAvailability: string;
  householdSize: string;
  preferredDog: string;
  message: string;
  status: string;
  createdAt: string;
}

export interface VolunteerRequestRecord {
  id: number;
  name: string;
  phone: string;
  email: string;
  city: string;
  availability: string;
  interests: string[];
  experience: string;
  message: string;
  status: string;
  createdAt: string;
}

export interface DashboardCounts {
  dogs: number;
  updates: number;
  adoptionRequests: number;
  volunteerRequests: number;
}

export interface SiteSettingsInput {
  shelterName: string;
  heroTitle: string;
  heroText: string;
  missionText: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  mapLat: number;
  mapLng: number;
  dogsRescued: number;
  dogsTreated: number;
  dogsAdopted: number;
  activeCases: number;
}

export interface DogInput {
  id?: number;
  publicId?: string;
  name: string;
  age: string;
  gender: 'Male' | 'Female';
  status: DogStatus;
  image: string;
  beforeImage: string;
  afterImage: string;
  shortDescription: string;
  fullDescription: string;
  rescueStory: string;
  healthStatus: string;
  adoptionEligible: boolean;
  specialNeeds: string;
  featured: boolean;
  published: boolean;
}

export interface UpdateInput {
  id?: number;
  slug?: string;
  title: string;
  excerpt: string;
  body: string;
  category: UpdateCategory;
  image: string;
  featured: boolean;
  published: boolean;
  occurredAt: string;
}

export interface AdoptionRequestInput {
  name: string;
  phone: string;
  email: string;
  address: string;
  experience: string;
  previousDogs: string;
  timeAvailability: string;
  householdSize: string;
  preferredDog: string;
  message: string;
}

export interface VolunteerRequestInput {
  name: string;
  phone: string;
  email: string;
  city: string;
  availability: string;
  interests: string[];
  experience: string;
  message: string;
}

interface SiteSettingsRow {
  shelter_name: string;
  hero_title: string;
  hero_text: string;
  mission_text: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  map_lat: number;
  map_lng: number;
  dogs_rescued: number;
  dogs_treated: number;
  dogs_adopted: number;
  active_cases: number;
  updated_at: string;
}

interface DogRow {
  id: number;
  public_id: string;
  name: string;
  age: string;
  gender: 'Male' | 'Female';
  status: DogStatus;
  image: string | null;
  before_image: string | null;
  after_image: string | null;
  short_description: string;
  full_description: string;
  rescue_story: string;
  health_status: string;
  adoption_eligible: number;
  special_needs: string | null;
  featured: number;
  published: number;
  created_at: string;
  updated_at: string;
}

interface UpdateRow {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: UpdateCategory;
  image: string | null;
  featured: number;
  published: number;
  occurred_at: string;
  created_at: string;
  updated_at: string;
}

interface CountRow {
  total: number;
}

interface AdoptionRequestRow {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  experience: string;
  previous_dogs: string | null;
  time_availability: string;
  household_size: string;
  preferred_dog: string | null;
  message: string;
  status: string;
  created_at: string;
}

interface VolunteerRequestRow {
  id: number;
  name: string;
  phone: string;
  email: string;
  city: string;
  availability: string;
  interests: string;
  experience: string | null;
  message: string;
  status: string;
  created_at: string;
}

const DATABASE_DIR = path.join(process.cwd(), '.data');
const DATABASE_PATH = path.join(DATABASE_DIR, 'shelter.sqlite');

declare global {
  var __secondChanceTailsDb: DatabaseSync | undefined;
  var __secondChanceTailsDbInitialized: boolean | undefined;
}

function nowIso() {
  return new Date().toISOString();
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80);
}

function mapSiteSettings(row: SiteSettingsRow): SiteSettings {
  return {
    shelterName: row.shelter_name,
    heroTitle: row.hero_title,
    heroText: row.hero_text,
    missionText: row.mission_text,
    phone: row.phone,
    whatsapp: row.whatsapp,
    email: row.email,
    address: row.address,
    mapLat: row.map_lat,
    mapLng: row.map_lng,
    dogsRescued: row.dogs_rescued,
    dogsTreated: row.dogs_treated,
    dogsAdopted: row.dogs_adopted,
    activeCases: row.active_cases,
    updatedAt: row.updated_at,
  };
}

function mapDog(row: DogRow): DogRecord {
  return {
    id: row.id,
    publicId: row.public_id,
    name: row.name,
    age: row.age,
    gender: row.gender,
    status: row.status,
    image: row.image ?? '',
    beforeImage: row.before_image ?? '',
    afterImage: row.after_image ?? '',
    shortDescription: row.short_description,
    fullDescription: row.full_description,
    rescueStory: row.rescue_story,
    healthStatus: row.health_status,
    adoptionEligible: Boolean(row.adoption_eligible),
    specialNeeds: row.special_needs ?? '',
    featured: Boolean(row.featured),
    published: Boolean(row.published),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapUpdate(row: UpdateRow): UpdateRecord {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    body: row.body,
    category: row.category,
    image: row.image ?? '',
    featured: Boolean(row.featured),
    published: Boolean(row.published),
    occurredAt: row.occurred_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapAdoptionRequest(row: AdoptionRequestRow): AdoptionRequestRecord {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    address: row.address,
    experience: row.experience,
    previousDogs: row.previous_dogs ?? '',
    timeAvailability: row.time_availability,
    householdSize: row.household_size,
    preferredDog: row.preferred_dog ?? '',
    message: row.message,
    status: row.status,
    createdAt: row.created_at,
  };
}

function mapVolunteerRequest(row: VolunteerRequestRow): VolunteerRequestRecord {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    city: row.city,
    availability: row.availability,
    interests: row.interests ? JSON.parse(row.interests) : [],
    experience: row.experience ?? '',
    message: row.message,
    status: row.status,
    createdAt: row.created_at,
  };
}

function getDatabase() {
  if (!globalThis.__secondChanceTailsDb) {
    mkdirSync(DATABASE_DIR, { recursive: true });
    globalThis.__secondChanceTailsDb = new DatabaseSync(DATABASE_PATH);
  }

  if (!globalThis.__secondChanceTailsDbInitialized) {
    initializeDatabase(globalThis.__secondChanceTailsDb);
    globalThis.__secondChanceTailsDbInitialized = true;
  }

  return globalThis.__secondChanceTailsDb;
}

function initializeDatabase(db: DatabaseSync) {
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS site_settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      shelter_name TEXT NOT NULL,
      hero_title TEXT NOT NULL,
      hero_text TEXT NOT NULL,
      mission_text TEXT NOT NULL,
      phone TEXT NOT NULL,
      whatsapp TEXT NOT NULL,
      email TEXT NOT NULL,
      address TEXT NOT NULL,
      map_lat REAL NOT NULL,
      map_lng REAL NOT NULL,
      dogs_rescued INTEGER NOT NULL DEFAULT 0,
      dogs_treated INTEGER NOT NULL DEFAULT 0,
      dogs_adopted INTEGER NOT NULL DEFAULT 0,
      active_cases INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS dogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      public_id TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      age TEXT NOT NULL,
      gender TEXT NOT NULL,
      status TEXT NOT NULL,
      image TEXT,
      before_image TEXT,
      after_image TEXT,
      short_description TEXT NOT NULL,
      full_description TEXT NOT NULL,
      rescue_story TEXT NOT NULL,
      health_status TEXT NOT NULL,
      adoption_eligible INTEGER NOT NULL DEFAULT 0,
      special_needs TEXT,
      featured INTEGER NOT NULL DEFAULT 0,
      published INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS updates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      body TEXT NOT NULL,
      category TEXT NOT NULL,
      image TEXT,
      featured INTEGER NOT NULL DEFAULT 0,
      published INTEGER NOT NULL DEFAULT 1,
      occurred_at TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS adoption_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      address TEXT NOT NULL,
      experience TEXT NOT NULL,
      previous_dogs TEXT,
      time_availability TEXT NOT NULL,
      household_size TEXT NOT NULL,
      preferred_dog TEXT,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS volunteer_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      city TEXT NOT NULL,
      availability TEXT NOT NULL,
      interests TEXT NOT NULL,
      experience TEXT,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      created_at TEXT NOT NULL
    );
  `);

  seedDatabase(db);
}

function seedDatabase(db: DatabaseSync) {
  const settingsCount = db.prepare('SELECT COUNT(*) as total FROM site_settings').get<CountRow>();
  if (!settingsCount || settingsCount.total === 0) {
    db.prepare(`
      INSERT INTO site_settings (
        id, shelter_name, hero_title, hero_text, mission_text, phone, whatsapp, email,
        address, map_lat, map_lng, dogs_rescued, dogs_treated, dogs_adopted, active_cases, updated_at
      ) VALUES (
        1, $shelterName, $heroTitle, $heroText, $missionText, $phone, $whatsapp, $email,
        $address, $mapLat, $mapLng, $dogsRescued, $dogsTreated, $dogsAdopted, $activeCases, $updatedAt
      )
    `).run({
      $shelterName: 'Second Chance Tails',
      $heroTitle: 'Every rescued animal deserves safety, treatment, and a second chance.',
      $heroText:
        'We rescue injured and abandoned animals across Hyderabad, provide medical care, and help them recover in a safe shelter until they are ready for a forever home.',
      $missionText:
        'To rescue, protect, and rehabilitate dogs and other animals in need by providing medical help, safe shelter, and unconditional love.',
      $phone: contactInfo.phone,
      $whatsapp: contactInfo.whatsapp,
      $email: contactInfo.email,
      $address: contactInfo.address,
      $mapLat: contactInfo.location.lat,
      $mapLng: contactInfo.location.lng,
      $dogsRescued: shelterStats.dogsRescued,
      $dogsTreated: shelterStats.dogsTreated,
      $dogsAdopted: shelterStats.dogsAdopted,
      $activeCases: shelterStats.activeCases,
      $updatedAt: nowIso(),
    });
  }

  const dogsCount = db.prepare('SELECT COUNT(*) as total FROM dogs').get<CountRow>();
  if (!dogsCount || dogsCount.total === 0) {
    const statement = db.prepare(`
      INSERT INTO dogs (
        public_id, name, age, gender, status, image, before_image, after_image,
        short_description, full_description, rescue_story, health_status,
        adoption_eligible, special_needs, featured, published, created_at, updated_at
      ) VALUES (
        $publicId, $name, $age, $gender, $status, $image, $beforeImage, $afterImage,
        $shortDescription, $fullDescription, $rescueStory, $healthStatus,
        $adoptionEligible, $specialNeeds, $featured, 1, $createdAt, $updatedAt
      )
    `);

    dogsData.forEach((dog, index) => {
      const timestamp = nowIso();
      statement.run({
        $publicId: dog.id,
        $name: dog.name,
        $age: dog.age,
        $gender: dog.gender,
        $status: dog.status,
        $image: dog.image || '',
        $beforeImage: dog.beforeImage || '',
        $afterImage: dog.afterImage || '',
        $shortDescription: dog.shortDescription,
        $fullDescription: dog.fullDescription,
        $rescueStory: dog.rescueStory,
        $healthStatus: dog.healthStatus,
        $adoptionEligible: dog.adoptionEligible ? 1 : 0,
        $specialNeeds: dog.specialNeeds || '',
        $featured: index < 6 ? 1 : 0,
        $createdAt: timestamp,
        $updatedAt: timestamp,
      });
    });
  }

  const updatesCount = db.prepare('SELECT COUNT(*) as total FROM updates').get<CountRow>();
  if (!updatesCount || updatesCount.total === 0) {
    const timestamp = nowIso();
    const statement = db.prepare(`
      INSERT INTO updates (
        slug, title, excerpt, body, category, image, featured, published, occurred_at, created_at, updated_at
      ) VALUES (
        $slug, $title, $excerpt, $body, $category, $image, $featured, 1, $occurredAt, $createdAt, $updatedAt
      )
    `);

    const seedUpdates: Omit<UpdateInput, 'id'>[] = [
      {
        slug: 'bruno-completed-recovery',
        title: 'Bruno completed his recovery journey',
        excerpt: 'After surgery and physiotherapy, Bruno is healthy, playful, and ready for adoption.',
        body:
          'Bruno came to us after a serious road accident. Months of surgery, rest, and physiotherapy later, he now walks and plays confidently. Updates like this show what consistent medical care and shelter support can achieve.',
        category: 'transformation',
        image: '/images/dogs/after_1.jpeg',
        featured: true,
        published: true,
        occurredAt: timestamp,
      },
      {
        slug: 'shelter-needs-monthly-support',
        title: 'Our shelter needs steady monthly support',
        excerpt: 'Food, medicines, rent, and recovery care continue every day for the animals in our shelter.',
        body:
          'We currently care for many active cases that need daily food, treatment, cleaning, and recovery support. Monthly giving helps us plan responsibly and continue emergency rescues without delay.',
        category: 'shelter-update',
        image: '/images/dogs/after_5.jpeg',
        featured: true,
        published: true,
        occurredAt: timestamp,
      },
      {
        slug: 'new-rescue-cases-continue-across-hyderabad',
        title: 'Emergency rescue calls continue across Hyderabad',
        excerpt: 'Our team remains on call for road accidents, illness, abandonment, and urgent shelter admissions.',
        body:
          'From injured roadside cases to abandoned animals needing immediate care, rescue calls keep coming in from different parts of Hyderabad. This is why a quick-response contact line and community support matter so much.',
        category: 'rescue',
        image: '/images/dogs/after_7.jpeg',
        featured: false,
        published: true,
        occurredAt: timestamp,
      },
    ];

    seedUpdates.forEach((update) => {
      statement.run({
        $slug: update.slug,
        $title: update.title,
        $excerpt: update.excerpt,
        $body: update.body,
        $category: update.category,
        $image: update.image,
        $featured: update.featured ? 1 : 0,
        $occurredAt: update.occurredAt,
        $createdAt: timestamp,
        $updatedAt: timestamp,
      });
    });
  }
}

function uniqueUpdateSlug(baseSlug: string, currentId?: number) {
  const db = getDatabase();
  let candidate = baseSlug || `update-${Date.now()}`;
  let suffix = 2;

  while (true) {
    const row = db
      .prepare('SELECT id FROM updates WHERE slug = $slug')
      .get<{ id: number }>({ $slug: candidate });

    if (!row || row.id === currentId) {
      return candidate;
    }

    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
}

function nextDogPublicId() {
  const db = getDatabase();
  const row = db
    .prepare('SELECT MAX(CAST(public_id AS INTEGER)) as total FROM dogs')
    .get<CountRow>();

  return String((row?.total ?? 0) + 1);
}

export function getSiteSettings() {
  noStore();
  const row = getDatabase()
    .prepare('SELECT * FROM site_settings WHERE id = 1')
    .get<SiteSettingsRow>();

  if (!row) {
    throw new Error('Site settings are missing.');
  }

  return mapSiteSettings(row);
}

export function getFeaturedDogs(limit = 6) {
  noStore();
  const rows = getDatabase()
    .prepare(`
      SELECT * FROM dogs
      WHERE published = 1
      ORDER BY featured DESC, updated_at DESC, CAST(public_id AS INTEGER) DESC
      LIMIT $limit
    `)
    .all<DogRow>({ $limit: limit });

  return rows.map(mapDog);
}

export function getPublishedDogs() {
  noStore();
  const rows = getDatabase()
    .prepare(`
      SELECT * FROM dogs
      WHERE published = 1
      ORDER BY status = 'Recovered' DESC, featured DESC, updated_at DESC, CAST(public_id AS INTEGER) DESC
    `)
    .all<DogRow>();

  return rows.map(mapDog);
}

export function getDogByPublicId(publicId: string, includeUnpublished = false) {
  noStore();
  const row = getDatabase()
    .prepare(`
      SELECT * FROM dogs
      WHERE public_id = $publicId
      ${includeUnpublished ? '' : 'AND published = 1'}
      LIMIT 1
    `)
    .get<DogRow>({ $publicId: publicId });

  return row ? mapDog(row) : null;
}

export function getTransformationDogs() {
  noStore();
  const rows = getDatabase()
    .prepare(`
      SELECT * FROM dogs
      WHERE published = 1
        AND before_image IS NOT NULL AND before_image != ''
        AND after_image IS NOT NULL AND after_image != ''
      ORDER BY updated_at DESC
    `)
    .all<DogRow>();

  return rows.map(mapDog);
}

export function getPublishedUpdates(limit?: number) {
  noStore();
  const rows = limit
    ? getDatabase()
        .prepare(`
          SELECT * FROM updates
          WHERE published = 1
          ORDER BY occurred_at DESC, updated_at DESC
          LIMIT $limit
        `)
        .all<UpdateRow>({ $limit: limit })
    : getDatabase()
        .prepare(`
          SELECT * FROM updates
          WHERE published = 1
          ORDER BY occurred_at DESC, updated_at DESC
        `)
        .all<UpdateRow>();

  return rows.map(mapUpdate);
}

export function getFeaturedUpdates(limit = 3) {
  noStore();
  const rows = getDatabase()
    .prepare(`
      SELECT * FROM updates
      WHERE published = 1
      ORDER BY featured DESC, occurred_at DESC, updated_at DESC
      LIMIT $limit
    `)
    .all<UpdateRow>({ $limit: limit });

  return rows.map(mapUpdate);
}

export function getUpdateBySlug(slug: string, includeUnpublished = false) {
  noStore();
  const row = getDatabase()
    .prepare(`
      SELECT * FROM updates
      WHERE slug = $slug
      ${includeUnpublished ? '' : 'AND published = 1'}
      LIMIT 1
    `)
    .get<UpdateRow>({ $slug: slug });

  return row ? mapUpdate(row) : null;
}

export function getAdminDogs() {
  noStore();
  const rows = getDatabase()
    .prepare(`
      SELECT * FROM dogs
      ORDER BY featured DESC, updated_at DESC, CAST(public_id AS INTEGER) DESC
    `)
    .all<DogRow>();

  return rows.map(mapDog);
}

export function getAdminUpdates() {
  noStore();
  const rows = getDatabase()
    .prepare(`
      SELECT * FROM updates
      ORDER BY occurred_at DESC, updated_at DESC
    `)
    .all<UpdateRow>();

  return rows.map(mapUpdate);
}

export function getAdoptionRequests() {
  noStore();
  const rows = getDatabase()
    .prepare(`
      SELECT * FROM adoption_requests
      ORDER BY created_at DESC
    `)
    .all<AdoptionRequestRow>();

  return rows.map(mapAdoptionRequest);
}

export function getVolunteerRequests() {
  noStore();
  const rows = getDatabase()
    .prepare(`
      SELECT * FROM volunteer_requests
      ORDER BY created_at DESC
    `)
    .all<VolunteerRequestRow>();

  return rows.map(mapVolunteerRequest);
}

export function getDashboardCounts(): DashboardCounts {
  noStore();
  const db = getDatabase();

  return {
    dogs: db.prepare('SELECT COUNT(*) as total FROM dogs').get<CountRow>()?.total ?? 0,
    updates: db.prepare('SELECT COUNT(*) as total FROM updates').get<CountRow>()?.total ?? 0,
    adoptionRequests:
      db.prepare('SELECT COUNT(*) as total FROM adoption_requests').get<CountRow>()?.total ?? 0,
    volunteerRequests:
      db.prepare('SELECT COUNT(*) as total FROM volunteer_requests').get<CountRow>()?.total ?? 0,
  };
}

export function saveSiteSettings(input: SiteSettingsInput) {
  getDatabase()
    .prepare(`
      UPDATE site_settings
      SET shelter_name = $shelterName,
          hero_title = $heroTitle,
          hero_text = $heroText,
          mission_text = $missionText,
          phone = $phone,
          whatsapp = $whatsapp,
          email = $email,
          address = $address,
          map_lat = $mapLat,
          map_lng = $mapLng,
          dogs_rescued = $dogsRescued,
          dogs_treated = $dogsTreated,
          dogs_adopted = $dogsAdopted,
          active_cases = $activeCases,
          updated_at = $updatedAt
      WHERE id = 1
    `)
    .run({
      $shelterName: input.shelterName,
      $heroTitle: input.heroTitle,
      $heroText: input.heroText,
      $missionText: input.missionText,
      $phone: input.phone,
      $whatsapp: input.whatsapp,
      $email: input.email,
      $address: input.address,
      $mapLat: input.mapLat,
      $mapLng: input.mapLng,
      $dogsRescued: input.dogsRescued,
      $dogsTreated: input.dogsTreated,
      $dogsAdopted: input.dogsAdopted,
      $activeCases: input.activeCases,
      $updatedAt: nowIso(),
    });
}

export function saveDog(input: DogInput) {
  const db = getDatabase();
  const timestamp = nowIso();
  const publicId = input.publicId?.trim() || nextDogPublicId();

  if (input.id) {
    db.prepare(`
      UPDATE dogs
      SET public_id = $publicId,
          name = $name,
          age = $age,
          gender = $gender,
          status = $status,
          image = $image,
          before_image = $beforeImage,
          after_image = $afterImage,
          short_description = $shortDescription,
          full_description = $fullDescription,
          rescue_story = $rescueStory,
          health_status = $healthStatus,
          adoption_eligible = $adoptionEligible,
          special_needs = $specialNeeds,
          featured = $featured,
          published = $published,
          updated_at = $updatedAt
      WHERE id = $id
    `).run({
      $id: input.id,
      $publicId: publicId,
      $name: input.name,
      $age: input.age,
      $gender: input.gender,
      $status: input.status,
      $image: input.image,
      $beforeImage: input.beforeImage,
      $afterImage: input.afterImage,
      $shortDescription: input.shortDescription,
      $fullDescription: input.fullDescription,
      $rescueStory: input.rescueStory,
      $healthStatus: input.healthStatus,
      $adoptionEligible: input.adoptionEligible ? 1 : 0,
      $specialNeeds: input.specialNeeds,
      $featured: input.featured ? 1 : 0,
      $published: input.published ? 1 : 0,
      $updatedAt: timestamp,
    });

    return input.id;
  }

  const result = db.prepare(`
    INSERT INTO dogs (
      public_id, name, age, gender, status, image, before_image, after_image,
      short_description, full_description, rescue_story, health_status,
      adoption_eligible, special_needs, featured, published, created_at, updated_at
    ) VALUES (
      $publicId, $name, $age, $gender, $status, $image, $beforeImage, $afterImage,
      $shortDescription, $fullDescription, $rescueStory, $healthStatus,
      $adoptionEligible, $specialNeeds, $featured, $published, $createdAt, $updatedAt
    )
  `).run({
    $publicId: publicId,
    $name: input.name,
    $age: input.age,
    $gender: input.gender,
    $status: input.status,
    $image: input.image,
    $beforeImage: input.beforeImage,
    $afterImage: input.afterImage,
    $shortDescription: input.shortDescription,
    $fullDescription: input.fullDescription,
    $rescueStory: input.rescueStory,
    $healthStatus: input.healthStatus,
    $adoptionEligible: input.adoptionEligible ? 1 : 0,
    $specialNeeds: input.specialNeeds,
    $featured: input.featured ? 1 : 0,
    $published: input.published ? 1 : 0,
    $createdAt: timestamp,
    $updatedAt: timestamp,
  });

  return Number(result.lastInsertRowid);
}

export function deleteDog(id: number) {
  getDatabase().prepare('DELETE FROM dogs WHERE id = $id').run({ $id: id });
}

export function saveUpdate(input: UpdateInput) {
  const db = getDatabase();
  const timestamp = nowIso();
  const slug = uniqueUpdateSlug(slugify(input.slug || input.title), input.id);

  if (input.id) {
    db.prepare(`
      UPDATE updates
      SET slug = $slug,
          title = $title,
          excerpt = $excerpt,
          body = $body,
          category = $category,
          image = $image,
          featured = $featured,
          published = $published,
          occurred_at = $occurredAt,
          updated_at = $updatedAt
      WHERE id = $id
    `).run({
      $id: input.id,
      $slug: slug,
      $title: input.title,
      $excerpt: input.excerpt,
      $body: input.body,
      $category: input.category,
      $image: input.image,
      $featured: input.featured ? 1 : 0,
      $published: input.published ? 1 : 0,
      $occurredAt: input.occurredAt,
      $updatedAt: timestamp,
    });

    return slug;
  }

  const result = db.prepare(`
    INSERT INTO updates (
      slug, title, excerpt, body, category, image, featured, published, occurred_at, created_at, updated_at
    ) VALUES (
      $slug, $title, $excerpt, $body, $category, $image, $featured, $published, $occurredAt, $createdAt, $updatedAt
    )
  `).run({
    $slug: slug,
    $title: input.title,
    $excerpt: input.excerpt,
    $body: input.body,
    $category: input.category,
    $image: input.image,
    $featured: input.featured ? 1 : 0,
    $published: input.published ? 1 : 0,
    $occurredAt: input.occurredAt,
    $createdAt: timestamp,
    $updatedAt: timestamp,
  });

  return slug;
}

export function deleteUpdate(id: number) {
  getDatabase().prepare('DELETE FROM updates WHERE id = $id').run({ $id: id });
}

export function createAdoptionRequest(input: AdoptionRequestInput) {
  getDatabase().prepare(`
    INSERT INTO adoption_requests (
      name, phone, email, address, experience, previous_dogs,
      time_availability, household_size, preferred_dog, message, status, created_at
    ) VALUES (
      $name, $phone, $email, $address, $experience, $previousDogs,
      $timeAvailability, $householdSize, $preferredDog, $message, 'new', $createdAt
    )
  `).run({
    $name: input.name,
    $phone: input.phone,
    $email: input.email,
    $address: input.address,
    $experience: input.experience,
    $previousDogs: input.previousDogs,
    $timeAvailability: input.timeAvailability,
    $householdSize: input.householdSize,
    $preferredDog: input.preferredDog,
    $message: input.message,
    $createdAt: nowIso(),
  });
}

export function createVolunteerRequest(input: VolunteerRequestInput) {
  getDatabase().prepare(`
    INSERT INTO volunteer_requests (
      name, phone, email, city, availability, interests, experience, message, status, created_at
    ) VALUES (
      $name, $phone, $email, $city, $availability, $interests, $experience, $message, 'new', $createdAt
    )
  `).run({
    $name: input.name,
    $phone: input.phone,
    $email: input.email,
    $city: input.city,
    $availability: input.availability,
    $interests: JSON.stringify(input.interests),
    $experience: input.experience,
    $message: input.message,
    $createdAt: nowIso(),
  });
}
