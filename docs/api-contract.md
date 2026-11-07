# API Contract: Nepal Health Sewa

## Base URL
`/api/v1` (Simulated via RTK Query BaseQuery with fallback mock adapter and local storage persistence)

---

## 1. Donors API
### `GET /donors`
Query parameters:
- `bloodGroup?: string` (e.g. `A+`, `O+`, `B-`, `AB+`)
- `district?: string` (e.g. `Parsa`, `Kathmandu`, `Chitwan`)
- `search?: string`
- `availableOnly?: boolean`

Response:
```json
{
  "donors": [
    {
      "id": "donor-1",
      "firstName": "Rohan",
      "lastName": "Shrestha",
      "bloodGroup": "O+",
      "gender": "Male",
      "age": 28,
      "district": "Parsa",
      "city": "Birgunj",
      "mobile": "9801234567",
      "email": "rohan@example.com",
      "lastDonated": "2024-08-15",
      "isAvailable": true,
      "totalDonations": 6
    }
  ],
  "total": 42
}
```

### `POST /donors`
Request Body:
```json
{
  "firstName": "string",
  "lastName": "string",
  "bloodGroup": "string",
  "gender": "string",
  "dob": "string",
  "district": "string",
  "city": "string",
  "mobile": "string (10 digits)",
  "email": "string",
  "agreedToTerms": true
}
```

---

## 2. Emergency Requests API
### `POST /emergency`
Request Body:
```json
{
  "patientName": "string",
  "patientAge": 45,
  "gender": "Male" | "Female" | "Other",
  "serviceType": "Blood" | "Oxygen" | "Ambulance" | "Medicine",
  "bloodGroupRequired": "B+",
  "unitsRequired": 2,
  "hospitalName": "Narayani Hospital",
  "hospitalAddress": "Birgunj, Parsa",
  "contactPersonName": "Bikash Singh",
  "contactMobile": "9812345678",
  "urgency": "Immediate (Within 2 hrs)" | "Today" | "Scheduled",
  "notes": "Emergency ICU requirement"
}
```

---

## 3. Campaigns API
### `GET /campaigns`
Returns active and upcoming blood donation drives across Nepal districts.

---

## 4. Healthcare Services & Hospitals API
### `GET /services/providers`
Returns list of verified blood banks, ambulance stations, oxygen depots, and hospitals with direct telephone dials.
