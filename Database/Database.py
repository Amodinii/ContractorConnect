import pymongo
from pymongo import MongoClient
import uuid
import faker
import random
from datetime import datetime, timedelta

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["CONTRACTORCONNECT"]

# Create a Faker instance with Indian locale to generate Indian fake data
fake = faker.Faker('en_IN')

# Function to generate a random password
def generate_random_password():
    return fake.password(length=12, special_chars=True, digits=True, upper_case=True, lower_case=True)

# Function to generate a random date within a range
def random_date(start_date, end_date):
    delta = end_date - start_date
    random_days = random.randint(0, delta.days)
    return start_date + timedelta(days=random_days)

# Indian states and their cities
indian_states = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool"],
    "Kerala": ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Kollam"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli-Dharwad", "Mangalore", "Belgaum"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
    "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg"],
    "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Ramagundam"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Prayagraj"],
    "Delhi": ["Delhi", "New Delhi", "Noida", "Gurgaon", "Faridabad"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Rishikesh", "Nainital", "Mussoorie"],
    "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
    "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Kathua"],
    "West Bengal": ["Kolkata", "Asansol", "Siliguri", "Durgapur", "Howrah"],
    "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon"],
    "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Tawang", "Ziro", "Bomdila"],
    "Sikkim": ["Gangtok", "Namchi", "Mangan", "Singtam", "Ravangla"]
}

# List of services
services = [
    "Construction and Engineering",
    "Information Technology (IT) Services",
    "Consulting and Professional Services",
    "Marketing and Advertising",
    "Healthcare and Medical Services",
    "Architecture and Design",
    "Transportation and Logistics",
    "Manufacturing and Production",
    "Maintenance and Facilities Management",
    "Hospitality and Events Management",
    "Security Services",
    "Human Resources and Recruitment",
    "Real Estate and Property Management",
    "Energy and Utilities"
]

# Add vendors and companies details
start_date = datetime(2015, 1, 1)
end_date = datetime(2023, 1, 1)

# Add 280 vendors
for _ in range(280):
    # Generate vendor details
    vendor_state = random.choice(list(indian_states.keys()))
    vendor_city = random.choice(indian_states[vendor_state])
    vendor_created_at = random_date(start_date, end_date)
    vendor_services = random.sample(services, random.randint(3, 5))
    vendor_password = generate_random_password()

    # Create vendor entry
    vendor = {
        "username": fake.user_name(),
        "email": fake.email(),
        "password": vendor_password,
        "vendor_company_name": fake.company(),
        "contact_person": fake.name(),
        "phone_number": fake.phone_number(),
        "city": vendor_city,
        "state": vendor_state,
        "created_at": vendor_created_at,
        "services_provided": vendor_services
    }
    db["vendors"].insert_one(vendor)

print("280 Vendors details added successfully.")

# Add 100 companies
for _ in range(100):
    # Generate company details
    company_email = fake.email()
    company_password = generate_random_password()
    company_contact_person = fake.name()
    company_phone_number = fake.phone_number()
    company_address = fake.address()
    company_created_at = random_date(start_date, end_date)

    # Create company entry
    company = {
        "email": company_email,
        "password": company_password,
        "contact_person": company_contact_person,
        "phone_number": company_phone_number,
        "address": company_address,
        "account_created_at": company_created_at,
    }
    db["companies"].insert_one(company)

print("100 Companies details added successfully.")


################################

# Add tenders with tender_vendor_id initially as None
for _ in range(150):
    # Generate tender details
    tender_company_id = random.choice(list(db.companies.distinct("_id")))
    tender_title = fake.sentence(nb_words=6, variable_nb_words=True, ext_word_list=None)
    tender_description = fake.text(max_nb_chars=200)
    tender_category = random.choice(services)
    tender_created_at = random_date(start_date, end_date)
    tender_status = "Open"

    # Create tender entry
    tender = {
        "company_id": tender_company_id,
        "vendor_id": None,  # Initially set to None
        "title": tender_title,
        "description": tender_description,
        "category": tender_category,
        "created_at": tender_created_at,
        "status": tender_status
    }
    db["tender"].insert_one(tender)

print("150 Tenders added successfully.")

# Assuming that the vendor accepts a tender and updates the tender_vendor_id when they accept the tender
# For demonstration, let's randomly assign some tenders to vendors
for tender in db["tender"].find({ "vendor_id": None }):
    # Get a random vendor ID
    vendor_id = random.choice(list(db.vendors.distinct("_id")))

    # Update the tender with the vendor ID
    db["tender"].update_one({ "_id": tender["_id"] }, { "$set": { "vendor_id": vendor_id } })

print("Tender vendor IDs updated successfully.")






# Assuming that the vendor accepts a tender and updates the tender_vendor_id when they accept the tender
# For demonstration, let's randomly assign some tenders to vendors
for tender in db["tender"].find({ "vendor_id": None }):
    # Get a random vendor ID
    vendor_id = random.choice(list(db.vendors.distinct("_id")))

    # Update the tender with the vendor ID
    db["tender"].update_one({ "_id": tender["_id"] }, { "$set": { "vendor_id": vendor_id, "status": "Closed" } })

print("Tender vendor IDs updated successfully.")

# Assuming that the company selects a vendor and updates the status to Closed when they select the vendor
# For demonstration, let's randomly select some vendors for tenders
for tender in db["tender"].find({ "vendor_id": { "$ne": None } }):
    # Simulate the company selecting a vendor
    if random.random() < 0.5:  # 50% probability of selecting a vendor
        # Update the tender status to Closed
        db["tender"].update_one({ "_id": tender["_id"] }, { "$set": { "status": "Closed" } })

print("Tender statuses updated after vendor selection.")

# Update the status of tenders where the company didn't select any vendor to Cancelled
db["tender"].update_many({ "vendor_id": None, "status": "Open" }, { "$set": { "status": "Cancelled" } })

print("Tender statuses updated to Cancelled.")







# Add quotations for tenders
for tender in db["tender"].find({ "vendor_id": { "$ne": None }, "status": "Closed" }):
    # Get the vendor ID
    vendor_id = tender["vendor_id"]

    # Generate submission timestamp
    submission_timestamp = random_date(tender["created_at"], datetime.now())

    # Create quotation entry
    quotation = {
        "tender_id": tender["_id"],
        "vendor_id": vendor_id,
        "submitted_at": submission_timestamp
    }
    db["quotations"].insert_one(quotation)

print("Quotations added successfully.")
