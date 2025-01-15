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

- **Splitting between people**:
  - Add '+', to add more Name-TextBoxes that allows to add more people splitting an Item.
  - remove '-' button beside each added Name-TextBox to remove the person for that Item

- **Advanced Calculations**:
  - Final item prices are calculated based on the product type and applicable discounts/taxes.
  - Final item prices are equally split between the number of people added for the item
  - Total amounts are tracked for each unique name entered.
  
- **Dynamic Name List**:
  - Every unique name entered is added to a list, allowing a dropBox to make further entries easy.

- **Reset App**:
  - Reset button resets all tracking data and the name list.
---
<div align="center">
  <img src="https://github.com/user-attachments/assets/7b1184e1-5fc9-4365-8166-824fc6477b1a" alt="App Screenshot" height="600"/>
  <img src="https://github.com/user-attachments/assets/a7271072-d378-468f-ad49-ae7dfe831023" alt="App Screenshot" height="600"/>
  <img src="https://github.com/user-attachments/assets/4533a7e3-c568-4df0-82c7-6693442dd4ad" alt="App Screenshot" height="600"/>
</div>

---


## How It Works
1. **Enter Item Details**:
   - Provide the item Price,
   - Enter Person's Name of Names (if you want to split the final amount with multiple people)
   - Select price type (`D`, `J`, `H`, or `A`).

2. **Name-Based Tracking**:
   - Unique name entered will be stored and listed below the Name-textBox for ease in further entries.
   - The app tracks total amount for each Name in the list.

3. **View Results**:
   - The app calculates the final price considering taxes, discounts based on the price type.
   - Splitts final price among all Names added to the item
   - Displays a list of all Unique Names with their contribution to the Bill.

---

### Example
Suppose you buy the following items On ***10% discount*** day:
- Item 1: $10, `Jay`, Type `D`
- Item 2: $20, `Hit`, Type `J`
- Item 3: $15, `Tirth`, Type `H`
- Item 4: $25, `Hit` & `Tirth`, Type `A`

The app will:
1. Apply the appropriate discounts and taxes.
2. Calculate the final prices based on type.
3. Update the total for the individual(s) associated with the items.

---

## Notes
- This app is **not intended for general bill-splitting use**.
- It is designed exclusively for Walmart associates and considers Walmart's pricing and discount rules.
