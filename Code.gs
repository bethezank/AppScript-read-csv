function readCsv() {

  // กำหนด charset สำหรับอ่านภาษาไทยจาก CSV

  // Super set ที่มี TIS-620 รวมอยู่ด้วย
  // const charSet = "WINDOWS-874"

  // สมอ.620 (สมาคม มาตรฐาน อุตสาหกรรมไทย) หรือ มอก.620
  const charSet = "TIS-620"

  // ตัวเดียวกับ TIS-620 แค่เป็นชื่อที่ไม่เป็นทางการ
  // const charSet = "ISO-8859-11"

  // ===============================================================================

  // เข้าถึง CSV ด้วยชื่อไฟล์
  // const sourceCsv = 'A_Query_SO_App.csv'
  // const file = DriveApp.getFilesByName(sourceCsv).next()

  // เข้าถึง CSV ด้วย Id ของไฟล์
  const sourceCsv = '1dWZEpeAiOXupGrdLp11NT8yjkSkVC0Ez'
  const file = DriveApp.getFileById(sourceCsv)

  const rawData = file.getBlob().getDataAsString(charSet)
  const csvData = Utilities.parseCsv(rawData)
  const csvDataLength = csvData.length

  // ทดสอบอ่าน CSV ข้อมูลที่ 1 (Row=2)
  // const so_no = csvData[1][0]
  // const PROJECT_NO = csvData[1][1]
  // const PROJECT_NAME = csvData[1][2]
  // console.log("SO_NO = " + so_no )
  // console.log("PROJECT_NO = " + PROJECT_NO )
  // console.log("PROJECT_NAME = " + PROJECT_NAME )

  // ทดลองเขียนข้อมูลที่อ่านได้จาก CSV ลง sheet
  const sheetId = "1H0tslXfaNhFl98cwkzWzXmUCg3e1b3K1IdlQza_N2Cg"
  const sheetName = "Sheet1"
  const sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName)

  console.log(`# Start.`)

  // ทดสอบเขียนข้อมูลที่ 1 (Row=2)
  // sheet.getRange( 2, 1 ).setValue(so_no)
  // sheet.getRange( 2, 2 ).setValue(PROJECT_NO)
  // sheet.getRange( 2, 3 ).setValue(PROJECT_NAME)

  // ทดสอบเขียนข้อมูลทั้งหมดจาก CSV
  csvData.forEach((rowData, row) => {
    console.log(`[${row + 1}/${csvDataLength}] : Writing data ...`)
    rowData.forEach((cell, col) => {
      sheet.getRange(row + 1, col + 1).setValue(cell)
    })
  })

  console.log(`# Complete.`)

}
