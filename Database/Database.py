import pymongo

if __name__=="__main__":
    print("WELCOME TO OUR DATABASE")
    c = pymongo.MongoClient("mongodb://localhost:27017")
    print(c)
    
    db = c["CONTRACTOR_CONNECT"] # DATABASE
    customer_collection = db["Customer"] #Customer Collection
    contractor_collection = db["Contractor"] #Contractor Collection


customer_data = [
    {"_id": 1, "Name": "Rahul Sharma", "Phone No.": "123-456-789", "MNC": "ABC Ltd", "Email": "rahul.sharma@example.com", "Address": "123 Main St, Mumbai", "Service Asked": ["Electrical", "Plumbing"]},
    {"_id": 2, "Name": "Priya Patel", "Phone No.": "987-654-321", "MNC": "XYZ Pvt Ltd", "Email": "priya.patel@example.com", "Address": "456 Elm St, Delhi", "Service Asked": ["Carpentry", "Renovation"]},
    {"_id": 3, "Name": "Amit Singh", "Phone No.": "555-123-456", "MNC": "PQR Ltd", "Email": "amit.singh@example.com", "Address": "789 Oak Ave, Bangalore", "Service Asked": ["Construction", "HVAC"]},
    {"_id": 4, "Name": "Ananya Gupta", "Phone No.": "222-333-444", "MNC": "DEF Ltd", "Email": "ananya.gupta@example.com", "Address": "321 Maple St, Kolkata", "Service Asked": ["Design", "Renovation"]},
    {"_id": 5, "Name": "Manish Kumar", "Phone No.": "333-222-111", "MNC": "GHI Ltd", "Email": "manish.kumar@example.com", "Address": "654 Pine St, Chennai", "Service Asked": ["Electrical", "Plumbing"]},
    {"_id": 6, "Name": "Sneha Singhania", "Phone No.": "444-555-666", "MNC": "JKL Pvt Ltd", "Email": "sneha.singhania@example.com", "Address": "987 Cedar St, Pune", "Service Asked": ["Carpentry", "HVAC"]},
    {"_id": 7, "Name": "Vikram Verma", "Phone No.": "777-888-999", "MNC": "MNO Ltd", "Email": "vikram.verma@example.com", "Address": "234 Birch St, Hyderabad", "Service Asked": ["Construction", "Renovation"]},
    {"_id": 8, "Name": "Neha Kapoor", "Phone No.": "666-777-888", "MNC": "STU Ltd", "Email": "neha.kapoor@example.com", "Address": "567 Walnut St, Ahmedabad", "Service Asked": ["Electrical", "Plumbing", "HVAC"]},
    {"_id": 9, "Name": "Rajesh Khanna", "Phone No.": "111-222-333", "MNC": "VWX Pvt Ltd", "Email": "rajesh.khanna@example.com", "Address": "890 Cherry St, Jaipur", "Service Asked": ["Carpentry", "Design"]},
    {"_id": 10, "Name": "Anjali Singh", "Phone No.": "999-888-777", "MNC": "YZA Ltd", "Email": "anjali.singh@example.com", "Address": "111 Pineapple St, Lucknow", "Service Asked": ["Renovation", "HVAC"]},
    {"_id": 11, "Name": "Akash Singh", "Phone No.": "444-333-222", "MNC": "BCD Pvt Ltd", "Email": "akash.singh@example.com", "Address": "222 Coconut St, Patna", "Service Asked": ["Electrical", "Plumbing", "Construction"]},
    {"_id": 12, "Name": "Kavita Sharma", "Phone No.": "777-666-555", "MNC": "EFG Ltd", "Email": "kavita.sharma@example.com", "Address": "333 Lemon St, Bhopal", "Service Asked": ["Design", "Renovation"]},
    {"_id": 13, "Name": "Pradeep Kumar", "Phone No.": "888-999-000", "MNC": "HIJ Ltd", "Email": "pradeep.kumar@example.com", "Address": "444 Grape St, Chandigarh", "Service Asked": ["Carpentry", "Plumbing"]},
    {"_id": 14, "Name": "Swati Verma", "Phone No.": "333-444-555", "MNC": "KLM Pvt Ltd", "Email": "swati.verma@example.com", "Address": "555 Orange St, Indore", "Service Asked": ["Construction", "HVAC"]},
    {"_id": 15, "Name": "Vishal Jain", "Phone No.": "111-222-333", "MNC": "PQR Ltd", "Email": "vishal.jain@example.com", "Address": "666 Banana St, Nagpur", "Service Asked": ["Electrical", "Renovation"]},
    {"_id": 16, "Name": "Anu Singh", "Phone No.": "555-444-333", "MNC": "STU Ltd", "Email": "anu.singh@example.com", "Address": "777 Peach St, Ranchi", "Service Asked": ["Carpentry", "Design", "HVAC"]},
    {"_id": 17, "Name": "Alok Sharma", "Phone No.": "999-888-777", "MNC": "VWX Pvt Ltd", "Email": "alok.sharma@example.com", "Address": "888 Mango St, Guwahati", "Service Asked": ["Plumbing", "Renovation"]},
    {"_id": 18, "Name": "Neha Gupta", "Phone No.": "222-333-444", "MNC": "YZA Ltd", "Email": "neha.gupta@example.com", "Address": "999 Kiwi St, Varanasi", "Service Asked": ["Construction", "Design"]},
    {"_id": 19, "Name": "Raj Singh", "Phone No.": "666-555-444", "MNC": "BCD Pvt Ltd", "Email": "raj.singh@example.com", "Address": "000 Avocado St, Kanpur", "Service Asked": ["Electrical", "Carpentry", "Renovation"]},
    {"_id": 20, "Name": "Suman Verma", "Phone No.": "333-444-555", "MNC": "EFG Ltd", "Email": "suman.verma@example.com", "Address": "111 Watermelon St, Far_idabad", "Service Asked": ["Plumbing", "HVAC"]},
    {"_id": 21, "Name": "Amit Sharma", "Phone No.": "555-666-777", "MNC": "ABC Pvt Ltd", "Email": "amit.sharma@example.com", "Address": "222 Apple St, Mumbai", "Service Asked": ["Electrical", "Renovation"]},
    {"_id": 22, "Name": "Sneha Verma", "Phone No.": "777-888-999", "MNC": "XYZ Ltd", "Email": "sneha.verma@example.com", "Address": "333 Banana St, Delhi", "Service Asked": ["Construction", "HVAC"]},
    {"_id": 23, "Name": "Vikas Singh", "Phone No.": "111-222-333", "MNC": "PQR Pvt Ltd", "Email": "vikas.singh@example.com", "Address": "444 Cherry St, Bangalore", "Service Asked": ["Plumbing", "Design"]},
    {"_id": 24, "Name": "Anjali Verma", "Phone No.": "999-888-777", "MNC": "MNO Pvt Ltd", "Email": "anjali.verma@example.com", "Address": "555 Date St, Kolkata", "Service Asked": ["Carpentry", "Renovation"]},
    {"_id": 25, "Name": "Rakesh Kumar", "Phone No.": "444-333-222", "MNC": "GHI Ltd", "Email": "rakesh.kumar@example.com", "Address": "666 Elm St, Chennai", "Service Asked": ["Electrical", "Construction"]},
    {"_id": 26, "Name": "Pooja Sharma", "Phone No.": "777-666-555", "MNC": "JKL Pvt Ltd", "Email": "pooja.sharma@example.com", "Address": "777 Fig St, Pune", "Service Asked": ["Design", "HVAC"]},
    {"_id": 27, "Name": "Vivek Singh", "Phone No.": "888-999-000", "MNC": "EFG Ltd", "Email": "vivek.singh@example.com", "Address": "888 Grape St, Hyderabad", "Service Asked": ["Renovation", "Plumbing"]},
    {"_id": 28, "Name": "Mamta Verma", "Phone No.": "333-444-555", "MNC": "STU Pvt Ltd", "Email": "mamta.verma@example.com", "Address": "111 Kiwi St, Ahmedabad", "Service Asked": ["Carpentry", "Electrical"]},
    {"_id": 29, "Name": "Ajay Kumar", "Phone No.": "222-333-444", "MNC": "VWX Ltd", "Email": "ajay.kumar@example.com", "Address": "777 Lemon St, Jaipur", "Service Asked": ["Plumbing", "Construction"]},
    {"_id": 30, "Name": "Ritu Sharma", "Phone No.": "666-555-444", "MNC": "YZA Pvt Ltd", "Email": "ritu.sharma@example.com", "Address": "555 Mango St, Lucknow", "Service Asked": ["Design", "Renovation"]},
    {"_id": 31, "Name": "Sumit Verma", "Phone No.": "333-444-555", "MNC": "BCD Ltd", "Email": "sumit.verma@example.com", "Address": "222 Orange St, Patna", "Service Asked": ["Construction", "Plumbing"]},
    {"_id": 32, "Name": "Sonia Singh", "Phone No.": "777-888-999", "MNC": "EFG Pvt Ltd", "Email": "sonia.singh@example.com", "Address": "444 Peach St, Bhopal", "Service Asked": ["Electrical", "HVAC"]},
    {"_id": 33, "Name": "Rajat Sharma", "Phone No.": "111-222-333", "MNC": "HIJ Ltd", "Email": "rajat.sharma@example.com", "Address": "333 Lemon St, Indore", "Service Asked": ["Renovation", "Carpentry"]},
    {"_id": 34, "Name": "Deepak Verma", "Phone No.": "555-666-777", "MNC": "JKL Ltd", "Email": "deepak.verma@example.com", "Address": "777 Grape St, Nagpur", "Service Asked": ["Plumbing", "Electrical"]},
    {"_id": 35, "Name": "Puja Singh", "Phone No.": "777-888-999", "MNC": "ABC Pvt Ltd", "Email": "puja.singh@example.com", "Address": "222 Apple St, Ranchi", "Service Asked": ["Design", "Construction"]},
    {"_id": 36, "Name": "Avinash Sharma", "Phone No.": "222-333-444", "MNC": "DEF Pvt Ltd", "Email": "avinash.sharma@example.com", "Address": "333 Banana St, Guwahati", "Service Asked": ["HVAC", "Renovation"]},
    {"_id": 37, "Name": "Aradhana Verma", "Phone No.": "999-888-777", "MNC": "GHI Ltd", "Email": "aradhana.verma@example.com", "Address": "444 Cherry St, Varanasi", "Service Asked": ["Carpentry", "Plumbing"]},
    {"_id": 38, "Name": "Suresh Singh", "Phone No.": "444-333-222", "MNC": "JKL Pvt Ltd", "Email": "suresh.singh@example.com", "Address": "555 Date St, Kanpur", "Service Asked": ["Electrical", "Construction"]},
    {"_id": 39, "Name": "Rupa Sharma", "Phone No.": "777-666-555", "MNC": "MNO Ltd", "Email": "rupa.sharma@example.com", "Address": "666 Elm St, Far_idabad", "Service Asked": ["Design", "Renovation"]},
    {"_id": 40, "Name": "Sanjay Verma", "Phone No.": "888-999-000", "MNC": "PQR Pvt Ltd", "Email": "sanjay.verma@example.com", "Address": "777 Fig St, Mumbai", "Service Asked": ["Construction", "Plumbing"]},
    {"_id": 41, "Name": "Alka Singh", "Phone No.": "333-444-555", "MNC": "STU Ltd", "Email": "alka.singh@example.com", "Address": "888 Grape St, Delhi", "Service Asked": ["Carpentry", "HVAC"]},
    {"_id": 42, "Name": "Vikrant Sharma", "Phone No.": "555-666-777", "MNC": "VWX Pvt Ltd", "Email": "vikrant.sharma@example.com", "Address": "111 Kiwi St, Bangalore", "Service Asked": ["Electrical", "Renovation"]},
    {"_id": 43, "Name": "Preeti Verma", "Phone No.": "777-888-999", "MNC": "YZA Ltd", "Email": "preeti.verma@example.com", "Address": "444 Lemon St, Kolkata", "Service Asked": ["Carpentry", "Construction"]},
    {"_id": 44, "Name": "Arun Sharma", "Phone No.": "111-222-333", "MNC": "BCD Ltd", "Email": "arun.sharma@example.com", "Address": "333 Mango St, Chennai", "Service Asked": ["Design", "HVAC"]},
    {"_id": 45, "Name": "Smita Singh", "Phone No.": "222-333-444", "MNC": "EFG Pvt Ltd", "Email": "smita.singh@example.com", "Address": "777 Orange St, Pune", "Service Asked": ["Electrical", "Plumbing"]},
    {"_id": 46, "Name": "Rajiv Verma", "Phone No.": "666-555-444", "MNC": "HIJ Ltd", "Email": "rajiv.verma@example.com", "Address": "888 Peach St, Hyderabad", "Service Asked": ["Renovation", "Construction"]},
    {"_id": 47, "Name": "Shalini Sharma", "Phone No.": "333-444-555", "MNC": "JKL Ltd", "Email": "shalini.sharma@example.com", "Address": "999 Grape St, Jaipur", "Service Asked": ["Carpentry", "Electrical"]},
    {"_id": 48, "Name": "Vinod Singh", "Phone No.": "777-888-999", "MNC": "MNO Pvt Ltd", "Email": "vinod.singh@example.com", "Address": "111 Kiwi St, Patna", "Service Asked": ["Design", "Plumbing"]},
    {"_id": 49, "Name": "Ruchi Verma", "Phone No.": "999-888-777", "MNC": "PQR Ltd", "Email": "ruchi.verma@example.com", "Address": "777 Lemon St, Bhopal", "Service Asked": ["HVAC", "Renovation"]},
    {"_id": 50, "Name": "Sanjeev Sharma", "Phone No.": "555-666-777", "MNC": "STU Pvt Ltd", "Email": "sanjeev.sharma@example.com", "Address": "666 Banana St, Indore", "Service Asked": ["Electrical", "Construction"]}
]



     
contractor_data = [
    {"_id": 101, "Name": "John Doe", "Phone No.": "123-456-789", "MNC": "Doe Services", "Email": "john.doe@example.com", "Address": "123 Main St, Mumbai", "Services Offered": ["Electrical", "Plumbing"], "Rating": 4.5, "Average Price": {"Electrical": 1500, "Plumbing": 1200}, "Number of Workers": 8, "Location": "Mumbai", "License Number": "ELEC123456"},
    {"_id": 102, "Name": "Jane Smith", "Phone No.": "987-654-321", "MNC": "Smith Services", "Email": "jane.smith@example.com", "Address": "456 Elm St, Delhi", "Services Offered": ["Carpentry", "Renovation"], "Rating": 4.2, "Average Price": {"Carpentry": 2000, "Renovation": 2500}, "Number of Workers": 10, "Location": "Delhi", "License Number": "CARP987654"},
    {"_id": 103, "Name": "Michael Brown", "Phone No.": "555-123-456", "MNC": "Brown Services", "Email": "michael.brown@example.com", "Address": "789 Oak Ave, Bangalore", "Services Offered": ["Construction", "HVAC"], "Rating": 4.6, "Average Price": {"Construction": 3000, "HVAC": 3500}, "Number of Workers": 12, "Location": "Bangalore", "License Number": "CONS555123"},
    {"_id": 104, "Name": "Jennifer Johnson", "Phone No.": "222-333-444", "MNC": "Johnson Services", "Email": "jennifer.johnson@example.com", "Address": "321 Maple St, Kolkata", "Services Offered": ["Design", "Renovation"], "Rating": 4.3, "Average Price": {"Design": 4000, "Renovation": 2800}, "Number of Workers": 15, "Location": "Kolkata", "License Number": "DES321444"},
    {"_id": 105, "Name": "Christopher Lee", "Phone No.": "333-222-111", "MNC": "Lee Services", "Email": "christopher.lee@example.com", "Address": "654 Pine St, Chennai", "Services Offered": ["Electrical", "Plumbing"], "Rating": 4.4, "Average Price": {"Electrical": 1400, "Plumbing": 1100}, "Number of Workers": 12, "Location": "Chennai", "License Number": "ELEC333222"},
    {"_id": 106, "Name": "Amanda Martinez", "Phone No.": "444-555-666", "MNC": "Martinez Services", "Email": "amanda.martinez@example.com", "Address": "987 Cedar St, Pune", "Services Offered": ["Carpentry", "HVAC"], "Rating": 4.7, "Average Price": {"Carpentry": 2200, "HVAC": 3200}, "Number of Workers": 18, "Location": "Pune", "License Number": "CARP444555"},
    {"_id": 107, "Name": "David Wilson", "Phone No.": "777-888-999", "MNC": "Wilson Services", "Email": "david.wilson@example.com", "Address": "234 Birch St, Hyderabad", "Services Offered": ["Construction", "Renovation"], "Rating": 4.8, "Average Price": {"Construction": 3200, "Renovation": 2700}, "Number of Workers": 20, "Location": "Hyderabad", "License Number": "CONS777888"},
    {"_id": 108, "Name": "Jessica Taylor", "Phone No.": "666-777-888", "MNC": "Taylor Services", "Email": "jessica.taylor@example.com", "Address": "567 Walnut St, Ahmedabad", "Services Offered": ["Electrical", "Plumbing", "HVAC"], "Rating": 4.6, "Average Price": {"Electrical": 1500, "Plumbing": 1300, "HVAC": 3500}, "Number of Workers": 22, "Location": "Ahmedabad", "License Number": "ELEC666777"},
    {"_id": 109, "Name": "Daniel Anderson", "Phone No.": "111-222-333", "MNC": "Anderson Services", "Email": "daniel.anderson@example.com", "Address": "890 Cherry St, Jaipur", "Services Offered": ["Carpentry", "Design"], "Rating": 4.3, "Average Price": {"Carpentry": 2000, "Design": 3800}, "Number of Workers": 15, "Location": "Jaipur", "License Number": "CARP111222"},
    {"_id": 110, "Name": "Lisa Thomas", "Phone No.": "999-888-777", "MNC": "Thomas Services", "Email": "lisa.thomas@example.com", "Address": "111 Pineapple St, Lucknow", "Services Offered": ["Renovation", "HVAC"], "Rating": 4.5, "Average Price": {"Renovation": 2600, "HVAC": 3300}, "Number of Workers": 18, "Location": "Lucknow", "License Number": "RENO999888"},
    {"_id": 111, "Name": "Kevin Garcia", "Phone No.": "444-333-222", "MNC": "Garcia Services", "Email": "kevin.garcia@example.com", "Address": "222 Coconut St, Patna", "Services Offered": ["Electrical", "Plumbing", "Construction"], "Rating": 4.7, "Average Price": {"Electrical": 1400, "Plumbing": 1200, "Construction": 3100}, "Number of Workers": 25, "Location": "Patna", "License Number": "ELEC444333"},
    {"_id": 112, "Name": "Mary Rodriguez", "Phone No.": "777-666-555", "MNC": "Rodriguez Services", "Email": "mary.rodriguez@example.com", "Address": "333 Lemon St, Bhopal", "Services Offered": ["Design", "Renovation"], "Rating": 4.4, "Average Price": {"Design": 3800, "Renovation": 2900}, "Number of Workers": 20, "Location": "Bhopal", "License Number": "DES777666"},
    {"_id": 113, "Name": "James Martinez", "Phone No.": "888-999-000", "MNC": "Martinez Services", "Email": "james.martinez@example.com", "Address": "444 Grape St, Chandigarh", "Services Offered": ["Carpentry", "Plumbing"], "Rating": 4.6, "Average Price": {"Carpentry": 2100, "Plumbing": 1300}, "Number of Workers": 20, "Location": "Chandigarh", "License Number": "CARP888999"},
    {"_id": 114, "Name": "Michelle Brown", "Phone No.": "333-444-555", "MNC": "Brown Services", "Email": "michelle.brown@example.com", "Address": "555 Orange St, Indore", "Service Provided": ["Construction", "HVAC"], "Rating": 4.8, "Average Price": {"Construction": 3300, "HVAC": 3600}, "Available Workers": 22, "Location": "Indore", "License Number": "HVCX846991"},
    {"_id": 115, "Name": "Matthew Lee", "Phone No.": "111-222-333", "MNC": "Lee Services", "Email": "matthew.lee@example.com", "Address": "666 Banana St, Nagpur", "Service Provided": ["Electrical", "Renovation"], "Rating": 4.7, "Average Price": {"Electrical": 1300, "Renovation": 2700}, "Available Workers": 25, "Location": "Nagpur", "License Number": "DES0781199"},
]




# Insert customer data into the collection
customer_collection.insert_many(customer_data)

# Insert contractor data into the collection
contractor_collection.insert_many(contractor_data)