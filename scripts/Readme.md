# Contractor Connect Database

This repository contains the code and configuration for a MongoDB database designed to manage contractors and their services.

## Overview
This a MongoDB database designed to facilitate the management of contractors offering various services. The database includes collections for both customers and contractors, enabling efficient tracking of service requests and contractor information.

## Features
- **Customers Collection:** Stores information about customers, including their name, contact details, requested services, and associated company.
- **Contractors Collection:** Stores information about contractors, including their name, contact details, services offered, ratings, average prices, number of workers, location, and license/certification number.

### Customers Collection
The Customer Table stores information about customers who request services from contractors. Each entry in the customer table includes the following fields:
- **ID:** Unique identifier for the customer.
- **Name:** Name of the customer.
- **Phone No.:** Contact phone number of the customer.
- **MNC:** Company associated with the customer.
- **Email:** Email address of the customer.
- **Address:** Physical address of the customer.
- **Service Asked:** List of services requested by the customer.

### Contractors Collection
The Contractor Table stores information about contractors who offer services to customers. Each entry in the contractor table includes the following fields:
- **ID:** Unique identifier for the contractor.
- **Name:** Name of the contractor.
- **Phone No.:** Contact phone number of the contractor.
- **MNC:** Company associated with the contractor.
- **Email:** Email address of the contractor.
- **Address:** Physical address of the contractor.
- **Services Offered:** List of services offered by the contractor.
- **Rating:** Rating of the contractor based on customer feedback.
- **Average Price:** Average price of services offered by the contractor.
- **Number of Workers:** Number of workers employed by the contractor.
- **Location:** Location of the contractor's business operations.
- **License Number:** License or certification number of the contractor.


