// seed.js — Database Seeder
// Run this ONCE to populate MongoDB with sample vehicles and users.
// Command: npm run seed
// WARNING: Clears existing vehicles and customers before inserting.

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");
const Customer = require("./src/models/Customer");
const Vehicle  = require("./src/models/Vehicle");

const sampleVehicles = [
  { name: "Toyota Camry",      type: "Sedan",     registrationNumber: "MH01AB1234", pricePerDay: 2500, isAvailable: true },
  { name: "Honda City",        type: "Sedan",     registrationNumber: "MH02CD5678", pricePerDay: 2200, isAvailable: true },
  { name: "Hyundai Creta",     type: "SUV",       registrationNumber: "MH03EF9012", pricePerDay: 3200, isAvailable: true },
  { name: "Mahindra XUV700",   type: "SUV",       registrationNumber: "MH04GH3456", pricePerDay: 3800, isAvailable: true },
  { name: "Maruti Swift",      type: "Hatchback", registrationNumber: "MH05IJ7890", pricePerDay: 1500, isAvailable: true },
  { name: "Tata Nexon",        type: "Hatchback", registrationNumber: "MH06KL1234", pricePerDay: 1800, isAvailable: true },
  { name: "Mercedes E-Class",  type: "Luxury",    registrationNumber: "MH07MN5678", pricePerDay: 8000, isAvailable: true },
  { name: "BMW 5 Series",      type: "Luxury",    registrationNumber: "MH08OP9012", pricePerDay: 9000, isAvailable: true },
  { name: "Tata Nexon EV",     type: "Electric",  registrationNumber: "MH09QR3456", pricePerDay: 2800, isAvailable: true },
  { name: "MG ZS EV",         type: "Electric",  registrationNumber: "MH10ST7890", pricePerDay: 3000, isAvailable: true },
];

const sampleCustomers = [
  {
    name:     "Admin User",
    email:    "admin@driveeasy.com",
    password: "admin123",         // will be hashed by pre-save hook
    role:     "admin",
  },
  {
    name:     "Raj Sharma",
    email:    "raj@example.com",
    password: "password123",
    role:     "customer",
  },
  {
    name:     "Priya Patel",
    email:    "priya@example.com",
    password: "password123",
    role:     "customer",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await Vehicle.deleteMany({});
    await Customer.deleteMany({});
    console.log("🗑️  Cleared existing vehicles and customers");

    // Insert vehicles
    await Vehicle.insertMany(sampleVehicles);
    console.log(`🚗 Inserted ${sampleVehicles.length} vehicles`);

    // Insert customers (password hashing is handled by the pre-save hook in the model)
    for (const c of sampleCustomers) {
      await Customer.create(c); // using .create() triggers the pre-save hook
    }
    console.log(`👤 Inserted ${sampleCustomers.length} customers`);

    console.log("\n✅ Seeding complete!");
    console.log("─────────────────────────────");
    console.log("Admin login:    admin@driveeasy.com / admin123");
    console.log("Customer login: raj@example.com / password123");
    console.log("─────────────────────────────");

    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
}

seed();
