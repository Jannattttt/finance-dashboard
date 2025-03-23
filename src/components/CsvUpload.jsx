"use client"

import { useState, useContext } from "react"
import { TransactionsContext } from "../context/TransactionsContext"
import "../styles/CsvUpload.css"

function CsvUpload() {
  const { addTransaction } = useContext(TransactionsContext)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState([])
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
    setError("")
    setSuccess("")

    if (selectedFile) {
      if (selectedFile.type !== "text/csv") {
        setError("Please upload a CSV file")
        setFile(null)
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const csvData = event.target.result
          const parsedData = parseCSV(csvData)

          if (parsedData.length > 0) {
            setPreview(parsedData.slice(0, 5)) // Show first 5 rows as preview
          } else {
            setError("No data found in the CSV file")
          }
        } catch (err) {
          setError("Error parsing CSV file: " + err.message)
        }
      }
      reader.readAsText(selectedFile)
    }
  }

  const parseCSV = (csvText) => {
    const lines = csvText.split("\n")
    const headers = lines[0].split(",").map((header) => header.trim())

    // Check if required columns exist
    const requiredColumns = ["date", "description", "amount", "type", "category"]
    const missingColumns = requiredColumns.filter((col) => !headers.some((header) => header.toLowerCase() === col))

    if (missingColumns.length > 0) {
      throw new Error(`Missing required columns: ${missingColumns.join(", ")}`)
    }

    const result = []

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue

      const values = lines[i].split(",").map((value) => value.trim())

      if (values.length !== headers.length) {
        throw new Error(`Line ${i + 1} has incorrect number of values`)
      }

      const row = {}
      headers.forEach((header, index) => {
        row[header.toLowerCase()] = values[index]
      })

      result.push(row)
    }

    return result
  }

  const handleUpload = async () => {
    if (!file) return

    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const reader = new FileReader()

      reader.onload = (event) => {
        try {
          const csvData = event.target.result
          const parsedData = parseCSV(csvData)

          // Process and add transactions
          parsedData.forEach((row) => {
            const amount = Number.parseFloat(row.amount)

            if (isNaN(amount)) {
              throw new Error(`Invalid amount: ${row.amount}`)
            }

            const transaction = {
              id: Date.now() + Math.random().toString(36).substr(2, 5),
              date: row.date,
              description: row.description,
              amount: Math.abs(amount),
              type: row.type.toLowerCase(),
              category: row.category,
            }

            addTransaction(transaction)
          })

          setSuccess(`Successfully imported ${parsedData.length} transactions`)
          setFile(null)
          setPreview([])

          // Reset file input
          document.getElementById("csv-file").value = ""
        } catch (err) {
          setError("Error processing CSV file: " + err.message)
        } finally {
          setIsLoading(false)
        }
      }

      reader.readAsText(file)
    } catch (err) {
      setError("Error uploading file: " + err.message)
      setIsLoading(false)
    }
  }

  return (
    <div className="csv-upload-container">
      <h2>Import Transactions from CSV</h2>

      <div className="csv-instructions">
        <h3>CSV File Format</h3>
        <p>Your CSV file should include the following columns:</p>
        <ul>
          <li>
            <strong>date</strong> - Transaction date (YYYY-MM-DD)
          </li>
          <li>
            <strong>description</strong> - Transaction description
          </li>
          <li>
            <strong>amount</strong> - Transaction amount
          </li>
          <li>
            <strong>type</strong> - Transaction type (income or expense)
          </li>
          <li>
            <strong>category</strong> - Transaction category
          </li>
        </ul>
        <p>Example:</p>
        <pre>
          date,description,amount,type,category 2023-03-15,Grocery Shopping,120.50,expense,Food & Dining
          2023-03-14,Salary Deposit,2000.00,income,Salary
        </pre>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="upload-section">
        <div className="file-input-container">
          <label htmlFor="csv-file" className="file-input-label">
            <span>Choose CSV File</span>
            <input type="file" id="csv-file" accept=".csv" onChange={handleFileChange} className="file-input" />
          </label>
          <span className="file-name">{file ? file.name : "No file chosen"}</span>
        </div>

        <button className="upload-btn" onClick={handleUpload} disabled={!file || isLoading}>
          {isLoading ? "Importing..." : "Import Transactions"}
        </button>
      </div>

      {preview.length > 0 && (
        <div className="preview-section">
          <h3>Preview</h3>
          <table className="preview-table">
            <thead>
              <tr>
                {Object.keys(preview[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {preview.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="preview-note">Showing first {preview.length} rows</p>
        </div>
      )}
    </div>
  )
}

export default CsvUpload

