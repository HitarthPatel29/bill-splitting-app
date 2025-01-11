# Bill Splitting App for Walmart Associates

This **Bill Splitting App** was created for personal use and is tailored specifically for Walmart associates. While it **might not relate to general bill-splitting scenarios**, it is designed to split Walmart bills effectively, considering the unique benefits and pricing rules applicable to Walmart associates.

## Features
- **Walmart Discount Handling**:
  - Associates receive **10% discount** every day, and **20% discount** once a month
  
- **Product Price Types**:
  - **D**: No tax, with discount.
  - **J**: Tax, with discount.
  - **H**: No tax, no discount.
  - **A**: Tax, no discount.

- **Advanced Calculations**:
  - Final item prices are calculated based on the product type and applicable discounts/taxes.
  - Total amounts are tracked for each unique name entered.
  
- **Dynamic Name List**:
  - Every unique name entered is added to a list, allowing for further entries and tracking.

---

<img src="https://github.com/user-attachments/assets/9ad3583e-cb51-4c52-8990-1f9ba7e32cdc" alt="App Screenshot" height="600"/>

---

## How It Works
1. **Enter Item Details**:
   - Provide the item Price, Person's Name, and price type (`D`, `J`, `H`, or `A`).
   - The app calculates the final price considering taxes, discounts based on the price type.

2. **Name-Based Tracking**:
   - Enter a unique name and it will be stored and listed below the 'Name' textBox for ease in further entries.
   - The app maintains a total amount for each name in the list.

3. **View Results**:
   - See the calculated totals for all names.

---

### Example
Suppose you buy the following items:
- Item 1: $10, `Jay`, Type `D`
- Item 2: $20, `Hit`, Type `J`
- Item 3: $15, `Tirth`, Type `H`
- Item 4: $25, `Hit`, Type `A`

The app will:
1. Apply the appropriate discounts and taxes.
2. Calculate the final prices based on type.
3. Update the total for the individual(s) associated with the items.

---

## Notes
- This app is **not intended for general bill-splitting use**.
- It is designed exclusively for Walmart associates and considers Walmart's pricing and discount rules.
