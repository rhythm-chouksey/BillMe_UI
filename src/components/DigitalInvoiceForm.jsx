import React, { useState } from "react";
import axios from "axios";
import "./DigitalInvoiceForm.css";

// Paste your curl JSON here as initialFormData
const initialFormData = {
  sms: false,
  email: false,
  customerData: {
    customerId: "ARTC235476",
    phone: "9910403116",
    email: "rhythm.chouksey@example.com",
    firstName: "Rhythm",
    lastName: "Chouksey",
    gender: "male",
    dateOfBirth: "1996-04-20",
    city: "mumbai",
    state: "maharashtra",
    profession: "Developer",
    companyName: "BillMe",
    maritalStatus: "married",
    spouseFirstName: "Sonam",
    spouseLastName: "Gupta",
    anniversaryDate: "2021-05-28",
    age: 25,
    shippingAddress: "Marine Drive, Mumbai, Maharashtra",
    shippingAddressCode: 400020
  },
  loyaltyData: {
    type: "cashback",
    cardNum: "V1218199412",
    pointsEarned: 127,
    walletAmount: 1500.0,
    amountSaved: 50.0,
    pointsRedeemed: 127
  },
  storeData: {
    storeAddress: "Akshar Building, No. 40, Krishna Changa Naik Marg, Sector 46, Navi Mumbai, Maharashtra 400706",
    pinCode: "400706",
    displayAddress: "Sector 46a, Seawoods",
    storeGstNumber: "RDE4672397RE251",
    storeNumberPrimary: "+8080010101",
    storeNumberSecondary: "+7070010101",
    managerEmailId: "Kapil@billme.co.in",
    managerName: "Kapil",
    storeEmailId: "store@billme.co.in",
    storeTiming: "9am - 12 pm",
    storeBrandName: "BillMe"
  },
  companyData: {
    name: "BillMe",
    address: "11th Floor, Tower-1, Grand Central, Seawoods Station Rd, Navi Mumbai, Maharashtra 400706",
    pinCode: "400706",
    cin: "Z73204JA4004JTl035759",
    phoneNumber: "9876543210",
    helplineNumber: "022-242017"
  },
  transactionalData: {
    clientId: "2882482",
    batchId: "9344",
    roc: "204",
    txnId: "0",
    txnType: "",
    invoiceType: "Tax Invoice",
    invoiceNumber: "25329 002 0144147",
    invoiceDate: 1619421892064,
    orderNumber: "A376",
    orderType: "cod",
    cashierName: "Rupam Jain",
    cashierId: "TED9586",
    posNumber: "A312",
    barCodeNum: "54632645271",
    qrCodeNum: "ARE 635657647",
    transactionType: "BM",
    deliveryStatusUrl: "https://www.billme.co.in/"
  },
  paymentData: {
    paymentMethods: [
      { name: "Cash On Delivery", amount: 500.0 },
      { name: "Airtel Wallet", amount: 350.0, bankTxnId: "9820550338" },
      { name: "Fashalot", couponCode: "FASH-VYDSQ", amount: 1000.58 },
      { name: "Coupon", couponCode: "DYGWRC12ADE", couponCodeValidity: "2022-12-12", amount: 400.0 },
      { name: "Credit Note", paymentId: "487621856398465", amount: 100.0, remainAmount: 75.9, remainAmountValidity: "2022-12-12" }
    ],
    status: "paid"
  },
  productsData: [
    {
      name: "BLACK LOGO PRINT CREW NECK T-SHIRT",
      description: "Premium t-shirt",
      productCode: "A123",
      quantity: 1,
      unitAmount: 300.0,
      totalAmount: 250.0,
      hsnCode: "6276462",
      discount: 50,
      discountDescription: "11% off discount",
      imageUrl: "https://assets.billme.co.in/public/images.jpeg",
      taxes: {
        sgstPercent: 6.0,
        sgst: 8.0,
        cgstPercent: 6.0,
        cgst: 8.0,
        igstPercent: 6.0,
        igst: 8.0,
        utgstPercent: 6.0,
        utgst: 3.0
      },
      brand: "BigKart",
      style: "3 Fold Premium Umbrella",
      colour: "White",
      size: "1meter",
      subItems: [
        {
          name: "Raincoat",
          description: "its best quality Raincoat",
          productCode: "A999",
          quantity: 1,
          unitAmount: 300.0,
          totalAmount: 324.0,
          hsnCode: "6276213",
          discount: 0,
          taxes: {
            sgstPercent: 6.0,
            sgst: 8.0,
            cgstPercent: 6.0,
            cgst: 8.0,
            igstPercent: 6.0,
            igst: 8.0,
            utgstPercent: 6.0,
            utgst: 3.0
          },
          brand: "BigKart",
          style: "3 Fold Raincoat",
          colour: "White"
        }
      ]
    },
    {
      name: "BLACK LOGO RISE WASHED GLENN SLIM FIT JEANS",
      description: "BLACK LOGO RISE WASHED GLENN SLIM FIT JEANS",
      productCode: "A124",
      quantity: 2,
      unitAmount: 700.0,
      totalAmount: 1400.0,
      hsnCode: "6276462",
      discount: 0,
      imageUrl: "https://assets.billme.co.in/public/images.jpeg",
      taxes: {
        sgstPercent: 6.0,
        sgst: 8.0,
        cgstPercent: 6.0,
        cgst: 8.0,
        igstPercent: 6.0,
        igst: 8.0,
        utgstPercent: 6.0,
        utgst: 3.0
      },
      brand: "SELLCOM",
      style: "Large",
      colour: "Blue",
      size: "Large"
    }
  ],
  billAmountData: {
    totalQty: 3,
    deliveryCharges: 100.0,
    codCharges: 0.0,
    subTotal: 1650.0,
    saleCurrency: "INR",
    changeAmount: 0.0,
    roundupAmount: 1650.0,
    totalDiscountPercent: 0.0,
    totalDiscount: 0.0,
    netPayableAmount: 1750.0,
    amountInWords: "Seventeen Hundred And Fifty Rupees Only"
  },
  taxesData: {
    distributedTax: [
      {
        taxableAmount: 1650.0,
        cgstPercent: 9.0,
        sgstPercent: 9.0,
        igstPercent: 9.0,
        utgstPercent: 9.0,
        cgst: 148.5,
        sgst: 148.5,
        igst: 148.5,
        utgst: 148.5
      }
    ],
    totalTax: 0.0,
    totalTaxPercent: 0.0,
    serviceTax: 0.0,
    serviceTaxPercent: 0.0
  },
  billFooterData: {
    disclaimer: "disclaimer testing",
    purchaseTerms: "https://billme.co.in/",
    feedbackCode: "LTE123",
    feedbackDiscount: 0.0,
    feedbackLink: "https://billme.co.in/",
    orderInstructions: "Please provide black Umbrella"
  }
};

function DigitalInvoiceForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [activeTab, setActiveTab] = useState("customerData");
  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState(null); // <-- Add this
  const [popupType, setPopupType] = useState("success");  // <-- Add this

  // Helper for field labels
  const formatFieldName = (name) =>
    name.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

  // Handle input changes
  const handleChange = (e, section, key, index = null, nestedKey = null) => {
    const value =
      e.target.type === "number" || !isNaN(Number(e.target.value))
        ? Number(e.target.value)
        : e.target.value;

    setFormData((prev) => {
      if (section === "productsData") {
        const products = [...prev.productsData];
        if (nestedKey === "taxes") {
          products[index].taxes[key] = value;
        } else {
          products[index][key] = value;
        }
        return { ...prev, productsData: products };
      }
      if (section === "paymentData" && nestedKey === "paymentMethods") {
        const methods = [...prev.paymentData.paymentMethods];
        methods[index][key] = value;
        return {
          ...prev,
          paymentData: {
            ...prev.paymentData,
            paymentMethods: methods,
          },
        };
      }
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value,
        },
      };
    });
  };

  const handleDeleteProduct = (index) => {
    setFormData((prev) => ({
      ...prev,
      productsData: prev.productsData.filter((_, i) => i !== index),
    }));
  };

  const handleAddProduct = () => {
    setFormData((prev) => ({
      ...prev,
      productsData: [
        ...prev.productsData,
        {
          name: "",
          description: "",
          productCode: "",
          quantity: 0,
          unitAmount: 0,
          totalAmount: 0,
          hsnCode: "",
          discount: 0,
          discountDescription: "",
          imageUrl: "",
          taxes: {
            sgstPercent: 0,
            sgst: 0,
            cgstPercent: 0,
            cgst: 0,
            igstPercent: 0,
            igst: 0,
            utgstPercent: 0,
            utgst: 0,
          },
          brand: "",
          style: "",
          colour: "",
          size: "",
          subItems: [],
        },
      ],
    }));
  };

  const renderFields = (section) => {
    if (section === "productsData") {
      return (
        <div>
          {formData.productsData.map((product, idx) => (
            <div className="product-block" key={idx}>
              <h3>Product {idx + 1}</h3>
              <div className="product-fields">
                {Object.entries(product).map(([key, value]) => {
                  if (key === "taxes") {
                    return (
                      <div className="tax-info-block" key={key}>
                        {Object.entries(value).map(([taxKey, taxValue]) => (
                          <div className="form-field" key={taxKey}>
                            <label className="field-label">{taxKey}</label>
                            <input
                              className="field-input"
                              type="number"
                              value={taxValue}
                              onChange={(e) =>
                                handleChange(e, "productsData", taxKey, idx, "taxes")
                              }
                            />
                          </div>
                        ))}
                      </div>
                    );
                  }
                  if (key === "subItems" && Array.isArray(value)) {
                    // You can add subItem handling here if needed
                    return null;
                  }
                  return (
                    <div className="form-field" key={key}>
                      <label className="field-label">{key}</label>
                      <input
                        className="field-input"
                        type={typeof value === "number" ? "number" : "text"}
                        value={value}
                        onChange={(e) =>
                          handleChange(e, "productsData", key, idx)
                        }
                      />
                    </div>
                  );
                })}
              </div>
              <button
                type="button"
                className="delete-product-button"
                onClick={() => handleDeleteProduct(idx)}
                disabled={formData.productsData.length === 1}
                style={{ marginTop: "10px" }}
              >
                Remove
              </button>
              <hr className="product-separator" />
            </div>
          ))}
          <button
            type="button"
            className="add-product-button"
            onClick={handleAddProduct}
          >
            Add Product
          </button>
        </div>
      );
    }

    if (section === "paymentData") {
      return (
        <div>
          <h5>Payment Methods</h5>
          {formData.paymentData.paymentMethods.map((method, idx) => (
            <div className="payment-block" key={idx}>
              {Object.entries(method).map(([key, value]) => (
                <div className="form-field" key={key}>
                  <label className="field-label">{formatFieldName(key)}</label>
                  <input
                    className="field-input"
                    type={typeof value === "number" ? "number" : "text"}
                    value={value}
                    onChange={(e) =>
                      handleChange(e, "paymentData", key, idx, "paymentMethods")
                    }
                  />
                </div>
              ))}
            </div>
          ))}
          <button
            type="button"
            className="add-product-button"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                paymentData: {
                  ...prev.paymentData,
                  paymentMethods: [
                    ...prev.paymentData.paymentMethods,
                    { name: "", amount: 0 },
                  ],
                },
              }))
            }
          >
            Add Payment Method
          </button>
        </div>
      );
    }

    // Loyalty Data block styling
    if (section === "loyaltyData") {
      return (
        <div className="loyalty-data-block">
          {Object.entries(formData.loyaltyData).map(([key, value]) => (
            <div className="form-field" key={key}>
              <label className="field-label">{formatFieldName(key)}</label>
              <input
                className="field-input"
                type={typeof value === "number" ? "number" : "text"}
                value={value}
                onChange={(e) => handleChange(e, "loyaltyData", key)}
              />
            </div>
          ))}
        </div>
      );
    }

    // Taxes Data block styling
    if (section === "taxesData") {
      // Exclude distributedTax from UI, only show other fields
      const { distributedTax, ...otherTaxFields } = formData.taxesData;
      return (
        <div className="order-details-block">
          {Object.entries(otherTaxFields).map(([key, value]) => (
            <div className="form-field" key={key}>
              <label className="field-label">{formatFieldName(key)}</label>
              <input
                className="field-input"
                type={typeof value === "number" ? "number" : "text"}
                value={value}
                onChange={(e) => handleChange(e, "taxesData", key)}
              />
            </div>
          ))}
        </div>
      );
    }

    // Default: render all fields in a grid
    return (
      <div className="order-details-block">
        {Object.entries(formData[section]).map(([key, value]) => (
          <div className="form-field" key={key}>
            <label className="field-label">{formatFieldName(key)}</label>
            <input
              className="field-input"
              type={typeof value === "number" ? "number" : "text"}
              value={value}
              onChange={(e) => handleChange(e, section, key)}
            />
          </div>
        ))}
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Deep clone to avoid mutation
    const payload = JSON.parse(JSON.stringify(formData));

    // Helper: recursively convert numeric strings to numbers
    const convertToNumbers = (obj) => {
      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === "string" && !isNaN(obj[key]) && obj[key] !== "") {
          obj[key] = Number(obj[key]);
        } else if (typeof obj[key] === "object" && obj[key] !== null) {
          convertToNumbers(obj[key]);
        }
      });
    };

    convertToNumbers(payload);

    const apiUrl =
      "https://testapi.pinelabs.com/v1/billing-integration/qr-payments/transactions/digital-invoice-v1/create";

    const headers = {
      Authorization:
        "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJTYlBZU2ZJOS04bklWczl3Xy1Fa3RVdWNVaURNdUZiMGM5bkpVM3hhYzdBIn0.eyJleHAiOjE3NjEwMjQzMjksImlhdCI6MTc0NTQ3MjMyOSwianRpIjoiMjFkOTJlYjYtZDdiNi00ZmM3LTk0NDktMWI2Mjk5MTExMzJhIiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eXRlc3QucGluZWxhYnMuY29tL3JlYWxtcy9waW5lbGFicyIsInN1YiI6IjhmNzJlZjBiLTI0ZTMtNDQwZi1iZmQzLTExMTVhMDhkZjBiZCIsInR5cCI6IkJlYXJlciIsImF6cCI6Ik1lcmNoYW50QmlsbGluZ1NlcnZfMjAxNSIsImFjciI6IjEiLCJzY29wZSI6ImZldGNoLnBpbmUub25lLnRyYW5zYWN0aW9uLkdFVCBiaWxsaW5nLWludGVncmF0aW9uLnFyLXBheW1lbnRzLnRyYW5zYWN0aW9ucy5QT1NUIHYxLmJpbGxpbmctaW50ZWdyYXRpb24ucXItcGF5bWVudHMudHJhbnNhY3Rpb25zLmRpZ2l0YWwtaW52b2ljZS12Mi5jcmVhdGUuUE9TVCBiaWxsaW5nLWludGVncmF0aW9uLnFyLXBheW1lbnRzLnRyYW5zYWN0aW9ucy5HRVQgYmlsbGluZy1pbnRlZ3JhdGlvbi5xci1wYXltZW50cy50cmFuc2FjdGlvbnMuY2FuY2VsLlBPU1Qgb2ZmbGluZV9hY2Nlc3MgdjEuYmlsbGluZy1pbnRlZ3JhdGlvbi5xci1wYXltZW50cy50cmFuc2FjdGlvbnMuZGlnaXRhbC1pbnZvaWNlLXYxLmNyZWF0ZS5QT1NUIiwiY2xpZW50SG9zdCI6IjE0LjE0My4xMjAuODIiLCJleHRJZCI6IjIwMTUiLCJNZXJjaGFudElkIjoiMjAxNSIsImNsaWVudEFkZHJlc3MiOiIxNC4xNDMuMTIwLjgyIiwiY2xpZW50X2lkIjoiTWVyY2hhbnRCaWxsaW5nU2Vydl8yMDE1In0.DtG1R--rgd9HZccykXXeD7N13YCOStPTKsVMIDsDSn2VMHdBu7_Erwktt2YCm_k3tV5LMH4pwQYN6NAWGnDNlQ",
      "Content-Type": "application/json",
      "store-code": "9991",
      "correlation-id":"Rhythm"
    };

    // Log cURL for debugging
    const curlCommand = `
curl --location '${apiUrl}' \\
--header 'Authorization: ${headers.Authorization}' \\
--header 'Content-Type: ${headers["Content-Type"]}' \\
--header 'store-code: ${headers["store-code"]}' \\
--data-raw '${JSON.stringify(payload, null, 2)}'
    `;
    console.log("Final CURL Command:\n", curlCommand);

    try {
      const response = await axios.post(apiUrl, payload, { headers });
      setPopupType("success");
      setPopupMessage("Invoice uploaded successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      setPopupType("error");
      setPopupMessage(error.response?.data?.message || "API call failed!");
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="loading-toast">
          <div className="spinner"></div>
        </div>
      )}
      {popupMessage && (
        <div className={`popup ${popupType}`}>
          <h3>{popupType === "success" ? "Success" : "Error"}</h3>
          <p>{popupMessage}</p>
          <button onClick={() => setPopupMessage(null)}>Close</button>
        </div>
      )}
      <form className={`form-container${popupMessage ? " popup-active" : ""}`} onSubmit={handleSubmit}>
        <div className="form-title">BillMe Adapter UI</div>
        <div className="tabs">
          {[
            { key: "customerData", label: "Customer Info" },
            { key: "storeData", label: "Store Info" },
            { key: "companyData", label: "Company Info" },
            { key: "transactionalData", label: "Transactional Info" },
            { key: "loyaltyData", label: "Loyalty Info" },
            { key: "paymentData", label: "Payment Info" },
            { key: "productsData", label: "Products Info" },
            { key: "billAmountData", label: "Bill Amount Info" },
            { key: "taxesData", label: "Taxes Info" },
            { key: "billFooterData", label: "Bill Footer Info" },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`tab-button${activeTab === tab.key ? " active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="tab-content">{renderFields(activeTab)}</div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </>
  );
}

export default DigitalInvoiceForm;
